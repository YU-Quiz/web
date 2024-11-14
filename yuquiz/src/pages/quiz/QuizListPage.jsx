import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CreateQuizButton = styled(Link)`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  &:hover {
    background-color: gray;
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
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &.active {
    background-color: #0056b3;
  }

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const SORT_OPTIONS = Object.values(SORT_QUIZ_POST).map((option) => ({
  label: option.label,
  value: option.value,
}));

const QuizListPage = () => {
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const searchQuery = searchParams.get("keyword") || "";
  const sortOption = searchParams.get("sort") || "DATE_DESC";

  useEffect(() => {
    let isMounted = true;

    const fetchQuizzes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const quizData = await getQuizList(
          searchQuery,
          null,
          sortOption,
          currentPage
        );

        if (isMounted) {
          setFilteredQuizzes(quizData.content);
          setTotalPages(quizData.totalPages);
        }
      } catch (error) {
        if (isMounted) {
          setError("퀴즈 목록을 불러오지 못했습니다.");
          console.error(error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchQuizzes();

    return () => {
      isMounted = false;
    };
  }, [currentPage, searchQuery, sortOption]);

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
    if (newParams.keyword !== undefined) {
      params.set("keyword", newParams.keyword);
    }
    if (newParams.sort !== undefined) {
      params.set("sort", newParams.sort);
    }
    setSearchParams(params);
  };

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

      {isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!isLoading && !error && filteredQuizzes.length === 0 && (
        <p>아직은 표시할 퀴즈가 없습니다.</p>
      )}
      <QuizGrid currentQuizzes={filteredQuizzes} />

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
