import { STUDY_NOTICE_SORT_OPTIONS } from "../../constants/study/studyNoticeSortOption";
import api from "../apiService";

// 스터디 문제집 리스트 조회
const getStudySeriesList = async (
    studyId, 
    keyword = "",
    sort = STUDY_NOTICE_SORT_OPTIONS.DATE_DESC.value,
    page = 0
  ) => {
    try {
      const params = {};
  
      if (keyword) params.keyword = keyword;
      if (sort) params.sort = sort;
      if (page >= 0) params.page = page;
  
      const response = await api.get(`/study/${studyId}/series`, {
        params: params,
      });
    //   console.log(params);
    //   console.log(response.data);
  
      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;

        if (status === 403) {
            throw new Error(message || '스터디원이 아닙니다.');
        } else if (status === 404) {
            throw new Error(message || '존재하지 않는 스터디입니다.');
        } else {
            throw new Error("스터디 문제집 목록 불러오는 중 문제 발생. 다시 시도해주세요.");
        }
      } else {
        throw new Error("서버와 연결할 수 없습니다.");
      }
    }
  };

  export {getStudySeriesList};