import { HttpStatusCode } from "axios";
import api from "../apiService";
const SERVER_API = process.env.REACT_APP_YUQUIZ;
const getGrade = async (quizId, answer) => {
  try {
    const res = await api.post(`${SERVER_API}/quizzes/${quizId}/grade`, answer);
    console.log("getGrade 함수 리턴값임", res); // 객체를 문자열로 변환하지 않고 그대로 출력
    if (res.status === HttpStatusCode.Ok) {
      // HttpStatusCode.Ok 또는 200 확인
      return res.data.response; // res.data.response로 수정하여 올바른 데이터 접근
    }
  } catch (error) {
    if (error.response) {
      throw new Error("퀴즈가 존재하지 않습니다.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

const getAnswer = async (quizId) => {
  const params = {
    quizId: quizId,
  };
  try {
    const res = await api.get(`${SERVER_API}/quizzes/${quizId}/answer`, {
      params,
    });
    if (res.status === HttpStatusCode.Ok) {
      return res.data.response;
    }
  } catch (error) {
    if (error.response) {
      throw new Error("퀴즈가 존재하지 않습니다.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};
export { getGrade, getAnswer };
