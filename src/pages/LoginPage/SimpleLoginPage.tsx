import React, { useState, useEffect, useCallback } from "react";
import * as styled from "./styles";
import backbtn from "../../images/back-icon.png";
import { EndingCreditLoginProps } from "./types";

import faceidicon from "../../images/face-id-icon.png";
import backspaceicon from "../../images/backspace-icon.png";

const SimpleLoginPage = ({ onBack }: EndingCreditLoginProps): JSX.Element => {
	const [keypad, setKeypad] = useState<Array<number | string>>([]);
	const [password, setPassword] = useState("");

	// 키패드 숫자 배열을 생성하는 함수
	const generateKeypad = useCallback(() => {
		// 0-9까지의 숫자를 포함하는 배열 생성
		const numbers = [...Array(10)].map((_, i) => i);

		// 숫자 배열을 랜덤하게 섞기
		for (let i = numbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
		}

		// 12개의 버튼 배열 생성 (3x4 그리드)
		const keypadLayout = Array(12).fill(null);

		// 9번과 11번 인덱스를 제외한 모든 위치에 숫자 배치
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

	// 컴포넌트 마운트시 키패드 생성
	useEffect(() => {
		generateKeypad();
	}, [generateKeypad]);

	// 비밀번호 입력 처리
	const handleNumberClick = (num: number) => {
		if (password.length < 6) {
			setPassword((prev) => prev + num);
		}
	};

	// 비밀번호 삭제
	const handleDelete = () => {
		setPassword((prev) => prev.slice(0, -1));
	};

	return (
		<styled.Container>
			<styled.BackButton src={backbtn} onClick={onBack} />
			<styled.TopContainer>
				<styled.SimpleLoginIcon>🔑</styled.SimpleLoginIcon>
				<styled.SimpleLoginTitle>
					간편 비밀번호를
					<br />
					입력해 주세요.
				</styled.SimpleLoginTitle>

				<styled.PasswordDiv>
					{[...Array(6)].map((_, i) => (
						<styled.PasswordCircle
							key={i}
							filled={password.length > i}
						/>
					))}
				</styled.PasswordDiv>

				<styled.ForgotPassword
					style={{ textDecoration: "underline", marginTop: "54px" }}
				>
					혹시, 비밀번호를 잊으셨나요?
				</styled.ForgotPassword>
			</styled.TopContainer>

			<styled.KeypadContainer>
				{keypad.map((value, index) => {
					if (value === "scan") {
						return <styled.FaceIdBtn src={faceidicon} />;
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
