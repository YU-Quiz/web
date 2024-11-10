import React, { useState, useEffect } from 'react';
import { forceDeleteQuiz, getAdminQuizzes } from '../../services/admin/adminQuizSerivce';
import QuizzesList from '../../components/admin/quizzes/QuizzesList';
import QuizzesSortDropdown from '../../components/admin/quizzes/QuizzesSortDropdown';

const AdminQuizControl = () => {
    const [sortOption, setSortOption] = useState("DATE_DESC");
    const [quizList, setQuizList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);  // 페이지 상태를 관리
    const [totalPages, setTotalPages] = useState(1);    // 전체 페이지 수 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quizList = await getAdminQuizzes(sortOption, currentPage); // 현재 페이지로 사용자 정보 요청
                setQuizList(quizList.content);
                setTotalPages(quizList.totalPages);  // 전체 페이지 수 업데이트
            } catch (error) {
                console.error('퀴즈 목록 데이터를 불러오는 중 오류 발생:', error); 
            }
        };
        fetchData();
    }, [currentPage, sortOption]);  // currentPage가 변경될 때마다 사용자 정보 다시 로드

    const handleSelectSort = (sortOption) => {
        setSortOption(sortOption);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 번호 변경
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
          await forceDeleteQuiz(quizId);
          alert("퀴즈가 삭제되었습니다."); // Show success message
          window.location.reload()
        } catch (error) {
          console.error("퀴즈 삭제 중 오류 발생:", quizId);
          alert("퀴즈 삭제에 실패했습니다."); // Show error message
        }
    };

    return(
        <div className="admin-users-control">
            <h2>퀴즈 관리</h2>
            <div className="user-list">
                <h3>전체 퀴즈 조회</h3>

                <div className='controls-container'>  
                <QuizzesSortDropdown onSelectSortOption={handleSelectSort} />
                </div>

                <QuizzesList
                    quizzes={quizList}
                    onDelete={handleDeleteQuiz}
                />
                <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                    key={index}
                    className={`page-button ${index === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(index)}
                    disabled={index === currentPage} // 현재 페이지는 비활성화
                    >
                    {index + 1}
                    </button>
                ))}
                </div>
            </div>
        </div>
    );
};

export default AdminQuizControl;
