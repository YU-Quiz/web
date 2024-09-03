import React, { useState } from 'react';
import SearchBar from '../components/postlist/SearchBar';
import SubjectDropdown from '../components/postlist/SubjectDropdown';
import PostList from '../components/postlist/PostList';
import '../styles/post_list_page/PostListPage.scss';

const PostListPage = () => {
    const postsData = [
        { id: 1, category: '공지게시판', title: '다음 주에 있을 퀴즈 대회 일정입니다.' },
        { id: 2, category: '공지게시판', title: '시스템 점검 안내 (금요일 오전 2시)' },
        { id: 3, category: '자유게시판', title: '퀴즈 공부 팁 공유합니다!' },
        { id: 4, category: '자유게시판', title: '최근 읽은 책 추천합니다.' },
        { id: 5, category: '자유게시판', title: '이번 주말 모임 일정 조율합시다.' },
        { id: 6, category: '풀이게시판', title: '지난 퀴즈 문제 1번 해설입니다.' },
        { id: 7, category: '풀이게시판', title: '역사 퀴즈 2번 문제 해설입니다.' },
        { id: 8, category: '풀이게시판', title: '과학 퀴즈 5번 문제 해설과 추가 설명.' },
    ];

  const [category] = useState(['모두', '공지게시판', '자유게시판', '풀이게시판']);

  const handleSearch = (query) => {
    // 검색 로직 작성
  };

  const handleSelectCategory = (category) => {
    // 과목 선택 로직 작성
  };

  return (
    <div className="post-list-page-container">
      <nav className="navbar">
        <button className="nav-button">홈으로</button>
        <button className="nav-button">마이페이지</button>
      </nav>
      <div className='controls-container'>
        <SearchBar onSearch={handleSearch} />
        <SubjectDropdown category={category} onSelectCategory={handleSelectCategory} />
      </div>
      <PostList posts={postsData} />
    </div>
  );
};

export default PostListPage;
