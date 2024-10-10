import api from "../../apiService";
import { setAccessToken, removeAccessToken } from "../../../utils/token";
import useAuthStore from "../../../stores/auth/authStore";

const SERVER_API = process.env.REACT_APP_YUQUIZ;

// 공통 에러 처리 함수
const handleError = (error, defaultMessage) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 404 || status === 423) {
      throw new Error(data.message);
    } else {
      throw new Error(defaultMessage);
    }
  } else {
    throw new Error("서버와 연결할 수 없습니다.");
  }
};

// 로그인 함수
const login = async (username, password) => {
  try {
    const response = await api.post(`${SERVER_API}/auth/sign-in`, {
      username,
      password,
    });
    const { accessToken } = response.data;

    setAccessToken(accessToken); // sessionStorage에 Access Token 저장
    useAuthStore.getState().login(accessToken); // Zustand 상태 업데이트

    return response.data;
  } catch (error) {
    handleError(error, "로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
  }
};
const kakaoLogin = async (code) => {
  try {
    const response = await api.post("/auth/sign-in/kakao", { code });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("카카오 로그인 중 문제가 발생했습니다.");
    }
  }
};

// 로그아웃 함수
const logout = async () => {
  try {
    const accessToken = useAuthStore.getState().accessToken;

    const response = await api.get(`${SERVER_API}/auth/sign-out`, {
      headers: {
        Authorization: accessToken, // Access Token 포함
      },
    });

    useAuthStore.getState().logout(); // Zustand 상태에서 로그아웃 처리
    removeAccessToken(); // sessionStorage에서 Access Token 삭제

    return response.data;
  } catch (error) {
    handleError(error, "로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
  }
};

export { login, kakaoLogin, logout };
