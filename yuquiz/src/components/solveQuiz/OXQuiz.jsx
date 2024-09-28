import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import { getAnswer, getGrade } from "../../services/quiz/QuizSolve";
import "../../styles/quiztype/OXQuiz.scss";
import { useNavigate } from "react-router-dom";

export const OXQuiz = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert("정답을 선택하세요.");
      return;
    }

    const answer = selectedAnswer === quizData.choices[0] ? "1" : "0";
    try {
      const result = await getGrade(quizID, { answer });
      setIsCorrect(result ? "맞았습니다!🙆‍♂️" : "틀렸습니다.🙅‍♂️");
    } catch (error) {
      console.error("채점 중 오류 발생:", error);
      setIsCorrect("서버 오류로 채점할 수 없습니다.");
    }

    setScore(parseInt(answer, 10));
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return (
      <div className="quiz-container">
        <h2>퀴즈가 완료되었습니다!</h2>
        <p>{isCorrect}</p>
        <button
          className="gotolist-button"
          onClick={() => navigate("/quiz/list")}
        >
          목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <p className="quiz-question">{quizData.question}</p>
      <div className="quiz-options">
        <button
          className={`quiz-option-button ${
            selectedAnswer === quizData.choices[0] ? "selected" : ""
          }`}
          onClick={() => handleAnswerClick(quizData.choices[0])}
        >
          O
        </button>
        <button
          className={`quiz-option-button ${
            selectedAnswer === quizData.choices[1] ? "selected" : ""
          }`}
          onClick={() => handleAnswerClick(quizData.choices[1])}
        >
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
