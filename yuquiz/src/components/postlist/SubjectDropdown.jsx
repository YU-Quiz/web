import React from 'react';
import '../../styles/post_list_page/SubjectDropdown.scss';

const SubjectDropdown = ({ categories, onSelectCategory }) => {
  const handleChange = (event) => {
    onSelectCategory(event.target.value);
  };

  return (
    <div className="category-dropdown-container">
      <select onChange={handleChange} className="category-dropdown">
        <option value={''}>전체</option>
        {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
      </select>
    </div>
  );
};

export default SubjectDropdown;
