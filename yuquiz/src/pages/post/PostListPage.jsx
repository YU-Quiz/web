import React from "react";
import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import styled from "styled-components";
import PostList from "../../components/postlist/PostList";
import Dropdown from "../../components/UI/Dropdown";
import SearchInput from "../../components/UI/SearchInput";
import Button from "../../components/UI/Button"; // Import the Button component
import { getPostsList } from "../../services/post/postService";
import { getCategories } from "../../services/post/postMetaService";
import { POST_SORT_OPTIONS } from "../../constants/admin/postSortOption";

export async function postListLoader({ request }) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("page") || "0", 10);
  const keyword = url.searchParams.get("keyword") || "";
  const categoryId = parseInt(url.searchParams.get("categoryId")) || 0;
  const sortOption = url.searchParams.get("sort") || "DATE_DESC";

  const categoriesData = await getCategories();
  const postsListData = await getPostsList(
    keyword,
    categoryId,
    sortOption,
    currentPage
  );

  return {
    categories: categoriesData,
    postsList: postsListData.content,
    totalPages: postsListData.totalPages,
  };
}

const PostListPage = () => {
  const { categories, postsList, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const extendedCategories = [
    { id: 0, categoryName: "모두" },
    ...categories,
  ];

  const handleSelectCategory = (selectedCategory) => {
    const categoryId = selectedCategory.value !== 0 ? selectedCategory.value : 0;
    updateSearchParams({ categoryId, page: 0 });
  };

  const handleSelectSort = (selectedSort) => {
    updateSearchParams({ sort: selectedSort.value, page: 0 });
  };

  const handleSearch = (keyword) => {
    updateSearchParams({ keyword, page: 0 });
  };

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    if (newParams.page !== undefined) {
      params.set("page", newParams.page);
    }
    if (newParams.categoryId !== undefined) {
      params.set("categoryId", newParams.categoryId);
    }
    if (newParams.sort !== undefined) {
      params.set("sort", newParams.sort);
    }
    if (newParams.keyword !== undefined) {
      params.set("keyword", newParams.keyword);
    }
    setSearchParams(params);
  };

  const currentPage = parseInt(searchParams.get("page") || "0", 10);

  return (
    <PostListContainer>
      <FilterContainer>
        <SearchInput onSearch={handleSearch} />
        <DropdownContainer>
          <Dropdown
            options={extendedCategories.map((cat) => ({
              label: cat.categoryName,
              value: String(cat.id), // 여기서 value를 id로 매핑
            }))}
            onSelect={handleSelectCategory}
            defaultOption={{ label: "모두", value: 0 }}
          />
          <Dropdown
            options={Object.values(POST_SORT_OPTIONS)}
            onSelect={handleSelectSort}
            defaultOption={POST_SORT_OPTIONS.DATE_DESC}
          />
        </DropdownContainer>
        <StyledLink to="/posts/new">
          <Button>게시글 작성</Button>
        </StyledLink>
      </FilterContainer>

      <PostList posts={postsList} />

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            $isActive={index === currentPage}
            onClick={() => updateSearchParams({ page: index })}
            disabled={index === currentPage}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </PostListContainer>
  );
};

export default PostListPage;

// Styled Components
const PostListContainer = styled.div`
  width: 100%;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
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
  background-color: ${({ isActive }) => (isActive ? "#007bff" : "#f1f1f1")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};

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
