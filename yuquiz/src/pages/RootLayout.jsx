import { Outlet } from "react-router-dom";
import Header from "../components/root/Header";
import Footer from "../components/root/Footer";
import styled from "styled-components";

const RootLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* 화면 전체 높이 */
`;

const MainContainer = styled.main`
  width: 100%;
  flex: 1; /* 남은 공간을 채움 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  /* align-items: center; 세로 중앙 정렬 */

  /* Responsive inner width */
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 720px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const RootLayout = () => {
  return (
    <RootLayoutContainer>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </RootLayoutContainer>
  );
};

export default RootLayout;
