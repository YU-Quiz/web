// src/stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../services/apiService";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      userInfo: {
        username: "로딩 중",
        nickname: "로딩 중",
        email: "loading@loading.com",
        agreeEmail: false,
        majorName: "로딩학과",
        role: "USER",
      },

      // 로그인 함수
      login: async (accessToken) => {
        try {
          // AccessToken 설정
          set({ accessToken, isAuthenticated: true });
          // userInfo를 동기적으로 가져오기
          const userInfo = await api.get(`users/my`);
          console.log("유저정보: ", userInfo);
          if (userInfo && userInfo.data) {
            // 상태 동기적으로 설정 후 렌더링 진행
            set({
              userInfo: userInfo.data,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      },

      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          userInfo: {
            username: "",
            nickname: "",
            email: "",
            agreeEmail: false,
            majorName: "",
            role: "USER",
          },
        });
      },
      // Access Token 갱신
      setAccessToken: (newToken) => {
        set({ accessToken: newToken });
      },

      // 사용자 정보 갱신
      setUserInfo: (newUserInfo) => {
        set({ userInfo: newUserInfo });
      },
    }),

    {
      name: "auth",
      getStorage: () => sessionStorage,
    }
  )
);

export default useAuthStore;
