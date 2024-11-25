import { HttpStatusCode } from "axios";
import api from "../apiService";

const API_BASE_URL = "/series";

// 문제집 목록 조회
export const getSeriesList = async (
  keyword = "",
  sort = "DATE_DESC",
  page = 0
) => {
  try {
    const response = await api.get(API_BASE_URL, {
      params: {
        keyword,
        sort,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("문제집 목록 조회 실패:", error);
    throw error;
  }
};

// 문제집 생성
export const createSeries = async (seriesData) => {
  try {
    const response = await api.post(API_BASE_URL, seriesData);
    return response.data;
  } catch (error) {
    console.error("문제집 생성 실패:", error);
    throw error;
  }
};

// 문제집 수정
export const updateSeries = async (seriesId, seriesData) => {
  try {
    const response = await api.put(`${API_BASE_URL}/${seriesId}`, seriesData);
    console.log(response);
    alert(response.data.response);
    return response.data;
  } catch (error) {
    console.error("문제집 수정 실패:", error);
    throw error;
  }
};

// 문제집 삭제
export const deleteSeries = async (seriesId) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/${seriesId}`);
    return response.data;
  } catch (error) {
    console.error("문제집 삭제 실패:", error);
    throw error;
  }
};
// 문제집 상세 정보 조회
export const getSeriesDetail = async (seriesId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${seriesId}`);
    return response.data;
  } catch (error) {
    console.error("문제집 상세 정보 조회 실패:", error);
    throw error;
  }
};

export const addQuizToSeries = async (seriesId, quizId) => {
  try {
    const response = await api.post(`/series/quizzes/${seriesId}/${quizId}`);
    console.log(response);
    if (response.status === HttpStatusCode.Created) {
      console.log("문제 추가 성공!");
    } else if (response.status === HttpStatusCode.NotFound) {
      console.error("이미 존재하는 문제입니다.");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const getQuizListInSeries = async (seriesId) => {
  try {
    const response = await api.get(`/series/${seriesId}/quizzes`, {
      params: { page: 0 },
    });
    if (response.status === HttpStatusCode.Ok) {
      console.log("문제 추가 성공!");
    } else if (response.status === HttpStatusCode.Forbidden) {
      console.error("권한이 없습니다.");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteQuizFromSeries = async (seriesId, quizId) => {
  try {
    const response = await api.delete(`/series/quizzses/${seriesId}/${quizId}`);
    if (response.status === HttpStatusCode.NoContent) {
      console.log("문제 삭제 성공!");
    } else if (response.status === HttpStatusCode.Forbidden) {
      console.error("권한이 없습니다.");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
