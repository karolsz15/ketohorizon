import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/articles/ArticleCard';
import { getArticles } from '../services/api';

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
`;

const ErrorContainer = styled(LoadingContainer)`
  color: ${props => props.theme.colors.error};
`;

const Articles = () => {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        console.log('Fetching articles for language:', lang); // Debug log
        const data = await getArticles(lang);
        console.log('Received articles:', data); // Debug log
        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [lang]);

  // Add debug log for render
  console.log('Current articles state:', articles);

  if (loading) {
    return (
      <ArticlesContainer>
        <Hero>
          <HeroContent>
            <Title>{t('articles.hero.title')}</Title>
          </HeroContent>
        </Hero>
        <LoadingContainer>
          {t('common.loading')}...
        </LoadingContainer>
      </ArticlesContainer>
    );
  }

  if (error) {
    return (
      <ArticlesContainer>
        <Hero>
          <HeroContent>
            <Title>{t('articles.hero.title')}</Title>
          </HeroContent>
        </Hero>
        <ErrorContainer>
          {t('common.error')}: {error}
        </ErrorContainer>
      </ArticlesContainer>
    );
  }

  return (
    <ArticlesContainer>
      <Hero>
        <HeroContent>
          <Title>{t('articles.hero.title')}</Title>
        </HeroContent>
      </Hero>

      <ArticlesGrid>
        {articles && articles.length > 0 ? (
          articles.map(article => {
            if (!article?.attributes) {
              return null;
            }

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
          })
        ) : (
          <LoadingContainer>
            {t('articles.noArticles')}
          </LoadingContainer>
        )}
      </ArticlesGrid>
    </ArticlesContainer>
  );
};

export default Articles; 