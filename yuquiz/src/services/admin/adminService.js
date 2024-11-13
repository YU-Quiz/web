import { HttpStatusCode } from "axios";
import api from "../apiService";
import { USER_SORT_OPTIONS } from "../../constants/admin/userSortOption";

// 전체 사용자 조회
const getUsersInfo = async(sort=USER_SORT_OPTIONS.DATE_DESC, page=0) =>{
    try {
        const params = {};
    
        params.sort = sort;
        if (page >= 0) params.page = page;

        const response = await api.get("/admin/users", {params: params});
        
        return response.data;
      } catch (error) {
        if(error.response){
            console.log(error.response);
            throw new Error('회원 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
            
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
      }
}

// 회원 정지 토글
const suspendUser = async(status, userId)=>{
  try {
    const params ={
      status: status,
    };

    const response = await api.patch(`/admin/users/${userId}`, null,{params: params});

  } catch (error) {
    if(error.response){
      if(error.response.status === HttpStatusCode.NotFound){
        throw new Error(`${error.response.data.message}`);
      }else{
        throw new Error('회원 정지 중 문제 발생. 다시 시도해주세요.');  
      };
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
}

// 회원 강제 탈퇴
const forceDeleteUser = async(userId)=>{
  try {
    const response = await api.delete(`/admin/users/${userId}`);
  } catch (error) {
    if(error.response){
      throw new Error(`회원 강제탈퇴중 문제 발생. 다시 시도해주세요.`);
    }else{
      throw new Error('서버와 연결할 수 없습니다.');
    }
  }
}



export {getUsersInfo, suspendUser, forceDeleteUser};