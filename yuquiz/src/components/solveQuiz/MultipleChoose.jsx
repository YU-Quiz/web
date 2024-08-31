import React, { useState } from "react";
import "../../styles/quiztype/MultipleChoose.scss";

export const MultipleChoose = () => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      title: "테스트 퀴즈입니당~",
      question: "이중에서 정답은?",
      quizImg: null,
      quizType: "MULTIPLE_CHOICE",
      likeCount: 0,
      choices: ["1.뭐요", "2.뭘봐요", "3.아닌데", "아닌가?", "기억이 잘..."],
      subject: "마이크로프로세서",
      writer: "테스터입니다",
      createdAt: "2024-08-10T16:33:00",
    },
  ];

  const handleAnswerClick = (answer) => {
    setSelectedAnswers((prevAnswers) =>
      prevAnswers.includes(answer)
        ? prevAnswers.filter((ans) => ans !== answer)
        : [...prevAnswers, answer]
    );
  };

  const handleSubmit = () => {
    const correctAnswers = questions[currentQuestion].correctAnswer;
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
      <h2 className="quiz-header">{questions[currentQuestion].title}</h2>
      <p className="quiz-question">
        {currentQuestion + 1}/{questions.length}:{" "}
        {questions[currentQuestion].question}
      </p>
      <div className="quiz-options">
        {questions[currentQuestion].choices.map((choice, index) => (
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
