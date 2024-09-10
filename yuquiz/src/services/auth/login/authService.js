import api from '../../apiService';
import { setAccessToken, removeAccessToken } from '../../../utils/token';
import useAuthStore from '../../../stores/auth/authStore';

const login = async (username, password) => {
  try {
    const response = await api.post(`/auth/sign-in`, { username, password });
    const { accessToken } = response.data;

    setAccessToken(accessToken); // sessionStorage에 Access Token 저장
    useAuthStore.getState().login(accessToken); // Zustand 상태 업데이트

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`${error.response.data.message}`);
      } else if (error.response.status === 423) { // 423 Locked
        throw new Error(`${error.response.data.message}`);
      } else {
        throw new Error("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

const logout = async () => {
  try {
    const accessToken = useAuthStore.getState().accessToken;

    const response = await api.get(`/auth/sign-out`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Access Token 포함
      },
    });

    useAuthStore.getState().logout(); // Zustand 상태에서 로그아웃 처리
    removeAccessToken(); // sessionStorage에서 Access Token 삭제

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`${error.response.data.message}`);
      } else {
        throw new Error("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

export { login, logout };
