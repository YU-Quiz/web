import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteQuiz,
  getQuiz,
  likeQuiz,
  pinQuiz,
} from "../../services/quiz/QuizManage";
import "../../styles/quiz/QuizSolve.scss";
import { MultipleChoose } from "../../components/solveQuiz/MultipleChoose";
import { OXQuiz } from "../../components/solveQuiz/OXQuiz";
import { ShortAnswer } from "../../components/solveQuiz/ShortAnswer";
import { IoMdArrowBack } from "react-icons/io";
import { IoEllipsisVertical, IoStarOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
export const QuizSolve = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [liked, setIsLiked] = useState(false);
  const [starred, setIsStarred] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getQuiz(quizId);
        setIsLiked(data.isLiked);
        setIsStarred(data.isPinned);
        setQuizData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!quizData) {
    return <div>퀴즈 데이터를 찾을 수 없습니다.</div>;
  }

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = async () => {
    const wellDone = await deleteQuiz(quizId);
    if (wellDone) {
      navigate(-1);
    }
  };
  const handleStarred = async () => {
    const newStarredStatus = !starred; // 상태를 토글한 후 저장
    setIsStarred(newStarredStatus);
    await pinQuiz(quizId, newStarredStatus);
  };
  const handleLiked = async () => {
    try {
      const newLikedStatus = !liked; // 상태를 토글한 후 저장
      setIsLiked(newLikedStatus);
      await likeQuiz(quizId, newLikedStatus);
    } catch (error) {
      console.error(error.message); // 에러를 콘솔에 출력
      setIsLiked(liked); // 오류 발생 시 상태를 원래대로 돌림
    }
  };

  const renderDropdownMenu = () => (
    <div className="dropdown-menu">
      <Link to={`/quiz/edit/${quizId}`} className="dropdown-link">
        🚨신고하기
      </Link>
      {quizData.isWriter && (
        <Link to={`/quiz/edit/${quizId}`} className="dropdown-link">
          📝수정하기
        </Link>
      )}
      {quizData.isWriter && (
        <Link className="dropdown-link" onClick={handleDelete}>
          🗑️삭제하기
        </Link>
      )}
    </div>
  );

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
  const renderLikedStarred = () => {
    return (
      <div>
        <button onClick={handleStarred}>{starred ? "🌟" : "⭐"}</button>
        <button onClick={handleLiked}>{liked ? "👍" : "🖒"}</button>
      </div>
    );
  };

  return (
    <div className="quiz-body">
      <IoMdArrowBack className="back-button" onClick={() => navigate(-1)} />
      <div className="dropdown-container">
        {renderLikedStarred()}
        <IoEllipsisVertical
          className="setting-button"
          onClick={handleDropdownToggle}
        />
        {isDropdownOpen && renderDropdownMenu()}
      </div>
      <div className="quiz-solve-page">
        <h1>{quizData.title}</h1>
        {renderQuizComponent()}
      </div>
    </div>
  );
};
