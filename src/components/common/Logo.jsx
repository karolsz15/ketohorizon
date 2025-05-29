import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;

  &::before {
    content: "🥑";
    margin-right: 10px;
  }
`;

const Logo = () => {
  return (
    <LogoContainer>
      KetoHorizon
    </LogoContainer>
  );
};

export default Logo; 