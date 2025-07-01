import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #FFF8F2;
  padding: 40px 0;
  text-align: center;
  margin-top: 80px;
`;
const FooterLogo = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #E66767;
  margin-bottom: 24px;
`;
const SocialLinks = styled.div`
  margin-bottom: 40px;
  img { margin: 0 8px; cursor: pointer; }
`;
const FooterText = styled.p`
  font-size: 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Footer = () => (
  <FooterContainer>
    <FooterLogo>efood</FooterLogo>
    <SocialLinks>
      <img src="https://placehold.co/24x24/E66767/FFF?text=F" alt="Facebook" />
      <img src="https://placehold.co/24x24/E66767/FFF?text=I" alt="Instagram" />
      <img src="https://placehold.co/24x24/E66767/FFF?text=T" alt="Twitter" />
    </SocialLinks>
    <FooterText>
      A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
    </FooterText>
  </FooterContainer>
);

export default Footer;