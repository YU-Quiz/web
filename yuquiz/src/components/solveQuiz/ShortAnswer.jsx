import React, { useState } from "react";
import "../../styles/quiztype/ShortAnswer.scss";
export const ShortAnswer = () => {
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    //나중엔 퀴즈 id로 받아와서 넣어줄거임
    {
      title: "초간단 퀴즈입니당~",
      question: "내 이름은?",
      quizImg: null,
      quizType: "ShortAnswer",
      likeCount: 0,
      choices: null,
      subject: "관리자",
      writer: "테스터입니다",
      createdAt: "2024-08-10T16:33:00",
    },
  ];
  const handleInputAnswer = (answer) => {
    setWrittenAnswer(answer);
  };

  const handleSubmit = () => {
    if (writtenAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setWrittenAnswer("");
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
        <input
          type="text"
          className="input-box"
          onChange={handleInputAnswer}
        ></input>
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
