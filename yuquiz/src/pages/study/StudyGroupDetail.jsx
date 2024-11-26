import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
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

  return {
    study: studyDetails,
  };
}

const StudyDetailsPage = () => {
  const { study } = useLoaderData();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [joinRequests, setJoinRequests] = useState([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [requestError, setRequestError] = useState(null);
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [membersError, setMembersError] = useState(null);

  useEffect(() => {
    if (study.isMember) {
      const fetchMembers = async () => {
        setLoadingMembers(true);
        setMembersError(null);
        try {
          const membersList = await getStudyMembers(study.id);
          setMembers(membersList);
        } catch (error) {
          console.error('스터디 멤버 조회 중 오류 발생:', error);
          setMembersError(error.message || '스터디 멤버를 불러오지 못했습니다.');
        } finally {
          setLoadingMembers(false);
        }
      };
      fetchMembers();
    }
  }, [study.isMember, study.id]);

  const handleJoinStudy = async () => {
    try {
      await requestStudy(study.id);
      alert('신청되었습니다!');
    } catch (error) {
      console.error('스터디 신청 중 오류 발생:', error);
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
      console.error('가입 신청 목록을 불러오는 중 오류 발생:', error);
      setRequestError(error.message);
      setIsLoadingRequests(false);
    }
  };

  const handleEditStudy = () => {
    navigate('edit');
  };

  const handleDeleteStudy = async () => {
    const confirmDelete = window.confirm('스터디를 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await removeStudy(study.id);
        alert(response.message);
        navigate('/study');
      } catch (error) {
        console.error('스터디 삭제 중 오류 발생:', error);
        alert(error.message);
      }
    }
  };

  const handleGoToChat = () => {
    navigate(`chat/${study.chatRoomId}`);
  };

  const handleRemoveMember = async (userId) => {
    const confirmDelete = window.confirm('멤버를 추방하시겠습니까?');
    if (confirmDelete) {
      try {
        await removeMember(study.id, userId);
        alert('스터디원이 삭제되었습니다.');
        setMembers((prev) => prev.filter((member) => member.id !== userId));
      } catch (error) {
        console.error('스터디원 삭제 중 오류 발생:', error);
        alert(error.message || '스터디원 삭제에 실패했습니다.');
      }
      window.location.reload();
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
      // 가입 요청 승인 API 호출
      await acceptStudyRequest(study.id, userId);
      alert('가입 요청이 승인되었습니다.');
  
      // 가입 요청 목록에서 해당 사용자를 찾음
      const newMemberRequest = joinRequests.find((request) => request.userId === userId);
  
      if (!newMemberRequest) {
        throw new Error('가입 요청 정보를 찾을 수 없습니다.');
      }
  
      // 새로운 멤버 정보로 추가
      const newMember = {
        id: newMemberRequest.userId,
        nickname: newMemberRequest.name,
        joinedAt: new Date().toISOString(), // 현재 시간 추가 (예시)
      };
  
      // 멤버 목록 업데이트
      setMembers((prevMembers) => [...prevMembers, newMember]);
  
      // 가입 요청 목록 업데이트
      setJoinRequests((prev) => prev.filter((request) => request.userId !== userId));
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
          {!study.isMember && <Button onClick={handleJoinStudy}>스터디 참가 신청</Button>}
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
        <DescriptionText>{study.description || '스터디 설명이 없습니다.'}</DescriptionText>
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
        <>
          <NavigationSection>
            <StyledLink to={`/study/${study.id}/notices`}>공지사항</StyledLink>
            <StyledLink to={`/study/${study.id}/posts`}>스터디 게시판</StyledLink>
            <StyledLink to={`/study/${study.id}/quizseries`}>스터디 퀴즈</StyledLink>
          </NavigationSection>
          <MemberSection>
            <SectionTitle>스터디원 목록</SectionTitle>
            {loadingMembers ? (
              <LoadingMessage>스터디원 목록을 불러오는 중...</LoadingMessage>
            ) : membersError ? (
              <ErrorMessage>{membersError}</ErrorMessage>
            ) : (
              <MemberList members={members} role={study.role} onRemoveMember={handleRemoveMember} />
            )}
          </MemberSection>
        </>
      )}

      <JoinRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        requests={joinRequests}
        isLoading={isLoadingRequests}
        error={requestError}
        onAccept={handleAcceptRequest}
      />
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
  background-color: ${(props) => (props.danger ? '#e74c3c' : '#3498db')};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.danger ? '#c0392b' : '#2980b9')};
  }
`;

const DescriptionSection = styled.div`
  margin: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
`;

const DescriptionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #2c3e50;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #34495e;
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
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
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
`;

const BlurredContent = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #ffffff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }
`;

const NonMemberMessage = styled.div`
  position: relative;
  z-index: 2;
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
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #7f8c8d;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #e74c3c;
`;

const NavigationSection = styled.div`
  display: flex;
  /* justify-content: space-around; */
  margin: 20px 20px;
`;

const StyledLink = styled(Link)`
  flex: 1;
  padding: 10px 20px;
  background-color: #6cb0dd;
  color: white;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #003d80;
  }
`;