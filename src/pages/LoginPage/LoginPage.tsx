import { useState } from "react";
import * as styled from "./styles";
import mainlogo from "../../images/main-logo.png";
import kakaologo from "../../images/kakao-logo.png";
import EndingCreditLogin from "./EndingCreditLogin";
import LoginButton from "../../ui/BlueBtn";

const LoginPage = (): JSX.Element => {
	const [showEndingCredit, setShowEndingCredit] = useState<boolean>(false);

	const handleEndingCreditClick = (): void => {
		setShowEndingCredit(true);
	};

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
					<styled.SignupDivContent2>
						<span>회원가입</span>
					</styled.SignupDivContent2>
				</styled.SignupDiv>
			</div>
		</styled.Container>
	);
};

export default LoginPage;
