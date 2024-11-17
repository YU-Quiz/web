import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { showStudy } from '../../services/study/studyService';

// Loader Function
export async function studyDetailsLoader({ params }) {
  const { studyId } = params;
  const studyDetails = await showStudy(studyId);
  return studyDetails;
}

const StudyDetailsPage = () => {
  const study = useLoaderData();
  console.log(study);

  const handleJoinStudy = () => {
    alert("스터디에 참여 요청이 전송되었습니다.");
  };

  const handleAcceptMember = (memberId) => {
    alert(`스터디 가입 승인 요청이 전송되었습니다. (Member ID: ${memberId})`);
  };

  const handleRemoveMember = (memberId) => {
    alert(`스터디원 제거 요청이 전송되었습니다. (Member ID: ${memberId})`);
  };

  const handleGoToChat = () => {
    alert("채팅방으로 이동합니다.");
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
            <Button onClick={handleGoToChat} secondary>
              채팅방으로 이동
            </Button>
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
          {/* <MemberList>
            {study.members.map((member) => (
              <MemberItem key={member.id}>
                <span>{member.name}</span>
                {study.role === 'LEADER' && (
                  <LeaderActions>
                    <ActionButton
                      onClick={() => handleAcceptMember(member.id)}
                    >
                      가입 승인
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleRemoveMember(member.id)}
                      danger
                    >
                      제거
                    </ActionButton>
                  </LeaderActions>
                )}
              </MemberItem>
            ))}
          </MemberList> */}
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
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MemberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const LeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 8px 14px;
  font-size: 12px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.danger ? '#e74c3c' : '#2ecc71')};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.danger ? '#c0392b' : '#27ae60'};
  }
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

