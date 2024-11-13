import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAdminReports } from '../../services/admin/adminReportService';
import ReportsSortDropdown from '../../components/admin/reports/ReportsSortDropdown';
import ReportsList from '../../components/admin/reports/ReportsList';
import { REPORT_SORT_OPTIONS } from '../../constants/admin/reportSortOption';
import Dropdown from '../../components/UI/Dropdown';

const AdminReportsControl = () => {
    const [sortOption, setSortOption] = useState("TYPE_DESC");
    const [reportList, setReportList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reportList = await getAdminReports(sortOption, currentPage);
                setReportList(reportList.content);
                setTotalPages(reportList.totalPages);
            } catch (error) {
                console.error('신고 목록 데이터를 불러오는 중 오류 발생:', error);
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

    return (
        <Container>
            <Header>
                <Title>신고 관리</Title>
                <Dropdown
                    options={Object.values(REPORT_SORT_OPTIONS)}
                    onSelect={handleSelectSort}
                    defaultOption={REPORT_SORT_OPTIONS.DATE_DESC}
                />
            </Header>

            <TableContainer>
                <ReportsList reports={reportList} />
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

export default AdminReportsControl;

// Styled-components for AdminReportsControl
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
