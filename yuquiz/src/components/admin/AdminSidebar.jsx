import React from "react";
import "../../styles/admin/AdminSidebar.scss";

const AdminSidebar = () => {
    return (
      <div className="admin-sidebar">
        <ul>
          <li>회원 관리</li>
          <li>게시글 관리</li>
          <li>퀴즈 관리</li>
          <li>오류 신고 관리</li>
          <li>기타 관리</li>
        </ul>
      </div>
    );
  };

  export default AdminSidebar;