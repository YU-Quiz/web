
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background: #fff;
  border-top: 1px solid #ccc5c5;
`;

const FooterInner = styled.div`
  width: 1140px;
  margin: 0px auto;
`;

const FooterUpper = styled.div`
  width: 100%;
  border-bottom: 1px solid #777;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const FooterTitle = styled.h1`
  font: bold 24px/1 "arial";
  color: #666;
`;

const FooterNav = styled.ul`
  display: flex;
  gap: 20px;
`;

const FooterNavItem = styled.li``;

const FooterNavLink = styled(Link)`
  font: bold 14px/1 "arial";
  color: #666;
`;

const FooterLower = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const FooterAddress = styled.address`
  width: 100%;
  font: 12px/1.3 "arial";
  color: #777;
  margin-bottom: 20px;
`;

const FooterCopyright = styled.p`
  width: 100%;
  font: 12px/1 "arial";
  color: #777;
  margin-bottom: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterUpper>
          <FooterTitle>YUQUIZ</FooterTitle>
          <FooterNav>
            <FooterNavItem>
              <FooterNavLink to={'https://github.com/YU-Quiz'}>Team</FooterNavLink>
            </FooterNavItem>
          </FooterNav>
        </FooterUpper>
        <FooterLower>
          <FooterAddress>
          경상북도 경산시 대학로 280 영남대학교<br />
            TEL : 053-810-2114 Fax : 053-810-2036
          </FooterAddress>
          <FooterCopyright>
            2024 YUQUIZ &copy; copyright all right reserved.
          </FooterCopyright>
        </FooterLower>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;
