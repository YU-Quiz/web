import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { forceDeletePost, getAdminPosts } from '../../services/admin/adminPostService';
import PostsList from '../../components/admin/posts/PostsList';
import Dropdown from '../../components/UI/Dropdown'; // Assuming this is a reusable dropdown component
import { POST_SORT_OPTIONS } from '../../constants/admin/postSortOption'; // Assumes you have a constant file for sorting options

const AdminPostsControl = () => {
    const [sortOption, setSortOption] = useState("DATE_DESC");
    const [postList, setPostList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postList = await getAdminPosts(sortOption, currentPage);
                setPostList(postList.content);
                setTotalPages(postList.totalPages);
            } catch (error) {
                console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
            }
        };
        fetchData();
    }, [currentPage, sortOption]);

    const handleSelectSort = (sortOption) => {
        setSortOption(sortOption.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeletePost = async (postId) => {
        try {
            await forceDeletePost(postId);
            alert("게시글이 삭제되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
            alert("게시글 삭제에 실패했습니다.");
        }
    };

    return (
        <Container>
            <Header>
                <Title>게시글 관리</Title>
                <Dropdown
                    options={Object.values(POST_SORT_OPTIONS)}
                    onSelect={handleSelectSort}
                    defaultOption={POST_SORT_OPTIONS.DATE_DESC}
                />
            </Header>

            <TableContainer>
                <PostsList posts={postList} onDelete={handleDeletePost} />
            </TableContainer>

            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <PageButton
                        key={index}
                        className={index === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(index)}
                        disabled={index === currentPage}
                    >
                        {index + 1}
                    </PageButton>
                ))}
            </Pagination>
        </Container>
    );
};

export default AdminPostsControl;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TableContainer = styled.div`
  flex: 1; /* Fills remaining vertical space */
  min-height: 0; /* Ensures flexbox works correctly for overflow */
  overflow-y: auto;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  background-color: #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &.active {
    background-color: #86c232;
    color: white;
    font-weight: bold;
  }

  &:hover:not(.active) {
    background-color: #cfcfcf;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f0f0f0;
  }
`;
