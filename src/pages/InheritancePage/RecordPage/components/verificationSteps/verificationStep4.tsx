import React, { useState } from "react";
import * as styled from "../../styles";
import BlueButton from "../../../../../ui/BlueBtn";
import WhiteButton from "../../../../../ui/WhiteBtn";

interface LastWordsData {
	message: string;
	name: string;
	relation: string;
}

interface VerificationStep4Props {
	lastWordsData: LastWordsData[];
	onNext: (updatedData: LastWordsData[]) => void;
	onPrev: () => void;
}

export const VerificationStep4: React.FC<VerificationStep4Props> = ({
	lastWordsData,
	onNext,
	onPrev,
}) => {
	const [editData, setEditData] = useState<LastWordsData[]>(lastWordsData);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const formatAmount = (amount: number) => {
		return new Intl.NumberFormat("ko-KR").format(amount);
	};

	const calculateTotalAmount = () => {
		return editData.reduce((sum, item) => sum + item.amount, 0);
	};

	const handleEdit = (index: number) => {
		setEditingIndex(index);
	};

	const handleSave = (index: number) => {
		setEditingIndex(null);
	};

	const handleInputChange = (
		index: number,
		field: keyof LastWordsData,
		value: string
	) => {
		const newData = [...editData];
		if (field === "amount") {
			newData[index][field] = Number(value.replace(/[^0-9]/g, ""));
		} else {
			newData[index][field] = value;
		}
		setEditData(newData);
	};

	const handleNext = () => {
		onNext(editData);
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>남기고 싶은 말 확인</styled.Title>
				<styled.SubTitle>
					녹음하신 내용을 바탕으로 분석된 마지막 말입니다. <br />
					내용을 확인해주세요.
				</styled.SubTitle>
			</styled.TopContainer>

			<styled.VerificationStepContainer>
				<styled.TopContainer>
					<styled.CardContainer>
						{editData.map((item, index) => (
							<styled.Card key={index}>
								<styled.CardContent>
									{editingIndex === index ? (
										<>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													이름 :&nbsp;
												</styled.AccountInfoTitle>
												<input
													value={item.name}
													onChange={(e) =>
														handleInputChange(
															index,
															"name",
															e.target.value
														)
													}
													style={{
														padding: "4px",
														border: "1px solid #ccc",
														borderRadius: "4px",
														backgroundColor:
															"white",
														color: "#2b2b2b",
													}}
												/>
											</styled.AccountInfo>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													관계 :&nbsp;
												</styled.AccountInfoTitle>
												<input
													value={item.relation}
													onChange={(e) =>
														handleInputChange(
															index,
															"relation",
															e.target.value
														)
													}
													style={{
														padding: "4px",
														border: "1px solid #ccc",
														borderRadius: "4px",
														backgroundColor:
															"white",
														color: "#2b2b2b",
													}}
												/>
											</styled.AccountInfo>
											<styled.AccountInfo
												style={{
													flexDirection: "column",
													alignItems: "flex-start",
													justifyContent:
														"flex-start",
												}}
											>
												<styled.AccountInfoTitle>
													남기는 말 :&nbsp;
												</styled.AccountInfoTitle>
												<input
													value={item.message}
													onChange={(e) =>
														handleInputChange(
															index,
															"message",
															e.target.value
														)
													}
													style={{
														padding: "4px",
														border: "1px solid #ccc",
														borderRadius: "4px",
														backgroundColor:
															"white",
														color: "#2b2b2b",
														width: "300px",
													}}
												/>
											</styled.AccountInfo>
											<BlueButton
												variant="small"
												onClick={() =>
													handleSave(index)
												}
												style={{ marginTop: "8px" }}
											>
												저장
											</BlueButton>
										</>
									) : (
										<>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													이름 :&nbsp;
												</styled.AccountInfoTitle>
												<styled.AccountInfoValue>
													{item.name}
												</styled.AccountInfoValue>
											</styled.AccountInfo>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													관계 :&nbsp;
												</styled.AccountInfoTitle>
												<styled.AccountInfoValue>
													{item.relation}
												</styled.AccountInfoValue>
											</styled.AccountInfo>
											<styled.AccountInfo
												style={{
													flexDirection: "column",
													alignItems: "flex-start",
													justifyContent:
														"flex-start",
												}}
											>
												<styled.AccountInfoTitle>
													남기는 말 :&nbsp;
												</styled.AccountInfoTitle>
												<styled.AccountInfoValue
													style={{ width: "300px" }}
												>
													{item.message}
												</styled.AccountInfoValue>
											</styled.AccountInfo>

											<BlueButton
												variant="small"
												onClick={() =>
													handleEdit(index)
												}
												style={{ marginTop: "8px" }}
											>
												수정
											</BlueButton>
										</>
									)}
								</styled.CardContent>
							</styled.Card>
						))}
					</styled.CardContainer>
				</styled.TopContainer>
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={onPrev}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton variant="medium" onClick={handleNext}>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			</styled.VerificationStepContainer>
		</styled.UploadPageContainer>
	);
};
