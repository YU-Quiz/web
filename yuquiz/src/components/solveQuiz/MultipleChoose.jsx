import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiztype/MultipleChoose.scss";

export const MultipleChoose = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
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

  const handleAnswerClick = (answer) => {
    setSelectedAnswers((prevAnswers) =>
      prevAnswers.includes(answer)
        ? prevAnswers.filter((ans) => ans !== answer)
        : [...prevAnswers, answer]
    );
  };

  const handleSubmit = () => {
    if (
      !quizData ||
      !quizData.correctAnswer ||
      !Array.isArray(quizData.correctAnswer)
    ) {
      console.error("correctAnswer가 정의되지 않았거나 배열이 아닙니다.");
      return;
    }

    const correctAnswers = quizData.correctAnswer;

    const isAllCorrect =
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer));

    setIsCorrect(isAllCorrect ? "맞았습니다!" : "틀렸습니다.");
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return (
      <div className="quiz-container">
        <h2>{quizData.title}</h2>
        <p>{isCorrect}</p>
        <button className="gotolist-button">목록으로</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <p className="quiz-question">{quizData.question}</p>
      <div className="quiz-options">
        {quizData.choices.map(
          (choice, index) =>
            choice && (
              <div key={index} className="quiz-option">
                <input
                  type="checkbox"
                  className="choose-list"
                  id={`choice-${index}`}
                  name="quiz-choice"
                  value={choice}
                  checked={selectedAnswers.includes(choice)}
                  onChange={() => handleAnswerClick(choice)}
                />
                <label htmlFor={`choice-${index}`}>{choice}</label>
              </div>
            )
        )}
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
