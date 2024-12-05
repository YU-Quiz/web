import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const handleMarkAsReadAndRedirect = async () => {
    try {
      await onMarkAsRead(notification.id); // 읽음 처리
      window.location.href = notification.redirectUrl; // URL로 이동
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      toast.error("알림 읽음 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <ItemContainer>
      <Header>
        <Title>{notification.title}</Title>
        <Timestamp>
          {new Date(notification.createdAt).toLocaleString()}
        </Timestamp>
      </Header>
      <Message>{notification.message}</Message>
      <Footer>
        <DetailButton onClick={handleMarkAsReadAndRedirect}>
          자세히 보기
        </DetailButton>
      </Footer>
    </ItemContainer>
  );
};

export default NotificationItem;

// Styled Components
const ItemContainer = styled.li`
  margin-bottom: 15px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
`;

const Message = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
    text-decoration: none;
  }
`;
