import { HttpStatusCode } from "axios";
import api from "../apiService";
import { STUDY_LIST_SORT_OPTIONS } from "../../constants/study/studySortOption";


// 스터디 리스트 조회
const getStudyList = async (
    keyword = "",
    sort = STUDY_LIST_SORT_OPTIONS.CREATED_DESC.value,
    filter = "ALL",
    page = 0,
    size = 10 // Default size for pagination
  ) => {
    try {
      const params = {};
  
      if (keyword) params.keyword = keyword;
      if (sort) params.sort = sort;
      if (filter) params.filter = filter;
      if (page >= 0) params.page = page;
      if (size > 0) params.size = size;
  
      const response = await api.get(`/study`, {
        params: params,
      });
      console.log(params);
      console.log(response.data);
  
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error("스터디 목록 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
      } else {
        throw new Error("서버와 연결할 수 없습니다.");
      }
    }
  };
  
// 스터디 생성
const createStudy = async (study) => {
    try {
  
      const response = await api.post(`/study`, study, {});
  
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          // 유효성 검사 실패
          const errorDetails = error.response.data;
          throw new Error(
            `유효성 검사 실패: ${Object.values(errorDetails).join(", ")}`
          );
        } else {
          throw new Error("스터디 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        throw new Error("서버와 연결할 수 없습니다.");
      }
    }
  };
  
// 스터디 조회
const showStudy = async (studyId) => {
    try {
      const response = await api.get(`/study/${studyId}`, {});
  
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          // 스터디가 존재하지 않는 경우
          throw new Error(`${error.response.data.message}`);
        } else {
          // 기타 서버 에러 처리
          throw new Error("스터디 조회 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // 네트워크 에러 처리
        throw new Error("서버와 연결할 수 없습니다.");
      }
    }
  };
  

// 스터디 수정
const editStudy = async ( studyId, studyData ) => {
    try {
  
      const response = await api.put(`/study/${studyId}`, studyData);
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          // 유효성 검사 실패
          const errorDetails = error.response.data;
          throw new Error(
            `유효성 검사 실패: ${Object.values(errorDetails).join(", ")}`
          );
        } else if (error.response.status === 403) {
          // 권한 없음
          throw new Error(`${error.response.data.message}`);
        } else {
          throw new Error("스터디 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        throw new Error("서버와 연결할 수 없습니다.");
      }
    }
  };
  
// 스터디 삭제
const removeStudy = async (studyId) => {
    try {
      const response = await api.delete(`/study/${studyId}`);
  
      if (response.status === 204) {
        console.log("스터디 삭제 성공");
        return { message: "스터디 삭제 성공" };
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          // 권한 없음
          throw new Error(`${error.response.data.message}`);
        } else {
          // 기타 서버 에러 처리
          throw new Error("스터디 삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // 네트워크 에러 처리
        throw new Error("서버와 연결할 수 없습니다.");
      }
    }
  };
  

export { createStudy, showStudy, editStudy, removeStudy, getStudyList };
