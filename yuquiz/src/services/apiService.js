import axios, { HttpStatusCode } from 'axios';
import useAuthStore from '../stores/auth/authStore';
import { setAccessToken, removeAccessToken } from '../utils/token';

const SERVER_API = process.env.REACT_APP_YUQUIZ;

const api = axios.create({
  baseURL: SERVER_API,
  withCredentials: true, // 쿠키로 Refresh Token 전송
});

// 요청 인터셉터: Access Token을 헤더에 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 처리 및 Access Token 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 Access Token 갱신
        const response = await axios.post(`${SERVER_API}/auth/token/refresh`, {}, {
          withCredentials: true, // 쿠키로 Refresh Token 전송
        });

        const { accessToken } = response.data;
        useAuthStore.getState().setAccessToken(accessToken); // 새로운 Access Token 상태에 저장
        setAccessToken(accessToken); // sessionStorage에 저장
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest); // 갱신된 Access Token으로 요청 재시도
      } catch (refreshError) {
        useAuthStore.getState().logout(); // 실패 시 로그아웃 처리
        removeAccessToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
