import React from 'react';
import '../../styles/root/ProfileCard.scss';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
    return (
        <div className="root-profile-container">
            <div className="profile-picture"></div>
            <div className="profile-details">
                <Link to='/my'><h2>원영 정</h2><br /><p>@garden0</p></Link>
                
                <div className="profile-stats">
                    <p>100 Quizzes</p>
                    <p>50 Badges</p>
                    <p>1000 Points</p>
                </div>
                <div className="profile-actions">
                    <Link to='/login' className='login-btn'>Login</Link>
                    <Link to='/register' className='login-btn'>Register</Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
