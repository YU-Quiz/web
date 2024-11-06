import React, { useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import "../../../styles/admin/UserItem.scss";

const UserItem = ({ user, isDropdownOpen, toggleDropdown, onSuspend, onBan }) => {
  const { username, id, nickname, email, createdAt, isSuspended } = user;

  const handleSuspendClick = () => {
    onSuspend(isSuspended, id)

    toggleDropdown();
  };

  const handleBanClick = () => {
    onBan(id);
    toggleDropdown();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown(); // 드롭다운 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
              <button onClick={handleSuspendClick} className="dropdown-item">
                {isSuspended ? "회원 정지 해제" : "회원 정지"}
              </button>
              <button onClick={handleBanClick} className="dropdown-item">회원 탈퇴</button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserItem;
