import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiztype/MultipleChoose.scss";

export const MultipleChoose = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
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

  const handleAnswerClick = (answer) => {
    setSelectedAnswers((prevAnswers) =>
      prevAnswers.includes(answer)
        ? prevAnswers.filter((ans) => ans !== answer)
        : [...prevAnswers, answer]
    );
  };

  const handleSubmit = () => {
    const correctAnswers = quizData.questions[currentQuestion].correctAnswer;
    if (
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer))
    ) {
      setScore(score + 1);
    }
    setSelectedAnswers([]);
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
        {quizData.questions[currentQuestion].choices.map((choice, index) => (
          <div key={index} className="quiz-option">
            <input
              type="checkbox"
              id={`choice-${index}`}
              name="quiz-choice"
              value={choice}
              checked={selectedAnswers.includes(choice)}
              onChange={() => handleAnswerClick(choice)}
            />
            <label htmlFor={`choice-${index}`}>{choice}</label>
          </div>
        ))}
      </div>
      <div className="submit-box">
        <button
          onClick={handleSubmit}
          disabled={selectedAnswers.length === 0}
          className="quiz-submit"
        >
          제출
        </button>
      </div>
    </div>
  );
};
