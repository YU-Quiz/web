import React from "react";
import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import styled from "styled-components";
import NotificationList from "../../components/mypage/NotificationList";
import Dropdown from "../../components/UI/Dropdown";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../services/notification/notificationService";
import {
  NOTIFICATION_SORT_OPTIONS,
  NOTIFICATION_VIEW_OPTIONS,
} from "../../constants/mypage/notificationOption";
import { toast } from "react-toastify";

// Loader 함수
export async function mynotificationLoader({ request }) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("page") || "0", 10);
  const sort = url.searchParams.get("sort") || "DATE_DESC";
  const view = url.searchParams.get("view") || "UNCHECKED";

  const notificationsData = await getNotifications(currentPage, sort, view);

  return {
    notifications: notificationsData.content,
    totalPages: notificationsData.totalPages,
    currentPage: notificationsData.number,
    sort,
    view,
  };
}

// 알림 페이지 컴포넌트
const NotificationPage = () => {
  const { notifications, totalPages, currentPage, sort, view } =
    useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (selectedSort) => {
    updateSearchParams({ sort: selectedSort.value, page: 0 });
  };

  const handleViewChange = (selectedView) => {
    updateSearchParams({ view: selectedView.value, page: 0 });
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead([notificationId]);
      window.location.reload(); // 페이지 새로고침으로 상태 업데이트
    } catch (err) {
      toast.error("알림 읽음 처리 중 문제가 발생했습니다.");
    }
  };

  // 모든 알림 읽음 처리
  const handleMarkAllAsRead = async () => {
    const unreadNotificationIds = notifications
      .filter((notification) => !notification.isChecked)
      .map((notification) => notification.id);

    if (unreadNotificationIds.length === 0) {
      toast.info("읽지 않은 알림이 없습니다.");
      return;
    }

    try {
      await markNotificationAsRead(unreadNotificationIds);
      window.location.reload(); // 페이지 새로고침
    } catch (err) {
      toast.error("모든 알림 읽음 처리 중 문제가 발생했습니다.");
    }
  };

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    if (newParams.page !== undefined) {
      params.set("page", newParams.page);
    }
    if (newParams.sort !== undefined) {
      params.set("sort", newParams.sort);
    }
    if (newParams.view !== undefined) {
      params.set("view", newParams.view);
    }

    setSearchParams(params);
  };

  const currentPageIndex = parseInt(searchParams.get("page") || "0", 10);

  return (
    <NotificationContainer>
      <Header>
        <Title>알림</Title>
        <DropdownContainer>
          <Dropdown
            options={NOTIFICATION_SORT_OPTIONS}
            onSelect={handleSortChange}
            defaultOption={NOTIFICATION_SORT_OPTIONS.find(
              (option) => option.value === sort
            )}
          />
          <Dropdown
            options={NOTIFICATION_VIEW_OPTIONS}
            onSelect={handleViewChange}
            defaultOption={NOTIFICATION_VIEW_OPTIONS.find(
              (option) => option.value === view
            )}
          />
        </DropdownContainer>
        <Actions>
          <MarkAllButton onClick={handleMarkAllAsRead}>
            모두 읽음 처리
          </MarkAllButton>
          <BackLink to="/my">돌아가기</BackLink>
        </Actions>
      </Header>

      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            $isActive={index === currentPageIndex}
            onClick={() => updateSearchParams({ page: index })}
            disabled={index === currentPageIndex}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </NotificationContainer>
  );
};

export default NotificationPage;

// Styled Components
const NotificationContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  flex-shrink: 0;
  margin: 0;
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 1;
  justify-content: flex-start;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const MarkAllButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: ${({ $isActive }) => ($isActive ? "#007bff" : "#f1f1f1")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#000")};

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  &:disabled {
    cursor: default;
    background-color: #007bff;
    color: #fff;
  }
`;
