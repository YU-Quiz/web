import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import { getAnswer, getGrade } from "../../services/quiz/QuizSolve"; // 서버와 통신하기 위해 추가
import "../../styles/quiztype/OXQuiz.scss";
import { useNavigate } from "react-router-dom";

export const OXQuiz = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 선택된 답
  const [score, setScore] = useState(0); // 점수
  const [hasSubmitted, setHasSubmitted] = useState(false); // 제출 여부
  const [isCorrect, setIsCorrect] = useState(""); // 정답 여부 메시지

  const navigate = useNavigate();

  useEffect(() => {
    // 퀴즈 데이터 가져오기
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
  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert("정답을 선택하세요.");
      return;
    }

    // 선택한 답을 "1" 또는 "0"으로 변환하여 서버로 제출
    const answer = selectedAnswer === quizData.choices[0] ? "1" : "0";
    console.log("정답은 이건데?", getAnswer(quizID));
    try {
      const result = await getGrade(quizID, { answer });
      setIsCorrect(result ? "맞았습니다!🙆‍♂️" : "틀렸습니다.🙅‍♂️");
    } catch (error) {
      console.error("채점 중 오류 발생:", error);
      setIsCorrect("서버 오류로 채점할 수 없습니다.");
    }

    // 숫자로 변환하여 점수 설정 (필요 시)
    setScore(parseInt(answer, 10)); // "1" 또는 "0"을 숫자로 변환하여 설정
    setHasSubmitted(true); // 제출 후 버튼 비활성화
  };

  // 제출 후 메시지 처리
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
