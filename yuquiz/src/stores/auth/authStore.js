// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,  // Access Token만 상태로 관리
      isAuthenticated: false,  // 로그인 여부

      // 로그인 함수 (Access Token만 상태에 저장)
      login: (accessToken) => {
        set({
          accessToken,
          isAuthenticated: true,
        });
      },

      // 로그아웃 함수
      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
        });
      },

      // Access Token 갱신
      setAccessToken: (newToken) => {
        set({ accessToken: newToken });
      },
    }),
    {
      name: 'auth', // sessionStorage에 저장할 키 이름
      getStorage: () => sessionStorage, // sessionStorage에 저장
    }
  )
);

export default useAuthStore;