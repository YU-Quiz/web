import React, { useState } from 'react';
import "../../../styles/admin/UsersInfoList.scss";
import UserItem from './UserItem';

const UsersInfoList = ({ users }) => {
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
    <div className="users-info-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Nickname</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem 
              key={user.id} 
              user={user} 
              isDropdownOpen={openDropdownId === user.id} // Pass the open status
              toggleDropdown={() => toggleDropdown(user.id)} // Pass toggle function
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersInfoList;
