import React, { useState, useEffect } from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import willdeco from "../../../images/will-decoration.png";
import { willService } from "../../../services/api/Will";
import { WillData, WillFileData } from "../../../services/dto/Will";
import { message } from "antd";

interface Page8Props extends PageProps {
	setCurrentPage: (page: number) => void;
}

const WillPhotoPage: React.FC<Page8Props> = ({
	onNext,
	formData,
	setFormData,
	setCurrentPage,
}) => {
	const [willData, setWillData] = useState<WillData>({
		inheritances: [],
		executors: [],
		finalMessages: [],
		shareAt: 0,
	});

	useEffect(() => {
		if (!formData) return;

		const processedInheritances = [
			...(formData.bankData || []).map((item) => ({
				type: "금융",
				subType: item.subType,
				financialInstitution: item.financialInstitution,
				asset: item.asset,
				amount: item.amount.toString(),
				ancestors: item.ancestors,
			})),
			...(formData.realEstateData || []).map((item) => ({
				type: "부동산",
				subType: item.subType,
				financialInstitution: null,
				asset: item.asset,
				amount: item.amount.toString(),
				ancestors: item.ancestors,
			})),
			...(formData.etcData || []).map((item) => ({
				type: "기타",
				subType: item.subType,
				financialInstitution: item.financialInstitution,
				asset: item.asset,
				amount: item.amount.toString(),
				ancestors: item.ancestors,
			})),
		];

		const processedExecutors =
			formData.executors?.map((exec) => ({
				name: exec.name,
				relation: exec.relation,
				priority: exec.priority,
				phoneNumber: "010-1234-5678",
			})) || [];

		const processedMessages =
			formData.finalMessages?.map((message) => ({
				name: message.name,
				relation: message.relation,
				message: message.message,
			})) || [];

		const shareAt = (() => {
			switch (formData.shareTimingChoice) {
				case "anytime":
					return 0;
				case "sickness":
					return 1;
				case "death":
					return 2;
				default:
					return 0;
			}
		})();

		setWillData({
			inheritances: processedInheritances,
			executors: processedExecutors,
			finalMessages: processedMessages,
			shareAt,
		});
	}, [formData]);

	const formatAmount = (amount: number) => {
		return new Intl.NumberFormat("ko-KR").format(amount);
	};

	const calculateTotalAmount = () => {
		const total = willData.inheritances.reduce(
			(sum, item) => sum + Number(item.amount),
			0
		);
		return formatAmount(total);
	};

	const handleReset = () => {
		setFormData((prev) => ({
			...prev,
			uploadType: null,
			photoUrls: [],
			bankData: [],
			realEstateData: [],
			etcData: [],
			executors: [],
			finalMessages: [],
			shareTimingChoice: null,
		}));
		setCurrentPage(0);
	};

	const handleSubmit = async () => {
		try {
			const response = await willService.postWill(willData);
			if (response.data.result.willId) {
				message.success("유언장 생성 성공!");
				const willFileData: WillFileData = {
					willCodeId: response.data.result.willId,
					createdType: "OCR",
					files: [],
					shareAt: willData.shareAt,
				};

				const res = await willService.postWillFile(willFileData);
				if (res.data.code === "COMMON200") {
					onNext();
				}
			} else {
				message.error(
					"유언을 생성하는 데 실패했습니다. 다시 시도해 주세요."
				);
			}
		} catch (error) {
			console.error("Failed to fetch: ", error);
			message.error("오류가 발생했습니다. 다시 시도해 주세요.");
		}
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					<span style={{ color: "#4792dc" }}>작성하신 유언</span>의
					내용이 <br />
					모두 일치하는지 확인해 주세요.
				</styled.Title>
				<styled.SubTitle>
					내용이 모두 일치하면 제출하기 버튼을 눌러주세요. <br />
					일치하지 않으면 다시 작성할 수 있어요.
				</styled.SubTitle>
				<div
					style={{
						width: "330px",
						marginTop: "38px",
						marginBottom: "30px",
					}}
				>
					<div
						style={{
							position: "relative",
							padding: "3px",
							background: "white",
							border: "1px solid #524e4d",
						}}
					>
						<div
							style={{
								position: "relative",
								border: "3px solid #524e4d",
								padding: "3px",
							}}
						>
							<div
								style={{
									border: "1px solid #524e4d",
									padding: "20px",
								}}
							>
								<styled.Page8WillDecoration
									className="top-left"
									src={willdeco}
								/>
								<styled.Page8WillDecoration
									className="top-right"
									src={willdeco}
								/>
								<styled.Page8WillDecoration
									className="bottom-right"
									src={willdeco}
								/>
								<styled.Page8WillDecoration
									className="bottom-left"
									src={willdeco}
								/>

								<h2
									style={{
										fontSize: "20px",
										fontWeight: "bold",
										marginBottom: "8px",
										textAlign: "center",
										fontFamily: "Pretendard",
									}}
								>
									유언장
								</h2>
								<div
									style={{
										width: "100%",
										marginBottom: "20px",
									}}
								>
									<h3
										style={{
											fontSize: "16px",
											marginBottom: "8px",
											fontFamily: "Pretendard",
										}}
									>
										작성자 정보
									</h3>
									<div
										style={{
											padding: "8px",
											backgroundColor: "#f8f9fa",
											borderRadius: "8px",
											fontSize: "13px",
										}}
									>
										<p>
											성명: {formData.personalInfo.name}
										</p>
										<p>
											생년월일:{" "}
											{formData.personalInfo.birthDate}
										</p>
										<p>
											주소:{" "}
											{formData.personalInfo.address}
										</p>
									</div>
								</div>

								{formData.executors?.length > 0 && (
									<div
										style={{
											width: "100%",
											marginBottom: "20px",
										}}
									>
										<h3
											style={{
												fontSize: "16px",
												marginBottom: "8px",
												fontFamily: "Pretendard",
											}}
										>
											유언집행자
										</h3>
										{willData.executors.map(
											(executor, index) => (
												<div
													key={index}
													style={{
														padding: "8px",
														backgroundColor:
															"#f8f9fa",
														borderRadius: "8px",
														fontSize: "13px",
														marginBottom: "10px",
													}}
												>
													<p>성명: {executor.name}</p>
													<p>
														관계:{" "}
														{executor.relation}
													</p>
													<p>
														전화번호:{" "}
														{executor.phoneNumber}
													</p>
												</div>
											)
										)}
									</div>
								)}

								{willData.inheritances.filter(
									(item) => item.type === "부동산"
								).length > 0 && (
									<div
										style={{
											width: "100%",
											marginTop: "15px",
										}}
									>
										<h3
											style={{
												color: "#4792dc",
												fontSize: "16px",
												marginBottom: "8px",
												fontFamily: "Pretendard",
											}}
										>
											부동산 자산
										</h3>
										{willData.inheritances
											.filter(
												(item) => item.type === "부동산"
											)
											.map((item, index) => (
												<div
													key={`real-estate-${index}`}
													style={{
														marginBottom: "12px",
														padding: "8px",
														backgroundColor:
															"#f8f9fa",
														borderRadius: "8px",
														fontSize: "13px",
													}}
												>
													<p>주소: {item.asset}</p>
													<p>
														현재가:{" "}
														{formatAmount(
															item.amount
														)}
														원
													</p>
													<p>상속인:</p>
													{item.ancestors.map(
														(ancestor, idx) => (
															<p
																key={`real-estate-ancestor-${idx}`}
															>
																{ancestor.name}(
																{
																	ancestor.relation
																}
																) -{" "}
																{ancestor.ratio}
																%
															</p>
														)
													)}
												</div>
											))}
									</div>
								)}

								{willData.inheritances.filter(
									(item) => item.type === "금융"
								).length > 0 && (
									<div
										style={{
											width: "100%",
											marginTop: "15px",
										}}
									>
										<h3
											style={{
												color: "#4792dc",
												fontSize: "16px",
												marginBottom: "8px",
												fontFamily: "Pretendard",
											}}
										>
											금융 자산
										</h3>
										{willData.inheritances
											.filter(
												(item) => item.type === "금융"
											)
											.map((item, index) => (
												<div
													key={`bank-${index}`}
													style={{
														marginBottom: "12px",
														padding: "8px",
														backgroundColor:
															"#f8f9fa",
														borderRadius: "8px",
														fontSize: "13px",
													}}
												>
													<p>
														{
															item.financialInstitution
														}{" "}
														- {item.asset}
													</p>
													<p>
														금액:{" "}
														{formatAmount(
															item.amount
														)}
														원
													</p>
													<p>상속인:</p>
													{item.ancestors.map(
														(ancestor, idx) => (
															<p
																key={`bank-ancestor-${idx}`}
															>
																{ancestor.name}(
																{
																	ancestor.relation
																}
																) -{" "}
																{ancestor.ratio}
																%
															</p>
														)
													)}
												</div>
											))}
									</div>
								)}

								{willData.inheritances.filter(
									(item) => item.type === "기타"
								).length > 0 && (
									<div
										style={{
											width: "100%",
											marginTop: "15px",
										}}
									>
										<h3
											style={{
												color: "#4792dc",
												fontSize: "16px",
												marginBottom: "8px",
												fontFamily: "Pretendard",
											}}
										>
											기타 자산
										</h3>
										{willData.inheritances
											.filter(
												(item) => item.type === "기타"
											)
											.map((item, index) => (
												<div
													key={`etc-${index}`}
													style={{
														marginBottom: "12px",
														padding: "8px",
														backgroundColor:
															"#f8f9fa",
														borderRadius: "8px",
														fontSize: "13px",
													}}
												>
													<p>
														{item.subType} -{" "}
														{item.asset}
													</p>
													<p>
														금액:{" "}
														{formatAmount(
															item.amount
														)}
														원
													</p>
													<p>상속인:</p>
													{item.ancestors.map(
														(ancestor, idx) => (
															<p
																key={`etc-ancestor-${idx}`}
															>
																{ancestor.name}(
																{
																	ancestor.relation
																}
																) -{" "}
																{ancestor.ratio}
																%
															</p>
														)
													)}
												</div>
											))}
									</div>
								)}

								<div
									style={{
										width: "100%",
										marginTop: "15px",
										borderTop: "1px solid #eee",
										paddingTop: "8px",
									}}
								>
									<h3
										style={{
											fontSize: "16px",
											marginBottom: "8px",
											fontFamily: "Pretendard",
											fontWeight: "bold",
										}}
									>
										총 자산 금액: {calculateTotalAmount()}원
									</h3>
								</div>

								{willData.finalMessages?.length > 0 && (
									<div
										style={{
											width: "100%",
											marginTop: "15px",
										}}
									>
										<h3
											style={{
												color: "#4792dc",
												fontSize: "16px",
												marginBottom: "8px",
												fontFamily: "Pretendard",
											}}
										>
											마지막 말씀
										</h3>
										{willData.finalMessages.map(
											(message, index) => (
												<div
													key={`message-${index}`}
													style={{
														marginBottom: "12px",
														padding: "8px",
														backgroundColor:
															"#f8f9fa",
														borderRadius: "8px",
														fontSize: "13px",
													}}
												>
													<p>
														To. {message.name}(
														{message.relation})
													</p>
													<p
														style={{
															marginTop: "4px",
														}}
													>
														{message.message}
													</p>
												</div>
											)
										)}
									</div>
								)}

								<div
									style={{
										width: "100%",
										marginTop: "15px",
										marginBottom: "30px",
									}}
								>
									<h3
										style={{
											fontSize: "16px",
											marginBottom: "8px",
											fontFamily: "Pretendard",
										}}
									>
										공개 시점
									</h3>
									<div
										style={{
											padding: "8px",
											backgroundColor: "#f8f9fa",
											borderRadius: "8px",
											fontSize: "13px",
										}}
									>
										<p>
											{formData.shareTimingChoice ===
											"death"
												? "사망 시"
												: formData.shareTimingChoice ===
												  "sickness"
												? "병환 중"
												: "일상 시"}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</styled.TopContainer>

			<styled.ButtonBottomDiv style={{ paddingBottom: "100px" }}>
				<WhiteButton
					variant="medium"
					onClick={handleReset}
					style={{ marginRight: "8px" }}
				>
					다시하기
				</WhiteButton>

				<BlueButton
					variant="medium"
					onClick={() => {
						handleSubmit();
						onNext();
					}}
				>
					제출하기
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

export default WillPhotoPage;
