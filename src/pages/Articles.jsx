import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/articles/ArticleCard';

const ArticlesContainer = styled.div`
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

const ArticlesGrid = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const Articles = () => {
  const { t } = useTranslation();

  const articles = [
    {
      id: 'keto101',
      image: '/images/keto-basics.jpg',
      titleKey: 'articles.keto101.title',
      descriptionKey: 'articles.keto101.introduction.content',
      ctaKey: 'articles.essentials.cta'
    },
    {
      id: 'essentials',
      image: '/images/keto-essentials.jpg',
      titleKey: 'articles.essentials.title',
      descriptionKey: 'articles.essentials.description',
      ctaKey: 'articles.essentials.cta'
    },
    {
      id: 'ingredients',
      image: '/images/keto-ingredients.jpg',
      titleKey: 'articles.ingredients.title',
      descriptionKey: 'articles.ingredients.description',
      ctaKey: 'articles.ingredients.cta'
    }
  ];

  return (
    <ArticlesContainer>
      <Hero>
        <HeroContent>
          <Title>{t('articles.hero.title')}</Title>
        </HeroContent>
      </Hero>

      <ArticlesGrid>
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            {...article}
          />
        ))}
      </ArticlesGrid>
    </ArticlesContainer>
  );
};

export default Articles; 