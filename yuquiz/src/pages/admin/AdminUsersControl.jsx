import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  forceDeleteUser,
  getUsersInfo,
  suspendUser,
} from "../../services/admin/adminService";
import UsersInfoList from "../../components/admin/users/UsersInfoList";
import Dropdown from "../../components/UI/Dropdown";
import { USER_SORT_OPTIONS } from "../../constants/admin/userSortOption";

const AdminUsersControl = () => {
  const [sortOption, setSortOption] = useState("DATE_DESC");
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersInfo = await getUsersInfo(sortOption, currentPage);
        setUsersList(usersInfo.content);
        setTotalPages(usersInfo.totalPages);
      } catch (error) {
        console.error("회원 목록 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchUsers();
  }, [currentPage, sortOption]);

  const handleSelectSort = (sortOption) => {
    setSortOption(sortOption.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    //console.log("pagenumber", pageNumber);
  };

  const handleSuspend = async (isSuspended, userId) => {
    try {
      if (isSuspended) {
        await suspendUser("UNSUSPEND", userId);
        alert("회원 정지를 해제하였습니다.");
      } else {
        await suspendUser("SUSPEND", userId);
        alert("회원이 정지되었습니다.");
      }
      window.location.reload();
    } catch (error) {
      console.error("정지 중 오류 발생:", error);
      alert("회원 정지에 실패했습니다.");
    }
  };

  const handleBan = async (userId) => {
    try {
      await forceDeleteUser(userId);
      alert("회원이 추방되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("추방 중 오류 발생:", error);
      alert("회원 추방에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>회원 관리</Title>
        <Dropdown
          options={Object.values(USER_SORT_OPTIONS)}
          onSelect={handleSelectSort}
          defaultOption={USER_SORT_OPTIONS.DATE_DESC}
        />
      </Header>

      <TableContainer>
        <UsersInfoList
          users={usersList}
          onSuspend={handleSuspend}
          onBan={handleBan}
        />
      </TableContainer>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            className={index === currentPage ? "active" : ""}
            onClick={() => handlePageChange(index)}
            disabled={index === currentPage}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default AdminUsersControl;

// Styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TableContainer = styled.div`
  flex: 1; /* Fills remaining vertical space */
  min-height: 0; /* Ensures flexbox works correctly for overflow */
  overflow-y: auto;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  background-color: #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &.active {
    background-color: #86c232;
    color: white;
    font-weight: bold;
  }

  &:hover:not(.active) {
    background-color: #cfcfcf;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f0f0f0;
  }
`;
