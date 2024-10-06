// src/stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../services/apiService";

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null, // Access Token만 상태로 관리
      isAuthenticated: false, // 로그인 여부
      userInfo: null,

      // 로그인 함수 (Access Token을 먼저 상태에 저장하고, 이후 API 요청)
      login: async (accessToken) => {
        try {
          // 먼저 accessToken을 상태에 저장
          set({
            accessToken,
            isAuthenticated: true,
          });

          // accessToken 저장 후 API 호출하여 userInfo 가져오기
          const userInfo = await api.get(`users/my`);
          console.log(userInfo);

          // userInfo를 상태에 저장
          set({
            userInfo: userInfo.data, // 가져온 userInfo 저장
          });
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          // 에러 처리 로직을 추가할 수 있습니다
        }
      },

      // 로그아웃 함수
      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          userInfo: null, // 로그아웃 시 userInfo 초기화
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
      name: "auth", // sessionStorage에 저장할 키 이름
      getStorage: () => sessionStorage, // sessionStorage에 저장
    }
  )
);

export default useAuthStore;
