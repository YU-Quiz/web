import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/yuquiz_logo.png";
import useAuthStore from "../../stores/auth/authStore";
import { CgProfile } from "react-icons/cg";

const TopBarContainer = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  scroll: none;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  background-color: white;
  height: 50px;
  padding: 0 20px;
`;

const NavButton = styled(Link)`
  padding: 10px 20px;
  background: none;
  color: black;
  border: none;
  font-size: 16px;
  font-weight: 550;
  text-decoration: none;
  &:hover {
    color: #007bff;
  }
`;

const LogoButton = styled.img`
  width: 80px;
  height: 80px;
`;

const ProfileButton = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 550;
  color: black;
  text-decoration: none;
  margin-right: 20px;
  &:hover {
    color: #007bff;
  }
`;

const ProfileIcon = styled(CgProfile)`
  margin-right: 5px;
  font-size: 24px;
`;

const AuthButton = styled.button`
  padding: 5px 10px;
  margin-left: auto; /* 오른쪽 끝으로 이동 */
  border-radius: 8px;
  background: #6f6e6e;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background: #555555;
  }
`;

const HorizonHr = styled.hr`
  color: #ccc5c5;
  opacity: 0.3;
`;

const Header = () => {
  const { userInfo, accessToken, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <TopBarContainer>
      <Navbar>
        <NavButton to="/">
          <LogoButton
            src={logo}
            alt="홈으로"
            title="누르시면 홈화면으로 돌아갑니다."
          />
        </NavButton>
        <NavButton to="/quiz">퀴즈</NavButton>
        <NavButton to="/posts">게시판</NavButton>

        {/*
        {//<NavButton to="/leaderboard">LeaderBoard</NavButton>}*/}
        <NavButton to="/quizseries/list">문제집</NavButton>
        <NavButton to="/study">스터디</NavButton>

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          {accessToken ? (
            <>
              {/* 프로필 버튼이 로그아웃 버튼 왼쪽에 위치 */}
              <ProfileButton to="/my">
                <ProfileIcon />
                {userInfo.nickname}
              </ProfileButton>
              <AuthButton onClick={handleLogout}>로그아웃🔒</AuthButton>
            </>
          ) : (
            <AuthButton onClick={() => navigate("/login")}>로그인🔓</AuthButton>
          )}
        </div>
      </Navbar>
      <HorizonHr />
    </TopBarContainer>
  );
};

export default Header;
