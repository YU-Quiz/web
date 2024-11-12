import React from 'react';
import '../../styles/post_list_page/CategoryDropdown.scss';

const SORT_OPTIONS = {
  LIKE_DESC: "좋아요 많은 순",
  LIKE_ASC: "좋아요 적은 순",
  VIEW_DESC: "조회수 많은 순",
  VIEW_ASC: "조회수 적은 순",
  DATE_DESC: "최신순",
  DATE_ASC: "오래된 순",
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
