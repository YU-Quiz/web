import React, { useState, useEffect } from "react";
import "../../styles/study/StudyGroupList.scss";
import { Link } from "react-router-dom";
import SearchBar from "../../components/quizlist/SearchBar";
import SortDropdown from "../../components/postlist/SortDropdown";

// 임시 데이터
const tempStudyGroupData = [
  { id: 1, name: "알고리즘 스터디", join: false },
  { id: 2, name: "웹 개발 심화 스터디", join: false },
  { id: 3, name: "자료구조 마스터 스터디", join: true },
];

const StudyGroupList = () => {
  const [studyGroupList, setStudyGroupList] = useState(tempStudyGroupData); // 임시 데이터로 초기화
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("DATE_DESC");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="study-group-list-page-container">
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
        <button>+ 스터디 생성</button>
      </div>

      {isLoading && <p>로딩 중...</p>}
      {error && <p className="error-message">{error}</p>}
      {studyGroupList.length === 0 && !isLoading && !error && (
        <p>아직은 표시할 스터디 그룹이 없습니다.</p>
      )}

      <div className="study-group-list">
        {studyGroupList.map((group) => (
          <div key={group.id} className="study-group-item">
            <Link to={`/study/${group.id}`} className="study-group-name">
              <h3>{group.name}</h3>
              {group.join === true ? <></> : <button>가입신청</button>}
            </Link>
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

export default StudyGroupList;
