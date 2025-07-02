import React from 'react';
import styled from 'styled-components';

const FoodCardWrapper = styled.div`
  background-color: #E66767;
  color: #FFEBD9;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
const FoodImage = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  margin-bottom: 8px;
`;
const FoodTitle = styled.h4`
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 8px;
`;
const FoodDescription = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 8px;
  flex-grow: 1;
`;
const AddButton = styled.button`
  background-color: #FFEBD9;
  color: #E66767;
  border: none;
  width: 100%;
  padding: 4px 0;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const FoodCard = ({ foto, nome, descricao, onClick }) => (
  <FoodCardWrapper>
    <FoodImage src={foto} alt={nome} />
    <FoodTitle>{nome}</FoodTitle>
    <FoodDescription>{descricao}</FoodDescription>
    <AddButton onClick={onClick}>Mais detalhes</AddButton>
  </FoodCardWrapper>
);

export default FoodCard;
