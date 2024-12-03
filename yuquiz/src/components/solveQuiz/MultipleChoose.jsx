import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import { getGrade } from "../../services/quiz/QuizSolve";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const QuizContainer = styled.div`
  max-width: 600px;
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fafafa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const QuizHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
`;

const QuizQuestion = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const QuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;
const QuizOption = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${(props) => (props.checked ? "#f0f0f0" : "#fff")};

  input {
    margin-right: 10px;
    cursor: pointer;
    appearance: none; /* 기본 체크박스 스타일 제거 */
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: ${(props) => (props.checked ? "#f0f0f0" : "#fff")};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &:checked::after {
      content: "✔";
      color: #000;
      font-size: 16px;
      position: absolute;
    }
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const SubmitBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const QuizSubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#0288d1")};
  color: white;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0277bd")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const GoToListButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const MultipleChoose = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      const data = await getQuiz(quizID);
      setQuizData(data);
    };
    fetchQuizData();
  }, [quizID]);

  if (!quizData) {
    return <div>로딩 중...</div>;
  }

  const handleAnswerClick = (index) => {
    setSelectedAnswers((prevAnswers) =>
      prevAnswers.includes(index)
        ? prevAnswers.filter((ans) => ans !== index)
        : [...prevAnswers, index]
    );
  };

  const handleSubmit = async () => {
    if (!quizData || !quizData.choices) {
      console.error("퀴즈 데이터가 잘못되었습니다.");
      return;
    }

    const answerString = selectedAnswers
      .map((index) => index + 1)
      .sort((a, b) => a - b)
      .join("");

    try {
      const result = await getGrade(quizID, { answer: answerString });
      setIsCorrect(result ? "맞았습니다! 🙆‍♂️" : "틀렸습니다. 🙅‍♂️");
    } catch (error) {
      console.error("채점 중 오류 발생:", error);
      setIsCorrect("서버 오류로 채점할 수 없습니다.");
    }

    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return (
      <QuizContainer>
        <QuizHeader>{isCorrect}</QuizHeader>
        <GoToListButton onClick={() => navigate("/quiz")}>
          목록으로
        </GoToListButton>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizQuestion>{quizData.question}</QuizQuestion>
      <QuizOptions>
        {quizData.choices.map(
          (choice, index) =>
            choice && (
              <QuizOption key={index} checked={selectedAnswers.includes(index)}>
                <input
                  type="checkbox"
                  id={`choice-${index}`}
                  checked={selectedAnswers.includes(index)}
                  onChange={() => handleAnswerClick(index)}
                />
                <span>{choice}</span>
              </QuizOption>
            )
        )}
      </QuizOptions>
      <SubmitBox>
        <QuizSubmitButton
          onClick={handleSubmit}
          disabled={selectedAnswers.length === 0}
        >
          제출
        </QuizSubmitButton>
      </SubmitBox>
    </QuizContainer>
  );
};
