import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import { useNavigate } from "react-router-dom";
import { getGrade } from "../../services/quiz/QuizSolve";
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

const InputBox = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
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

export const ShortAnswer = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getQuiz(quizID);
        setQuizData(data);
      } catch (error) {
        console.error("퀴즈 데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchQuizData();
  }, [quizID]);

  if (!quizData) {
    return <div>로딩 중...</div>;
  }

  const handleInputAnswer = (e) => {
    setWrittenAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    const answer = writtenAnswer.toString();
    try {
      const isAnswerCorrect = await getGrade(quizID, { answer });
      setIsCorrect(isAnswerCorrect ? "맞았습니다! 🙆‍♂️" : "틀렸습니다. 🙅‍♂️");
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
        <GoToListButton onClick={() => navigate(-1)}>목록으로</GoToListButton>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizQuestion>{quizData.question}</QuizQuestion>
      <InputBox
        type="text"
        onChange={handleInputAnswer}
        value={writtenAnswer}
        placeholder="정답을 입력하세요"
      />
      <SubmitBox>
        <QuizSubmitButton
          onClick={handleSubmit}
          disabled={writtenAnswer === ""}
        >
          제출
        </QuizSubmitButton>
      </SubmitBox>
    </QuizContainer>
  );
};
