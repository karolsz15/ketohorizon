import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CommentSection from '../comments/CommentSection';
import SocialShare from './SocialShare';
import { getArticle } from '../../services/api';

const ArticleContainer = styled.article`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 40px 20px;
  padding-top: calc(${props => props.theme.layout.headerHeight} + 40px);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: ${props => props.theme.colors.text};
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 40px;

  p {
    margin-bottom: 20px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  
  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.primary};
  }
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

const ArticlePage = () => {
  const { t } = useTranslation();
  const { id, lang = 'en' } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getArticle(id, lang);
        console.log('Fetched article:', data); // Debug log
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, lang]);

  if (loading) {
    return (
      <ArticleContainer>
        <LoadingContainer>
          {t('common.loading')}...
        </LoadingContainer>
      </ArticleContainer>
    );
  }

  if (error || !article) {
    return (
      <ArticleContainer>
        <ErrorContainer>
          {error || t('articles.notFound')}
        </ErrorContainer>
      </ArticleContainer>
    );
  }

  return (
    <ArticleContainer>
      <Title>{article.title}</Title>
      <Content>
        {article.content}
      </Content>
      <SocialShare 
        url={window.location.href}
        title={article.title}
      />
      <CommentSection articleId={id} />
    </ArticleContainer>
  );
};

export default ArticlePage; 