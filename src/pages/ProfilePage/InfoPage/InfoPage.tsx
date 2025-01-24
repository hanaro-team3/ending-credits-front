import { useState, useEffect } from "react";
import Header from "../../../layout/Header";
import * as styled from "../styles";
import { useNavigate } from "react-router-dom";
import { memberService } from "../../../services/api/Member";

export default function InfoPage() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		const fetchMemberInfo = async () => {
			try {
				const accessToken = localStorage.getItem("accessToken");
				if (!accessToken) {
					// 토큰이 없으면 로그인 페이지로 리다이렉트
					alert("토큰이 없습니다. 다시 로그인해주세요.");
					navigate("/login");
					return;
				}

				const response = await memberService.getMemberInfo(
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				console.log("API Response:", response.data.result);

				if (response) {
					setName(response.data.result.name || "");
					setBirthDate(response.data.result.birthDate || "");
					setPhoneNumber(response.data.result.phoneNumber || "");
					setAddress(response.data.result.address || "");
				}

				// API 응답에서 받은 데이터로 state 업데이트
				const { name, birthDate, phoneNumber, address } =
					response.data.result;
				setName(name);
				setBirthDate(birthDate);
				setPhoneNumber(phoneNumber);
				setAddress(address);
			} catch (error) {
				console.error("Failed to fetch member info:", error);
				// 에러 처리 - 토큰이 만료되었거나 유효하지 않은 경우
				if (error.response?.status === 401) {
					localStorage.removeItem("accessToken");
					alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
					navigate("/login");
				}
			}
		};

		fetchMemberInfo();
	}, [navigate]);

	return (
		<styled.Container $color="white">
			<Header title="내 정보 관리" showClose={true}></Header>
			<styled.BaseContainer>
				{/* 이름 */}
				<styled.InfoRow>
					<styled.BaseText>이름</styled.BaseText>
					<styled.FlexContainer>
						<styled.BaseText>{name}</styled.BaseText>
						<div style={{ width: "11px" }}></div>
					</styled.FlexContainer>
				</styled.InfoRow>

				{/* 생년월일 */}
				<styled.InfoRow>
					<styled.BaseText>생년월일</styled.BaseText>
					<styled.FlexContainer>
						<styled.BaseText>{birthDate}</styled.BaseText>
						<div style={{ width: "11px" }}></div>
					</styled.FlexContainer>
				</styled.InfoRow>

				{/* 전화번호 */}
				<styled.InfoRow>
					<styled.BaseText>전화번호</styled.BaseText>
					<styled.FlexContainer>
						<styled.BaseText>{phoneNumber}</styled.BaseText>
						<styled.RightArrowButton
							onClick={() =>
								navigate("/profile/info/phone-number")
							}
						></styled.RightArrowButton>
					</styled.FlexContainer>
				</styled.InfoRow>

				{/* 거주지 */}
				<styled.InfoRow>
					<styled.BaseText>거주지</styled.BaseText>
					<styled.FlexContainer
						style={{
							maxWidth: "70%",
						}}
					>
						<styled.BaseText
							style={{
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{address}
						</styled.BaseText>
						<styled.RightArrowButton
							onClick={() => navigate("/profile/info/address")}
						></styled.RightArrowButton>
					</styled.FlexContainer>
				</styled.InfoRow>
			</styled.BaseContainer>
		</styled.Container>
	);
}
