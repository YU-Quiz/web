
import React from 'react';
import '../../styles/quiz_list_page/SubjectDropdown.scss';

const SubjectDropdown = ({ subjects, onSelectSubject }) => {
  const handleChange = (event) => {
    onSelectSubject(event.target.value);
  };

  return (
    <div className="subject-dropdown-container">
      <select onChange={handleChange} className="subject-dropdown">
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectDropdown;
