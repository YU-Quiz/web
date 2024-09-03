import React, { useState } from 'react';
import '../../styles/post_list_page/SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="post-search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요..."
      />
      <button className='post-search-btn' type="submit">검색</button>
    </form>
  );
};

export default SearchBar;
