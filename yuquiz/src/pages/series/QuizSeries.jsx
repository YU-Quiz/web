import React, { useState, useEffect } from "react";
import "../../styles/quizseries/QuizSeriesPage.scss";
import { Link } from "react-router-dom";
import SearchBar from "../../components/quizlist/SearchBar";
import SortDropdown from "../../components/postlist/SortDropdown";
import {
  createSeries,
  deleteSeries,
  getSeriesList,
  updateSeries,
} from "../../services/quizseries/seriesManage";

const QuizSeriesPage = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("DATE_DESC");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const seriesData = await getSeriesList(
          searchQuery,
          sortOption,
          currentPage
        );
        setSeriesList(seriesData.content);
        setTotalPages(seriesData.totalPages);
      } catch (error) {
        setError("문제집 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeriesList();
  }, [currentPage, searchQuery, sortOption]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleCreateSeries = async (newSeriesName) => {
    try {
      await createSeries({ name: newSeriesName });
      setSearchQuery(""); // Reset search to show all after creation
    } catch (error) {
      console.error("문제집 생성에 실패했습니다.");
    }
  };

  const handleEditSeries = async (seriesId, newName) => {
    try {
      await updateSeries(seriesId, { name: newName });
    } catch (error) {
      console.error("문제집 수정에 실패했습니다.");
    }
  };

  const handleDeleteSeries = async (seriesId) => {
    try {
      await deleteSeries(seriesId);
      setSeriesList(seriesList.filter((series) => series.id !== seriesId));
    } catch (error) {
      console.error("문제집 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="quiz-series-page-container">
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
        <SortDropdown onSelectSortOption={handleSortChange} />
      </div>

      {isLoading && <p>로딩 중...</p>}
      {error && <p className="error-message">{error}</p>}
      {seriesList.length === 0 && !isLoading && !error && (
        <p>아직은 표시할 문제집이 없습니다.</p>
      )}

      <div className="series-list">
        {seriesList.map((series) => (
          <div key={series.id} className="series-item">
            <h3>{series.name}</h3>
            <button
              onClick={() =>
                handleEditSeries(series.id, prompt("새 이름을 입력하세요:"))
              }
            >
              수정
            </button>
            <button onClick={() => handleDeleteSeries(series.id)}>삭제</button>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(index)}
            disabled={index === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizSeriesPage;
