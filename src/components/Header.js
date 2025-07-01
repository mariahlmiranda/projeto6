import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #FFF8F2;
  padding: 40px 0;
  text-align: center;
`;
const HeaderLogo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #E66767;
`;

const Header = () => (
  <HeaderContainer>
    <div className="container">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <HeaderLogo>efood</HeaderLogo>
      </Link>
    </div>
  </HeaderContainer>
);

export default Header;
