import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // useParams로 URL에서 quizId 가져오기
import { getQuiz } from "../../services/quiz/QuizManage";
import "../../styles/quiz/QuizSolve.scss";
import { MultipleChoose } from "../../components/solveQuiz/MultipleChoose";
import { OXQuiz } from "../../components/solveQuiz/OXQuiz";
import { ShortAnswer } from "../../components/solveQuiz/ShortAnswer";
import { IoMdArrowBack } from "react-icons/io";

export const QuizSolve = () => {
  const { quizId } = useParams(); // URL에서 quizId를 가져옴
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 네비게이트 함수만 가져옴

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getQuiz(quizId); // quizId를 사용하여 API 호출
        setQuizData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]); // quizId가 변경될 때마다 호출

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!quizData) {
    return <div>퀴즈 데이터를 찾을 수 없습니다.</div>;
  }

  // 퀴즈 타입에 따라 다른 컴포넌트를 렌더링
  const renderQuizComponent = () => {
    switch (quizData.quizType) {
      case "MULTIPLE_CHOICE":
        return <MultipleChoose quizID={quizId} />;
      case "TRUE_FALSE":
        return <OXQuiz quizID={quizId} />;
      case "SHORT_ANSWER":
        return <ShortAnswer quizID={quizId} />;
      default:
        return <div>지원되지 않는 퀴즈 유형입니다.</div>;
    }
  };

  return (
    <div className="quiz-body">
      {/* 버튼 클릭 시 navigate(-1) 실행 */}
      <IoMdArrowBack className="back-button" onClick={() => navigate(-1)} />
      <div className="quiz-solve-page">
        <h1>{quizData.title}</h1>
        {renderQuizComponent()}
      </div>
    </div>
  );
};
