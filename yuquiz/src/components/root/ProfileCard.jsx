import React from "react";
import "../../styles/root/ProfileCard.scss";
import { Link } from "react-router-dom";
import useAuthStore from "../../stores/auth/authStore";
import { logout } from "../../services/auth/login/authService";

const ProfileCard = () => {
  const { isAuthenticated } = useAuthStore(); // 상태와 Zustand의 로그아웃 함수 가져오기
  const userInfo = useAuthStore((state) => state.userInfo);

  const handleLogout = async () => {
    try {
      await logout(); // API 로그아웃 호출
    } catch (error) {
      alert(error.message); // 에러 처리 (필요에 따라 수정 가능)
    }
  };

  // username이 undefined가 아닐 때만 처리, 아니면 빈 문자열로 처리
  const displayUsername = userInfo.username
    ? userInfo.username.length > 10
      ? `${userInfo.username.slice(0, 10)}...`
      : userInfo.username
    : "";

  return (
    <div className="root-profile-container">
      <div className="profile-picture"></div>
      <div className="profile-details">
        {isAuthenticated ? (
          <>
            <Link to="/my">
              <h2>{userInfo.nickname || "닉네임 없음"}</h2>
              <br />
              <p>
                {displayUsername
                  ? `@` + displayUsername
                  : "🎉최초 로그인을 환영합니다🥳"}
              </p>
            </Link>

            <div className="profile-stats">
              <p>100 Quizzes</p>
              <p>50 Badges</p>
              <p>1000 Points</p>
            </div>
          </>
        ) : (
          <>
            <h2>로그인 하세요</h2>
            <br />
          </>
        )}

        <div className="profile-actions">
          {isAuthenticated ? (
            // 로그인 상태일 때는 로그아웃 버튼을 보여줍니다.
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          ) : (
            // 로그인 상태가 아니면 로그인, 회원가입 버튼을 보여줍니다.
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="login-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {isAuthenticated&&userInfo.role==="ADMIN" ? (
        <Link to='/admin/users-control'>관리자 페이지</Link>
      ):(
        <></>
      )}
    </div>
  );
};

export default ProfileCard;
