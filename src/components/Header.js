import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../store/cartSlice';

const HeaderContainer = styled.header`
  background-color: #FFF8F2;
  padding: 40px 0;
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderLogo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #E66767;
`;

const CartButton = styled.span`
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
`;

const Header = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const openCart = () => {
        dispatch(open());
    }

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <HeaderLogo>efood</HeaderLogo>
            </Link>
            <CartButton onClick={openCart}>
                {items.length} produto(s) no carrinho
            </CartButton>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

export default Header;
