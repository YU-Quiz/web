import React, { useEffect, useState } from 'react';
import '../../styles/post_list_page/PostListPage.scss';
import SearchBar from '../../components/postlist/SearchBar';
import SubjectDropdown from '../../components/postlist/SubjectDropdown';
import PostList from '../../components/postlist/PostList';
import { Link } from 'react-router-dom';
import { getCategories, getPostsList } from '../../services/post/postService';

// sort: LIKE_DESC, LIKE_ASC, VIEW_DESC, VIEW_ASC, DATE_DESC, DATE_ASC
const PostListPage = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [postsList, setPostsList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1);   // 전체 페이지 수
  // const [pageSize, setPageSize] = useState(20);                   // 페이지당 게시글 수 (고정값)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 카테고리리스트 받아오기
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // 게시글 리스트 정보 받아오기
        const postsListData = await getPostsList("","","DATE_DESC", currentPage);
        setPostsList(postsListData.content);

        setTotalPages(postsListData.totalPages);
        // setPageSize(postsListData.pageable.pageSize)
        // console.log(postsListData);
        
      } catch (error) {
        console.error('게시글 목록 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    // console.log(currentPage);
    fetchData();
  }, [currentPage]);

  const handleSearch = (query) => {
    // 검색 로직 작성
  };

  const handleSelectCategory = (category) => {
    // 과목 선택 로직 작성
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="post-list-page-container">
      <nav className="navbar">
        <Link to='/' className="nav-button">홈으로</Link>
        <Link to='/my' className="nav-button">마이페이지</Link>
      </nav>
      <div className='controls-container'>
        <SearchBar onSearch={handleSearch} />
        <SubjectDropdown categories={categories} onSelectCategory={handleSelectCategory} />
      </div>
      <PostList posts={postsList} />
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
            disabled={index === currentPage} // 현재 페이지는 비활성화
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostListPage;
