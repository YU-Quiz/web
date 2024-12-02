import { QUIZ_SORT_OPTIONS } from "../../constants/admin/quizSortOption";
import api from "../apiService";

const getAdminQuizzes = async (sort, page) => {
  try {
    const params = {};

    const sortOptions = Object.values(QUIZ_SORT_OPTIONS).map(
      (option) => option.value
    );

    if (sort && sortOptions.includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = "DATE_DESC"; // 기본값 설정
    }

    if (page >= 0) params.page = page;

    const response = await api.get("/admin/quizzes", { params });

    return response.data;
  } catch (error) {
    if (error.response) {
      //console.log(error.response);
      throw new Error("퀴즈 목록 불러오는 중 문제 발생. 다시 시도해주세요.");
    } else {
      //console.log(error);
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

// 게시글 삭제
const forceDeleteQuiz = async (quizId) => {
  try {
    const response = await api.delete(`/admin/quizzes/${quizId}`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(`퀴즈 강제삭제중 문제 발생. 다시 시도해주세요.`);
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

export { getAdminQuizzes, forceDeleteQuiz };
