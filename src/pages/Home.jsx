import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/articles/ArticleCard';

const HomeContainer = styled.div`
  padding-top: ${props => props.theme.layout.headerHeight};
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #8BC34A 0%, #689F38 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const Section = styled.section`
  padding: 60px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.text};
`;

const ArticlesGrid = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const SuccessStories = styled.section`
  background: #f8f9fa;
  padding: 60px 0;
`;

const StoriesGrid = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const StoryCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const StoryAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 20px;
  background-color: #e0e0e0;
`;

const StoryName = styled.h4`
  text-align: center;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const StoryQuote = styled.p`
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.colors.textLight};
`;

const Home = () => {
  const { t } = useTranslation();

  const articles = [
    {
      id: 1,
      titleKey: 'articles.essentials.title',
      descriptionKey: 'articles.essentials.description',
      ctaKey: 'articles.essentials.cta',
      image: 'path/to/image1.jpg'
    },
    {
      id: 2,
      titleKey: 'articles.ingredients.title',
      descriptionKey: 'articles.ingredients.description',
      ctaKey: 'articles.ingredients.cta',
      image: 'path/to/image2.jpg'
    },
    {
      id: 3,
      titleKey: 'articles.recipes.title',
      descriptionKey: 'articles.recipes.description',
      ctaKey: 'articles.recipes.cta',
      image: 'path/to/image3.jpg'
    }
  ];

  const successStories = [
    {
      id: 1,
      nameKey: 'success_stories.stories.sarah.name',
      quoteKey: 'success_stories.stories.sarah.quote'
    },
    {
      id: 2,
      nameKey: 'success_stories.stories.mike.name',
      quoteKey: 'success_stories.stories.mike.quote'
    }
  ];

  return (
    <HomeContainer>
      <Hero>
        <HeroContent>
          <Title>{t('hero.title')}</Title>
          <Subtitle>{t('hero.subtitle')}</Subtitle>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>{t('articles.title')}</SectionTitle>
        <ArticlesGrid>
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ArticlesGrid>
      </Section>

      <SuccessStories>
        <SectionTitle>{t('success_stories.title')}</SectionTitle>
        <StoriesGrid>
          {successStories.map(story => (
            <StoryCard key={story.id}>
              <StoryAvatar />
              <StoryName>{t(story.nameKey)}</StoryName>
              <StoryQuote>{t(story.quoteKey)}</StoryQuote>
            </StoryCard>
          ))}
        </StoriesGrid>
      </SuccessStories>
    </HomeContainer>
  );
};

export default Home; 