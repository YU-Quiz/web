import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarListItem = styled.li`
  margin-bottom: 20px;
  cursor: pointer;
`;

const GoHomeLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarListItem>
          <Link to="/admin/users-control" style={{ color: "white", textDecoration: "none" }}>회원 관리</Link>
        </SidebarListItem>
        <SidebarListItem>
          <Link to="/admin/posts-control" style={{ color: "white", textDecoration: "none" }}>게시글 관리</Link>
        </SidebarListItem>
        <SidebarListItem>
          <Link to="/admin/quizzes-control" style={{ color: "white", textDecoration: "none" }}>퀴즈 관리</Link>
        </SidebarListItem>
        <SidebarListItem>
          <Link to="/admin/reports-control" style={{ color: "white", textDecoration: "none" }}>오류 신고 관리</Link>
        </SidebarListItem>
      </SidebarList>
      <GoHomeLink to="/"><FaSignOutAlt />  나가기</GoHomeLink>
    </SidebarContainer>
  );
};

export default AdminSidebar;
