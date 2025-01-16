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
					<Route path="/guide" element={<GuidePage />} />
					<Route path="/asset" element={<AssetPage />} />
					<Route path="/inheritance" element={<InheritancePage />} />
					<Route
						path="/inheritance-photo"
						element={<UploadPhotoPage />}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
