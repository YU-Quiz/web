import React, { useState } from 'react';
import styled from 'styled-components';
import UserItem from './UserItem';

const UsersInfoList = ({ users, onSuspend, onBan }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null); // State to track the open dropdown by user ID

  // Function to handle dropdown toggle
  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null); // Close the dropdown if clicked again
    } else {
      setOpenDropdownId(id); // Set the clicked dropdown to open
    }
  };

  return (
    <ListContainer>
      <StyledTable>
        <thead>
          <HeaderRow>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Username</HeaderCell>
            <HeaderCell>Nickname</HeaderCell>
            <HeaderCell>Email</HeaderCell>
            <HeaderCell>Created At</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isDropdownOpen={openDropdownId === user.id} // Pass the open status
              toggleDropdown={() => toggleDropdown(user.id)} // Pass toggle function
              onSuspend={onSuspend}
              onBan={onBan}
            />
          ))}
        </tbody>
      </StyledTable>
    </ListContainer>
  );
};

export default UsersInfoList;

// Styled-components for UsersInfoList
const ListContainer = styled.div`
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const HeaderRow = styled.tr`
  background-color: #86c232;
  color: white;
`;

const HeaderCell = styled.th`
  padding: 10px;
  /* border-bottom: 2px solid #2e7d32; */
  text-align: left;
  font-weight: bold;
`;