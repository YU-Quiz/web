import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiztype/OXQuiz.scss";

export const OXQuiz = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-header">O/X Quiz</h2>
      <p className="quiz-question">
        {currentQuestion + 1}/{quizData.questions.length}:{" "}
        {quizData.questions[currentQuestion].question}
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
