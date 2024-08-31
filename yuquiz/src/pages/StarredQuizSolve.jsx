import React, { useState } from "react";
import "../../styles/quiztype/MCQ.scss";

const StarredQuizSolve = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "한국의 수도는 대구이다?",
      correctAnswer: "true",
    },
    {
      question: "영남대학교에선 신발을 벗고 걸어야 한다?",
      correctAnswer: "false",
    },
    {
      question: "'반갑습니다'는 일본어이다?",
      correctAnswer: "false",
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
      {currentQuestion < questions.length ? (
        <>
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
          <p className="quiz-score">
            Score: {score}/{questions.length}
          </p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </>
      ) : (
        <h2>
          Quiz Finished! Your score is: {score}/{questions.length}
        </h2>
      )}
    </div>
  );
};

export default StarredQuizSolve;
