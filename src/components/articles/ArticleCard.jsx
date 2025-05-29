import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.div`
  width: 100%;
  height: 200px;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  padding: 25px;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
`;

const ArticleCard = ({ article }) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <Image image={article.image} />
      <Content>
        <Title>{t(article.titleKey)}</Title>
        <Description>{t(article.descriptionKey)}</Description>
        <Button as="a" href={article.link}>
          {t(article.ctaKey)}
        </Button>
      </Content>
    </Card>
  );
};

export default ArticleCard; 