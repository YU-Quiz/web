// src/components/quizlist/QuizListItem.jsx
import React from "react";
import "../../styles/quiz_list_page/QuizListItem.scss";

const QuizListItem = ({ quiz }) => {
  const {
    quizTitle,
    nickname,
    likeCount,
    viewCount,
    createdAt,
    isSolved,
    quizType,
    subject,
  } = quiz;

  // 퀴즈 유형 변환 함수
  const getQuizTypeLabel = (quizType) => {
    switch (quizType) {
      case "MULTIPLE_CHOICE":
        return "객관식";
      case "TRUE_FALSE":
        return "O/X";
      case "SHORT_ANSWER":
        return "단답식";
      default:
        return "일반"; // 기본값
    }
  };

  return (
    <div className="quiz-list-item">
      <div className="quiz-header">
        <h2 className="quiz-title">{quizTitle}</h2>
        <p className="quiz-type">{getQuizTypeLabel(quizType)}</p>{" "}
        {/* 퀴즈 유형 표시 */}
        <p className="quiz-type">{subject || "과목"}</p> {/* 퀴즈 과목 표시 */}
      </div>

      <div className="quiz-info-container">
        <div className="quiz-stats">
          <p className="quiz-likes">👍 {likeCount}</p>
          <p className="quiz-views">조회수: {viewCount}</p>
          <p className={`quiz-solved ${isSolved ? "solved" : "unsolved"}`}>
            {isSolved ? "풀이 완료" : ""}
          </p>
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
