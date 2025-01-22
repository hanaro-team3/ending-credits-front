import React, { useState } from "react";
import * as styled from "../styles";
import { PageProps, Message } from "../types";
import BlueButton from "../../../../ui/BlueBtn";
import WhiteButton from "../../../../ui/WhiteBtn";

export const WritePage: React.FC<PageProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}): JSX.Element => {
	const [messages, setMessages] = useState<Message[]>([
		{ relationship: "", content: "" },
	]);

	const handleRelationshipChange = (index: number, value: string) => {
		const newMessages = [...messages];
		newMessages[index].relationship = value;
		setMessages(newMessages);
	};

	const handleContentChange = (index: number, value: string) => {
		const newMessages = [...messages];
		newMessages[index].content = value;
		setMessages(newMessages);

		setFormData((prevFormData) => ({
			...prevFormData,
			messages: newMessages,
		}));
	};

	const handleAddMessage = () => {
		const newMessages = [...messages, { relationship: "", content: "" }];
		setMessages(newMessages);

		setFormData((prevFormData) => ({
			...prevFormData,
			messages: newMessages,
		}));
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					<span style={{ color: "#4792dc" }}>남기고 싶은 말</span>을
					작성해 주세요.
				</styled.Title>
				<styled.SubTitle>
					전달하고 싶은 사람을 선택하고 <br />
					자유롭게 하고 싶은 말을 작성해 주세요.
				</styled.SubTitle>

				<styled.SelectInheriPageContainer>
					{messages.map((message, index) => (
						<styled.WritePageContainer key={index}>
							<styled.Page6InputDiv
								style={{
									marginTop: index === 0 ? "0" : "20px",
								}}
							>
								<styled.Page6InputDivText>
									관계 :{" "}
								</styled.Page6InputDivText>
								<styled.Page6Select
									value={message.relationship}
									onChange={(e) =>
										handleRelationshipChange(
											index,
											e.target.value
										)
									}
								>
									<option value="" disabled>
										관계를 선택해 주세요.
									</option>
									<option value="spouse">배우자</option>
									<option value="parents">부모</option>
									<option value="children">자녀</option>
									<option value="legalHeirs">
										법정상속인
									</option>
									<option value="donation">
										국가 등에 기부(유증)
									</option>
								</styled.Page6Select>
							</styled.Page6InputDiv>
							<styled.WritePageDiv style={{ marginTop: "10px" }}>
								<styled.Page6InputDivText>
									남기고 싶은 말 :{" "}
								</styled.Page6InputDivText>
								<styled.WritePageInput
									value={message.content}
									onChange={(e) =>
										handleContentChange(
											index,
											e.target.value
										)
									}
								/>
							</styled.WritePageDiv>
						</styled.WritePageContainer>
					))}

					<styled.WritePageEditSection>
						<BlueButton
							variant="small"
							style={{
								fontWeight: "500",
								fontSize: "11px",
								marginTop: "8px",
								marginBottom: "60px",
								marginRight: "15px",
								outline: "none",
							}}
							onClick={handleAddMessage}
						>
							추가하기
						</BlueButton>
					</styled.WritePageEditSection>
				</styled.SelectInheriPageContainer>
			</styled.TopContainer>
			<styled.ButtonBottomDiv>
				<WhiteButton
					variant="medium"
					onClick={onPrev}
					style={{ marginRight: "8px" }}
				>
					이전으로
				</WhiteButton>
				<BlueButton
					variant="medium"
					onClick={() => {
						setFormData((prev) => ({
							...prev,
							messages: messages,
						}));
						onNext();
					}}
				>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};
