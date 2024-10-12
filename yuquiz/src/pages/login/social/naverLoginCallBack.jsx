import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { naverLogin } from "../../../services/auth/login/authService";

const NaverLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get("code");
      const errorDescription = query.get("error_description");

      console.log("네이버 로그인 응답:", { code, errorDescription });

      if (code) {
        try {
          // 백엔드로 인가 코드를 전송하여 로그인 처리
          const response = await naverLogin(code);
          console.log("카카오 로그인 성공:", response);
          if (response === true) {
            navigate("/");
            return;
          }
          navigate("/register/oauth");
        } catch (error) {
          console.error("네이버 로그인 중 오류 발생:", error.message);
          setError("네이버 로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } else if (errorDescription) {
        // 네이버 로그인 중 오류가 발생한 경우
        console.error("네이버 로그인 실패:", errorDescription);
        setError("네이버 로그인에 실패했습니다. 다시 시도해주세요.");
      } else {
        setError("네이버 인증 코드가 전달되지 않았습니다.");
      }
    };

    handleKakaoLogin();
  }, [location, navigate]);

  return (
    <div>
      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => navigate("/login")}>
            로그인 페이지로 돌아가기
          </button>
        </div>
      ) : (
        <div>네이버 로그인 처리 중...</div>
      )}
    </div>
  );
};

export default NaverLoginCallback;
