import React from 'react';
import "../../../styles/admin/UsersInfoList.scss";

const UsersInfoList = ({ users }) => {
    // console.log(users);
  return (
    <div className="users-info-list">
      <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div className="user-details">
              <span className="user-name">Username: {user.username} (ID: {user.id})</span>
              <span className="user-nickname">Nickname: {user.nickname}</span>
              <span className="user-email">Email: {user.email}</span>
              <span className="user-created">Created At: {new Date(user.createdAt).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInfoList;
