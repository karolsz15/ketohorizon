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

const Articles = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(lang);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            id={article.attributes.slug}
            image={`${process.env.REACT_APP_STRAPI_URL}${article.attributes.coverImage.data.attributes.url}`}
            titleKey={article.attributes.title}
            descriptionKey={article.attributes.excerpt}
            ctaKey="articles.essentials.cta"
          />
        ))}
      </ArticlesGrid>
    </ArticlesContainer>
  );
};

export default Articles; 