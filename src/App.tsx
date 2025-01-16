import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// styles
import "./App.css";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";

// pages
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          <Route path="/my-page" element={<MyPage />}>
            <Route path="info"></Route>
            <Route path="terms-of-use"></Route>
            <Route path="privacy-policy"></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
