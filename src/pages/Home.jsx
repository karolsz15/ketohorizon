import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getArticles } from '../services/api';
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

const LatestArticles = styled.section`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 60px auto;
  padding: 0 20px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.colors.textLight};
`;

const Home = () => {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams();
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles(lang);
        // Get only the 3 most recent articles
        setLatestArticles(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching latest articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, [lang]);

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

      <LatestArticles>
        <SectionTitle>{t('home.latestArticles')}</SectionTitle>
        {loading ? (
          <LoadingContainer>{t('common.loading')}...</LoadingContainer>
        ) : (
          <ArticlesGrid>
            {latestArticles.map(article => {
              if (!article?.attributes) return null;

              const {
                id,
                attributes: {
                  slug,
                  title,
                  excerpt
                }
              } = article;

              return (
                <ArticleCard
                  key={id}
                  id={slug || id}
                  image="/images/default-article.jpg"
                  title={title || t('common.untitled')}
                  description={excerpt || t('common.noDescription')}
                  ctaKey="articles.readMore"
                />
              );
            })}
          </ArticlesGrid>
        )}
      </LatestArticles>

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