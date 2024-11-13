import React from 'react';
import styled from 'styled-components';
import { PostListTitles, QuizListTitles } from '../../constants/mypage/LIstTitles';
import { PINNED_QUIZ_SORT_OPTIONS, POST_SORT_OPTIONS, QUIZ_SORT_OPTIONS } from '../../constants/mypage/ModalListOptions';

const DetailSortDropdown = ({ onSelectSortOption, title }) => {
  let SORT_OPTIONS;

  // Determine the sorting options based on the title
  switch (title) {
    case PostListTitles.MY_POST_LIST:
    case PostListTitles.MY_LIKED_LIST:
      SORT_OPTIONS = POST_SORT_OPTIONS;
      break;
    case QuizListTitles.MY_QUIZ_LIST:
      SORT_OPTIONS = POST_SORT_OPTIONS;  // Created quiz list
      break;
    case QuizListTitles.MY_PINNED_LIST:
      SORT_OPTIONS = PINNED_QUIZ_SORT_OPTIONS;
      break;
    case QuizListTitles.MY_LIKED_LIST:
      SORT_OPTIONS = QUIZ_SORT_OPTIONS;  // Liked quiz list
      break;
    case QuizListTitles.MY_CORRECT_LIST:
    case QuizListTitles.MY_INCORRECT_LIST:
    default:
      SORT_OPTIONS = {};  // Default to empty options
  }

  const handleChange = (e) => {
    onSelectSortOption(e.target.value);
  };

  return (
    <DropdownContainer>
      <StyledSelect onChange={handleChange}>
        <option value="">정렬</option>
        {Object.keys(SORT_OPTIONS).map((key) => (
          <option key={key} value={key}>
            {SORT_OPTIONS[key]}
          </option>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default DetailSortDropdown;

// Styled Components
const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
