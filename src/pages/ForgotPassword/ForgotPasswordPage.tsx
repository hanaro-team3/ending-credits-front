import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlueButton from "../../ui/BlueBtn";
import * as styled from "../SignupPage/styles";
import backbtn from "../../images/back-icon.png";
import { userService } from "../../services/api/SignUp";

const PhoneNumberPage = ({
	onNext,
}: {
	onNext: (phoneNumber: string) => void;
}) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [carrier, setCarrier] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [isVerificationSent, setIsVerificationSent] = useState(false);
	const [isVerified, setIsVerified] = useState(false);

	const isFormFilled = !isVerificationSent
		? phoneNumber && carrier
		: phoneNumber && carrier && verificationCode;

	const handleSendVerification = async () => {
		// API 호출 주석처리
		// try {
		//     await userService.sendSMS({ phoneNumber });
		// } catch (error) {
		//     console.error("Failed to send verification code:", error);
		// }
		setIsVerificationSent(true);
	};

	const handleVerify = async (e) => {
		e.preventDefault();
		// API 호출 주석처리
		// try {
		//     const response = await userService.verifySMS({
		//         phoneNumber,
		//         certificationCode: verificationCode
		//     });
		//     console.log('Verification Response:', response);
		// } catch (error) {
		//     console.error("Failed to verify code:", error);
		// }
		setIsVerified(true);
	};

	const handleButtonClick = () => {
		if (!isVerificationSent) {
			handleSendVerification();
		} else if (isVerified) {
			onNext(phoneNumber);
		}
	};

	const getButtonBackgroundColor = () => {
		if (!isFormFilled) return "#D0D0D0";
		if (isVerificationSent && !isVerified) return "#D0D0D0";
		return "#4792dc";
	};

	return (
		<styled.Container>
			<div>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<styled.BackButton src={backbtn} />
				</Link>
				<styled.Title>
					{isVerificationSent
						? "인증번호를 입력해주세요."
						: "전화번호를 입력해 주세요."}
				</styled.Title>
				<styled.Form>
					<styled.Input
						type="tel"
						name="phoneNumber"
						placeholder="전화번호"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<styled.Select
						name="carrier"
						value={carrier}
						onChange={(e) => setCarrier(e.target.value)}
					>
						<option value="" disabled style={{ color: "#dadada" }}>
							통신사를 선택해주세요
						</option>
						<option value="SKT">SKT</option>
						<option value="KT">KT</option>
						<option value="LGU+">LGU+</option>
						<option value="SKT 알뜰폰">SKT 알뜰폰</option>
						<option value="KT 알뜰폰">KT 알뜰폰</option>
						<option value="LGU+ 알뜰폰">LGU+ 알뜰폰</option>
					</styled.Select>
					{isVerificationSent && (
						<styled.PasswordInputWrapper>
							<styled.Input
								type="text"
								name="verificationCode"
								placeholder="인증번호"
								value={verificationCode}
								onChange={(e) =>
									setVerificationCode(e.target.value)
								}
							/>
							<styled.DupCheckBtn
								onClick={handleVerify}
								style={{
									cursor: verificationCode
										? "pointer"
										: "default",
									backgroundColor: verificationCode
										? "#4792dc"
										: "#D0D0D0",
								}}
							>
								중복확인
							</styled.DupCheckBtn>
							{isVerified && (
								<div
									style={{
										color: "#4792dc",
										marginTop: "8px",
										fontSize: "14px",
									}}
								>
									인증이 완료되었습니다
								</div>
							)}
						</styled.PasswordInputWrapper>
					)}
				</styled.Form>
			</div>
			<div>
				<BlueButton
					variant="large"
					style={{
						marginBottom: "100px",
						background: getButtonBackgroundColor(),
					}}
					onClick={handleButtonClick}
					disabled={isVerificationSent && !isVerified}
				>
					{isVerificationSent ? "다음으로" : "인증번호 보내기"}
				</BlueButton>
			</div>
		</styled.Container>
	);
};

const SetNewPasswordPage = ({ phoneNumber }) => {
	const navigate = useNavigate();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const isFormFilled = newPassword && confirmPassword;

	const handleSubmit = async () => {
		if (!isFormFilled) return;

		if (newPassword !== confirmPassword) {
			setError("비밀번호가 일치하지 않습니다");
			return;
		}

		try {
			await userService.changePassword({
				phoneNumber,
				password: newPassword,
			});
			console.log("Password change response received");
			navigate("/login");
		} catch (error) {
			console.error("Failed to change password:", error);
			setError("비밀번호 변경에 실패했습니다");
		}
	};

	return (
		<styled.Container>
			<div>
				<styled.BackButton src={backbtn} />
				<styled.Title>
					새로운 비밀번호를 <br />
					설정해주세요.
				</styled.Title>
				<styled.Form>
					<styled.Input
						type="password"
						name="newPassword"
						placeholder="새 비밀번호"
						value={newPassword}
						onChange={(e) => {
							setNewPassword(e.target.value);
							setError("");
						}}
					/>
					<styled.Input
						type="password"
						name="confirmPassword"
						placeholder="새 비밀번호 확인"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value);
							setError("");
						}}
					/>
					{error && (
						<div
							style={{
								color: "red",
								marginTop: "8px",
								fontSize: "14px",
							}}
						>
							{error}
						</div>
					)}
				</styled.Form>
			</div>
			<div>
				<BlueButton
					variant="large"
					style={{
						marginBottom: "100px",
						background: isFormFilled ? "#4792dc" : "#D0D0D0",
					}}
					onClick={handleSubmit}
				>
					재설정
				</BlueButton>
			</div>
		</styled.Container>
	);
};

const ForgotPasswordPage = () => {
	const [currentPage, setCurrentPage] = useState("phone");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handlePhoneVerified = (verifiedPhoneNumber) => {
		setPhoneNumber(verifiedPhoneNumber);
		setCurrentPage("password");
	};

	return currentPage === "phone" ? (
		<PhoneNumberPage onNext={handlePhoneVerified} />
	) : (
		<SetNewPasswordPage phoneNumber={phoneNumber} />
	);
};

export default ForgotPasswordPage;
