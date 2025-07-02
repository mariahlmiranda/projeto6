import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import Modal from '../components/Modal';

const RestaurantBanner = styled.div`
  height: 280px;
  background-size: cover;
  background-position: center;
  color: white;
  position: relative;
  background-image: ${props => `url(${props.bgImage})`};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 0;
`;
const RestaurantCuisine = styled.p`
  font-size: 32px;
  font-weight: 100;
  text-transform: capitalize;
`;
const RestaurantName = styled.h2`
  font-size: 32px;
  font-weight: 900;
`;
const FoodList = styled.div`
  padding: 56px 0 120px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurant(data));
  }, [id]);

  const handleOpenModal = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  if (!restaurant) {
    return <p style={{textAlign: 'center', padding: '40px'}}>Carregando...</p>;
  }

  return (
    <>
      {isModalOpen && <Modal food={selectedFood} onClose={handleCloseModal} />}
      <Header />
      <main>
        <RestaurantBanner bgImage={restaurant.capa}>
          <div className="container">
            <BannerContent>
              <RestaurantCuisine>{restaurant.tipo}</RestaurantCuisine>
              <RestaurantName>{restaurant.titulo}</RestaurantName>
            </BannerContent>
          </div>
        </RestaurantBanner>
        <section className="container">
          <FoodList>
            {restaurant.cardapio.map(food => (
              <FoodCard
                key={food.id}
                {...food}
                onClick={() => handleOpenModal(food)}
              />
            ))}
          </FoodList>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Restaurant;
