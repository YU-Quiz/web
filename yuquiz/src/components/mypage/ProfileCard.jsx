import { Link, useNavigate } from "react-router-dom";
import "../../styles/mypage/ProfileCard.scss";
import { logout } from "../../services/auth/login/authService";
import useAuthStore from "../../stores/auth/authStore";

const ProfileCard = () => {
  const navigate = useNavigate();

  const userInfo = useAuthStore((state) => state.userInfo);
  const handleLogout = async () => {
    try {
      await logout(); // API 로그아웃 호출
      navigate("/");
    } catch (error) {
      alert(error.message); // 에러 처리 (필요에 따라 수정 가능)
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-picture"></div>
      <div className="profile-details">
        <h2>{userInfo.nickname}</h2>
        <p>@{userInfo.username}</p>
        <div className="profile-stats">
          <p>100 Quizzes</p>
          <p>50 Badges</p>
          <p>1000 Points</p>
        </div>
      </div>
      <div className="profile-actions">
        <Link to="/my/edit" className="action-btn">
          정보 수정
        </Link>
        <button onClick={handleLogout} className="login-btn">
          Logout
        </button>
      </div>
      <Link to="/" className="withdraw-btn">
        회원탈퇴
      </Link>
    </div>
  );
};

export default ProfileCard;
