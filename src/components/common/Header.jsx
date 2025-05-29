import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const HeaderContainer = styled.header`
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};

  &::before {
    content: "🥑";
    margin-right: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
  }
`;

const Header = () => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">KetoHorizon</Logo>
        <NavLinks>
          <NavList>
            <li><NavLink to="/">{t('navigation.home')}</NavLink></li>
            <li><NavLink to="/articles">{t('navigation.articles')}</NavLink></li>
            <li><NavLink to="/recipes">{t('navigation.recipes')}</NavLink></li>
            <li><NavLink to="/ebooks">{t('navigation.ebooks')}</NavLink></li>
          </NavList>
          <LanguageSelector />
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 