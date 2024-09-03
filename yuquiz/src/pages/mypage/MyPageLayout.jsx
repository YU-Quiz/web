import ProfileCard from '../../components/mypage/ProfileCard';
import { Outlet } from 'react-router-dom';
import "../../styles/mypage/MyPageLayout.scss";

const MyPageLayout = () => {
  
    return (
        <div className='mypage-container'>
            <ProfileCard />
            <Outlet />
        </div>
    );
  }
  
  export default MyPageLayout;
