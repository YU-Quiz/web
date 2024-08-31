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
                <button className='action-btn'>정보 수정하기</button>
                <button className='action-btn'>로그아웃</button>
            </div>

            <button className='withdraw-btn'>회원탈퇴</button>
        </div>
    );
}

export default ProfileCard;