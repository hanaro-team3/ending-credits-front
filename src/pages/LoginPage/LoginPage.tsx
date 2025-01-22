import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as styled from "./styles";
import mainlogo from "../../images/main-logo.png";
import kakaologo from "../../images/kakao-logo.png";
import EndingCreditLogin from "./EndingCreditLogin";
import SimpleLoginPage from "./SimpleLoginPage";
import LoginButton from "../../ui/BlueBtn";

const LoginPage = (): JSX.Element => {
	const [showEndingCredit, setShowEndingCredit] = useState<boolean>(false);
	const [showSimpleLogin, setShowSimpleLogin] = useState<boolean>(false);

	const checkRecentLogin = (): boolean => {
		const lastLoginDate = localStorage.getItem("lastLoginDate");
		const deviceId = localStorage.getItem("deviceId");

		if (!lastLoginDate || !deviceId) return false;

		const lastLogin = new Date(lastLoginDate);
		const now = new Date();
		const diffDays =
			(now.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24);

		return diffDays <= 3;
	};

	const handleEndingCreditClick = (): void => {
		const isRecentLogin = checkRecentLogin();
		if (isRecentLogin) {
			setShowSimpleLogin(true);
		} else {
			setShowEndingCredit(true);
		}
	};

	if (showSimpleLogin) {
		return (
			<SimpleLoginPage
				onBack={() => setShowSimpleLogin(false)}
				showForgotPassword={true}
			/>
		);
	}

	if (showEndingCredit) {
		return <EndingCreditLogin onBack={() => setShowEndingCredit(false)} />;
	}

	return (
		<styled.Container isLoginPage={true}>
			<div>
				<styled.MainLogo src={mainlogo} alt="Main Logo" />
			</div>
			<div>
				<LoginButton variant="large" onClick={handleEndingCreditClick}>
					엔딩크레딧 계정으로 로그인
				</LoginButton>
				<styled.KakaoLogin>
					<styled.KakaoLogo src={kakaologo} alt="Kakao Logo" />
					<span>카카오 계정으로 로그인</span>
				</styled.KakaoLogin>
				<styled.SignupDiv>
					<styled.SignupDivContent1>
						<span>아직 회원이 아니신가요?</span>
					</styled.SignupDivContent1>
					<Link to="/signup" style={{ textDecoration: "none" }}>
						<styled.SignupDivContent2>
							회원가입
						</styled.SignupDivContent2>
					</Link>
				</styled.SignupDiv>
			</div>
		</styled.Container>
	);
};

export default LoginPage;
