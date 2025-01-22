import { useState, useEffect } from "react";
import { data, Link } from "react-router-dom";
import * as styled from "./styles";
import mainlogo from "../../images/main-logo.png";
import kakaologo from "../../images/kakao-logo.png";
import EndingCreditLogin from "./EndingCreditLogin";
import SimpleLoginPage from "./SimpleLoginPage";
import LoginButton from "../../ui/BlueBtn";

const LoginPage = (): JSX.Element => {
	const [showEndingCredit, setShowEndingCredit] = useState<boolean>(false);
	const [showSimpleLogin, setShowSimpleLogin] = useState<boolean>(false);

	// const handleKakaoLoginApi = async () => {
	// 	const redirectUri = "http://localhost:8080/auth/klogin";

	// 	try {
	// 		const response = await fetch(redirectUri);
	// 		const data = await response.json();

	// 		if (data.code === "COMMON200") {
	// 			// 로그인 성공 시 accessToken을 콘솔에 출력
	// 			console.log("Access Token:", data.result.accessToken);
	// 			// 필요한 경우 토큰을 로컬 스토리지나 상태로 저장할 수 있습니다
	// 			// localStorage.setItem("accessToken", data.result.accessToken);
	// 		} else if (data.code === "MEMBER4001") {
	// 			console.log("존재하지 않는 사용자입니다.");
	// 			// 필요한 경우 에러 처리를 추가할 수 있습니다
	// 		}
	// 	} catch (error) {
	// 		console.error("카카오 로그인 중 오류가 발생했습니다:", error);
	// 	}
	// };

	// const SocialKakao = () => {
	// 	const Rest_api_key = "8ce5f9f6c16d3147efb391adca1e62b5"; //REST API KEY
	// 	const redirect_uri = "http://localhost:8080/auth/kakao"; //Redirect URI
	// 	// oauth 요청 URL
	// 	const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

	// 	window.location.href = kakaoURL;

	// 	const code = new URL(window.location.href).searchParams.get("code");
	// 	console.log("code", code);
	// };

	const REST_API_KEY = "8ce5f9f6c16d3147efb391adca1e62b5";
	const REDIRECT_URI = "http://localhost:8080/auth/kakao";
	const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

	const loginHandler = () => {
		window.location.href = link;
	};
	const code = new URL(window.location.href).searchParams.get("code");
	console.log(code);

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
				<styled.KakaoLogin onClick={loginHandler}>
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
