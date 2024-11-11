import { Link } from "react-router-dom";
import styled from 'styled-components';

const TopBarContainer = styled.div`
    width: 100%;
    background-color: #f9f9f9;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333; /* Black background */
  padding: 10px 20px;
`;

const NavButton = styled(Link)`
  padding: 10px 20px;
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    color: #007bff; /* Optional hover color */
  }
`;

const Header = () => {
  return (
    <TopBarContainer>
      <Navbar>
        <NavButton to="/">홈으로</NavButton>
        <NavButton to="/my">마이페이지</NavButton>
      </Navbar>
    </TopBarContainer>
  );
};

export default Header;