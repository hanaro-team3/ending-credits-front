import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = (): JSX.Element | null => {
	const navigate = useNavigate();

	useEffect(() => {
		const transferTokens = (): void => {
			const getToken = (name: string): string | null => {
				const cookieValue = document.cookie
					.split("; ")
					.find((row) => row.startsWith(name + "="));

				if (cookieValue) {
					return decodeURIComponent(cookieValue.split("=")[1]);
				}
				return null;
			};

			const accessToken = getToken("accessToken");
			const refreshToken = getToken("refreshToken");

			if (accessToken && refreshToken) {
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);

				// Clear cookies
				document.cookie =
					"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				document.cookie =
					"refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

				console.log("Tokens transferred to localStorage");
			} else {
				console.log("No tokens found in cookies");
			}
		};

		transferTokens();
	}, [navigate]);

	return null;
};

export default AuthHandler;
