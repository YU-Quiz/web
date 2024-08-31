import React from 'react';
import '../../styles/post_list_page/SubjectDropdown.scss';

const SubjectDropdown = ({ category, onSelectCategory }) => {
  const handleChange = (event) => {
    onSelectCategory(event.target.value);
  };

  return (
    <div className="category-dropdown-container">
      <select onChange={handleChange} className="category-dropdown">
        {category.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectDropdown;
