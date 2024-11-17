import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeStudy, showStudy } from '../../services/study/studyService';
import { getStudyMembers } from '../../services/study/studyGroupService';
import MemberList from '../../components/study/MemberList';

// Loader Function
export async function studyDetailsLoader({ params }) {
  const { studyId } = params;
  const studyDetails = await showStudy(studyId);
  return studyDetails;
}

const StudyDetailsPage = () => {
  const study = useLoaderData();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [memberError, setMemberError] = useState(null);

  console.log(study);

  useEffect(() => {
    const fetchStudyMembers = async () => {
      try {
        const memberList = await getStudyMembers(study.id);
        setMembers(memberList);
        setIsLoadingMembers(false);
      } catch (error) {
        console.error('스터디원 목록을 불러오는 중 오류 발생:', error);
        setMemberError(error.message);
        setIsLoadingMembers(false);
      }
    };

    if (study.isMember) {
      fetchStudyMembers();
    }
  }, [study.id, study.isMember]);

  const handleJoinStudy = () => {
    alert("스터디에 참여 요청이 전송되었습니다.");
  };

  const handleEditStudy = () => {
    navigate('edit');
  };

  const handleDeleteStudy = async () => {
    const confirmDelete = window.confirm("스터디를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await removeStudy(study.id); // study.id를 삭제 API에 전달
        alert(response.message); // 성공 메시지 표시
        navigate("/study"); // 스터디 목록 페이지로 이동
      } catch (error) {
        console.error("스터디 삭제 중 오류 발생:", error);
        alert(error.message); // 오류 메시지 표시
      }
    }
  };

  const handleGoToChat = () => {
    alert("채팅방으로 이동합니다.");
  };

  const handleRemoveMember = async (userId) => {
    try {
      // await (study.id, userId); // study.id와 userId 전달
      alert('스터디원이 삭제되었습니다.');
      // 멤버 리스트 새로고침 로직 추가 필요
    } catch (error) {
      console.error('스터디원 삭제 중 오류 발생:', error);
      alert(error.message || '스터디원 삭제에 실패했습니다.');
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
          {isLoadingMembers ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : memberError ? (
            <ErrorMessage>{memberError}</ErrorMessage>
          ) : (
            <MemberList
              members={members}
              role={study.role}
              onRemoveMember={handleRemoveMember}
            />
          )}
        </MemberSection>
      )}
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