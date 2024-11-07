import React from "react";
import "../../../styles/post_list_page/CategoryDropdown.scss";
import { POST_SORT_OPTIONS } from "../../../constants/admin/postSortOption";

const PostsSortDropdown = ({ onSelectSortOption }) => {
  const handleChange = (e) => {
    onSelectSortOption(e.target.value);
  };

  return (
    <div className="category-dropdown-container">
      <select onChange={handleChange} className="category-dropdown">
        <option value={""}>정렬 기준</option>
        {Object.keys(POST_SORT_OPTIONS).map((value) => (
          <option value={value}>
            {POST_SORT_OPTIONS[value]?.label || "정렬 기준 불러오기 실패"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PostsSortDropdown;
