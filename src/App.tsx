import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

import { Home } from "./pages/home";
import { PrinterContextProvider } from "./contexts/PrinterContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <PrinterContextProvider>
        <Home />
      </PrinterContextProvider>
    </ThemeProvider>
  );
}
