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

export default getUsersInfo;