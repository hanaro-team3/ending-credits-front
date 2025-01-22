import { ThemeProvider } from "styled-components";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

// styles
import "./App.css";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";

function App() {
	const element = useRoutes(routes);

	return (
		<ThemeProvider theme={theme}>
		<GlobalStyle />
			{element}
		</ThemeProvider>
	);
}

export default App;
