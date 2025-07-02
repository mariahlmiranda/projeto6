import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

const HeroSection = styled.div`
  text-align: center;
  padding: 24px 0 40px;
`;
const HeroTitle = styled.h2`
  font-size: 36px;
  font-weight: 900;
  max-width: 540px;
  margin: 0 auto;
`;
const RestaurantList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 80px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection>
          <div className="container">
            <HeroTitle>Viva experiências gastronômicas no conforto da sua casa</HeroTitle>
          </div>
        </HeroSection>
        <section className="container">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <RestaurantList>
              {restaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                />
              ))}
            </RestaurantList>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
