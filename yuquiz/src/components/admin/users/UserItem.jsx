import React, { useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import styled from "styled-components";

const UserItem = ({
  user,
  isDropdownOpen,
  toggleDropdown,
  onSuspend,
  onBan,
}) => {
  const { username, id, nickname, email, createdAt, isSuspended } = user;
  const dropdownRef = useRef(null);

  const handleSuspendClick = () => {
    onSuspend(isSuspended, id);
    toggleDropdown();
  };

  const handleBanClick = () => {
    onBan(id);
    toggleDropdown();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown(); // Close dropdown when clicking outside
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
    <StyledTableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{nickname}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
      <DropdownCell ref={dropdownRef}>
        <DropdownIcon onClick={toggleDropdown} />
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem onClick={handleSuspendClick}>
              {isSuspended ? "회원 정지 해제" : "회원 정지"}
            </DropdownItem>
            <DropdownItem onClick={handleBanClick}>회원 탈퇴</DropdownItem>
          </DropdownMenu>
        )}
      </DropdownCell>
    </StyledTableRow>
  );
};

export default UserItem;

// Styled-components for the component
const StyledTableRow = styled.tr`
  td {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
    color: #333;
  }
`;

const TableCell = styled.td``;

const DropdownCell = styled.td`
  position: relative;
  text-align: center;
`;

const DropdownIcon = styled(FaEllipsisV)`
  cursor: pointer;
  font-size: 1.2rem;
  color: #333;

  &:hover {
    color: #555;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 5px 0;
  width: 120px;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 8px 10px;
  background-color: white;
  border: none;
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #f1f1f1;
  }

  &.btn-suspend {
    color: #f39c12; // Orange for suspend
  }

  &.btn-ban {
    color: #e74c3c; // Red for ban
  }
`;
