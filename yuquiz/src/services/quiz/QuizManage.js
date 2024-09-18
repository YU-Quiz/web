import api from "../apiService";
const SERVER_API = process.env.REACT_APP_YUQUIZ;

// sort 값을 위한 enum (API에서 허용하는 값들)
const SORT_OPTIONS = {
  LIKE_DESC: "LIKE_DESC",
  LIKE_ASC: "LIKE_ASC",
  VIEW_DESC: "VIEW_DESC",
  VIEW_ASC: "VIEW_ASC",
  DATE_DESC: "DATE_DESC",
  DATE_ASC: "DATE_ASC",
};

const getQuizList = async (
  keyword = "",
  subject = null,
  sort = SORT_OPTIONS.DATE_DESC,
  page = 0
) => {
  try {
    // 유효한 값만 params에 포함시키는 방법
    const params = {};

    if (keyword) params.keyword = keyword;
    if (subject) params.subject = subject; // subject가 숫자 값일 것으로 가정
    if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = SORT_OPTIONS.DATE_DESC; // 기본값 설정
    }
    if (page >= 0) params.page = page;

    // API 호출
    const response = await api.get(`${SERVER_API}/quizzes`, { params });
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error("퀴즈 목록 불러오는 중 문제 발생. 다시 시도해주세요.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

export { getQuizList, SORT_OPTIONS };
