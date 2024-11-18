import React from "react";
import { Link } from "react-router-dom";
import { QUIZ_TYPE } from "../../constants/quiz/quizType";
import styled from "styled-components";

const QuizContainer = styled.div`
  border: 1px solid #ddd;
  padding: 7px;
  padding-left: 17px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #fff;
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const QuizTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 10px;
  &.correct {
    color: #509576;
  }
  &.wrong {
    color: red;
  }
`;

const QuizType = styled.h2`
  margin-right: 10px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 0.9rem;
  color: black;
  background-color: rgb(207, 201, 201);
  border-radius: 8px;
`;

const QuizInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const QuizStats = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const QuizMeta = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 8px;
  font-size: 12px;
`;

const QuizLikes = styled.p`
  font-size: 12px;
  color: #555;
  font-weight: bold;
`;

const QuizViews = styled.p`
  font-size: 12px;
  color: #555;
  font-weight: bold;
`;

const QuizAuthor = styled.p`
  color: #888;
`;

const QuizDate = styled.p`
  color: #888;
`;

const QuizListItem = ({ quiz }) => {
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
    <QuizContainer>
      <QuizHeader>
        <QuizTitle
          className={
            isSolved === null ? "unsolved" : isSolved ? "correct" : "wrong"
          }
        >
          <Link to={`/quiz/play/${quizId}`}>{quizTitle}</Link>
        </QuizTitle>
        <QuizType>{quizTypeLabel}</QuizType>
        <QuizType>{subject || "과목"}</QuizType>
        <QuizStats>
          <QuizLikes>👍 {likeCount}</QuizLikes>
          <QuizViews>조회수: {viewCount}</QuizViews>
        </QuizStats>
      </QuizHeader>
      <QuizInfoContainer>
        <QuizMeta>
          <QuizAuthor>작성자: {nickname}</QuizAuthor>
          <QuizDate>
            작성일: {new Date(createdAt).toLocaleDateString()}
          </QuizDate>
        </QuizMeta>
      </QuizInfoContainer>
    </QuizContainer>
  );
};

export default QuizListItem;
