import "./App.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Fonts/Font.css";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<div
								style={{
									fontFamily: "Pretendard",
									fontWeight: "700",
								}}
							>
								홈 페이지
							</div>
						}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
