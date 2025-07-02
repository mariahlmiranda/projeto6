import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StarIconSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="#E66767">
        <path d="M10.5 0L12.8574 7.25532H20.4861L14.3143 11.7394L16.6717 18.9947L10.5 14.5106L4.32825 18.9947L6.68565 11.7394L0.513906 7.25532H8.1426L10.5 0Z" />
    </svg>
);

const RestaurantCardWrapper = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E66767;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const CardImage = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`;
const CardContent = styled.div`
  padding: 8px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const TagsContainer = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 8px;
`;
const Tag = styled.div`
  background-color: #E66767;
  color: #FFEBD9;
  padding: 6px 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
`;
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;
const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  svg { margin-left: 8px; }
`;
const CardDescription = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  flex-grow: 1;
`;
const CardButton = styled(Link)`
  background-color: #E66767;
  color: #FFEBD9;
  border: none;
  padding: 4px 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  align-self: flex-start;
`;

const RestaurantCard = ({ id, capa, titulo, avaliacao, descricao, tipo, destaque }) => (
  <RestaurantCardWrapper>
    <CardImage src={capa} alt={titulo} />
    <TagsContainer>
        {destaque && <Tag>Destaque da semana</Tag>}
        <Tag>{tipo}</Tag>
    </TagsContainer>
    <CardContent>
      <TitleRow>
        <CardTitle>{titulo}</CardTitle>
        <Rating>{avaliacao} <StarIconSvg /></Rating>
      </TitleRow>
      <CardDescription>{descricao}</CardDescription>
      <CardButton to={`/restaurant/${id}`}>Saiba mais</CardButton>
    </CardContent>
  </RestaurantCardWrapper>
);

export default RestaurantCard;
