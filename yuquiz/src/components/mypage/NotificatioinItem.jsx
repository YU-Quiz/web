import React from "react";
import styled from "styled-components";

const NotificationItem = ({ notification, onMarkAsRead }) => {
  return (
    <ItemContainer>
      <p>
        <strong>{notification.title}</strong>
      </p>
      <p>{notification.message}</p>
      <p>
        <a href={notification.redirectUrl} target="_blank" rel="noopener noreferrer">
          자세히 보기
        </a>
      </p>
      <p style={{ fontSize: "12px", color: "gray" }}>
        {new Date(notification.createdAt).toLocaleString()}
      </p>
      {!notification.isChecked && (
        <MarkAsReadButton onClick={() => onMarkAsRead(notification.id)}>
          읽음 처리
        </MarkAsReadButton>
      )}
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
`;

const MarkAsReadButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
