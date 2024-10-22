import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import "../../../styles/admin/UserItem.scss";

const UserItem = ({ user, isDropdownOpen, toggleDropdown }) => {
  const { username, id, nickname, email, createdAt } = user;

  const handleSuspend = () => {
    console.log(`${username} has been suspended.`);
    toggleDropdown(); // Close the dropdown after action
  };

  const handleBan = () => {
    console.log(`${username} has been banned.`);
    toggleDropdown(); // Close the dropdown after action
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
              <button onClick={handleSuspend} className="dropdown-item">회원 정지</button>
              <button onClick={handleBan} className="dropdown-item">회원 탈퇴</button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserItem;
