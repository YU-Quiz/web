import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/auth/authStore";

const PrivateRoute = ({ children }) => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  if (!isAuth) {
    alert("로그인이 필요한 서비스 입니다.");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
