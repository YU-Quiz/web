import React from 'react';
import { useLoaderData, useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchInput from '../../components/UI/SearchInput';
import Button from '../../components/UI/Button';
import Dropdown from '../../components/UI/Dropdown';
import { STUDY_NOTICE_SORT_OPTIONS } from '../../constants/study/studyNoticeSortOption';
import { getStudyPostsList } from '../../services/study/studyPostService';
import StudyPostList from '../../components/study/posts/PostList';

export async function studyPostsListLoader({ request, params }) {
    const {studyId} = params;
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("page") || "0", 10);
  const keyword = url.searchParams.get("keyword") || "";
  const sortOption = url.searchParams.get("sort") || "DATE_DESC";

  const postsListData = await getStudyPostsList(studyId, keyword, sortOption, currentPage);

  return {
    postsList: postsListData.content,
    totalPages: postsListData.totalPages,
  };
}
const StudyPostsListPage = () => {
    const { postsList, totalPages } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
  
    const handleSelectSort = (selectedSort) => {
      updateSearchParams({ sort: selectedSort.value, page: 0 });
    };
  
    const handleSearch = (keyword) => {
      updateSearchParams({ keyword, page: 0 });
    };
  
    const updateSearchParams = (newParams) => {
      const params = new URLSearchParams(searchParams);
  
      if (newParams.page !== undefined) {
        params.set('page', newParams.page);
      }
      if (newParams.sort !== undefined) {
        params.set('sort', newParams.sort);
      }
      if (newParams.keyword !== undefined) {
        params.set('keyword', newParams.keyword);
      }
      setSearchParams(params);
    };
  
    const currentPage = parseInt(searchParams.get("page") || "0", 10);
  
    return (
      <TableWrapper>
        <Header>
          <Title>Study Posts</Title>
          <CreateNoticeButton to={`new`}>
            <Button>Create Post</Button>
          </CreateNoticeButton>
        </Header>
  
        <Filters>
          <SearchInput onSearch={handleSearch} placeholder="Search Notices..." />
          <Dropdown
            options={Object.values(STUDY_NOTICE_SORT_OPTIONS)}
            onSelect={handleSelectSort}
            defaultOption={STUDY_NOTICE_SORT_OPTIONS.DATE_DESC}
          />
        </Filters>
  
        <StyledTable>
            <StudyPostList posts={postsList} />
        </StyledTable>
  
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationButton
              key={index}
              $isActive={index === currentPage}
              onClick={() => updateSearchParams({ page: index })}
              disabled={index === currentPage}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </Pagination>
      </TableWrapper>
    );
  };
  
  export default StudyPostsListPage;
  
  // Styled-components
  const TableWrapper = styled.div`
    width: 100%;
    position: relative;
    overflow: auto;
    z-index: 2;
    padding: 20px;
  `;
  
  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;
  
  const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
  `;
  
  const CreateNoticeButton = styled(Link)`
    text-decoration: none;
  `;
  
  const Filters = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  const StyledTable = styled.div`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  `;
  
  const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `;
  
  const PaginationButton = styled.button`
    margin: 0 5px;
    padding: 10px 15px;
    background-color: ${({ isActive }) => (isActive ? '#007bff' : '#e9e9e9')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
    border: none;
    border-radius: 5px;
    cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  
    &:hover {
      background-color: ${({ isActive }) => (isActive ? '#007bff' : '#c7c7c7')};
    }
  
    &:disabled {
      cursor: default;
      opacity: 0.6;
    }
  `;