import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useAuthStore from "../../stores/auth/authStore";

const ProfileCard = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !userInfo || !userInfo.nickname) {
    return <Loading>Loading...</Loading>;
  }

  const displayUsername =
    userInfo.username.length > 10
      ? `${userInfo.username.slice(0, 10)}...`
      : userInfo.username;

  return (
    <ProfileContainer>
      <ProfilePicture />
      <UserInfoContainer>
        <UserInfo>
          <Nickname>{userInfo.nickname}</Nickname>
          <UserId>{`ID: ${displayUsername}`}</UserId>
          <IconsContainer>
            <MessageIcon to={'/my/edit'}>💬</MessageIcon>
            <SettingsIcon to={'/my/edit'}>⚙️</SettingsIcon>
        </IconsContainer>
        </UserInfo>
      </UserInfoContainer>
      
      <ProfileStats>
        <Stat>100 Quizzes</Stat>
        <Stat>50 Badges</Stat>
        <Stat>1000 Points</Stat>
      </ProfileStats>
    </ProfileContainer>
  );
};

export default ProfileCard;

// Styled Components
const ProfileContainer = styled.div`
  width: 100%;
  color: #333;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ProfilePicture = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #ddd;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const Nickname = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;

const UserId = styled.p`
  font-size: 0.875rem;
  color: #e0e0e0;
  margin: 0;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1.5rem;
`;

const MessageIcon = styled(Link)`
  cursor: pointer;
`;

const SettingsIcon = styled(Link)`
  cursor: pointer;
`;

const ProfileStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.875rem;
`;

const Stat = styled.p`
  margin: 0;
`;

const Loading = styled.div`
  color: white;
  font-size: 1rem;
`;
