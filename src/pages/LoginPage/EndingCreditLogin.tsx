import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as styled from "./styles";
import { EndingCreditLoginProps } from "./types";
import backbtn from "../../images/back-icon.png";
import showPasswordIcon from "../../images/show-pw-icon.png";
import hidePasswordIcon from "../../images/hide-pw-icon.png";
import LoginButton from "../../ui/BlueBtn";
import { LoginDTO } from "../../services/dto/Auth";
import { userService } from "../../services/api/SignUp";

interface LoginForm {
	username: string;
	password: string;
}

const EndingCreditLogin = ({ onBack }: EndingCreditLoginProps): JSX.Element => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<LoginForm>({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const loginData: LoginDTO = {
				identifier: formData.username,
				password: formData.password,
			};

			const response = await userService.login(loginData);

			if (response && response.data.result) {
				// 토큰 저장
				localStorage.setItem(
					"accessToken",
					response.data.result.accessToken
				);
				localStorage.setItem(
					"refreshToken",
					response.data.result.refreshToken
				);
				localStorage.setItem("username", formData.username);

				// 최근 접속 정보 저장
				const now = new Date().toISOString();
				localStorage.setItem("lastLoginDate", now);

				// 브라우저/기기 고유 ID 생성 및 저장 (이미 있으면 기존 것 사용)
				const deviceId =
					localStorage.getItem("deviceId") ||
					`${navigator.userAgent}-${Math.random()
						.toString(36)
						.substring(2)}`;
				localStorage.setItem("deviceId", deviceId);

				navigate("/");
			}
		} catch (error) {
			alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
			console.error("Login error:", error);
		} finally {
			setIsLoading(false);
		}
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
		<styled.Container isLoginPage={false}>
			<styled.BackButton src={backbtn} onClick={onBack} />
			<div>
				<styled.Title>로그인이 필요한 서비스입니다.</styled.Title>
				<styled.Form id="loginForm" onSubmit={handleSubmit}>
					<styled.InputLabel htmlFor="username">
						아이디
					</styled.InputLabel>
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
							src={
								showPassword
									? showPasswordIcon
									: hidePasswordIcon
							}
							onClick={togglePasswordVisibility}
							alt={
								showPassword
									? "비밀번호 숨기기"
									: "비밀번호 표시"
							}
						/>
					</styled.PasswordInputWrapper>
					{error && (
						<styled.ErrorMessage>{error}</styled.ErrorMessage>
					)}
					<Link
						to="/forgotpassword"
						style={{ textDecoration: "none" }}
					>
						<styled.ForgotPassword
							style={{ textDecoration: "underline" }}
						>
							혹시, 비밀번호를 잊으셨나요?
						</styled.ForgotPassword>
					</Link>
				</styled.Form>
			</div>
			<div>
				<LoginButton
					variant="large"
					type="submit"
					form="loginForm"
					disabled={isLoading}
				>
					{isLoading ? "로그인 중..." : "로그인"}
				</LoginButton>
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

export default EndingCreditLogin;
