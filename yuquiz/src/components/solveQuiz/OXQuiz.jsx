import React, { useState } from "react";
import "../../styles/quiztype/OXQuiz.scss";
export const OXQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    //나중엔 퀴즈 id로 받아와서 넣어줄거임
    {
      question: "한국의 수도는 대구이다?",
    },
  ];
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestion(currentQuestion + 1);
  };
  return (
    <div className="quiz-container">
      <h2 className="quiz-header">O/X Quiz</h2>
      <p className="quiz-question">
        {currentQuestion + 1}/{questions.length}:{" "}
        {questions[currentQuestion].question}
      </p>
      <div className="quiz-options">
        <button onClick={() => handleAnswerClick("true")}>O</button>
        <button onClick={() => handleAnswerClick("false")}>X</button>
      </div>
      <div className="submit-box">
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="quiz-submit"
        >
          제출
        </button>
      </div>
    </div>
  );
};
