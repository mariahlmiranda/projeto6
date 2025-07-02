import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { close, remove } from '../store/cartSlice';

// Crie o ícone em src/assets/trash.svg
const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E66767" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m3 0l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m3 .534l-.5 8.5a.5.5 0 1 0 .998.058l.5-8.5a.5.5 0 0 0-.998-.058Z"/></svg>`;
const trashIconDataUri = `data:image/svg+xml;base64,${btoa(trashIcon)}`;


const CartContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background-color: #E66767;
  z-index: 20;
  padding: 32px 8px;
  color: #FFEBD9;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  &.is-open {
    transform: translateX(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 19;
`;

const CartItem = styled.li`
  display: flex;
  background-color: #FFEBD9;
  padding: 8px;
  margin-bottom: 16px;
  position: relative;
  color: #E66767;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  h4 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
  }
`;

const TrashButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 14px;
  margin-top: 40px;
  margin-bottom: 16px;
`;

const ContinueButton = styled.button`
  background-color: #FFEBD9;
  color: #E66767;
  border: none;
  width: 100%;
  padding: 4px 0;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const Cart = () => {
  const { isOpen, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const closeCart = () => {
    dispatch(close());
  };

  const removeItem = (id) => {
    dispatch(remove(id));
  };

  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getTotalPrice = () => {
    return items.reduce((acc, currentItem) => {
        return acc + currentItem.preco;
    }, 0)
  }

  return (
    <>
      {isOpen && <Overlay onClick={closeCart} />}
      <CartContainer className={isOpen ? 'is-open' : ''}>
        <ul>
          {items.map((item) => (
            <CartItem key={item.id}>
              <img src={item.foto} alt={item.nome} />
              <div>
                <h4>{item.nome}</h4>
                <p>{formatPrice(item.preco)}</p>
              </div>
              <TrashButton onClick={() => removeItem(item.id)}>
                <img src={trashIconDataUri} alt="Remover" />
              </TrashButton>
            </CartItem>
          ))}
        </ul>
        <TotalPrice>
          <span>Valor total</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </TotalPrice>
        <ContinueButton>Continuar com a entrega</ContinueButton>
      </CartContainer>
    </>
  );
};

export default Cart;
