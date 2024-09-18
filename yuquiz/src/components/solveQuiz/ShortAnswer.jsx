import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiztype/ShortAnswer.scss";

export const ShortAnswer = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

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

  const handleInputAnswer = (e) => {
    setWrittenAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const isAnswerCorrect = writtenAnswer === quizData.correctAnswer;
    setIsCorrect(isAnswerCorrect ? "맞았습니다!" : "틀렸습니다.");
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return (
      <div className="quiz-container">
        <h2>{quizData.question}</h2>
        <p>{isCorrect}</p>
        <button className="gotolist-button">목록으로</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <p className="quiz-question">{quizData.question}</p>
      <div className="quiz-options">
        <input
          type="text"
          className="input-box"
          onChange={handleInputAnswer}
          value={writtenAnswer}
        />
      </div>
      <div className="submit-box">
        <button
          onClick={handleSubmit}
          disabled={writtenAnswer === ""}
          className="quiz-submit"
        >
          제출
        </button>
      </div>
    </div>
  );
};
