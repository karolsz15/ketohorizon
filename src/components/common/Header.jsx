import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.theme.layout.headerHeight};
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const LanguageSelect = styled.select`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  font-size: 0.9rem;
`;

const LanguageWrapper = styled.div`
  position: relative;
`;

const Header = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
  ];

  const getLanguageDisplay = (code) => {
    const language = languages.find(lang => lang.code === code);
    return language ? `${language.flag} ${code.toUpperCase()}` : '🇺🇸 EN';
  };

  const navigationLinks = [
    { to: '/', text: t('navigation.home') },
    { to: '/articles', text: t('navigation.articles') },
    { to: '/recipes', text: t('navigation.recipes') },
    { to: '/ebooks', text: t('navigation.ebooks') }
  ];

  return (
    <HeaderContainer>
      <Nav>
        <LogoLink to={`/${lang}`}>
          <Logo />
        </LogoLink>
        <NavLinks>
          {navigationLinks.map(({ to, text }) => (
            <NavLink 
              key={to} 
              to={to === '/' ? `/${lang}` : `/${lang}${to}`}
            >
              {text}
            </NavLink>
          ))}
        </NavLinks>
        <LanguageWrapper>
          <LanguageButton>
            {getLanguageDisplay(i18n.language)}
          </LanguageButton>
          <LanguageSelect value={i18n.language} onChange={handleLanguageChange}>
            {languages.map(({ code, label, flag }) => (
              <option key={code} value={code}>
                {`${flag} ${label}`}
              </option>
            ))}
          </LanguageSelect>
        </LanguageWrapper>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 