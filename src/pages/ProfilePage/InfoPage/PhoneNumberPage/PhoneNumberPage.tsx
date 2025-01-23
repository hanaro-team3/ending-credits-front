// import { useState } from "react";
// import Header from "../../../../layout/Header";
// import * as styled from "../../styles";
// import PhoneNumberInput from "./PhoneNumberInput";
// import Modal, { ModalOverlay } from "../../components/Modal";
// import { useNavigate } from "react-router-dom";

// export default function PhoneNumberPage() {
//   // 상수
//   const phoneNumberPattern = /^01[0-9]-\d{4}-\d{4}$/;
//   const navigate = useNavigate();

//   // State
//   const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
//   const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] =
//     useState<boolean>(false);

//   const [isVerificationCodeValid, setIsVerificationCodeValid] = useState<
//     boolean | undefined
//   >(undefined);

//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [verificationCode, setVerificationCode] = useState<string>("");

//   // Modal
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handlePhoneNumberChange = (newPhoneNumber: string) => {
//     setPhoneNumber(newPhoneNumber);
//     setIsPhoneNumberValid(phoneNumberPattern.test(newPhoneNumber));
//     setIsPhoneNumberSubmitted(false);
//   };

//   const handleVerificationCodeChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setVerificationCode(e.target.value);
//     setIsVerificationCodeValid(undefined);
//   };

//   const handlePhoneNumberSubmit = () => {
//     // 전화번호에서 하이픈 제거
//     const sanitizedPhoneNumber = phoneNumber.replace(/-/g, "");

//     // API 요청 로직
//     console.log("API에 전송할 전화번호:", sanitizedPhoneNumber);
//     // 요청에 성공하면
//     setIsPhoneNumberSubmitted(true);
//   };

//   const handleVerificationCodeSubmit = () => {
//     // API 요청 로직
//     console.log("API에 전송할 인증번호:", verificationCode);
//     const response = verificationCode === "123456";
//     // 응답 결과가 참이면
//     if (response) {
//       setIsVerificationCodeValid(true);
//       openModal();
//     } else setIsVerificationCodeValid(false);
//   };

//   return (
//     <styled.Container $color="white">
//       <Header title=""></Header>
//       <styled.BaseContainer
//         style={{
//           alignItems: "start",
//         }}
//       >
//         <styled.BaseText
//           style={{
//             fontSize: "24px",
//             fontWeight: "bold",
//           }}
//         >
//           {"전화번호를 입력해 주세요"}
//         </styled.BaseText>
//         <PhoneNumberInput onChange={handlePhoneNumberChange}></PhoneNumberInput>
//       </styled.BaseContainer>

//       {isPhoneNumberSubmitted ? (
//         <>
//           <styled.BaseContainer
//             style={{
//               alignItems: "start",
//             }}
//           >
//             <styled.BaseText
//               style={{
//                 fontSize: "24px",
//                 fontWeight: "bold",
//                 marginTop: "5vh",
//                 color: "black",
//               }}
//             >
//               {"인증번호를 입력해 주세요"}
//             </styled.BaseText>
//             <input
//               type="number"
//               style={{
//                 width: "100%",
//                 border: "2px solid #4792DC",
//                 borderRadius: "12px",
//                 height: "55px",
//                 padding: "1rem",
//                 backgroundColor: "white",
//                 color: "black",
//               }}
//               placeholder="문자로 수신한 인증번호 입력"
//               value={verificationCode}
//               onChange={handleVerificationCodeChange}
//             />
//             {isVerificationCodeValid === false && (
//               <styled.BaseText
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {"인증번호가 틀렸습니다."}
//               </styled.BaseText>
//             )}
//           </styled.BaseContainer>

//           <styled.LargeButtonContainer>
//             <styled.LargeButton onClick={handleVerificationCodeSubmit}>
//               인증하기
//             </styled.LargeButton>
//           </styled.LargeButtonContainer>
//         </>
//       ) : !isPhoneNumberValid ? (
//         <styled.LargeButtonContainer>
//           <styled.LargeButton
//             disabled
//             style={{
//               backgroundColor: "#D9D9D9",
//             }}
//           >
//             인증번호 받기
//           </styled.LargeButton>
//         </styled.LargeButtonContainer>
//       ) : (
//         <styled.LargeButtonContainer>
//           <styled.LargeButton onClick={handlePhoneNumberSubmit}>
//             인증번호 받기
//           </styled.LargeButton>
//         </styled.LargeButtonContainer>
//       )}
//       {isModalOpen && (
//         <>
//           <Modal
//             mainText="전화번호를 수정하시겠습니까?"
//             onConfirm={() => {
//               closeModal();
//               navigate(-1);
//             }}
//             onCancel={closeModal}
//           />
//           <ModalOverlay onClick={closeModal}></ModalOverlay>
//         </>
//       )}
//     </styled.Container>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../../services/api/SignUp";
import Header from "../../../../layout/Header";
import * as styled from "../../styles";
import PhoneNumberInput from "./PhoneNumberInput";
import Modal, { ModalOverlay } from "../../components/Modal";

export default function PhoneNumberPage() {
	// 상수
	const phoneNumberPattern = /^01[0-9]-\d{4}-\d{4}$/;
	const navigate = useNavigate();

	// State
	const [isPhoneNumberValid, setIsPhoneNumberValid] =
		useState<boolean>(false);
	const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] =
		useState<boolean>(false);
	const [isVerificationCodeValid, setIsVerificationCodeValid] = useState<
		boolean | undefined
	>(undefined);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [verificationCode, setVerificationCode] = useState<string>("");

	// Modal
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handlePhoneNumberChange = (newPhoneNumber: string) => {
		setPhoneNumber(newPhoneNumber);
		setIsPhoneNumberValid(phoneNumberPattern.test(newPhoneNumber));
		setIsPhoneNumberSubmitted(false);
	};

	const handleVerificationCodeChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setVerificationCode(e.target.value);
		setIsVerificationCodeValid(undefined);
	};

	const handlePhoneNumberSubmit = () => {
		// 전화번호에서 하이픈 제거
		const sanitizedPhoneNumber = phoneNumber.replace(/-/g, "");

		// API 요청 로직
		console.log("API에 전송할 전화번호:", sanitizedPhoneNumber);
		// 요청에 성공하면
		setIsPhoneNumberSubmitted(true);
	};

	const handleVerificationCodeSubmit = () => {
		// API 요청 로직
		console.log("API에 전송할 인증번호:", verificationCode);
		const response = verificationCode === "123456";
		// 응답 결과가 참이면
		if (response) {
			setIsVerificationCodeValid(true);
			openModal();
		} else setIsVerificationCodeValid(false);
	};

	return (
		<styled.Container $color="white">
			<Header title=""></Header>
			<styled.BaseContainer
				style={{
					alignItems: "start",
				}}
			>
				<styled.BaseText
					style={{
						fontSize: "24px",
						fontWeight: "bold",
					}}
				>
					{"전화번호를 입력해 주세요"}
				</styled.BaseText>
				<PhoneNumberInput
					onChange={handlePhoneNumberChange}
				></PhoneNumberInput>
			</styled.BaseContainer>

			{isPhoneNumberSubmitted ? (
				<>
					<styled.BaseContainer
						style={{
							alignItems: "start",
						}}
					>
						<styled.BaseText
							style={{
								fontSize: "24px",
								fontWeight: "bold",
								marginTop: "5vh",
								color: "black",
							}}
						>
							{"인증번호를 입력해 주세요"}
						</styled.BaseText>
						<input
							type="number"
							style={{
								width: "100%",
								border: "2px solid #4792DC",
								borderRadius: "12px",
								height: "55px",
								padding: "1rem",
								backgroundColor: "white",
								color: "black",
							}}
							placeholder="문자로 수신한 인증번호 입력"
							value={verificationCode}
							onChange={handleVerificationCodeChange}
						/>
						{isVerificationCodeValid === false && (
							<styled.BaseText
								style={{
									color: "red",
								}}
							>
								{"인증번호가 틀렸습니다."}
							</styled.BaseText>
						)}
					</styled.BaseContainer>

					<styled.LargeButtonContainer>
						<styled.LargeButton
							onClick={handleVerificationCodeSubmit}
						>
							인증하기
						</styled.LargeButton>
					</styled.LargeButtonContainer>
				</>
			) : !isPhoneNumberValid ? (
				<styled.LargeButtonContainer>
					<styled.LargeButton
						disabled
						style={{
							backgroundColor: "#D9D9D9",
						}}
					>
						인증번호 받기
					</styled.LargeButton>
				</styled.LargeButtonContainer>
			) : (
				<styled.LargeButtonContainer>
					<styled.LargeButton onClick={handlePhoneNumberSubmit}>
						인증번호 받기
					</styled.LargeButton>
				</styled.LargeButtonContainer>
			)}
			{isModalOpen && (
				<>
					<Modal
						mainText="전화번호를 수정하시겠습니까?"
						onConfirm={async () => {
							try {
								const sanitizedPhoneNumber =
									phoneNumber.replace(/-/g, "");
								const accessToken =
									localStorage.getItem("accessToken");
								if (!accessToken) {
									throw new Error("인증 토큰이 없습니다.");
								}
								await userService.changePhoneNumber(
									{ phoneNumber: sanitizedPhoneNumber },
									{
										headers: {
											Authorization: `Bearer ${accessToken}`,
										},
									}
								);
								closeModal();
								navigate(-1);
							} catch (error) {
								console.error("전화번호 변경 실패:", error);
							}
						}}
						onCancel={closeModal}
					/>
					<ModalOverlay onClick={closeModal}></ModalOverlay>
				</>
			)}
		</styled.Container>
	);
}
