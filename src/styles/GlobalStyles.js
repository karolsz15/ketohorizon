import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles; 