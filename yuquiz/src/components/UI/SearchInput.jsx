import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
`;

const StyledInput = styled.input`
  flex: 1;
  height: 40px; /* 높이를 명시적으로 설정 */
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
`;

const SearchButton = styled.button`
  height: 40px; /* 입력 필드와 동일한 높이 */
  padding: 0 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <InputContainer>
      <StyledInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </InputContainer>
  );
};

export default SearchInput;
