import React, { useState, useEffect } from 'react';
import "../../styles/admin/AdminUsersControl.scss"; // 스타일은 따로 관리
import { useLoaderData } from 'react-router-dom';

export async function MyPageLoader() {
    const [
        usersInfo
    ] = await Promise.all([

    ]);
  
    return {
        usersInfo
    };
}

const AdminUsersControl = () => {
  const data = useLoaderData();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // 회원 강제 정지 함수
  const handleSuspendUser = async (userId) => {
  };

  // 회원 강제 탈퇴 함수
  const handleDeleteUser = async (userId) => {
  };

  return (
    <div className="admin-users-control">
      <h2>회원 관리</h2>
      <div className="user-list">
        <h3>전체 회원 조회</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <span>{user.name} (ID: {user.id})</span>
              <button onClick={() => setSelectedUser(user)}>관리</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="user-actions">
          <h3>{selectedUser.name} 회원 관리</h3>
          <button onClick={() => handleSuspendUser(selectedUser.id)}>회원 강제 정지</button>
          <button onClick={() => handleDeleteUser(selectedUser.id)}>회원 강제 탈퇴</button>
          <button onClick={() => setSelectedUser(null)}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default AdminUsersControl;
