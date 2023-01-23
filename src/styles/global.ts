import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  :focus {
    outline: 0;
  }

  body {
    color: ${(props) => props.theme["gray-900"]};
    background-color: ${(props) => props.theme.white};
  }

  html {
    font: 400 1rem 'Roboto', sans-serif;
  }
`;
