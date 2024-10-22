import React from 'react';
import '../../../styles/post_list_page/CategoryDropdown.scss';

const SORT_OPTIONS = {
    NICK_DESC: "NICK_DESC",
    NICK_ASC: "NICK_ASC",
    MAIL_DESC: "MAIL_DESC",
    MAIL_ASC: "MAIL_ASC",
    BAN_DESC: "BAN_DESC",
    BAN_ASC: "BAN_ASC",
    ROLE_DESC: "ROLE_DESC",
    ROLE_ASC: "ROLE_ASC",
    DATE_DESC: "DATE_DESC",
    DATE_ASC: "DATE_ASC"
};

const UsersSortDropdown = ({ onSelectSortOption }) => {

  const handleChange = (e) => {
    onSelectSortOption(e.target.value);
  };

  return (
    <div className="category-dropdown-container">
      <select onChange={handleChange} className="category-dropdown">
        <option value={''}>정렬</option>
        {Object.keys(SORT_OPTIONS).map((key) => (
          <option key={key} value={key}>
            {SORT_OPTIONS[key]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UsersSortDropdown;
