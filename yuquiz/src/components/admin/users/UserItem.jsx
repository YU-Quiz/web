import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import "../../../styles/admin/UserItem.scss";

const UserItem = ({ user, isDropdownOpen, toggleDropdown, onSuspend, onBan }) => {
  const { username, id, nickname, email, createdAt } = user;

  const handleSuspendClick = () => {
    onSuspend(id); // Call the parent handler with the user ID
    toggleDropdown();
  };

  const handleBanClick = () => {
    onBan(id); // Call the parent handler with the user ID
    toggleDropdown();
  };

  return (
    <>
      <tr className="user-item">
        <td>{id}</td>
        <td>{username}</td>
        <td>{nickname}</td>
        <td>{email}</td>
        <td>{new Date(createdAt).toLocaleString()}</td>
        <td className="dropdown-cell">
          <FaEllipsisV className="dropdown-icon" onClick={toggleDropdown} />

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleSuspendClick} className="dropdown-item">회원 정지</button>
              <button onClick={handleBanClick} className="dropdown-item">회원 탈퇴</button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserItem;
