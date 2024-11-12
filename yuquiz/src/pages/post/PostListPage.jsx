import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import '../../styles/post_list_page/PostListPage.scss';
import PostList from '../../components/postlist/PostList';
import Dropdown from '../../components/UI/Dropdown';
import { getPostsList } from '../../services/post/postService';
import { getCategories } from '../../services/post/postMetaService';
import { POST_SORT_OPTIONS } from '../../constants/admin/postSortOption';

export async function postListLoader({ request }) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("page") || "0", 10);
  const keyword = url.searchParams.get("keyword") || "";
  const categoryId = parseInt(url.searchParams.get("categoryId")) || 0;
  const sortOption = url.searchParams.get("sort") || "DATE_DESC";

  const categoriesData = await getCategories();
  const postsListData = await getPostsList(keyword, categoryId, sortOption, currentPage);

  return {
    categories: categoriesData,
    postsList: postsListData.content,
    totalPages: postsListData.totalPages,
  };
}

const PostListPage = () => {
  const { categories, postsList, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Add "모두" option to the categories array
  const extendedCategories = [{ id: null, categoryName: '모두' }, ...categories];

  const handleSelectCategory = (selectedCategory) => {
    const categoryId = selectedCategory.id !== null ? selectedCategory.id : 0; // Set to 0 if "모두" is selected
    updateSearchParams({ categoryId, page: 0 });
  };

  const handleSelectSort = (selectedSort) => {
    updateSearchParams({ sort: selectedSort.value, page: 0 });
  };

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);
    if (newParams.page !== undefined) {
      params.set('page', newParams.page);
    }
    if (newParams.categoryId !== undefined) {
      params.set('categoryId', newParams.categoryId);
    }
    if (newParams.sort !== undefined) {
      params.set('sort', newParams.sort);
    }
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    updateSearchParams({ page });
  };

  const currentPage = parseInt(searchParams.get("page") || "0", 10);

  return (
    <div className="post-list-page-container">
      <Dropdown
        options={extendedCategories.map((cat) => ({ label: cat.categoryName, id: cat.id }))}
        onSelect={handleSelectCategory}
        defaultOption={{ label: "모두", id: null }}
      />
      <Dropdown
        options={Object.values(POST_SORT_OPTIONS)}
        onSelect={handleSelectSort}
        defaultOption={POST_SORT_OPTIONS.DATE_DESC}
      />

      <PostList posts={postsList} />

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
            disabled={index === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostListPage;
