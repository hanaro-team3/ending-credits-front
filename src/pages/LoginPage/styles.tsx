import styled from "styled-components";

export const Container = styled.div<{ isLoginPage?: boolean }>`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	background-color: white;
	/* gap: ${(props) => (props.isLoginPage ? "190px" : "280px")}; */
`;

export const MainLogo = styled.img`
	width: 124px;
	height: auto;
	margin-top: 282px;
`;

export const LoginBtn = styled.button`
	width: 352px;
	height: 55px;
	background: #4792dc;
	border-radius: 12px;
	font-family: "Pretendard";
	font-weight: 600;
	color: white;

	/* margin-top: 190px; */

	cursor: pointer;
`;

export const KakaoLogin = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 352px;
	height: 55px;
	background: #fddc3f;
	border-radius: 12px;

	font-family: "Pretendard";
	font-weight: 600;
	color: black;

	margin-top: 12px;
	cursor: pointer;
`;

export const KakaoLogo = styled.img`
	width: 26px;
	height: auto;
	margin-right: 16px;
`;

export const SignupDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-top: 12px;
	margin-bottom: 100px;
`;

export const SignupDivContent1 = styled.div`
	font-family: "Pretendard";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	color: #383838;
`;

export const SignupDivContent2 = styled.div`
	font-family: "Pretendard";
	font-style: normal;
	font-weight: 700;
	text-decoration: underline;
	font-size: 15px;
	color: #4792dc;

	margin-left: 5px;
	cursor: pointer;
`;

// -----------------------------------------

export const BackButton = styled.img`
	position: absolute;
	top: 50px;
	left: 21px;
	cursor: pointer;
	width: 15px;
	height: auto;
`;

export const Title = styled.h1`
	width: 352px;
	display: flex;
	justify-content: start;
	/* margin-left: 25px; */

	font-family: "Pretendard";
	font-weight: 800;
	font-size: 26px;
	text-align: left;
	margin-top: 100px;
	line-height: 1.2;
`;

export const Form = styled.form`
	width: 352px;
	height: auto;
	margin-top: 33px;
`;

export const InputLabel = styled.label`
	display: block;
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 16px;
	margin-bottom: 4px;
`;

export const PasswordInputWrapper = styled.div`
	position: relative;
	width: 100%;
`;

export const ShowPasswordIcon = styled.img`
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	width: 22px;
	height: auto;
	cursor: pointer;
	margin-top: -10px;
`;

export const Input = styled.input`
	width: 100%;
	height: 55px;
	border: 1.5px solid #eeeeee;
	border-radius: 12px;
	padding: 0 16px;
	margin-bottom: 20px;
	font-family: "Pretendard";
	font-size: 15px;
	background-color: white;
	padding-right: ${(props) =>
		props.type === "password"
			? "48px"
			: "16px"}; // 비밀번호 입력 필드일 때 우측 패딩 증가

	&:focus {
		outline: none;
		border-color: #4792dc;
	}

	color: black;

	&::placeholder {
		font-size: 15px;
		color: #dadada;
	}
`;

export const ForgotPassword = styled.div`
	text-align: right;
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 15px;
	color: #7d7d7d;
	cursor: pointer;
	/* margin-bottom: 102px; */

	&:hover {
		text-decoration: underline;
	}
`;

//-------------------------------------------------
export const TopContainer = styled.div`
	width: 330px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	margin-top: 101px;
`;

export const SimpleLoginTitle = styled.div`
	font-family: "Pretendard";
	font-weight: 800;
	font-size: 24px;
	color: #2b2b2b;

	margin-top: 23px;
`;

export const SimpleLoginIcon = styled.div`
	width: 53px;
	height: 53px;

	background: #e9e9e9;
	border-radius: 50%;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const PasswordDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 36px;
`;

// export const PasswordCircle = styled.div`
// 	width: 11px;
// 	height: 11px;

// 	background: #e9e9e9;
// 	border-radius: 50%;
// 	margin-right: 16px;
// `;

export const PasswordCircle = styled.div<{ filled?: boolean }>`
	background: ${(props) => (props.filled ? "#4792DC" : "#e9e9e9")};
	width: 11px;
	height: 11px;

	border-radius: 50%;
	margin-right: 16px;
`;

export const KeypadContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 15px;
	width: 330px;
	margin-top: 80px;
	place-items: center;

	margin-bottom: 100px;
`;

export const KeypadButton = styled.button`
	height: 65px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Pretendard";
	font-size: 28px;
	font-weight: 400;
	color: #2b2b2b;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0 30px;

	&:active {
		opacity: 0.7;
	}
`;

export const SpecialButton = styled(KeypadButton)`
	font-size: 20px;
`;

export const FaceIdBtn = styled.img`
	width: 26px;
	height: auto;
`;
