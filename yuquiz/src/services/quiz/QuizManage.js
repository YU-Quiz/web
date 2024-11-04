import { HttpStatusCode } from "axios";
import api from "../apiService";
import { SORT_QUIZ_POST } from "../../constants/sort/SortType";
const SERVER_API = process.env.REACT_APP_YUQUIZ;

const SORT_OPTIONS = SORT_QUIZ_POST;

const getQuizList = async (
  keyword = "",
  subject = null,
  sort = "DATE_DESC",
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

const getQuiz = async (quizID) => {
  try {
    // API 호출
    const response = await api.get(`${SERVER_API}/quizzes/${quizID}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error("퀴즈가 존재하지 않습니다.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};
const fixQuiz = async (quizData) => {
  try {
    const response = await api.put(
      `${SERVER_API}/quizzes/${quizData.quizId}`,
      quizData
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error("퀴즈 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};
const deleteQuiz = async (quizId) => {
  try {
    const response = await api.delete(`${SERVER_API}/quizzes/${quizId}`);
    if (response.status === HttpStatusCode.NoContent) {
      alert("삭제 성공");
    }
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error("퀴즈 삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};
const pinQuiz = async (quizId, starred) => {
  try {
    //만약에 true로 날라오면 즐찾을 눌렀다는 것 반대는 삭제하면됨
    const response =
      starred === true
        ? await api.post(`${SERVER_API}/quizzes/${quizId}/pin`)
        : await api.delete(`${SERVER_API}/quizzes/${quizId}/pin`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "퀴즈 즐겨찾기 과정 중에서 문제가 발생했습니다. 다시 시도해주세요."
      );
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};
const likeQuiz = async (quizId, liked) => {
  try {
    //만약에 true로 날라오면 좋아요를 눌렀다는 것 반대는 삭제하면됨
    const response =
      liked === true
        ? await api.post(`${SERVER_API}/quizzes/${quizId}/likes`)
        : await api.delete(`${SERVER_API}/quizzes/${quizId}/likes`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "퀴즈 좋아요 과정 중에서 문제가 발생했습니다. 다시 시도해주세요."
      );
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

const sendReport = async (data, quizID) => {
  console.log(data);
  try {
    const response = await api.post(
      `${SERVER_API}/quizzes/${quizID}/report`,
      data
    );
    if (response) {
      alert("신고 성공!");
    }
    return response;
  } catch (error) {
    if (error.response.status === HttpStatusCode.Conflict) {
      alert(error.response.message || "이미 신고한 퀴즈입니다.");
    } else {
      alert("존재하지 않는 퀴즈거나 서버와 연결할 수 없습니다.");
    }
  }
};

export {
  getQuizList,
  SORT_OPTIONS,
  getQuiz,
  fixQuiz,
  deleteQuiz,
  pinQuiz,
  likeQuiz,
  sendReport,
};
