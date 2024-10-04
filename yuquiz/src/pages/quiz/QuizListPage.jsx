import React, { useState, useEffect } from "react";
import "../../styles/quiz_list_page/QuizListPage.scss";
import QuizList from "../../components/quizlist/QuizList";
import SearchBar from "../../components/quizlist/SearchBar";
import SubjectDropdown from "../../components/quizlist/SubjectDropdown";
import { Link } from "react-router-dom";
import { getQuizList, SORT_OPTIONS } from "../../services/quiz/QuizManage";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [currentPage, setCurrentPage] = useState(0); // 초기 페이지 0
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const subjects = ["All", "Geography", "History", "Chemistry"];

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      setError(null); // 에러 초기화
      try {
        const quizData = await getQuizList(
          searchQuery,
          null, //subject인데 아직 서버에 데이터 無
          SORT_OPTIONS,
          currentPage
        ); // 1 기반 페이지 전송
        setQuizzes(quizData.content);
        setFilteredQuizzes(quizData.content);
        setTotalPages(quizData.totalPages); // 전체 페이지 수 설정
      } catch (error) {
        setError("퀴즈 목록을 불러오지 못했습니다.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizzes();
  }, [currentPage, searchQuery, selectedSubject, SORT_OPTIONS]);
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0); // 검색 시 페이지 초기화
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage(0); // 과목 변경 시 페이지 초기화
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

      {isLoading && <p>로딩 중...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && filteredQuizzes.length === 0 && (
        <p>아직은 표시할 퀴즈가 없습니다.</p>
      )}
      <QuizList currentQuizzes={filteredQuizzes} />

      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(index)}
            disabled={index === currentPage} // 현재 페이지 비활성화
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;
