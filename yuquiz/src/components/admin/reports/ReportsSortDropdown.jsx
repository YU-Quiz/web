import React from "react";
import "../../../styles/post_list_page/CategoryDropdown.scss";
import { REPORT_SORT_OPTIONS } from "../../../constants/admin/reportSortOption";

const ReportsSortDropdown = ({ onSelectSortOption }) => {
  const handleChange = (e) => {
    onSelectSortOption(e.target.value);
  };

  return (
    <div className="category-dropdown-container">
      <select onChange={handleChange} className="category-dropdown">
        <option value={""}>정렬 기준</option>
        {Object.keys(REPORT_SORT_OPTIONS).map((value) => (
            <option key={value} value={value}>
              {REPORT_SORT_OPTIONS[value]?.label || "정렬 기준 불러오기 실패"}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ReportsSortDropdown;
