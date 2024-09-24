import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiztype/ShortAnswer.scss";
import { useNavigate } from "react-router-dom";
import { getGrade } from "../../services/quiz/QuizSolve";

export const ShortAnswer = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getQuiz(quizID);
        setQuizData(data);
      } catch (error) {
        console.error("퀴즈 데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchQuizData();
  }, [quizID]);

  if (!quizData) {
    return <div>로딩 중...</div>;
  }

  const handleInputAnswer = (e) => {
    setWrittenAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    const answer = writtenAnswer.toString(); // 문자열로 변환
    const isAnswerCorrect = await getGrade(quizID, { answer });

    setIsCorrect(isAnswerCorrect ? "맞았습니다! 🙆‍♂️" : "틀렸습니다. 🙅‍♂️");
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return (
      <div className="quiz-container">
        <h2>{quizData.question}</h2>
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
        <input
          type="text"
          className="input-box"
          onChange={handleInputAnswer}
          value={writtenAnswer}
        />
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
