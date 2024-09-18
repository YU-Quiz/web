// src/pages/QuizListPage.jsx

import React, { useState, useEffect } from "react";
import "../../styles/quiz_list_page/QuizListPage.scss";
import QuizList from "../../components/quizlist/QuizList";
import SearchBar from "../../components/quizlist/SearchBar";
import SubjectDropdown from "../../components/quizlist/SubjectDropdown";
import { Link } from "react-router-dom";
import { getQuizList } from "../../services/quiz/QuizManage";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [currentPage, setCurrentPage] = useState(null); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const subjects = ["All", "Geography", "History", "Chemistry"];

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      setError(null); // 에러 초기화
      try {
        const quizData = await getQuizList(currentPage); // 서버에서 퀴즈 목록 가져오기
        setQuizzes(quizData.content);
        setFilteredQuizzes(quizData.content); // 필터링 전 전체 퀴즈 저장
        setTotalPages(quizData.totalPages); // 전체 페이지 수 저장
      } catch (error) {
        setError("퀴즈 목록을 불러오지 못했습니다."); // 에러 메시지 설정
        console.error(error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };
    fetchQuizzes();
  }, [currentPage]); // currentPage 변경 시마다 호출

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterQuizzes(query, selectedSubject);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    filterQuizzes(searchQuery, subject);
  };

  const filterQuizzes = (query, subject) => {
    let filtered = quizzes;

    // 검색어로 필터링
    if (query) {
      filtered = filtered.filter((quiz) =>
        quiz.quizTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    // 과목으로 필터링 (예시로 subject 필터 적용)
    if (subject !== "All") {
      filtered = filtered.filter(
        (quiz) => (quiz.subject ? quiz.subject === subject : true) // subject 필드가 있다고 가정
      );
    }

    setFilteredQuizzes(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 변경
  };

  return (
    <div className="quiz-list-page-container">
      <nav className="navbar">
        <Link to="/" className="nav-button">
          홈으로
        </Link>
        <Link to="/my" className="nav-button">
          마이페이지
        </Link>
      </nav>

      <div className="controls-container">
        <SearchBar onSearch={handleSearch} />
        <SubjectDropdown
          subjects={subjects}
          onSelectSubject={handleSelectSubject}
        />
      </div>

      {/* 로딩 상태 표시 */}
      {isLoading && <p>로딩 중...</p>}

      {/* 에러 메시지 표시 */}
      {error && <p className="error-message">{error}</p>}

      {/* 퀴즈 리스트 */}
      {!isLoading && !error && filteredQuizzes.length === 0 && (
        <p>표시할 퀴즈가 없습니다.</p>
      )}
      <QuizList currentQuizzes={filteredQuizzes} />

      {/* 페이징 버튼 */}
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(index)}
            disabled={index === currentPage} // 현재 페이지일 경우 비활성화
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;
