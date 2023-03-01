import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body,
  html {
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: ${({ theme }) => theme.colors.background};
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.textFont}, sans-serif;
    line-height: 1.5;
    scroll-behavior: smooth;
    // overflow-x: hidden;
    /* width */
    ::-webkit-scrollbar {
      width: 7px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.scrollbarBg};
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primaryDarker};
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default GlobalStyle;
