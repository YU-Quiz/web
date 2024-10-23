import React from "react";
import "../../styles/admin/AdminSidebar.scss";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
      <div className="admin-sidebar">
        <ul>
          <li><Link to='/admin/users-control'>회원 관리</Link></li>
          <li><Link to='/admin/posts-control'>게시글 관리</Link></li>
          <li><Link to='/admin/quizzes-control'>퀴즈 관리</Link></li>
          <li><Link to='/admin/reports-control'>오류 신고 관리</Link></li>
          <li><Link to='/admin/others'>기타 관리</Link></li>
        </ul>

        <Link to='/' className="gohome">나가기</Link>
      </div>
    );
  };

  export default AdminSidebar;