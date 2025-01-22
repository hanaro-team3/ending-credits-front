// import React, { useState, useEffect, useCallback } from "react";
// import * as styled from "./styles";
// import backbtn from "../../images/back-icon.png";
// import { EndingCreditLoginProps } from "./types";
// import { userService } from "../../services/api/Signup";
// import faceidicon from "../../images/face-id-icon.png";
// import { useLocation, useNavigate } from "react-router-dom";

// interface SimpleLoginPageProps extends EndingCreditLoginProps {
// 	showForgotPassword?: boolean;
// }

// const SimpleLoginPage = ({
// 	onBack,
// 	showForgotPassword = false,
// }: SimpleLoginPageProps): JSX.Element => {
// 	const [keypad, setKeypad] = useState<Array<number | string>>([]);
// 	const [password, setPassword] = useState("");
// 	const location = useLocation();
// 	const navigate = useNavigate();
// 	const [isConfirmStep, setIsConfirmStep] = useState(false);
// 	const [firstPassword, setFirstPassword] = useState("");

// 	const generateKeypad = useCallback(() => {
// 		const numbers = [...Array(10)].map((_, i) => i);

// 		for (let i = numbers.length - 1; i > 0; i--) {
// 			const j = Math.floor(Math.random() * (i + 1));
// 			[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
// 		}

// 		const keypadLayout = Array(12).fill(null);

// 		let numberIndex = 0;
// 		for (let i = 0; i < 12; i++) {
// 			if (i === 9) {
// 				keypadLayout[i] = "scan";
// 			} else if (i === 11) {
// 				keypadLayout[i] = "delete";
// 			} else {
// 				keypadLayout[i] = numbers[numberIndex++];
// 			}
// 		}

// 		setKeypad(keypadLayout);
// 	}, []);

// 	useEffect(() => {
// 		generateKeypad();
// 	}, [generateKeypad]);

// 	const handleNumberClick = async (num: number) => {
// 		if (password.length < 6) {
// 			const newPassword = password + num;
// 			setPassword(newPassword);

// 			if (newPassword.length === 6) {
// 				if (!isConfirmStep && location.state?.userid) {
// 					// 첫 번째 입력 (회원가입 후 간편비밀번호 설정)
// 					setFirstPassword(newPassword);
// 					setPassword("");
// 					setIsConfirmStep(true);
// 				} else if (isConfirmStep && location.state?.userid) {
// 					// 두 번째 입력 (회원가입 후 간편비밀번호 설정)
// 					if (newPassword === firstPassword) {
// 						try {
// 							const { userid } = location.state;
// 							await userService.changeSimplePassword({
// 								identifier: userid,
// 								simplePassword: newPassword,
// 							});
// 							navigate("/");
// 						} catch (error) {
// 							console.error("간편 비밀번호 설정 실패:", error);
// 							alert(
// 								"간편 비밀번호 설정에 실패했습니다. 다시 시도해주세요."
// 							);
// 							setPassword("");
// 							setFirstPassword("");
// 							setIsConfirmStep(false);
// 						}
// 					} else {
// 						alert(
// 							"비밀번호가 일치하지 않습니다. 다시 입력해주세요."
// 						);
// 						setPassword("");
// 						setFirstPassword("");
// 						setIsConfirmStep(false);
// 					}
// 				} else {
// 					// 일반 로그인
// 					try {
// 						// TODO: 간편 비밀번호 로그인 API 호출
// 						navigate("/");
// 					} catch (error) {
// 						console.error("간편 로그인 실패:", error);
// 						alert("로그인에 실패했습니다. 다시 시도해주세요.");
// 						setPassword("");
// 					}
// 				}
// 			}
// 		}
// 	};

// 	const handleDelete = () => {
// 		setPassword((prev) => prev.slice(0, -1));
// 	};

// 	return (
// 		<styled.Container>
// 			<styled.BackButton src={backbtn} onClick={onBack} />
// 			<styled.TopContainer>
// 				<styled.SimpleLoginIcon>🔑</styled.SimpleLoginIcon>
// 				<styled.SimpleLoginTitle>
// 					{location.state?.userid ? (
// 						isConfirmStep ? (
// 							<>
// 								간편 비밀번호를
// 								<br />
// 								한번 더 입력해 주세요.
// 							</>
// 						) : (
// 							<>
// 								간편 비밀번호를
// 								<br />
// 								등록해 주세요.
// 							</>
// 						)
// 					) : (
// 						<>
// 							간편 비밀번호를
// 							<br />
// 							입력해 주세요.
// 						</>
// 					)}
// 				</styled.SimpleLoginTitle>

// 				<styled.PasswordDiv>
// 					{[...Array(6)].map((_, i) => (
// 						<styled.PasswordCircle
// 							key={i}
// 							filled={password.length > i}
// 						/>
// 					))}
// 				</styled.PasswordDiv>

// 				{showForgotPassword && (
// 					<styled.ForgotPassword
// 						style={{
// 							textDecoration: "underline",
// 							marginTop: "54px",
// 						}}
// 					>
// 						혹시, 비밀번호를 잊으셨나요?
// 					</styled.ForgotPassword>
// 				)}
// 			</styled.TopContainer>

// 			<styled.KeypadContainer>
// 				{keypad.map((value, index) => {
// 					if (value === "scan") {
// 						return <styled.FaceIdBtn key="scan" src={faceidicon} />;
// 					}

// 					if (value === "delete") {
// 						return (
// 							<styled.SpecialButton
// 								key="delete"
// 								onClick={handleDelete}
// 							>
// 								←
// 							</styled.SpecialButton>
// 						);
// 					}

// 					return (
// 						<styled.KeypadButton
// 							key={index}
// 							onClick={() => handleNumberClick(value as number)}
// 						>
// 							{value}
// 						</styled.KeypadButton>
// 					);
// 				})}
// 			</styled.KeypadContainer>
// 		</styled.Container>
// 	);
// };

// export default SimpleLoginPage;

import React, { useState, useEffect, useCallback } from "react";
import * as styled from "./styles";
import backbtn from "../../images/back-icon.png";
import { EndingCreditLoginProps } from "./types";
import { userService } from "../../services/api/SignUp";
import faceidicon from "../../images/face-id-icon.png";
import { useLocation, useNavigate } from "react-router-dom";

interface SimpleLoginPageProps extends EndingCreditLoginProps {
	showForgotPassword?: boolean;
}

const SimpleLoginPage = ({
	onBack,
	showForgotPassword = false,
}: SimpleLoginPageProps): JSX.Element => {
	const [keypad, setKeypad] = useState<Array<number | string>>([]);
	const [password, setPassword] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const [isConfirmStep, setIsConfirmStep] = useState(false);
	const [firstPassword, setFirstPassword] = useState("");
	const [isResettingPassword, setIsResettingPassword] = useState(false);

	const generateKeypad = useCallback(() => {
		const numbers = [...Array(10)].map((_, i) => i);

		for (let i = numbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
		}

		const keypadLayout = Array(12).fill(null);

		let numberIndex = 0;
		for (let i = 0; i < 12; i++) {
			if (i === 9) {
				keypadLayout[i] = "scan";
			} else if (i === 11) {
				keypadLayout[i] = "delete";
			} else {
				keypadLayout[i] = numbers[numberIndex++];
			}
		}

		setKeypad(keypadLayout);
	}, []);

	useEffect(() => {
		generateKeypad();
	}, [generateKeypad]);

	const handleForgotPassword = () => {
		setIsResettingPassword(true);
		setPassword("");
		setFirstPassword("");
		setIsConfirmStep(false);
	};

	const handleNumberClick = async (num: number) => {
		if (password.length < 6) {
			const newPassword = password + num;
			setPassword(newPassword);

			if (newPassword.length === 6) {
				if (location.state?.userid) {
					// 회원가입 후 간편비밀번호 최초 설정
					if (!isConfirmStep) {
						setFirstPassword(newPassword);
						setPassword("");
						setIsConfirmStep(true);
					} else {
						if (newPassword === firstPassword) {
							try {
								const { userid } = location.state;
								await userService.changeSimplePassword({
									identifier: userid,
									simplePassword: newPassword,
								});
								navigate("/");
							} catch (error) {
								console.error(
									"간편 비밀번호 설정 실패:",
									error
								);
								alert(
									"간편 비밀번호 설정에 실패했습니다. 다시 시도해주세요."
								);
								setPassword("");
								setFirstPassword("");
								setIsConfirmStep(false);
							}
						} else {
							alert(
								"비밀번호가 일치하지 않습니다. 다시 입력해주세요."
							);
							setPassword("");
							setFirstPassword("");
							setIsConfirmStep(false);
						}
					}
				} else if (isResettingPassword) {
					// 비밀번호 재설정
					if (!isConfirmStep) {
						setFirstPassword(newPassword);
						setPassword("");
						setIsConfirmStep(true);
					} else {
						if (newPassword === firstPassword) {
							try {
								const deviceId =
									localStorage.getItem("deviceId");
								const username =
									localStorage.getItem("username"); // 로그인 시 저장했던 username 사용
								await userService.changeSimplePassword({
									identifier: username!, // username을 identifier로 사용
									simplePassword: newPassword,
								});
								navigate("/");
							} catch (error) {
								console.error(
									"간편 비밀번호 변경 실패:",
									error
								);
								alert(
									"간편 비밀번호 변경에 실패했습니다. 다시 시도해주세요."
								);
								setPassword("");
								setFirstPassword("");
								setIsConfirmStep(false);
							}
						} else {
							alert(
								"비밀번호가 일치하지 않습니다. 다시 입력해주세요."
							);
							setPassword("");
							setFirstPassword("");
							setIsConfirmStep(false);
						}
					}
				} else {
					// 일반 로그인
					try {
						// TODO: 간편 비밀번호 로그인 API 호출
						navigate("/");
					} catch (error) {
						console.error("간편 로그인 실패:", error);
						alert("로그인에 실패했습니다. 다시 시도해주세요.");
						setPassword("");
					}
				}
			}
		}
	};

	const handleDelete = () => {
		setPassword((prev) => prev.slice(0, -1));
	};

	const getTitle = () => {
		if (location.state?.userid) {
			return isConfirmStep
				? "간편 비밀번호를\n한번 더 입력해 주세요."
				: "간편 비밀번호를\n등록해 주세요.";
		}

		if (isResettingPassword) {
			return isConfirmStep
				? "간편 비밀번호를\n한번 더 입력해 주세요."
				: "새로운 간편 비밀번호를\n입력해 주세요.";
		}

		return "간편 비밀번호를\n입력해 주세요.";
	};

	return (
		<styled.Container>
			<styled.BackButton src={backbtn} onClick={onBack} />
			<styled.TopContainer>
				<styled.SimpleLoginIcon>🔑</styled.SimpleLoginIcon>
				<styled.SimpleLoginTitle>{getTitle()}</styled.SimpleLoginTitle>

				<styled.PasswordDiv>
					{[...Array(6)].map((_, i) => (
						<styled.PasswordCircle
							key={i}
							filled={password.length > i}
						/>
					))}
				</styled.PasswordDiv>

				{showForgotPassword &&
					!isResettingPassword &&
					!isConfirmStep && (
						<styled.ForgotPassword
							style={{
								textDecoration: "underline",
								marginTop: "54px",
							}}
							onClick={handleForgotPassword}
						>
							혹시, 비밀번호를 잊으셨나요?
						</styled.ForgotPassword>
					)}
			</styled.TopContainer>

			<styled.KeypadContainer>
				{keypad.map((value, index) => {
					if (value === "scan") {
						return <styled.FaceIdBtn key="scan" src={faceidicon} />;
					}

					if (value === "delete") {
						return (
							<styled.SpecialButton
								key="delete"
								onClick={handleDelete}
							>
								←
							</styled.SpecialButton>
						);
					}

					return (
						<styled.KeypadButton
							key={index}
							onClick={() => handleNumberClick(value as number)}
						>
							{value}
						</styled.KeypadButton>
					);
				})}
			</styled.KeypadContainer>
		</styled.Container>
	);
};

export default SimpleLoginPage;
