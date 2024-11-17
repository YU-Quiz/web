import React from 'react';
import { useLoaderData, useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import StudyList from '../../components/study/StudyList';
import Dropdown from '../../components/UI/Dropdown';
import SearchInput from '../../components/UI/SearchInput';
import Button from '../../components/UI/Button'; // Import the Button component
import { getStudyList } from '../../services/study/studyService';
import { STUDY_LIST_SORT_OPTIONS } from '../../constants/study/studySortOption';
import { STUDY_FILTER_OPTIONS } from '../../constants/study/studyFilterOption';

export async function studyListLoader({ request }) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("page") || "0", 10);
  const keyword = url.searchParams.get("keyword") || "";
  const sortOption = url.searchParams.get("sort") || "CREATED_DESC";
  const filter = url.searchParams.get("filter") || "ALL";

  const studiesListData = await getStudyList(keyword, sortOption, filter, currentPage);

  return {
    studiesList: studiesListData.content,
    totalPages: studiesListData.totalPages,
  };
}

const StudyListPage = () => {
  const { studiesList, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectSort = (selectedSort) => {
    updateSearchParams({ sort: selectedSort.value, page: 0 });
  };

  const handleSelectFilter = (selectedFilter) => {
    updateSearchParams({ filter: selectedFilter.value, page: 0 });
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
    if (newParams.filter !== undefined) {
      params.set('filter', newParams.filter);
    }
    if (newParams.keyword !== undefined) {
      params.set('keyword', newParams.keyword);
    }
    setSearchParams(params);
  };

  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  // console.log(STUDY_LIST_SORT_OPTIONS);
  return (
    <StudyListContainer>
      <FilterContainer>
        <SearchInput onSearch={handleSearch} />
        <DropdownContainer>
          <Dropdown
            options={Object.values(STUDY_LIST_SORT_OPTIONS)}
            onSelect={handleSelectSort}
            defaultOption={STUDY_LIST_SORT_OPTIONS.CREATED_DESC}
          />
          <Dropdown
            options={Object.values(STUDY_FILTER_OPTIONS)}
            onSelect={handleSelectFilter}
            defaultOption={STUDY_FILTER_OPTIONS.ALL}
          />
        </DropdownContainer>
        <StyledLink to="/study/new">
          <Button>Create Study</Button>
        </StyledLink>
      </FilterContainer>

      <StudyList studies={studiesList} />

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            isActive={index === currentPage}
            onClick={() => updateSearchParams({ page: index })}
            disabled={index === currentPage}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </StudyListContainer>
  );
};

export default StudyListPage;

// Styled Components
const StudyListContainer = styled.div`
  width: 100%;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: ${({ isActive }) => (isActive ? '#007bff' : '#f1f1f1')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  &:disabled {
    cursor: default;
    background-color: #007bff;
    color: #fff;
  }
`;
