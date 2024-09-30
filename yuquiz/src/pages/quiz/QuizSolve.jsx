import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteQuiz,
  getQuiz,
  likeQuiz,
  pinQuiz,
  sendReport,
} from "../../services/quiz/QuizManage";
import "../../styles/quiz/QuizSolve.scss";
import { MultipleChoose } from "../../components/solveQuiz/MultipleChoose";
import { OXQuiz } from "../../components/solveQuiz/OXQuiz";
import { ShortAnswer } from "../../components/solveQuiz/ShortAnswer";
import { IoMdArrowBack } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import Modal from "react-modal";

export const QuizSolve = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [liked, setIsLiked] = useState(false);
  const [starred, setIsStarred] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태 추가
  const [reportReason, setReportReason] = useState(""); // 신고 사유 상태 추가
  const [customReason, setCustomReason] = useState(""); // 사용자가 입력한 기타 사유
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
    const newStarredStatus = !starred;
    setIsStarred(newStarredStatus);
    await pinQuiz(quizId, newStarredStatus);
  };

  const handleLiked = async () => {
    try {
      const newLikedStatus = !liked;
      setIsLiked(newLikedStatus);
      await likeQuiz(quizId, newLikedStatus);
    } catch (error) {
      console.error(error.message);
      setIsLiked(liked);
    }
  };

  const handleReportSubmit = async () => {
    const reason = reportReason === "기타" ? customReason : reportReason;
    await sendReport(
      {
        reason: reason,
        type: "REPORT",
      },
      quizId
    );
    setIsReportModalOpen(false);
  };

  const renderDropdownMenu = () => (
    <div className="dropdown-menu">
      <div className="dropdown-link" onClick={() => setIsReportModalOpen(true)}>
        🚨신고하기
      </div>
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
      <div className="like-pin-container">
        <button onClick={handleStarred} className="like-pin-button">
          {starred ? "★" : "☆"}
        </button>
        <button onClick={handleLiked} className="like-pin-button">
          {liked ? "👍" : "✊"}
        </button>
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

      {/* 신고 모달 */}
      <Modal
        isOpen={isReportModalOpen}
        onRequestClose={() => setIsReportModalOpen(false)}
        contentLabel="신고하기"
        className="report-modal"
        overlayClassName="modal-overlay" /* 배경 어둡게 */
      >
        <h2>🚨 신고하기</h2>
        <div className="report-options">
          <label>
            <input
              type="radio"
              value="부적절한 콘텐츠"
              checked={reportReason === "부적절한 콘텐츠"}
              onChange={(e) => setReportReason(e.target.value)}
            />
            부적절한 콘텐츠
          </label>
          <label>
            <input
              type="radio"
              value="저작권 침해"
              checked={reportReason === "저작권 침해"}
              onChange={(e) => setReportReason(e.target.value)}
            />
            저작권 침해
          </label>
          <label>
            <input
              type="radio"
              value="사기성 정보"
              checked={reportReason === "사기성 정보"}
              onChange={(e) => setReportReason(e.target.value)}
            />
            사기성 정보
          </label>
          <label>
            <input
              type="radio"
              value="음란물 및 부적절한 내용"
              checked={reportReason === "음란물 및 부적절한 내용"}
              onChange={(e) => setReportReason(e.target.value)}
            />
            음란물 및 부적절한 내용
          </label>
          <label>
            <input
              type="radio"
              value="기타"
              checked={reportReason === "기타"}
              onChange={(e) => setReportReason(e.target.value)}
            />
            기타
          </label>
          {reportReason === "기타" && (
            <textarea
              placeholder="기타 신고 사유를 입력하세요"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="custom-reason-input"
            />
          )}
        </div>
        <button onClick={handleReportSubmit} className="report-submit-button">
          신고 제출
        </button>
      </Modal>
    </div>
  );
};
