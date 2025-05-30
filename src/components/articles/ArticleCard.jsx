import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.text};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ReadMoreButton = styled(Link)`
  display: inline-block;
  padding: 8px 16px;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const ArticleCard = ({ id, image, title, description, ctaKey }) => {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <Card>
      <CardImage image={image} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <ReadMoreButton to={`/${lang}/articles/${id}`}>{t(ctaKey)}</ReadMoreButton>
      </CardContent>
    </Card>
  );
};

export default ArticleCard; 