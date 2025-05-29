import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.footer.background};
  color: ${props => props.theme.colors.footer.text};
  padding: 40px 0;
`;

const FooterContent = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: ${props => props.theme.colors.footer.text};
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>{t('footer.quick_links.title')}</h3>
          <ul>
            <li><Link to="/">{t('footer.quick_links.home')}</Link></li>
            <li><Link to="/articles">{t('footer.quick_links.articles')}</Link></li>
            <li><Link to="/recipes">{t('footer.quick_links.recipes')}</Link></li>
            <li><Link to="/ebooks">{t('footer.quick_links.ebooks')}</Link></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>{t('footer.about.title')}</h3>
          <p>{t('footer.about.description')}</p>
        </FooterSection>
        <FooterSection>
          <h3>{t('footer.contact.title')}</h3>
          <p>{t('footer.contact.email')}</p>
          <p>{t('footer.contact.phone')}</p>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <p>{t('footer.copyright')}</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 