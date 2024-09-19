import { Link, useNavigate } from 'react-router-dom';
import '../../styles/mypage/ProfileCard.scss';
import { logout } from '../../services/auth/login/authService';

const ProfileCard = () =>{
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();  // API 로그아웃 호출
            navigate('/');
        } catch (error) {
            alert(error.message);  // 에러 처리 (필요에 따라 수정 가능)
        }
    };

    return(
        <div className="profile-container">
            <div className="profile-picture"></div>
            <div className="profile-details">
                <h2>원영 정</h2>
                <p>@garden0</p>
                <div className="profile-stats">
                    <p>100 Quizzes</p>
                    <p>50 Badges</p>
                    <p>1000 Points</p>
                </div>
            </div>
            <div className="profile-actions">
                <Link to='/my/edit' className='action-btn'>정보 수정</Link>
                <button onClick={handleLogout} className='login-btn'>
                            Logout
                        </button>
            </div>
            <Link to='/' className='withdraw-btn'>회원탈퇴</Link>
        </div>
    );
}

export default ProfileCard;