import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getQuizList } from "../../services/quiz/QuizManage"; // 문제 목록 API 호출

const SeriesContainer = styled.div`
  width: 100%;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const QuizListContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;

  p {
    font-size: 14px;
    color: #666;
  }
`;

const QuizItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f9f9f9;

  &:hover {
    background-color: #ececec;
  }
`;

const ForAddQuizList = ({ onAddQuiz }) => {
  const [quizList, setQuizList] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuizList = async () => {
      try {
        const quizzes = await getQuizList(); // 문제 목록 가져오기
        setQuizList(quizzes.content || []);
        setFilteredQuizzes(quizzes.content || []);
      } catch (error) {
        console.error("문제 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchQuizList();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredQuizzes(
      quizList.filter((quiz) => quiz.quizTitle.toLowerCase().includes(query))
    );
  };

  return (
    <SeriesContainer>
      <SearchInput
        type="text"
        placeholder="문제를 검색하세요"
        value={searchQuery}
        onChange={handleSearch}
      />
      <QuizListContainer>
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <QuizItem key={quiz.quizId} onClick={() => onAddQuiz(quiz)}>
              {quiz.quizTitle}
            </QuizItem>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </QuizListContainer>
    </SeriesContainer>
  );
};

export default ForAddQuizList;
