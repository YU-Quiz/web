import { Link } from 'react-router-dom';
import '../../styles/mypage/ProfileCard.scss';

const ProfileCard = () =>{
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
                <Link to='/my/edit' className='action-btn'></Link>
                <Link to='/'>로그아웃</Link>
            </div>
            <Link to='/' className='withdraw-btn'>회원탈퇴</Link>
        </div>
    );
}

export default ProfileCard;