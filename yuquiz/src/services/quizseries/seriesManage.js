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
