import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

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

const Home = () => (
  <>
    <Header />
    <main>
      <HeroSection>
        <div className="container">
          <HeroTitle>Viva experiências gastronômicas no conforto da sua casa</HeroTitle>
        </div>
      </HeroSection>
      <section className="container">
        <RestaurantList>
          {mockRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </RestaurantList>
      </section>
    </main>
    <Footer />
  </>
);

export default Home;
