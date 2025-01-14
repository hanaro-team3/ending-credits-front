import { useState } from "react";
import * as styled from "./styles";
import mainlogo from "../../images/main-logo.png";
import kakaologo from "../../images/kakao-logo.png";
import EndingCreditLogin from "./EndingCreditLogin";

const LoginPage = (): JSX.Element => {
	const [showEndingCredit, setShowEndingCredit] = useState<boolean>(false);

	const handleEndingCreditClick = (): void => {
		setShowEndingCredit(true);
	};

	if (showEndingCredit) {
		return <EndingCreditLogin onBack={() => setShowEndingCredit(false)} />;
	}

	return (
		<styled.Container>
			<styled.MainLogo src={mainlogo} alt="Main Logo" />
			<styled.LoginBtn onClick={handleEndingCreditClick}>
				<span>엔딩크레딧 계정으로 로그인</span>
			</styled.LoginBtn>
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
		</styled.Container>
	);
};

export default LoginPage;
