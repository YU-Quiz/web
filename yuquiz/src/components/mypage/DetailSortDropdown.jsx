import React from 'react';
import '../../styles/post_list_page/CategoryDropdown.scss';

const SORT_OPTIONS = {
    LIKE_DESC: "LIKE_DESC",
    LIKE_ASC: "LIKE_ASC",
    VIEW_DESC: "VIEW_DESC",
    VIEW_ASC: "VIEW_ASC",
    DATE_DESC: "DATE_DESC",
    DATE_ASC: "DATE_ASC",
    LIKED_DATE_DESC: "LIKED_DATE_DESC",
    LIKED_DATE_ASC: "LIKED_DATE_ASC",
    QUIZ_DATE_DESC: "QUIZ_DATE_DESC",
    QUIZ_DATE_ASC: "QUIZ_DATE_ASC",
  };

const SortDropdown = ({ onSelectSortOption }) => {

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

export default SortDropdown;
