import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useAuthStore from "../../stores/auth/authStore";
import { CgProfile } from "react-icons/cg";
import { getNotifications } from "../../services/notification/notificationService";

const ProfileCard = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { accessToken } = useAuthStore();

  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  // // SSE 구독
  // useEffect(() => {
  //   const eventSource = new EventSourcePolyfill("http://localhost:8080/api/v1/subscribe", {
  //     headers: {
  //       Authorization: `${accessToken}`, // JWT 토큰 포함
  //       Accept: "text/event-stream",
  //     },
  //   });

  //   eventSource.onmessage = (event) => {
  //     try {
  //       // const isJson = event.data.startsWith("{") && event.data.endsWith("}");
  //       // if (isJson) {
  //       //   // const parsedData = JSON.parse(event.data);
  //       //   // console.log("New notification received:", parsedData);

  //       //   // 새로운 알림이 오면 카운트를 증가시킴

  //       // } else {
  //       //   // console.warn("Non-JSON message received:", event.data);
  //       // }
  //       setUnreadNotificationCount((prevCount) => prevCount + 1);
  //     } catch (error) {
  //       // console.error("Failed to parse notification:", error);
  //     }
  //   };

  //   eventSource.onerror = (error) => {
  //     // console.error("SSE connection error:", error);
  //   };

  //   return () => {
  //     eventSource.close(); // 컴포넌트 언마운트 시 연결 닫기
  //   };
  // }, [accessToken]);

  // 초기 알림 데이터 가져오기
  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const data = await getNotifications(0, "DATE_DESC", "UNCHECKED");
        setUnreadNotificationCount(data.totalElements);
      } catch (err) {
        // console.error("Failed to fetch unread notifications:", err);
      }
    };

    if (accessToken) {
      fetchUnreadNotifications();
    }
  }, [accessToken]);

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
            <MessageIcon
              to={"/my/notification"}
              unread={unreadNotificationCount > 0}
            >
              💬
              {unreadNotificationCount > 0 && (
                <NotificationBadge>{unreadNotificationCount}</NotificationBadge>
              )}
            </MessageIcon>
            <SettingsIcon to={"/my/edit"}>⚙️</SettingsIcon>
          </IconsContainer>
          {isAuthenticated && userInfo.role === "ADMIN" && (
            <AdminIcon to={"/admin"}>관리자페이지</AdminIcon>
          )}
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

const ProfilePicture = styled(CgProfile)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ unread }) => (unread ? "#ff4500" : "#000")};
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4500;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const SettingsIcon = styled(Link)`
  cursor: pointer;
`;

const AdminIcon = styled(Link)`
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
