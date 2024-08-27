import React, { useState } from "react";
import "../../styles/quiztype/MCQ.scss";

const Quiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "What is the capital of France?",
      correctAnswer: "O",
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
            <button onClick={() => handleAnswerClick("O")}>O</button>
            <button onClick={() => handleAnswerClick("X")}>X</button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="quiz-submit"
          >
            Submit
          </button>
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

export default Quiz;
