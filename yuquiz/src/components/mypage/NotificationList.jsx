import React from "react";
import styled from "styled-components";
import NotificationItem from "./NotificatioinItem";
// import NotificationItem from "./NotificationItem";

const NotificationList = ({ notifications, onMarkAsRead }) => {
  return (
    <ListContainer>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </ListContainer>
  );
};

export default NotificationList;

// Styled Components
const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;
