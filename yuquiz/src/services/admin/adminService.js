import { HttpStatusCode } from "axios";
import api from "../apiService";

const SORT_OPTIONS = {
    NICK_DESC: "NICK_DESC",
    NICK_ASC: "NICK_ASC",
    MAIL_DESC: "MAIL_DESC",
    MAIL_ASC: "MAIL_ASC",
    BAN_DESC: "BAN_DESC",
    BAN_ASC: "BAN_ASC",
    ROLE_DESC: "ROLE_DESC",
    ROLE_ASC: "ROLE_ASC",
    DATE_DESC: "DATE_DESC",
    DATE_ASC: "DATE_ASC"
};

// 전체 사용자 조회
const getUsersInfo = async(sort=SORT_OPTIONS.DATE_DESC, page=0) =>{
    try {
        const params = {};
    
        if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
          params.sort = sort;
        } else {
          params.sort = SORT_OPTIONS.DATE_DESC; // 기본값 설정
        }
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

const suspendUser = async(status, userId)=>{
  try {
    const params ={
      status: status,
    };
    console.log(status, userId);
    const response = await api.patch(`/admin/users/${userId}`, null,{params: params});
    console.log(response);
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