import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: ${props => props.theme.colors.accent};
  }

  ${props => props.as === 'a' && `
    &:hover {
      color: white;
    }
  `}
`;

const Button = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default Button; 