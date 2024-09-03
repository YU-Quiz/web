// src/components/SearchBar.jsx

import React, { useState } from 'react';
// import './SearchBar.scss';
import '../../styles/quiz_list_page/SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="quiz-search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요..."
      />
      <button className='quiz-search-btn' type="submit">검색</button>
    </form>
  );
};

export default SearchBar;
