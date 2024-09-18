import "../../styles/quiz_list_page/QuizList.scss";
import React from "react";
import QuizListItem from "./QuizListItem";

const QuizList = ({ currentQuizzes }) => {
  return (
    <div className="quiz-list">
      {currentQuizzes.length === 0 ? (
        <p>표시할 퀴즈가 없습니다.</p>
      ) : (
        currentQuizzes.map((quiz) => (
          <QuizListItem key={quiz.quizId} quiz={quiz} />
        ))
      )}
    </div>
  );
};

export default QuizList;
