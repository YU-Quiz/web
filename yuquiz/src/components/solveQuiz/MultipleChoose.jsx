import React, { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz/QuizManage";
import { getGrade } from "../../services/quiz/QuizSolve"; // 서버와 통신하기 위해 추가
import "../../styles/quiztype/MultipleChoose.scss";
import { useNavigate } from "react-router-dom";

export const MultipleChoose = ({ quizID }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // 선택한 답의 인덱스를 저장하도록 변경
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
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

  const handleAnswerClick = (index) => {
    // 선택된 답의 인덱스를 저장
    setSelectedAnswers((prevAnswers) =>
      prevAnswers.includes(index)
        ? prevAnswers.filter((ans) => ans !== index)
        : [...prevAnswers, index]
    );
  };

  const handleSubmit = async () => {
    if (!quizData || !quizData.choices) {
      console.error("퀴즈 데이터가 잘못되었습니다.");
      return;
    }

    // 선택한 답을 인덱스 배열로 변환하여 하나의 문자열로 결합
    // answerString은 선택된 인덱스에 +1을 더하여 문자열로 만듦
    const answerString = selectedAnswers
      .map((index) => index + 1) // 인덱스 + 1
      .sort((a, b) => a - b) // 오름차순 정렬
      .join(""); // 문자열로 결합
    console.log(answerString); // 디버깅용

    try {
      // 서버로 정답을 전송하여 채점
      const result = await getGrade(quizID, { answer: answerString });
      setIsCorrect(result ? "맞았습니다!🙆‍♂️" : "틀렸습니다.🙅‍♂️");
    } catch (error) {
      console.error("채점 중 오류 발생:", error);
      setIsCorrect("서버 오류로 채점할 수 없습니다.");
    }

    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return (
      <div className="quiz-container">
        <h2>{quizData.title}</h2>
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
                  checked={selectedAnswers.includes(index)}
                  onChange={() => handleAnswerClick(index)} // 인덱스를 저장
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
