import React from 'react';
import '../../styles/root/ProfileCard.scss';

const ProfileCard = () => {
    return (
        <div className="root-profile-container">
            <div className="profile-picture"></div>
            <div className="profile-details">
                <h2>원영 정</h2>
                <p>@garden0</p>
                <div className="profile-stats">
                    <p>100 Quizzes</p>
                    <p>50 Badges</p>
                    <p>1000 Points</p>
                </div>
                <div className="profile-actions">
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
