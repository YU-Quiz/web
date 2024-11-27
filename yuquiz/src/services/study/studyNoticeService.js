
import { STUDY_NOTICE_SORT_OPTIONS } from "../../constants/study/studyNoticeSortOption";
import api from "../apiService";

// 스터디 공지 리스트 조회
const getStudyNoticesList = async (
    studyId, 
    keyword = "",
    categoryId = null,
    sort = STUDY_NOTICE_SORT_OPTIONS.DATE_DESC.value,
    page = 0
  ) => {
    try {
      const params = {};
  
      if (keyword) params.keyword = keyword;
      if (categoryId) params.categoryId = categoryId;
      if (sort) params.sort = sort;
      if (page >= 0) params.page = page;
  
      const response = await api.get(`/study/${studyId}/notice`, {
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
            throw new Error("스터디 공지 목록 불러오는 중 문제 발생. 다시 시도해주세요.");
        }
      } else {
        throw new Error("서버와 연결할 수 없습니다.");
      }
    }
  };

  const createStudyNotice = async (studyId, noticeData) => {
    try {
      const response = await api.post(`/study/${studyId}/notice`, noticeData);
      return response.data; // 성공 시 API 응답 반환
    } catch (error) {
        if (error.response) {
            const { status, message } = error.response.data;
    
            if (status === 403) {
                throw new Error(message || '스터디장이 아닙니다.');
            } else if (status === 404) {
                throw new Error(message || '존재하지 않는 스터디입니다.');
            } else {
                throw new Error("스터디 공지 작성 중 문제 발생. 다시 시도해주세요.");
            }
        } else {
            throw new Error("서버와 연결할 수 없습니다.");
        }
    }
  };

  export {getStudyNoticesList, createStudyNotice};