import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiztype/OXQuiz.scss";

export const OXQuiz = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [IsCorrect, setIsCorrect] = useState("맞았습니다.");

  useEffect(() => {
    const fetchQuizData = async () => {
      const data = await getQuiz(quizID);
      setQuizData(data);
    };
    fetchQuizData();
  }, [quizID]);

  // 로딩 중 처리
  if (!quizData) {
    return <div>로딩 중...</div>;
  }

  // 답안 선택 처리
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  // 제출 처리
  const handleSubmit = () => {
    if (selectedAnswer === quizData.choices[0]) {
      setScore(1);
    } else {
      setScore(0);
    }
    setHasSubmitted(true); // 제출 후 버튼 비활성화
  };

  // 제출 후 메시지 처리
  if (hasSubmitted) {
    if (score === 0) {
      setIsCorrect("틀렸습니다.");
    }
    return (
      <div className="quiz-container">
        <h2>퀴즈가 완료되었습니다!</h2>
        <p>{IsCorrect}</p>
        <button className="gotolist-button">목록으로</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <p className="quiz-question">{quizData.question}</p>
      <div className="quiz-options">
        <button onClick={() => handleAnswerClick(quizData.choices[0])}>
          O
        </button>
        <button onClick={() => handleAnswerClick(quizData.choices[1])}>
          X
        </button>
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
