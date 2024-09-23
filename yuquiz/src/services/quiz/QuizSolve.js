import { HttpStatusCode } from "axios";
import api from "../apiService";
const SERVER_API = process.env.REACT_APP_YUQUIZ;

const getGrade = async (quizId, answer) => {
  try {
    const res = await api.post(`${SERVER_API}/quizzes/${quizId}/grade`, answer);
    if (res.code === HttpStatusCode.Accepted) {
      return res.reponse;
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
    const res = await api.get(`${SERVER_API}/quizzes/${quizId}/grade`, {
      params,
    });
    if (res.code === HttpStatusCode.Accepted) {
      return res.reponse;
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
