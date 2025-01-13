import { useState, FormEvent } from "react";
import * as styled from "./styles";
import { EndingCreditLoginProps } from "./types";
import backbtn from "../../images/back-icon.png";
import showPasswordIcon from "../../images/show-pw-icon.png";
import hidePasswordIcon from "../../images/hide-pw-icon.png";

interface LoginForm {
	username: string;
	password: string;
}

const EndingCreditLogin = ({ onBack }: EndingCreditLoginProps): JSX.Element => {
	const [formData, setFormData] = useState<LoginForm>({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log("Login attempt with:", formData);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const togglePasswordVisibility = (): void => {
		setShowPassword(!showPassword);
	};

	return (
		<styled.Container>
			<styled.BackButton src={backbtn} onClick={onBack} />
			<styled.Title>
				로그인이 필요한
				<br />
				서비스입니다.
			</styled.Title>
			<styled.Form onSubmit={handleSubmit}>
				<styled.InputLabel htmlFor="username">아이디</styled.InputLabel>
				<styled.Input
					id="username"
					name="username"
					type="text"
					placeholder="아이디를 입력하세요."
					value={formData.username}
					onChange={handleInputChange}
				/>
				<styled.InputLabel htmlFor="password">
					비밀번호
				</styled.InputLabel>
				<styled.PasswordInputWrapper>
					<styled.Input
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						placeholder="비밀번호를 입력하세요."
						value={formData.password}
						onChange={handleInputChange}
					/>
					<styled.ShowPasswordIcon
						src={showPassword ? showPasswordIcon : hidePasswordIcon}
						onClick={togglePasswordVisibility}
						alt={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
					/>
				</styled.PasswordInputWrapper>
				<styled.ForgotPassword>
					혹시, 비밀번호를 잊으셨나요?
				</styled.ForgotPassword>
			</styled.Form>
			<styled.LoginBtn type="submit">
				<span>로그인</span>
			</styled.LoginBtn>
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

export default EndingCreditLogin;
