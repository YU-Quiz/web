import styled from "styled-components";
import { QUIZ_TYPE } from "../../constants/quiz/quizType";
import { Link } from "react-router-dom";

const QCard = styled.div`
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 200px;
  width: 200px;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }
`;

const QuizTitle = styled(Link)`
  font-weight: bold;
  &.correct {
    color: #509576;
  }
  &.wrong {
    color: red;
  }
`;

export const QuizCard = ({ quiz }) => {
  const {
    quizId,
    quizTitle,
    nickname,
    likeCount,
    viewCount,
    createdAt,
    isSolved,
    quizType,
    subject,
  } = quiz;
  const quizTypeLabel = QUIZ_TYPE[quizType]?.label || "유형 없음";
  return (
    <QCard>
      <QuizTitle
        to={`/quiz/play/${quizId}`}
        className={
          isSolved === null ? "unsolved" : isSolved ? "correct" : "wrong"
        }
      >
        {quizTitle}
      </QuizTitle>
    </QCard>
  );
};
