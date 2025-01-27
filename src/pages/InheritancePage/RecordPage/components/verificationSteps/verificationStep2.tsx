// import React from "react";
// import * as styled from "../../styles";
// import BlueButton from "../../../../../ui/BlueBtn";
// import WhiteButton from "../../../../../ui/WhiteBtn";

// interface Ancestor {
// 	name: string;
// 	relation: string;
// 	ratio: number;
// }

// interface BankData {
// 	type: string;
// 	subType: string;
// 	financialInstitution: string;
// 	asset: string;
// 	amount: number;
// 	ancestors: Ancestor[];
// }

// interface VerificationStep1Props {
// 	bankData: BankData[];
// 	onNext: () => void;
// 	onPrev: () => void;
// }

// export const VerificationStep1: React.FC<VerificationStep1Props> = ({
// 	bankData = [],
// 	onNext,
// 	onPrev,
// }) => {
// 	const formatAmount = (amount: number) => {
// 		return new Intl.NumberFormat("ko-KR").format(amount);
// 	};

// 	const calculateTotalAmount = () => {
// 		return bankData.reduce((sum, item) => sum + item.amount, 0);
// 	};

// 	return (
// 		<styled.UploadPageContainer>
// 			<styled.TopContainer>
// 				<styled.Title>금융 자산 확인</styled.Title>
// 				<styled.SubTitle>
// 					녹음하신 내용을 바탕으로 분석된 금융 자산 정보입니다. 내용을
// 					확인해주세요.
// 				</styled.SubTitle>
// 			</styled.TopContainer>

// 			<styled.VerificationStepContainer>
// 				<styled.TopContainer>
// 					<styled.CardContainer>
// 						{bankData.map((item, index) => (
// 							<styled.Card key={index}>
// 								<styled.CardContent>
// 									<styled.AccountInfo>
// 										<styled.AccountInfoTitle>
// 											은행 :&nbsp;
// 										</styled.AccountInfoTitle>
// 										<styled.AccountInfoValue>
// 											{item.financialInstitution}
// 										</styled.AccountInfoValue>
// 									</styled.AccountInfo>
// 									<styled.AccountInfo>
// 										<styled.AccountInfoTitle>
// 											계좌명 :&nbsp;
// 										</styled.AccountInfoTitle>
// 										<styled.AccountInfoValue>
// 											{item.asset}
// 										</styled.AccountInfoValue>
// 									</styled.AccountInfo>
// 									<styled.AccountInfo>
// 										<styled.AccountInfoTitle>
// 											잔액 :&nbsp;
// 										</styled.AccountInfoTitle>
// 										<styled.AccountInfoValue>
// 											{formatAmount(item.amount)}원
// 										</styled.AccountInfoValue>
// 									</styled.AccountInfo>
// 									<styled.AccountInfo>
// 										<styled.AccountInfoTitle>
// 											계좌 종류 :&nbsp;
// 										</styled.AccountInfoTitle>
// 										<styled.AccountInfoValue>
// 											{item.type} ({item.subType})
// 										</styled.AccountInfoValue>
// 									</styled.AccountInfo>
// 									<styled.AccountInfo>
// 										<styled.AccountInfoTitle>
// 											상속인 정보 :&nbsp;
// 										</styled.AccountInfoTitle>
// 									</styled.AccountInfo>
// 									<styled.AccountInfo>
// 										<div
// 											style={{
// 												display: "flex",
// 												flexDirection: "column",
// 											}}
// 										>
// 											{item.ancestors.map(
// 												(ancestor, idx) => (
// 													<div key={idx}>
// 														<styled.AccountInfoValue>
// 															{ancestor.name}(
// 															{ancestor.relation})
// 															- {ancestor.ratio}%
// 														</styled.AccountInfoValue>
// 													</div>
// 												)
// 											)}
// 										</div>
// 									</styled.AccountInfo>
// 								</styled.CardContent>
// 							</styled.Card>
// 						))}
// 					</styled.CardContainer>

// 					<div className="mt-6">
// 						<div className="text-right mb-4">
// 							<div className="text-gray-600">총 금융자산</div>
// 							<div className="text-xl font-bold">
// 								{formatAmount(calculateTotalAmount())}원
// 							</div>
// 						</div>
// 					</div>
// 				</styled.TopContainer>
// 				<styled.ButtonBottomDiv>
// 					<WhiteButton
// 						variant="medium"
// 						onClick={onPrev}
// 						style={{ marginRight: "8px" }}
// 					>
// 						이전으로
// 					</WhiteButton>
// 					<BlueButton variant="medium" onClick={onNext}>
// 						다음으로
// 					</BlueButton>
// 				</styled.ButtonBottomDiv>
// 			</styled.VerificationStepContainer>
// 		</styled.UploadPageContainer>
// 	);
// };

import React, { useState } from "react";
import * as styled from "../../styles";
import BlueButton from "../../../../../ui/BlueBtn";
import WhiteButton from "../../../../../ui/WhiteBtn";

interface Ancestor {
	name: string;
	relation: string;
	ratio: number;
}

interface BankData {
	type: string;
	subType: string;
	financialInstitution: string;
	asset: string;
	amount: number;
	ancestors: Ancestor[];
}

interface VerificationStep2Props {
	bankData: BankData[];
	onNext: (updatedData: BankData[]) => void;
	onPrev: () => void;
}

export const VerificationStep2: React.FC<VerificationStep2Props> = ({
	bankData = [],
	onNext,
	onPrev,
}) => {
	const [editData, setEditData] = useState<BankData[]>(bankData);
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
		field: keyof BankData,
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

	const handleAncestorChange = (
		dataIndex: number,
		ancestorIndex: number,
		field: keyof Ancestor,
		value: string
	) => {
		const newData = [...editData];
		if (field === "ratio") {
			newData[dataIndex].ancestors[ancestorIndex][field] = Number(value);
		} else {
			newData[dataIndex].ancestors[ancestorIndex][field] = value;
		}
		setEditData(newData);
	};

	const handleNext = () => {
		onNext(editData);
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>금융 자산 확인</styled.Title>
				<styled.SubTitle>
					녹음하신 내용을 바탕으로 분석된 금융 자산 정보입니다. 내용을
					확인해주세요.
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
													은행 :&nbsp;
												</styled.AccountInfoTitle>
												<input
													value={
														item.financialInstitution
													}
													onChange={(e) =>
														handleInputChange(
															index,
															"financialInstitution",
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
													계좌명 :&nbsp;
												</styled.AccountInfoTitle>
												<input
													value={item.asset}
													onChange={(e) =>
														handleInputChange(
															index,
															"asset",
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
													잔액 :&nbsp;
												</styled.AccountInfoTitle>
												<input
													value={item.amount}
													onChange={(e) =>
														handleInputChange(
															index,
															"amount",
															e.target.value
														)
													}
													type="number"
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
											{item.ancestors.map(
												(ancestor, ancestorIndex) => (
													<styled.AccountInfo
														key={ancestorIndex}
													>
														<styled.AccountInfoTitle>
															상속인 :&nbsp;
														</styled.AccountInfoTitle>
														<input
															value={
																ancestor.name
															}
															onChange={(e) =>
																handleAncestorChange(
																	index,
																	ancestorIndex,
																	"name",
																	e.target
																		.value
																)
															}
															style={{
																padding: "4px",
																border: "1px solid #ccc",
																borderRadius:
																	"4px",
																marginRight:
																	"8px",
																width: "70px",
																backgroundColor:
																	"white",
																color: "#2b2b2b",
															}}
														/>
														<input
															value={
																ancestor.relation
															}
															onChange={(e) =>
																handleAncestorChange(
																	index,
																	ancestorIndex,
																	"relation",
																	e.target
																		.value
																)
															}
															style={{
																padding: "4px",
																border: "1px solid #ccc",
																borderRadius:
																	"4px",
																marginRight:
																	"8px",
																width: "90px",
																backgroundColor:
																	"white",
																color: "#2b2b2b",
															}}
														/>
														<input
															value={
																ancestor.ratio
															}
															onChange={(e) =>
																handleAncestorChange(
																	index,
																	ancestorIndex,
																	"ratio",
																	e.target
																		.value
																)
															}
															type="number"
															style={{
																padding: "4px",
																border: "1px solid #ccc",
																borderRadius:
																	"4px",

																width: "50px",
																backgroundColor:
																	"white",
																color: "#2b2b2b",
															}}
														/>
													</styled.AccountInfo>
												)
											)}
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
													은행 :&nbsp;
												</styled.AccountInfoTitle>
												<styled.AccountInfoValue>
													{item.financialInstitution}
												</styled.AccountInfoValue>
											</styled.AccountInfo>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													계좌명 :&nbsp;
												</styled.AccountInfoTitle>
												<styled.AccountInfoValue>
													{item.asset}
												</styled.AccountInfoValue>
											</styled.AccountInfo>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													잔액 :&nbsp;
												</styled.AccountInfoTitle>
												<styled.AccountInfoValue>
													{formatAmount(item.amount)}
													원
												</styled.AccountInfoValue>
											</styled.AccountInfo>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													계좌 종류 :&nbsp;
												</styled.AccountInfoTitle>
												<styled.AccountInfoValue>
													{item.type} ({item.subType})
												</styled.AccountInfoValue>
											</styled.AccountInfo>
											<styled.AccountInfo>
												<styled.AccountInfoTitle>
													상속인 정보 :&nbsp;
												</styled.AccountInfoTitle>
											</styled.AccountInfo>
											<styled.AccountInfo>
												<div
													style={{
														display: "flex",
														flexDirection: "column",
													}}
												>
													{item.ancestors.map(
														(ancestor, idx) => (
															<div key={idx}>
																<styled.AccountInfoValue>
																	{
																		ancestor.name
																	}
																	(
																	{
																		ancestor.relation
																	}
																	) -{" "}
																	{
																		ancestor.ratio
																	}
																	%
																</styled.AccountInfoValue>
															</div>
														)
													)}
												</div>
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
						<div
							style={{
								marginTop: "24px",
								marginBottom: "24px",
								textAlign: "left",
							}}
						>
							<styled.AccountInfoTitle>
								총 금융자산
							</styled.AccountInfoTitle>
							<styled.AccountInfoValue
								style={{ fontSize: "20px", fontWeight: "bold" }}
							>
								{formatAmount(calculateTotalAmount())}원
							</styled.AccountInfoValue>
						</div>
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
