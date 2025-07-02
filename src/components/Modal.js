import React from 'react';
import styled from 'styled-components';

import closeIcon from '../assets/close.svg'; // Você precisará criar este ícone

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  background-color: #E66767;
  color: #FFFFFF;
  padding: 32px;
  position: relative;
  z-index: 11;
  display: flex;
  gap: 24px;
  max-width: 1024px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const FoodImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const FoodDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const FoodTitle = styled.h3`
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 16px;
`;

const FoodDescription = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  flex-grow: 1;
`;

const AddToCartButton = styled.button`
  background-color: #FFEBD9;
  color: #E66767;
  border: none;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-start;
`;

const Modal = ({ food, onClose }) => {
  if (!food) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton src={closeIcon} alt="Fechar" onClick={onClose} />
        <FoodImage src={food.foto} alt={food.nome} />
        <FoodDetails>
          <FoodTitle>{food.nome}</FoodTitle>
          <FoodDescription>
            {food.descricao}
            <br /><br />
            Serve: {food.porcao}
          </FoodDescription>
          <AddToCartButton>
            Adicionar ao carrinho - {formatPrice(food.preco)}
          </AddToCartButton>
        </FoodDetails>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

// Crie um novo arquivo em `src/assets/close.svg` e cole este código SVG:
// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//   <path d="M15 1L1 15" stroke="white" stroke-width="2"/>
//   <path d="M1 1L15 15" stroke="white" stroke-width="2"/>
// </svg>