import { HttpStatusCode } from "axios";
import api from "../apiService";

const getAdminPosts = async(sort='',page=0)=>{
    try {
      const params = {};
  
      // if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
      //   params.sort = sort;
      // } else {
        params.sort = 'DATE_DESC'; // 기본값 설정
      // }
      if (page >= 0) params.page = page;
      const response = await api.get("/admin/posts", {params: params});

      return response.data;
    } catch (error) {
      if(error.response){
          console.log(error.response);
          throw new Error('게시글 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
          
      }else{
          throw new Error('서버와 연결할 수 없습니다.');
      }
    }
}

export {getAdminPosts};
