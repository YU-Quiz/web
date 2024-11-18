import styled from "styled-components";
import { QUIZ_TYPE } from "../../constants/quiz/quizType";
import { Link } from "react-router-dom";

const QCard = styled(Link)`
  position: relative;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.07);
  display: flex;
  border: 1px solid silver;
  flex-direction: column;
  justify-content: center;
  min-height: 150px;
  width: 220px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }
`;

const QuizTitle = styled.p`
  font-weight: bold;
  font-size: 25px;
  margin-top: 15px;
  margin-bottom: auto;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.correct {
    color: #509576;
  }

  &.wrong {
    color: red;
  }

  &.unsolved {
    color: #333;
  }
`;

const QuizInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const QuizStats = styled.div`
  display: flex;
  justify-content: start;
  gap: 17px;
  font-size: 14px;
  color: #666;
`;

const QuizAuthor = styled.p`
  color: #888;
  margin: 0;
`;

const QuizDate = styled.p`
  color: #888;
  margin: 0;
`;

const QuizType = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

//자리수가 많을때 화면이 짤릴 것을 예상해서 미리 처리해둠
const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`.replace(/\.0k$/, "k");
  }
  return number.toString();
};

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
  } = quiz;

  const quizTypeLabel = QUIZ_TYPE[quizType]?.label || "유형 없음";

  const trimmedTitle =
    quizTitle.length > 7 ? `${quizTitle.slice(0, 7)}...` : quizTitle;

  const formattedLikeCount = formatNumber(likeCount);
  const formattedViewCount = formatNumber(viewCount);

  return (
    <QCard to={`/quiz/play/${quizId}`}>
      <QuizTitle
        className={
          isSolved === null ? "unsolved" : isSolved ? "correct" : "wrong"
        }
        title={quizTitle}
      >
        {trimmedTitle}
      </QuizTitle>
      <QuizInfo>
        <QuizStats>
          <StatItem>👍 {formattedLikeCount}</StatItem>
          <StatItem>👀 {formattedViewCount}</StatItem>
          <QuizType>{quizTypeLabel}</QuizType>
        </QuizStats>
        <QuizAuthor>작성자: {nickname}</QuizAuthor>
        <QuizDate>작성일: {new Date(createdAt).toLocaleDateString()}</QuizDate>
      </QuizInfo>
    </QCard>
  );
};
