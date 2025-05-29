import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

const EbooksContainer = styled.div`
  padding-top: ${props => props.theme.layout.headerHeight};
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #8BC34A 0%, #689F38 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const EbooksGrid = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const EbookCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EbookImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

const EbookContent = styled.div`
  padding: 25px;
`;

const EbookTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const EbookDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
`;

const EbookPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const Ebooks = () => {
  const { t } = useTranslation();

  const ebooks = [
    {
      id: 1,
      titleKey: 'ebooks.beginner_guide.title',
      descriptionKey: 'ebooks.beginner_guide.description',
      priceKey: 'ebooks.beginner_guide.price',
      ctaKey: 'ebooks.beginner_guide.cta',
      image: '/images/ebook-beginner.jpg'
    },
    {
      id: 2,
      titleKey: 'ebooks.meal_plan.title',
      descriptionKey: 'ebooks.meal_plan.description',
      priceKey: 'ebooks.meal_plan.price',
      ctaKey: 'ebooks.meal_plan.cta',
      image: '/images/ebook-meal-plan.jpg'
    },
    {
      id: 3,
      titleKey: 'ebooks.recipes.title',
      descriptionKey: 'ebooks.recipes.description',
      priceKey: 'ebooks.recipes.price',
      ctaKey: 'ebooks.recipes.cta',
      image: '/images/ebook-recipes.jpg'
    }
  ];

  return (
    <EbooksContainer>
      <Hero>
        <HeroContent>
          <Title>{t('ebooks.hero.title')}</Title>
        </HeroContent>
      </Hero>

      <EbooksGrid>
        {ebooks.map(ebook => (
          <EbookCard key={ebook.id}>
            <EbookImage image={ebook.image} />
            <EbookContent>
              <EbookTitle>{t(ebook.titleKey)}</EbookTitle>
              <EbookDescription>{t(ebook.descriptionKey)}</EbookDescription>
              <EbookPrice>{t(ebook.priceKey)}</EbookPrice>
              <Button as="a" href={`/ebook/${ebook.id}`}>
                {t(ebook.ctaKey)}
              </Button>
            </EbookContent>
          </EbookCard>
        ))}
      </EbooksGrid>
    </EbooksContainer>
  );
};

export default Ebooks; 