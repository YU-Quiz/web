// src/layouts/RootLayout.js
import { Outlet } from "react-router-dom";
import Header from "../components/root/Header";
import styled from "styled-components";

const RootLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const MainContainer = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;

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

      {/* <Footer /> */}
    </RootLayoutContainer>
  );
};

export default RootLayout;
