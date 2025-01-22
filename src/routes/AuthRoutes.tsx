import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import SimpleLoginPage from "../pages/LoginPage/SimpleLoginPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import KakaoRedirect from "../pages/LoginPage/KakaoRedirect";

const AuthRoutes: RouteObject[] = [
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/simplelogin",
		element: <SimpleLoginPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />,
	},
	{
		path: "/forgotpassword",
		element: <ForgotPasswordPage />,
	},
];

export default AuthRoutes;
