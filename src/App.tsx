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
import GuidePage from "./pages/GuidePage/GuidePage";
import AssetPage from "./pages/AssetPage/AssetPage";
import InheritancePage from "./pages/InheritancePage/InheritanceStartPage";
import UploadPhotoPage from "./pages/InheritancePage/UploadPhotoPage/UploadPhotoPage";
import RecordPage from "./pages/InheritancePage/RecordPage/RecordPage";
import MyPage from "./pages/MyPage/MyPage";
import InfoPage from "./pages/MyPage/InfoPage/InfoPage";
import PrivacyPolicyPage from "./pages/MyPage/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/MyPage/TermsOfUsePage/TermsOfUsePage";

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
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/my-page/info" element={<InfoPage />} />
          <Route path="/my-page/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/my-page/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/guide" element={<GuidePage />} />
					<Route path="/asset" element={<AssetPage />} />
					<Route path="/inheritance" element={<InheritancePage />} />
					<Route
						path="/inheritance/photo"
						element={<UploadPhotoPage />}
					/>
					<Route
						path="/inheritance/record"
						element={<RecordPage />}
					/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
