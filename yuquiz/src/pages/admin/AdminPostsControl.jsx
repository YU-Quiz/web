import React, { useState, useEffect } from 'react';
import { getAdminPosts } from '../../services/admin/adminPostService';
import PostsList from '../../components/admin/posts/PostsList';
import PostsSortDropdown from '../../components/admin/posts/PostsSortDropdown';

const AdminPostsControl = () => {
    const [sortOption, setSortOption] = useState("DATE_DESC");
    const [postList, setPostList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);  // 페이지 상태를 관리
    const [totalPages, setTotalPages] = useState(1);    // 전체 페이지 수 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postList = await getAdminPosts(sortOption, currentPage); // 현재 페이지로 사용자 정보 요청
                setPostList(postList.content);
                setTotalPages(postList.totalPages);  // 전체 페이지 수 업데이트
            } catch (error) {
                console.error('회원 목록 데이터를 불러오는 중 오류 발생:', error); 
            }
        };
        fetchData();
    }, [currentPage, sortOption]);  // currentPage가 변경될 때마다 사용자 정보 다시 로드

    const handleSelectSort = (sortOption) => {
        setSortOption(sortOption);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 번호 변경
    };

    return(
        <div className="admin-users-control">
            <h2>게시글 관리</h2>
            <div className="user-list">
                <h3>전체 게시글 조회</h3>

                <div className='controls-container'>  
                <PostsSortDropdown onSelectSortOption={handleSelectSort} />
                </div>

                <PostsList posts={postList}/>
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
        </div>
    );
};

export default AdminPostsControl;
