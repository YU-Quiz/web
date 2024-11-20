import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeStudy, showStudy } from '../../services/study/studyService';
import { getStudyMembers, removeMember } from '../../services/study/studyGroupService';
import { requestStudy, getStudyRequests, acceptStudyRequest } from '../../services/study/studyRequestService';
import MemberList from '../../components/study/MemberList';
import JoinRequestModal from '../../components/study/JoinRequestModal'; // Import the modal

// Loader Function
export async function studyDetailsLoader({ params }) {
  const { studyId } = params;
  const studyDetails = await showStudy(studyId);
  const memberList = await getStudyMembers(studyId);

  return {
    study: studyDetails,
    members: memberList
  };
}

const StudyDetailsPage = () => {
  const {study, members} = useLoaderData();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [joinRequests, setJoinRequests] = useState([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [requestError, setRequestError] = useState(null);
console.log(study);

  const handleJoinStudy = async () => {
    try {
      await requestStudy(study.id);
      alert("신청되었습니다!");
    } catch (error) {
      console.error("스터디 신청 중 오류 발생:", error);
      alert(error.message);
    }
  };

  const handleFetchRequests = async () => {
    setIsLoadingRequests(true);
    setRequestError(null);
    try {
      const requests = await getStudyRequests(study.id);
      setJoinRequests(requests);
      setIsLoadingRequests(false);
    } catch (error) {
      console.error("가입 신청 목록을 불러오는 중 오류 발생:", error);
      setRequestError(error.message);
      setIsLoadingRequests(false);
    }
  };

  const handleEditStudy = () => {
    navigate('edit');
  };

  const handleDeleteStudy = async () => {
    const confirmDelete = window.confirm("스터디를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await removeStudy(study.id);
        alert(response.message);
        navigate("/study");
      } catch (error) {
        console.error("스터디 삭제 중 오류 발생:", error);
        alert(error.message);
      }
    }
  };

  const handleGoToChat = () => {
    navigate(`chat/${study.chatRoomId}`);
  };

  const handleRemoveMember = async (userId) => {
    const confirmDelete = window.confirm("멤버를 추방하시겠습니까?");
    if (confirmDelete) {
      try {
        await removeMember(study.id, userId);
        alert('스터디원이 삭제되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error('스터디원 삭제 중 오류 발생:', error);
        alert(error.message || '스터디원 삭제에 실패했습니다.');
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleFetchRequests();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAcceptRequest = async (userId) => {
    try {
        await acceptStudyRequest(study.id, userId);
        
        alert('가입 요청이 승인되었습니다.');
        // 요청 승인 후 페이지 새로고침
        window.location.reload();
    } catch (error) {
        console.error('가입 요청 승인 중 오류 발생:', error);
        alert(error.message || '가입 요청 승인에 실패했습니다.');
    }
};



  return (
    <DetailsContainer>
      <Header>
        <Title>{study.Name}</Title>
        <ButtonGroup>
          {!study.isMember && (
            <Button onClick={handleJoinStudy}>스터디 참가 신청</Button>
          )}
          {study.isMember && (
            <>
              <Button onClick={handleGoToChat} secondary>
                채팅방으로 이동
              </Button>
              {study.role === 'LEADER' && (
                <>
                  <Button onClick={handleEditStudy}>스터디 수정</Button>
                  <Button onClick={handleDeleteStudy} danger>
                    스터디 삭제
                  </Button>
                  <Button onClick={handleOpenModal}>가입 신청 목록</Button>
                </>
              )}
            </>
          )}
        </ButtonGroup>
      </Header>

      <DescriptionSection>
        <DescriptionTitle>스터디 소개</DescriptionTitle>
        <DescriptionText>{study.description || "스터디 설명이 없습니다."}</DescriptionText>
      </DescriptionSection>

      <InfoSection>
        <InfoItem>
          <InfoLabel>등록 기간:</InfoLabel>
          <InfoValue>{new Date(study.registerDuration).toLocaleString()}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>최대 인원:</InfoLabel>
          <InfoValue>{study.maxUser}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>현재 인원:</InfoLabel>
          <InfoValue>{study.curUser}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>상태:</InfoLabel>
          <InfoValue>{study.state === 'ACTIVE' ? '활성화' : '비활성화'}</InfoValue>
        </InfoItem>
        {study.isMember && (
          <InfoItem>
            <InfoLabel>역할:</InfoLabel>
            <InfoValue>{study.role}</InfoValue>
          </InfoItem>
        )}
      </InfoSection>

      {!study.isMember ? (
        <BlurredContent>
          <NonMemberMessage>
            <MessageBox>
              <MessageText>스터디원만 볼 수 있습니다. 가입하세요!</MessageText>
            </MessageBox>
          </NonMemberMessage>
        </BlurredContent>
      ) : (
        <MemberSection>
          <SectionTitle>스터디원 목록</SectionTitle>
          <MemberList
              members={members}
              role={study.role}
              onRemoveMember={handleRemoveMember}
            />
        </MemberSection>
      )}

      <JoinRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        requests={joinRequests}
        isLoading={isLoadingRequests}
        error={requestError}
        onAccept={handleAcceptRequest}
      />;
    </DetailsContainer>
  );
};

export default StudyDetailsPage;


// Styled Components
const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f8fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin: 20px;
  border-bottom: 2px solid #e0e0e0;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.secondary ? '#95a5a6' : '#3498db')};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.secondary ? '#7f8c8d' : '#2980b9')};
  }
`;

const DescriptionSection = styled.div`
  margin: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const DescriptionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #34495e;
  line-height: 1.6;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #34495e;
`;

const InfoValue = styled.span`
  color: #1abc9c;
  font-weight: bold;
`;

const MemberSection = styled.div`
  margin: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const BlurredContent = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px); /* 흐릿하게 만듦 */
    background: rgba(255, 255, 255, 0.7); /* 살짝 흰 배경 추가 */
    z-index: 1;
  }
`;

const NonMemberMessage = styled.div`
  position: relative;
  z-index: 2; /* 흐린 배경 위에 위치 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const MessageBox = styled.div`
  text-align: center;
`;

const MessageText = styled.p`
  font-size: 18px;
  color: #721c24;
  font-weight: bold;
  margin: 0;
`;

// Styled Components
const MemberRole = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #1abc9c;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #7f8c8d;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #e74c3c;
`;