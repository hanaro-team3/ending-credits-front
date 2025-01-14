import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// styles
import "./App.css";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";

// pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
