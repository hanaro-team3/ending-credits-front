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
