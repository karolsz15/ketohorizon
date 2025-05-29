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

const ArticlesSection = styled.section`
  padding: 60px 0;
  background: #f8f9fa;
`;

const ArticlesGrid = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const CategoryFilter = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto 40px;
  padding: 0 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const CategoryButton = styled.button`
  background: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Articles = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = React.useState('all');

  const categories = [
    { id: 'all', labelKey: 'articles.categories.all' },
    { id: 'basics', labelKey: 'articles.categories.basics' },
    { id: 'nutrition', labelKey: 'articles.categories.nutrition' },
    { id: 'lifestyle', labelKey: 'articles.categories.lifestyle' }
  ];

  const articles = [
    {
      id: 1,
      category: 'basics',
      titleKey: 'articles.essentials.title',
      descriptionKey: 'articles.essentials.description',
      ctaKey: 'articles.essentials.cta',
      image: '/images/keto-basics.jpg'
    },
    {
      id: 2,
      category: 'nutrition',
      titleKey: 'articles.ingredients.title',
      descriptionKey: 'articles.ingredients.description',
      ctaKey: 'articles.ingredients.cta',
      image: '/images/keto-ingredients.jpg'
    },
    {
      id: 3,
      category: 'lifestyle',
      titleKey: 'articles.lifestyle.title',
      descriptionKey: 'articles.lifestyle.description',
      ctaKey: 'articles.lifestyle.cta',
      image: '/images/keto-lifestyle.jpg'
    }
    // Add more articles as needed
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <ArticlesContainer>
      <Hero>
        <HeroContent>
          <Title>{t('articles.hero.title')}</Title>
        </HeroContent>
      </Hero>

      <ArticlesSection>
        <CategoryFilter>
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {t(category.labelKey)}
            </CategoryButton>
          ))}
        </CategoryFilter>

        <ArticlesGrid>
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ArticlesGrid>
      </ArticlesSection>
    </ArticlesContainer>
  );
};

export default Articles; 