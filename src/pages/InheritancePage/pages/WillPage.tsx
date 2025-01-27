import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import willdeco from "../../../images/will-decoration.png";

interface WillData {
	inheritances: {
		type: string;
		subType: string;
		financialInstitution: string | null;
		asset: string;
		amount: string;
		ancestors: {
			name: string;
			relation: string;
			ratio: number;
		}[];
	}[];
	executors: {
		name: string;
		relation: string;
		priority: number;
	}[];
	finalMessages: {
		name: string;
		relation: string;
		message: string;
	}[];
	shareAt: number;
}

interface WillPageProps extends PageProps {
	setCurrentPage: (page: number) => void;
	bankData: any[];
	realEstateData: any[];
	etcData: any[];
	lastWordsData: any[];
}

const WillPage: React.FC<WillPageProps> = ({
	onNext,
	formData,
	setFormData,
	setCurrentPage,
	bankData = [],
	realEstateData = [],
	etcData = [],
	lastWordsData = [],
}) => {
	const [willData, setWillData] = useState<WillData>({
		inheritances: [],
		executors: [],
		finalMessages: [],
		shareAt: 0,
	});

	useEffect(() => {
		// Process and combine all inheritance data
		const processedInheritances = [
			...realEstateData.map((item) => ({
				type: "부동산",
				subType: item.subType,
				financialInstitution: null,
				asset: item.asset,
				amount: item.amount.toString(),
				ancestors: item.ancestors.map((ancestor) => ({
					name: ancestor.name,
					relation: ancestor.relation,
					ratio: ancestor.ratio,
				})),
			})),
			...bankData.map((item) => ({
				type: "금융",
				subType: item.subType,
				financialInstitution: item.financialInstitution,
				asset: item.asset,
				amount: item.amount.toString(),
				ancestors: item.ancestors.map((ancestor) => ({
					name: ancestor.name,
					relation: ancestor.relation,
					ratio: ancestor.ratio,
				})),
			})),
			...etcData.map((item) => ({
				type: "기타",
				subType: item.subType,
				financialInstitution: null,
				asset: item.asset,
				amount: item.amount.toString(),
				ancestors: item.ancestors.map((ancestor) => ({
					name: ancestor.name,
					relation: ancestor.relation,
					ratio: ancestor.ratio,
				})),
			})),
		];

		// Process executor data
		const processedExecutors = [
			{
				name: formData.executor.name,
				relation: formData.executor.relationship,
				priority: 1,
			},
		];

		// Process final messages
		const processedMessages = lastWordsData.map((item) => ({
			name: item.name,
			relation: item.relation,
			message: item.message,
		}));

		// Process share timing
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

		// Set all processed data
		setWillData({
			inheritances: processedInheritances,
			executors: processedExecutors,
			finalMessages: processedMessages,
			shareAt,
		});
	}, [bankData, realEstateData, etcData, lastWordsData, formData]);

	console.log(willData);

	const formatAmount = (amount: number) => {
		return new Intl.NumberFormat("ko-KR").format(amount);
	};

	const calculateTotalAmount = () => {
		const total = [...bankData, ...realEstateData, ...etcData].reduce(
			(sum, item) => sum + item.amount,
			0
		);
		return formatAmount(total);
	};

	const handleReset = () => {
		setFormData({
			personalInfo: {
				name: "홍길동",
				birthDate: "19OO. OO. OO.",
				address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
			},
			uploadType: null,
			uploadedPhotos: [],
			executor: {
				name: "",
				relationship: "",
			},
			shareTimingChoice: null,
		});
		setCurrentPage(0);
	};

	const saveWillData = async () => {
		try {
			// Here you would typically make an API call to save the data
			console.log("Saving will data:", JSON.stringify(willData, null, 2));

			// You can add your API call here
			// await api.saveWillData(willData);

			return true;
		} catch (error) {
			console.error("Error saving will data:", error);
			return false;
		}
	};

	const handleSubmit = async () => {
		const saved = await saveWillData();
		if (saved) {
			console.log("Will data saved successfully");
			onNext();
		} else {
			console.error("Failed to save will data");
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
								<styled.Page8WillDate>
									2025.01.16
								</styled.Page8WillDate>
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

								{/* 유언집행자 정보 */}
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
									<div
										style={{
											padding: "8px",
											backgroundColor: "#f8f9fa",
											borderRadius: "8px",
											fontSize: "13px",
										}}
									>
										<p>성명: {formData.executor.name}</p>
										<p>
											관계:{" "}
											{formData.executor.relationship}
										</p>
									</div>
								</div>

								{realEstateData.length > 0 && (
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
										{realEstateData.map((item, index) => (
											<div
												key={`real-estate-${index}`}
												style={{
													marginBottom: "12px",
													padding: "8px",
													backgroundColor: "#f8f9fa",
													borderRadius: "8px",
													fontSize: "13px",
												}}
											>
												<p>주소: {item.asset}</p>
												<p>
													현재가:{" "}
													{formatAmount(item.amount)}
													원
												</p>
												<p>상속인:</p>
												{item.ancestors.map(
													(ancestor, idx) => (
														<p
															key={`real-estate-ancestor-${idx}`}
														>
															{ancestor.name}(
															{ancestor.relation})
															- {ancestor.ratio}%
														</p>
													)
												)}
											</div>
										))}
									</div>
								)}

								{bankData.length > 0 && (
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
										{bankData.map((item, index) => (
											<div
												key={`bank-${index}`}
												style={{
													marginBottom: "12px",
													padding: "8px",
													backgroundColor: "#f8f9fa",
													borderRadius: "8px",
													fontSize: "13px",
												}}
											>
												<p>
													{item.financialInstitution}{" "}
													- {item.asset}
												</p>
												<p>
													금액:{" "}
													{formatAmount(item.amount)}
													원
												</p>
												<p>상속인:</p>
												{item.ancestors.map(
													(ancestor, idx) => (
														<p
															key={`bank-ancestor-${idx}`}
														>
															{ancestor.name}(
															{ancestor.relation})
															- {ancestor.ratio}%
														</p>
													)
												)}
											</div>
										))}
									</div>
								)}

								{etcData.length > 0 && (
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
										{etcData.map((item, index) => (
											<div
												key={`etc-${index}`}
												style={{
													marginBottom: "12px",
													padding: "8px",
													backgroundColor: "#f8f9fa",
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
													{formatAmount(item.amount)}
													원
												</p>
												<p>상속인:</p>
												{item.ancestors.map(
													(ancestor, idx) => (
														<p
															key={`etc-ancestor-${idx}`}
														>
															{ancestor.name}(
															{ancestor.relation})
															- {ancestor.ratio}%
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

								{lastWordsData.length > 0 && (
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
										{lastWordsData.map((item, index) => (
											<div
												key={`message-${index}`}
												style={{
													marginBottom: "12px",
													padding: "8px",
													backgroundColor: "#f8f9fa",
													borderRadius: "8px",
													fontSize: "13px",
												}}
											>
												<p>
													To. {item.name}(
													{item.relation})
												</p>
												<p style={{ marginTop: "4px" }}>
													{item.message}
												</p>
											</div>
										))}
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
												? "병환중"
												: "일상시"}
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
				<Link to="/inheritance" style={{ textDecoration: "none" }}>
					<BlueButton
						variant="medium"
						onClick={() => {
							console.log("제출하기:", {
								formData,
								bankData,
								realEstateData,
								etcData,
								lastWordsData,
							});
							onNext();
						}}
					>
						제출하기
					</BlueButton>
				</Link>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

export default WillPage;
