import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CommentSection from '../comments/CommentSection';
import SocialShare from './SocialShare';

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

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
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

const ArticlePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const article = t(`articles.${id}`, { returnObjects: true });
  
  if (!article || !article.title) {
    return (
      <ArticleContainer>
        <Title>Article not found</Title>
      </ArticleContainer>
    );
  }

  return (
    <ArticleContainer>
      <Title>{article.title}</Title>

      {article.introduction && (
        <Section>
          <SectionTitle>{article.introduction.title}</SectionTitle>
          <Content>{article.introduction.content}</Content>
        </Section>
      )}

      {article.what_is_keto && (
        <Section>
          <SectionTitle>{article.what_is_keto.title}</SectionTitle>
          <Content>{article.what_is_keto.content}</Content>
        </Section>
      )}

      {article.how_ketosis_works && (
        <Section>
          <SectionTitle>{article.how_ketosis_works.title}</SectionTitle>
          <Content>{article.how_ketosis_works.content}</Content>
        </Section>
      )}

      {article.benefits && (
        <Section>
          <SectionTitle>{article.benefits.title}</SectionTitle>
          <List>
            {article.benefits.list.map((benefit, index) => (
              <ListItem key={index}>{benefit}</ListItem>
            ))}
          </List>
        </Section>
      )}

      {article.foods && (
        <Section>
          <SectionTitle>{article.foods.title}</SectionTitle>
          <List>
            {article.foods.allowed.map((food, index) => (
              <ListItem key={index}>{food}</ListItem>
            ))}
          </List>
          <Content style={{ marginTop: '20px' }}>{article.foods.avoid}</Content>
        </Section>
      )}

      {article.conclusion && (
        <Section>
          <SectionTitle>{article.conclusion.title}</SectionTitle>
          <Content>{article.conclusion.content}</Content>
        </Section>
      )}

      <SocialShare 
        url={window.location.href}
        title={article.title}
      />

      <CommentSection articleId={id} />
    </ArticleContainer>
  );
};

export default ArticlePage; 