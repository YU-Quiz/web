import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { forceDeleteQuiz, getAdminQuizzes } from '../../services/admin/adminQuizSerivce';
import QuizzesList from '../../components/admin/quizzes/QuizzesList';
import Dropdown from '../../components/UI/Dropdown'; // Assuming this is a reusable dropdown component
import { QUIZ_SORT_OPTIONS } from '../../constants/admin/quizSortOption'; // Assuming you have constants for quiz sort options

const AdminQuizControl = () => {
    const [sortOption, setSortOption] = useState("DATE_DESC");
    const [quizList, setQuizList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quizList = await getAdminQuizzes(sortOption, currentPage);
                setQuizList(quizList.content);
                setTotalPages(quizList.totalPages);
            } catch (error) {
                console.error('퀴즈 목록 데이터를 불러오는 중 오류 발생:', error);
            }
        };
        fetchData();
    }, [currentPage, sortOption]);

    const handleSelectSort = (sortOption) => {
        setSortOption(sortOption.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteQuiz = async (quizId) => {
        const isConfirmed = window.confirm("정말로 이 퀴즈를 삭제하시겠습니까?");
    
        if (!isConfirmed) {
            return; // If the user cancels, do nothing
        }
    
        try {
            await forceDeleteQuiz(quizId);
            alert("퀴즈가 삭제되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("퀴즈 삭제 중 오류 발생:", error);
            alert("퀴즈 삭제에 실패했습니다.");
        }
    };
    

    return (
        <Container>
            <Header>
                <Title>퀴즈 관리</Title>
                <Dropdown
                    options={Object.values(QUIZ_SORT_OPTIONS)}
                    onSelect={handleSelectSort}
                    defaultOption={QUIZ_SORT_OPTIONS.DATE_DESC}
                />
            </Header>

            <TableContainer>
                <QuizzesList quizzes={quizList} onDelete={handleDeleteQuiz} />
            </TableContainer>

            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <PageButton
                        key={index}
                        className={index === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(index)}
                        disabled={index === currentPage}
                    >
                        {index + 1}
                    </PageButton>
                ))}
            </Pagination>
        </Container>
    );
};

export default AdminQuizControl;

// Styled-components for AdminQuizControl
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
`;

const TableContainer = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 18px;
`;

const PageButton = styled.button`
    padding: 8px 12px;
    margin: 0 5px;
    border: none;
    background-color: #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &.active {
        background-color: #86c232;
        color: white;
        font-weight: bold;
    }

    &:hover:not(.active) {
        background-color: #cfcfcf;
    }

    &:disabled {
        cursor: not-allowed;
        background-color: #f0f0f0;
    }
`;
