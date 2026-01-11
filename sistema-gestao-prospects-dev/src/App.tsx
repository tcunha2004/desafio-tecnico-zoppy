import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./styles/default";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
