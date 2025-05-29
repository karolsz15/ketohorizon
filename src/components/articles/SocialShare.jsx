import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ShareContainer = styled.div`
  margin: 40px 0;
  padding: 20px 0;
  border-top: 1px solid ${props => props.theme.colors.border};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const ShareButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: opacity 0.2s;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }

  &.twitter {
    background: #1DA1F2;
  }

  &.facebook {
    background: #4267B2;
  }

  &.instagram {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const SocialShare = ({ url, title }) => {
  const { t } = useTranslation();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    instagram: `https://www.instagram.com/share?url=${encodedUrl}` // Note: Instagram sharing is limited on web
  };

  return (
    <ShareContainer>
      <Title>{t('sharing.title')}</Title>
      <ButtonsContainer>
        <ShareButton 
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter"
        >
          <Icon>𝕏</Icon>
          {t('sharing.twitter')}
        </ShareButton>
        <ShareButton 
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="facebook"
        >
          <Icon>f</Icon>
          {t('sharing.facebook')}
        </ShareButton>
        <ShareButton 
          href={shareLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <Icon>📷</Icon>
          {t('sharing.instagram')}
        </ShareButton>
      </ButtonsContainer>
    </ShareContainer>
  );
};

export default SocialShare; 