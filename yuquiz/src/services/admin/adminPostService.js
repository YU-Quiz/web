import { POST_SORT_OPTIONS } from "../../constants/admin/postSortOption";
import api from "../apiService";

const getAdminPosts = async (sort, page) => {
  try {
    const params = {};

    // POST_SORT_OPTIONS에서 value를 사용하여 비교
    const sortOptions = Object.values(POST_SORT_OPTIONS).map(option => option.value);
    
    if (sort && sortOptions.includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = 'DATE_DESC'; // 기본값 설정
    }

    if (page >= 0) params.page = page;

    const response = await api.get("/admin/posts", { params });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      throw new Error('게시글 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    } else {
      throw new Error('서버와 연결할 수 없습니다.');
    }
  }
};

export { getAdminPosts };
