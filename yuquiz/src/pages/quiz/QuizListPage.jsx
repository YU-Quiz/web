import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useLoaderData } from "react-router-dom";
import Dropdown from "../../components/UI/Dropdown";
import SearchInput from "../../components/UI/SearchInput";
import { getQuizList } from "../../services/quiz/QuizManage";
import { SORT_QUIZ_POST } from "../../constants/sort/sortType";
import styled from "styled-components";
import { QuizGrid } from "../../components/quizlist/QuizGrid";

const QuizListPageContainer = styled.div`
  background-color: white;
  width: 100%;
`;

const ControlsContainer = styled.div`
  margin-top: 10px;
  gap: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const CreateQuizButton = styled(Link)`
  padding: 10px 20px;
  background-color: #2c4697;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: #2c4655;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  background-color: silver;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &.active {
    background-color: #0056b3;
  }

  &:hover {
    background-color: gray;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const SORT_OPTIONS = Object.values(SORT_QUIZ_POST).map((option) => ({
  label: option.label,
  value: option.value,
}));
export async function QuizListLoader({ request }) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("page") || "0", 10);
  const keyword = url.searchParams.get("keyword") || "";
  const sortOption = url.searchParams.get("sort") || "DATE_DESC";

  const QuizListData = await getQuizList(
    keyword,
    null,
    sortOption,
    currentPage
  );

  return {
    quizzList: QuizListData.content,
    totalPages: QuizListData.totalPages,
  };
}
const QuizListPage = () => {
  const { quizzList, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (query) => {
    updateSearchParams({ keyword: query, page: 0 });
  };

  const handleSelectSort = (selectedOption) => {
    updateSearchParams({ sort: selectedOption.value, page: 0 });
  };

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    if (newParams.page !== undefined) {
      params.set("page", newParams.page);
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
    <QuizListPageContainer>
      <ControlsContainer>
        <SearchInput onSearch={handleSearch} />
        <Dropdown
          options={SORT_OPTIONS}
          onSelect={handleSelectSort}
          initLabel="정렬 기준 선택"
          defaultOption={{ value: "DATE_DESC", label: "날짜 내림차순" }}
        />
        <CreateQuizButton to="/quiz/create">+ 퀴즈 생성</CreateQuizButton>
      </ControlsContainer>

      {quizzList ? (
        <QuizGrid currentQuizzes={quizzList} />
      ) : (
        <LoadingMessage>로딩 중...</LoadingMessage>
      )}

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            className={index === currentPage ? "active" : ""}
            onClick={() => updateSearchParams({ page: index })}
            disabled={index === currentPage}
          >
            {index + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </QuizListPageContainer>
  );
};

export default QuizListPage;
