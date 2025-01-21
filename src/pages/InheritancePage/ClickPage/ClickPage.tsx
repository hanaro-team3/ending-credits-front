import * as styled from "./styles";
import { Link } from "react-router-dom";
import closeicon from "../../../images/close-icon.png";
import React, { useState, useEffect, useRef } from "react";
import { PageProps } from "../types";

import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import recordbtn from "../../../images/record-button.png";
import pausebtn from "../../../images/pause-button.png";

//pages
import InitialPage from "./InitialPage"; // 초기 페이지
import ProfileViewPage from "../pages/ProfileViewPage"; //페이지 1 - 인적 정보 조회
import SetPersonPage from "../pages/SetPersonPage"; //페이지 6 - 유언 집행자 지정
import ShareTimePage from "../pages/ShareTimePage"; // 페이지 7 - 내용 공유 시점 설정
import WillPage from "../pages/WillPage"; // 페이지 8 - 유언장 완성

interface FormData {
	// Page 1 - 인적 정보 조회
	personalInfo: {
		name: string;
		birthDate: string;
		address: string;
	};

	// Page 2 - 재산 정보 조회
	assets: {
		realEstate: Array<{
			id: string;
			type: string;
			address: string;
			value: number;
		}>;
		stocks: Array<{
			id: string;
			type: string;
			details: string;
			value: number;
		}>;
	};

	// Page 3 - 상속인과 상속 비율 선택
	inheritanceInfo: {
		[key: string]: {
			inheritors: Array<{
				id: string;
				name: string;
				relation: string;
				ratio: number;
			}>;
		};
	};

	// Page 4 - 유언 집행자 지정
	executor: {
		name: string;
		relationship: string;
	};

	// Page 5 - 남기고 싶은 말 작성
	messages: Array<{
		relationship: string;
		content: string;
	}>;

	// Page 6 - 공유 시점 설정
	shareTimingChoice: "anytime" | "sickness" | "death" | null;
}

const Header = () => (
	<styled.HeaderContainer>
		<span>클릭 설계</span>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<styled.CloseButton src={closeicon} />
		</Link>
	</styled.HeaderContainer>
);

const AssetsViewPage: React.FC<PageProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					2. 피상속인의{" "}
					<span style={{ color: "#4792dc" }}>재산 정보</span>를 <br />
					조회했어요.
				</styled.Title>
				<styled.SubTitle>
					정보가 모두 일치한다면 '다음으로' 버튼을 눌러주세요.
				</styled.SubTitle>
				<styled.AssetWhiteBox>
					<styled.AssetInfoCategory>
						<styled.AssetInfoTitle>부동산</styled.AssetInfoTitle>
						<styled.AssetInfoSubtitle>
							1. 아파트
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO아파트 O동 O호
							<br />
							<span>30억</span>
						</styled.AssetInfoAddress>
						<styled.AssetInfoSubtitle>
							2. 빌라
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO빌라
							<br />
							<span>20억</span>
						</styled.AssetInfoAddress>
						<styled.AssetInfoSubtitle>
							3. 토지
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO-OO
							<br />
							<span>10억</span>
						</styled.AssetInfoAddress>
					</styled.AssetInfoCategory>
					<styled.AssetInfoLine />
					<styled.AssetInfoCategory>
						<styled.AssetInfoTitle>부동산</styled.AssetInfoTitle>
						<styled.AssetInfoSubtitle>
							1. 아파트
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO아파트 O동 O호
							<br />
							<span>30억</span>
						</styled.AssetInfoAddress>
						<styled.AssetInfoSubtitle>
							2. 빌라
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO빌라
							<br />
							<span>20억</span>
						</styled.AssetInfoAddress>
						<styled.AssetInfoSubtitle>
							3. 토지
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO-OO
							<br />
							<span>10억</span>
						</styled.AssetInfoAddress>
					</styled.AssetInfoCategory>
				</styled.AssetWhiteBox>
			</styled.TopContainer>
			<styled.ButtonBottomDiv>
				<WhiteButton
					variant="medium"
					onClick={onPrev}
					style={{ marginRight: "8px" }}
				>
					이전으로
				</WhiteButton>
				<BlueButton variant="medium" onClick={onNext}>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

interface InheritorModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { name: string; relation: string }) => void;
}

const SelectInheritorPage: React.FC<PageProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState<string>("");
	const [wasZero, setWasZero] = useState<{ [key: string]: boolean }>({});

	const [inheritanceInfo, setInheritanceInfo] = useState<{
		[key: string]: {
			inheritors: Array<{
				id: string;
				name: string;
				relation: string;
				ratio: number;
			}>;
		};
	}>({
		asset1: {
			inheritors: [],
		},
	});

	const getRemainingRatio = (
		assetId: string,
		excludeInheritorId?: string
	) => {
		const totalRatio = inheritanceInfo[assetId].inheritors
			.filter((inheritor) => inheritor.id !== excludeInheritorId)
			.reduce((sum, inheritor) => sum + inheritor.ratio, 0);
		return 100 - totalRatio;
	};

	const handleAddInheritor = (data: { name: string; relation: string }) => {
		const remainingRatio = getRemainingRatio(selectedAsset);

		// 새로운 상속인 객체 생성
		const newInheritor = {
			id: Date.now().toString(),
			name: data.name,
			relation: data.relation,
			ratio: remainingRatio, // 남은 비율을 새로운 상속인에게 할당
		};

		setInheritanceInfo((prev) => {
			const updatedInfo = {
				...prev,
				[selectedAsset]: {
					inheritors: [
						...prev[selectedAsset].inheritors, // 기존 상속인들의 비율 유지
						newInheritor,
					],
				},
			};

			// FormData 업데이트
			setFormData((prevFormData) => ({
				...prevFormData,
				inheritanceInfo: updatedInfo,
			}));

			return updatedInfo;
		});
		setIsModalOpen(false);
	};

	const handleRatioChange = (
		assetId: string,
		inheritorId: string,
		newRatio: number | string,
		isTyping: boolean = false
	) => {
		// 문자열이 빈 문자열이면 0으로 처리하고 wasZero 상태 업데이트
		if (newRatio === "") {
			setWasZero((prev) => ({ ...prev, [inheritorId]: true }));
			newRatio = "0";
		} else {
			setWasZero((prev) => ({ ...prev, [inheritorId]: false }));
		}

		// '-' 기호만 입력된 경우는 처리하지 않음
		if (newRatio === "-") return;

		const numericRatio =
			typeof newRatio === "string" ? parseFloat(newRatio) : newRatio;

		// NaN인 경우는 처리하지 않음
		if (isNaN(numericRatio)) return;

		setInheritanceInfo((prev) => {
			const asset = prev[assetId];
			const currentInheritor = asset.inheritors.find(
				(inheritor) => inheritor.id === inheritorId
			);

			if (!currentInheritor) return prev;

			// 다른 상속인들의 현재 총 비율 계산
			const otherInheritorsTotal = asset.inheritors
				.filter((inheritor) => inheritor.id !== inheritorId)
				.reduce((sum, inheritor) => sum + inheritor.ratio, 0);

			// 새로운 비율이 가능한지 확인
			const maxPossibleRatio = 100 - otherInheritorsTotal;
			const limitedRatio = Number(
				Math.min(Math.max(0, numericRatio), maxPossibleRatio).toFixed(
					isTyping ? 20 : 1
				)
			);

			const updatedInheritors = asset.inheritors.map((inheritor) => {
				if (inheritor.id === inheritorId) {
					return { ...inheritor, ratio: limitedRatio };
				}
				return inheritor;
			});

			return {
				...prev,
				[assetId]: {
					...asset,
					inheritors: updatedInheritors,
				},
			};
		});
	};

	const saveInheritorInfo = (name: string, relation: string) => {
		try {
			const storedData = localStorage.getItem("inheritorInfo");
			let inheritorFrequency: {
				[key: string]: { relation: string; count: number };
			} = {};

			if (storedData) {
				inheritorFrequency = JSON.parse(storedData);
			}

			// Create a unique key combining name and relation
			const key = `${name}|${relation}`;

			// Update frequency count and relation
			inheritorFrequency[key] = {
				relation: relation,
				count: (inheritorFrequency[key]?.count || 0) + 1,
			};

			localStorage.setItem(
				"inheritorInfo",
				JSON.stringify(inheritorFrequency)
			);
		} catch (error) {
			console.error("Error saving to localStorage:", error);
		}
	};

	const getTopInheritors = (
		limit: number = 5
	): Array<{ name: string; relation: string }> => {
		try {
			const storedData = localStorage.getItem("inheritorInfo");
			if (!storedData) return [];

			const inheritorFrequency = JSON.parse(storedData);

			return Object.entries(inheritorFrequency)
				.sort(([, a], [, b]) => b.count - a.count)
				.slice(0, limit)
				.map(([key, value]) => {
					const [name] = key.split("|");
					return {
						name: name,
						relation: value.relation,
					};
				});
		} catch (error) {
			console.error("Error reading from localStorage:", error);
			return [];
		}
	};

	const handleDeleteInheritor = (assetId: string, inheritorId: string) => {
		setInheritanceInfo((prev) => {
			const asset = prev[assetId];
			// 상속인을 제거하되, 다른 상속인들의 비율은 그대로 유지
			const remainingInheritors = asset.inheritors.filter(
				(inheritor) => inheritor.id !== inheritorId
			);

			const updatedInfo = {
				...prev,
				[assetId]: {
					...asset,
					inheritors: remainingInheritors,
				},
			};

			// FormData도 업데이트
			setFormData((prevFormData) => ({
				...prevFormData,
				inheritanceInfo: updatedInfo,
			}));

			return updatedInfo;
		});
	};

	const relationMapping = {
		spouse: "배우자",
		parents: "부모",
		children: "자녀",
		legalHeirs: "법정상속인",
		donation: "국가 등에 기부(유증)",
	};

	// 관계 코드를 한글로 변환하는 함수
	const getRelationInKorean = (relationCode: string): string => {
		return (
			relationMapping[relationCode as keyof typeof relationMapping] ||
			relationCode
		);
	};

	const InheritorModal: React.FC<InheritorModalProps> = ({
		isOpen,
		onClose,
		onSubmit,
	}) => {
		const [name, setName] = useState("");
		const [relation, setRelation] = useState("");
		const [topInheritors, setTopInheritors] = useState<
			Array<{ name: string; relation: string }>
		>([]);
		const submitButtonRef = useRef<HTMLButtonElement>(null);
		const [isSubmitting, setIsSubmitting] = useState(false);

		useEffect(() => {
			if (isOpen) {
				setTopInheritors(getTopInheritors(5));
			}
		}, [isOpen]);

		useEffect(() => {
			if (!isOpen) {
				setName("");
				setRelation("");
				setIsSubmitting(false);
			}
		}, [isOpen]);

		const handleSubmit = (e: React.MouseEvent | React.TouchEvent) => {
			e.preventDefault();

			if (isSubmitting) return;

			if (name && relation) {
				setIsSubmitting(true);
				saveInheritorInfo(name, relation);
				onSubmit({ name, relation });
				onClose();
			}
		};

		const handleSuggestionClick = (
			suggestedName: string,
			suggestedRelation: string
		) => {
			setName(suggestedName);
			setRelation(suggestedRelation);
		};

		if (!isOpen) return null;

		return (
			<styled.ModalOverlay onClick={onClose}>
				<styled.ModalContent onClick={(e) => e.stopPropagation()}>
					<styled.ModalTitle>상속인 선택</styled.ModalTitle>
					<styled.InheritorForm>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
								marginBottom: "20px",
							}}
						>
							<styled.FormLabel>관계 :</styled.FormLabel>
							<styled.FormSelect
								value={relation}
								onChange={(e) => setRelation(e.target.value)}
							>
								<option value="" disabled>
									관계를 선택해 주세요.
								</option>
								<option value="spouse">배우자</option>
								<option value="parents">부모</option>
								<option value="children">자녀</option>
								<option value="legalHeirs">법정상속인</option>
								<option value="donation">
									국가 등에 기부(유증)
								</option>
							</styled.FormSelect>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
							}}
						>
							<styled.FormLabel>성함 :</styled.FormLabel>
							<styled.FormInput
								placeholder="상속인의 이름을 입력하세요"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						{topInheritors.length > 0 && (
							<styled.SuggestionsContainer>
								{topInheritors.map((inheritor) => (
									<styled.SuggestionChip
										key={`${inheritor.name}-${inheritor.relation}`}
										onClick={() =>
											handleSuggestionClick(
												inheritor.name,
												inheritor.relation
											)
										}
										type="button"
									>
										{`${
											inheritor.name
										} (${getRelationInKorean(
											inheritor.relation
										)})`}
									</styled.SuggestionChip>
								))}
							</styled.SuggestionsContainer>
						)}

						<styled.SubmitButton
							ref={submitButtonRef}
							onClick={handleSubmit}
							type="button"
							disabled={isSubmitting || !name || !relation}
						>
							추가하기
						</styled.SubmitButton>
					</styled.InheritorForm>
				</styled.ModalContent>
			</styled.ModalOverlay>
		);
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					<span style={{ color: "#4792dc" }}>상속인</span>을 선택해
					주세요.
				</styled.Title>
				<styled.SubTitle>
					재산을 어떤 상속인에게 상속할지 설계해보세요.
				</styled.SubTitle>

				<styled.SelectInheriPageContainer>
					<styled.AssetInfoTitle>부동산</styled.AssetInfoTitle>
					<styled.SelectInheriPageWhiteBox>
						<styled.AddInheritorBtn
							onClick={() => {
								setSelectedAsset("asset1");
								setIsModalOpen(true);
							}}
						>
							+
						</styled.AddInheritorBtn>
						<styled.AssetInfoSubtitle>
							1. 아파트
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO아파트 O동 O호
							<br />
							<span>30억</span>
						</styled.AssetInfoAddress>

						{inheritanceInfo["asset1"]?.inheritors.length > 0 ? (
							<>
								<styled.InheritorDivider />
								<styled.InheritorInfo>
									<styled.InheritanceRatio>
										{Math.min(
											100,
											Number(
												inheritanceInfo[
													"asset1"
												].inheritors
													.reduce(
														(sum, inheritor) =>
															sum +
															inheritor.ratio,
														0
													)
													.toFixed(1)
											)
										)}
										% 완료
									</styled.InheritanceRatio>
									{inheritanceInfo["asset1"].inheritors.map(
										(inheritor) => (
											<styled.ProgressBarContainer
												key={inheritor.id}
											>
												<styled.ProgressLabel>
													{inheritor.name}
												</styled.ProgressLabel>
												<styled.ProgressSlider
													type="range"
													min={0}
													max={100}
													value={inheritor.ratio}
													onChange={(e) =>
														handleRatioChange(
															"asset1",
															inheritor.id,
															parseFloat(
																e.target.value
															)
														)
													}
													$value={inheritor.ratio}
												/>
												<styled.ProgressInput
													type="number"
													min={0}
													max={100}
													value={
														wasZero[inheritor.id]
															? ""
															: inheritor.ratio
													}
													onChange={(e) => {
														const newValue =
															e.target.value;
														handleRatioChange(
															"asset1",
															inheritor.id,
															newValue,
															true
														);
													}}
													onBlur={(e) => {
														const value =
															e.target.value ===
															""
																? "0"
																: e.target
																		.value;
														const numericValue =
															parseFloat(value);
														if (
															!isNaN(numericValue)
														) {
															handleRatioChange(
																"asset1",
																inheritor.id,
																numericValue.toFixed(
																	1
																)
															);
														}
													}}
												/>
												<span
													style={{
														fontFamily:
															"Pretendard",
														fontSize: "14px",
														marginLeft: "2px",
													}}
												>
													%
												</span>
												<styled.DeleteButton
													onClick={() =>
														handleDeleteInheritor(
															"asset1",
															inheritor.id
														)
													}
													type="button"
												>
													×
												</styled.DeleteButton>
											</styled.ProgressBarContainer>
										)
									)}
								</styled.InheritorInfo>
							</>
						) : (
							<styled.SelectInheriPageBody>
								상속인을 설정하지 않았습니다.
							</styled.SelectInheriPageBody>
						)}
					</styled.SelectInheriPageWhiteBox>

					<InheritorModal
						isOpen={isModalOpen}
						onClose={() => {
							setIsModalOpen(false);
							setSelectedAsset("");
						}}
						onSubmit={handleAddInheritor}
					/>

					<styled.SelectInheriPageWhiteBox>
						<styled.AddInheritorBtn
							onClick={() => setIsModalOpen(true)}
						>
							+
						</styled.AddInheritorBtn>
						<styled.AssetInfoSubtitle>
							2. 빌라
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO빌라
							<br />
							<span>20억</span>
						</styled.AssetInfoAddress>
						<styled.SelectInheriPageBody>
							상속인을 설정하지 않았습니다.
						</styled.SelectInheriPageBody>
					</styled.SelectInheriPageWhiteBox>
					<styled.SelectInheriPageLine />
					<styled.AssetInfoTitle>증권</styled.AssetInfoTitle>
					<styled.SelectInheriPageWhiteBox>
						<styled.AddInheritorBtn>+</styled.AddInheritorBtn>
						<styled.AssetInfoSubtitle>
							1. 아파트
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO아파트 O동 O호
							<br />
							<span>30억</span>
						</styled.AssetInfoAddress>
						<styled.SelectInheriPageBody>
							상속인을 설정하지 않았습니다.
						</styled.SelectInheriPageBody>
					</styled.SelectInheriPageWhiteBox>
					<styled.SelectInheriPageWhiteBox>
						<styled.AddInheritorBtn>+</styled.AddInheritorBtn>
						<styled.AssetInfoSubtitle>
							2. 빌라
						</styled.AssetInfoSubtitle>
						<styled.AssetInfoAddress>
							서울특별시 OO구 OO동 OO빌라
							<br />
							<span>20억</span>
						</styled.AssetInfoAddress>
						<styled.SelectInheriPageBody>
							상속인을 설정하지 않았습니다.
						</styled.SelectInheriPageBody>
					</styled.SelectInheriPageWhiteBox>
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
				<BlueButton variant="medium" onClick={onNext}>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

interface Message {
	relationship: string;
	content: string;
}

const WritePage: React.FC<PageProps> = ({
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

		// FormData 업데이트
		setFormData((prevFormData) => ({
			...prevFormData,
			messages: newMessages,
		}));
	};

	const handleAddMessage = () => {
		const newMessages = [...messages, { relationship: "", content: "" }];
		setMessages(newMessages);

		// FormData 업데이트
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
									<option value="nonHeirs">
										비상속인(유증)
									</option>
									<option value="donation">
										국가 등에 기부(유증)
									</option>
									<option value="establishment">
										공익 법인 설립(출연)
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
						// Update formData with all messages before moving forward
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

function ClickPage() {
	const [currentPage, setCurrentPage] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		// Page 1 data
		personalInfo: {
			name: "홍길동",
			birthDate: "19OO. OO. OO.",
			address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
		},
		assets: {
			realEstate: [
				{
					id: "asset1",
					type: "아파트",
					address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
					value: 3000000000,
				},
				{
					id: "asset2",
					type: "빌라",
					address: "서울특별시 OO구 OO동 OO빌라",
					value: 2000000000,
				},
				{
					id: "asset3",
					type: "토지",
					address: "서울특별시 OO구 OO동 OO-OO",
					value: 1000000000,
				},
			],
			stocks: [
				{
					id: "stock1",
					type: "주식",
					details: "삼성전자",
					value: 1000000000,
				},
			],
		},
		inheritanceInfo: {},
		executor: {
			name: "",
			relationship: "",
		},
		messages: [],
		shareTimingChoice: null,
	});

	const handleNext = () => {
		console.log(`Moving from page ${currentPage} to ${currentPage + 1}`);
		console.log("Current form data:", formData);
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrev = () => {
		console.log(`Moving from page ${currentPage} to ${currentPage - 1}`);
		console.log("Current form data:", formData);
		setCurrentPage((prev) => Math.max(0, prev - 1));
	};

	const renderPage = () => {
		switch (currentPage) {
			case 0:
				return <InitialPage onStartUpload={handleNext} />;
			case 1:
				return (
					<ProfileViewPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 2:
				return (
					<AssetsViewPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 3:
				return (
					<SelectInheritorPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 4:
				return (
					<SetPersonPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 5:
				return (
					<WritePage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 6:
				return (
					<ShareTimePage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 7:
				return (
					<WillPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
						setCurrentPage={setCurrentPage}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<styled.Container>
			<Header />
			{renderPage()}
		</styled.Container>
	);
}

export default ClickPage;
