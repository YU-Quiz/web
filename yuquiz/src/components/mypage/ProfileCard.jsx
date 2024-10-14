import { Link, useNavigate } from "react-router-dom";
import "../../styles/mypage/ProfileCard.scss";
import { logout } from "../../services/auth/login/authService";
import useAuthStore from "../../stores/auth/authStore";

const ProfileCard = () => {
  const navigate = useNavigate();
  const userInfo = useAuthStore((state) => state.userInfo);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 로그인 상태가 완전히 로드될 때까지 렌더링을 지연
  if (!isAuthenticated || !userInfo || !userInfo.nickname) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // 홈으로 이동
    } catch (error) {
      alert(error.message); // 에러 처리
    }
  };

  // username이 10글자 이상일 경우, 뒷부분을 '...'으로 처리
  const displayUsername =
    userInfo.username.length > 10
      ? `${userInfo.username.slice(0, 10)}...`
      : userInfo.username;

  return (
    <div className="profile-container">
      <div className="profile-picture"></div>
      <div className="profile-details">
        <h2>{userInfo.nickname}</h2>
        <p>@{displayUsername}</p>
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
