// src/components/quizlist/QuizListItem.jsx
import React from "react";
import "../../styles/quiz_list_page/QuizListItem.scss";
import { Link } from "react-router-dom";
import { QUIZ_TYPE } from "../../constants/quiz/quizType";
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
    <div className="quiz-list-item">
      <div className="quiz-header">
        <h2
          className={`quiz-title ${
            isSolved === null ? "unsolved" : isSolved ? "correct" : "wrong"
          }`}
        >
          <Link to={`/quiz/play/${quizId}`}>{quizTitle}</Link>
        </h2>
        <p className="quiz-type">{quizTypeLabel}</p> {/* 퀴즈 유형 표시 */}
        <p className="quiz-type">{subject || "과목"}</p> {/* 퀴즈 과목 표시 */}
      </div>
      <div className="quiz-info-container">
        <div className="quiz-stats">
          <p className="quiz-likes">👍 {likeCount}</p>
          <p className="quiz-views">조회수: {viewCount}</p>
        </div>
        <div className="quiz-meta">
          <p className="quiz-author">작성자: {nickname}</p>
          <p className="quiz-date">
            작성일: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizListItem;
