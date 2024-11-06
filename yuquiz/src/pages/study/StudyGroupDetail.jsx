import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/study/StudyGroupDetail.scss";

const StudyGroupDetail = () => {
  const { groupId } = useParams();
  const [error, setError] = useState(null);

  const handleCreateNotice = () => {
    alert("스터디 공지가 생성되었습니다.");
  };

  const handleDeleteNotice = () => {
    alert("스터디 공지가 삭제되었습니다.");
  };

  const handleEditStudy = () => {
    alert("스터디 정보가 수정되었습니다.");
  };

  const handleDeleteStudy = () => {
    alert("스터디가 삭제되었습니다.");
  };

  const handleJoinStudy = () => {
    alert("스터디에 가입되었습니다.");
  };

  const handleViewMembers = () => {
    alert("스터디 구성원 목록을 조회합니다.");
  };

  const handleDeleteMember = () => {
    alert("스터디 구성원이 삭제되었습니다.");
  };

  const handleViewRequests = () => {
    alert("가입 요청 목록을 조회합니다.");
  };

  const handleViewSeriesList = () => {
    alert("스터디 전용 문제집 목록을 조회합니다.");
  };

  return (
    <div>
      <div className="study-group-detail-page">
        <h2>알고리즘 스터디</h2>

        <div className="study-group-menu">
          <button onClick={handleCreateNotice}>공지 생성</button>
          <button onClick={handleDeleteNotice}>공지 삭제</button>
          <button onClick={handleEditStudy}>스터디 수정</button>
          <button onClick={handleDeleteStudy}>스터디 삭제</button>
          <button onClick={handleViewMembers}>스터디 구성원 보기</button>
          <button onClick={handleDeleteMember}>스터디 구성원 삭제</button>
          <button onClick={handleViewRequests}>가입 요청 목록 보기</button>
          <button onClick={handleViewRequests}>스터디 채팅방 입장</button>
          <button onClick={handleViewSeriesList}>
            스터디 전용 문제집 목록
          </button>
        </div>
        <h3>환영합니다~ 저희 스터디에 오신걸 환영합니다.</h3>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default StudyGroupDetail;
