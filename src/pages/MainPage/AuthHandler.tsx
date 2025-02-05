import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = (): JSX.Element | null => {
	const navigate = useNavigate();

	useEffect(() => {
		const transferValues = (): void => {
			const getValues = (name: string): string | null => {
				const cookieValue = document.cookie
					.split("; ")
					.find((row) => row.startsWith(name + "="));

				if (cookieValue) {
					return decodeURIComponent(cookieValue.split("=")[1]);
				}
				return null;
			};

			const accessToken = getValues("accessToken");
			const refreshToken = getValues("refreshToken");
			const name = getValues("name");

			if (accessToken && refreshToken && name) {
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);
				localStorage.setItem("name", name);

				// Clear cookies
				document.cookie =
					"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				document.cookie =
					"refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				document.cookie =
					"name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

				console.log("Values transferred to localStorage");
			} else {
				console.log("No values found in cookies");
			}
		};

		transferValues();

		if(!localStorage.getItem("accessToken")) {
			navigate("/onboarding");
		}

	}, [navigate]);

	return null;
};

export default AuthHandler;
