import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiztype/ShortAnswer.scss";

export const ShortAnswer = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
    if (writtenAnswer === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setWrittenAnswer("");
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-header">
        {quizData.questions[currentQuestion].title}
      </h2>
      <p className="quiz-question">
        {currentQuestion + 1}/{quizData.questions.length}:{" "}
        {quizData.questions[currentQuestion].question}
      </p>
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
