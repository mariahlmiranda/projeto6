import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

const mockRestaurants = [
  {
    id: 1,
    title: "Hioki Sushi",
    rating: 4.9,
    description: "Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
    tags: ["Destaque da semana", "Japonês"],
    type: 'Japonesa',
    menu: [
        { id: 1, title: 'Combinado Sushi', description: 'Seleção especial do chef com 20 peças variadas.', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop' },
        { id: 2, title: 'Temaki Salmão', description: 'Cone de alga recheado com arroz, salmão fresco e cream cheese.', image: 'https://images.unsplash.com/photo-1591372375782-68a4274a7398?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  {
    id: 2,
    title: "La Dolce Vita Trattoria",
    rating: 4.6,
    description: "A La Dolce Vita Trattoria leva a autêntica culinária italiana até você! Desfrute de massas caseiras, pizzas deliciosas e molhos incríveis.",
    image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=1974&auto=format&fit=crop",
    tags: ["Italiana"],
    type: 'Italiana',
    menu: [
        { id: 1, title: "Pizza Marguerita", description: "A clássica Marguerita: molho de tomate suculento, mussarela derretida e manjericão.", image: "https://images.unsplash.com/photo-1598021680133-eb3a7331d324?q=80&w=1974&auto=format&fit=crop" },
        { id: 2, title: "Pizza Pepperoni", description: "Uma explosão de sabor com pepperoni, queijo mussarela e molho de tomate.", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1974&auto=format&fit=crop" },
        { id: 3, title: "Pizza Quatro Queijos", description: "Para os amantes de queijo: mussarela, provolone, parmesão e gorgonzola.", image: "https://images.unsplash.com/photo-1528137871618-674276e78a3f?q=80&w=2070&auto=format&fit=crop" },
    ]
  },
];

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
  const restaurant = mockRestaurants.find(r => r.id === parseInt(id));

  if (!restaurant) {
    return <h2 style={{textAlign: 'center', padding: '40px'}}>Restaurante não encontrado!</h2>;
  }

  return (
    <>
      <Header />
      <main>
        <RestaurantBanner bgImage={restaurant.image}>
          <div className="container">
            <BannerContent>
              <RestaurantCuisine>{restaurant.type}</RestaurantCuisine>
              <RestaurantName>{restaurant.title}</RestaurantName>
            </BannerContent>
          </div>
        </RestaurantBanner>
        <section className="container">
          <FoodList>
            {restaurant.menu.map(food => (
              <FoodCard key={food.id} {...food} />
            ))}
          </FoodList>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Restaurant;