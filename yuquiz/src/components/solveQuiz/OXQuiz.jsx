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
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const QuizOptionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.selected ? "#0288d1" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#333")};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 50%;
  &:hover {
    background-color: ${(props) => (props.selected ? "#0277bd" : "#f0f0f0")};
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

export const OXQuiz = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");
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

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert("정답을 선택하세요.");
      return;
    }

    const answer = selectedAnswer === quizData.choices[0] ? "1" : "0";
    try {
      const result = await getGrade(quizID, { answer });
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
        <QuizHeader>퀴즈가 완료되었습니다!</QuizHeader>
        <p>{isCorrect}</p>
        <GoToListButton onClick={() => navigate("/quiz/list")}>
          목록으로
        </GoToListButton>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizQuestion>{quizData.question}</QuizQuestion>
      <QuizOptions>
        <QuizOptionButton
          selected={selectedAnswer === quizData.choices[0]}
          onClick={() => handleAnswerClick(quizData.choices[0])}
        >
          O
        </QuizOptionButton>
        <QuizOptionButton
          selected={selectedAnswer === quizData.choices[1]}
          onClick={() => handleAnswerClick(quizData.choices[1])}
        >
          X
        </QuizOptionButton>
      </QuizOptions>
      <SubmitBox>
        <QuizSubmitButton
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
        >
          제출
        </QuizSubmitButton>
      </SubmitBox>
    </QuizContainer>
  );
};
