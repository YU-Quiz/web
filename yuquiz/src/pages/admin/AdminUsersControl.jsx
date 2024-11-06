import React, { useState, useEffect } from 'react';
import "../../styles/admin/AdminUsersControl.scss";
import {forceDeleteUser, getUsersInfo, suspendUser} from '../../services/admin/adminService';
import UsersInfoList from '../../components/admin/users/UsersInfoList';
import UsersSortDropdown from '../../components/admin/users/UsersSortDropdown';

const AdminUsersControl = () => {
  const [sortOption, setSortOption] = useState("DATE_DESC");
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  // 페이지 상태를 관리
  const [totalPages, setTotalPages] = useState(1);    // 전체 페이지 수 관리

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersInfo = await getUsersInfo(sortOption,currentPage); // 현재 페이지로 사용자 정보 요청
        setUsersList(usersInfo.content);
        setTotalPages(usersInfo.totalPages);  // 전체 페이지 수 업데이트

        console.log(usersInfo);
      } catch (error) {
        console.error('회원 목록 데이터를 불러오는 중 오류 발생:', error); 
      }
    };
    fetchUsers();
  }, [currentPage, sortOption]);  // currentPage가 변경될 때마다 사용자 정보 다시 로드

  const handleSelectSort = (sortOption) =>{
    setSortOption(sortOption);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);  // 페이지 번호 변경
    console.log("pagenumber",pageNumber);
  };

  // Handle suspension of user
  const handleSuspend = async (status, userId) => {
    try {
      if(status){
        await suspendUser('UNSUSPEND',userId);
        alert("회원이 정지해제되었습니다.");
      }else{
        await suspendUser('SUSPEND',userId);
        alert("회원이 정지되었습니다.");
      }
      
    } catch (error) {
      console.error("정지 중 오류 발생:", error);
      alert("회원 정지에 실패했습니다."); // Show error message
    }

    window.location.reload();
  };

  // Handle banning of user
  const handleBan = async (userId) => {
    try {
      await forceDeleteUser(userId);
      alert("회원이 추방되었습니다."); // Show success message
    } catch (error) {
      console.error("추방 중 오류 발생:", error);
      alert("회원 추방에 실패했습니다."); // Show error message
    }
  };

  return (
    <div className="admin-users-control">
      <h2>회원 관리</h2>
      <div className="user-list">
        <h3>전체 회원 조회</h3>

        <div className='controls-container'>  
          <UsersSortDropdown onSelectSortOption={handleSelectSort} />
        </div>

        <UsersInfoList users={usersList} onSuspend={handleSuspend} onBan={handleBan}/> 
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

export default AdminUsersControl;
