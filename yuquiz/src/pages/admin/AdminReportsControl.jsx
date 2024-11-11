import React, { useState, useEffect } from 'react';
import { getAdminReports } from '../../services/admin/adminReportService';
import ReportsSortDropdown from '../../components/admin/reports/ReportsSortDropdown';
import ReportsList from '../../components/admin/reports/ReportsList';

const AdminReportsControl = () => {
    const [sortOption, setSortOption] = useState("TYPE_DESC");
    const [reportList, setReportList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);  // 페이지 상태를 관리
    const [totalPages, setTotalPages] = useState(1);    // 전체 페이지 수 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reportList = await getAdminReports(sortOption, currentPage); // 현재 페이지로 사용자 정보 요청
                setReportList(reportList.content);
                setTotalPages(reportList.totalPages);  // 전체 페이지 수 업데이트
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

    return(
        <div className="admin-users-control">
            <h2>신고 관리</h2>
            <div className="user-list">
                <h3>전체 신고 조회</h3>

                <div className='controls-container'>  
                    <ReportsSortDropdown onSelectSortOption={handleSelectSort}/>
                </div>

                <ReportsList
                    reports={reportList}
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

export default AdminReportsControl;
