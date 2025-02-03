import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as styled from "./styles";
import closeicon from "../../../images/close-icon.png";
import { FormData } from "./types";

// Components
import InitialPage from "./InitialPage";
import ProfileViewPage from "../pages/ProfileViewPage";
import SetPersonPage from "../pages/SetPersonPage";
import ShareTimePage from "../pages/ShareTimePage";
import WillRecordPage from "../pages/WillRecordPage";
import { AudioPreviewPage } from "./components/AudioPreviewPage";
import { audioService } from "../../../services/api/Recording";
import {
	RecordingStep1,
	RecordingStep2,
	RecordingStep3,
	RecordingStep4,
	RecordingStep5,
	RecordingStep6,
} from "./components/recordSteps";
import { VerificationStep1 } from "./components/verificationSteps/verificationStep1";
import { VerificationStep2 } from "./components/verificationSteps/verificationStep2";
import { VerificationStep3 } from "./components/verificationSteps/verificationStep3";
import { VerificationStep4 } from "./components/verificationSteps/verificationStep4";

const Header = () => (
	<styled.HeaderContainer>
		<span>유언 녹음</span>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<styled.CloseButton src={closeicon} />
		</Link>
	</styled.HeaderContainer>
);

function RecordPage() {
	const [currentPage, setCurrentPage] = useState(13);
	const [formData, setFormData] = useState<FormData>({
		personalInfo: {
			name: "홍길동",
			birthDate: "19OO. OO. OO.",
			address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
		},
		recordings: {
			introductory: null,
			realEstate: null,
			financial: null,
			other: null,
			optional: null,
			finish: null,
		},
		executor: {
			name: "",
			relationship: "",
		},
		shareTimingChoice: null,
	});

	// const [bankData, setBankData] = useState(null);
	// const [realEstateData, setRealEstateData] = useState(null);
	// const [etcData, setEtcData] = useState(null);
	// const [lastWordsData, setLastWordsData] = useState(null);
	// const [confirmData, setConfirmData] = useState(null);

	const [bankData, setBankData] = useState([
		{
			type: "은행",
			subType: "예금",
			financialInstitution: "하나은행",
			asset: "달달 하나",
			amount: 1000000000,
			ancestors: [
				{
					name: "홍길동",
					relation: "자녀",
					ratio: 100,
				},
			],
		},
		{
			type: "은행",
			subType: "신탁",
			financialInstitution: "신한은행",
			asset: "0신한",
			amount: 50000000,
			ancestors: [
				{
					name: "김하나",
					relation: "배우자",
					ratio: 30,
				},
				{
					name: "김철수",
					relation: "법정 상속인",
					ratio: 70,
				},
			],
		},
	]);

	const [realEstateData, setRealEstateData] = useState([
		{
			type: "기타",
			subType: "부동산",
			financialInstitution: null,
			asset: "서울특별시 성동구 왕십리로 16 트리마제 102동 1901호",
			amount: 3500000000,
			ancestors: [
				{
					name: "김아내",
					relation: "배우자",
					ratio: 50,
				},
				{
					name: "이자녀",
					relation: "자녀",
					ratio: 50,
				},
			],
		},
	]);

	const [etcData, setEtcData] = useState([
		{
			type: "기타",
			subType: "현금",
			financialInstitution: null,
			asset: "현금",
			amount: 150000000,
			ancestors: [
				{
					name: "이인수",
					relation: "배우자",
					ratio: 30,
				},
				{
					name: "최하나",
					relation: "자녀",
					ratio: 70,
				},
			],
		},
	]);

	const [lastWordsData, setLastWordsData] = useState([
		{
			name: "홍길동",
			relation: "자녀",
			message:
				"당신은 제 삶의 가장 큰 자랑이자 기쁨입니다. 제가 떠난 뒤에도 항상 당신 곁에서 응원하고 있음을 기억해 주세요.",
		},
	]);

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
		const commonProps = {
			onNext: handleNext,
			onPrev: handlePrev,
			formData,
			setFormData,
		};

		switch (currentPage) {
			case 0:
				return <InitialPage onStartUpload={handleNext} />;
			case 1:
				return <ProfileViewPage {...commonProps} />;
			case 2:
				return (
					<RecordingStep1
						{...commonProps}
						apiService={audioService.setPurpose}
					/>
				);
			case 3:
				return (
					<RecordingStep2
						{...commonProps}
						apiService={async (fileUrl) => {
							const response =
								await audioService.setWillInheritanceRealEstate(
									fileUrl
								);
							console.log("Full response:", response);
							console.log("Response data:", response.data);
							console.log("Result:", response.data.result);
							setRealEstateData(response.data.result);

							return response;
						}}
						// apiService={audioService.setWillInheritanceRealEstate}
					/>
				);
			case 4:
				return (
					<VerificationStep1
						realEstateData={realEstateData}
						onNext={handleNext}
						onPrev={handlePrev}
					/>
				);
			case 5:
				return (
					<RecordingStep3
						{...commonProps}
						apiService={async (fileUrl) => {
							const response =
								await audioService.setWillInheritanceBank(
									fileUrl
								);
							console.log("Full response:", response);
							console.log("Response data:", response.data);
							console.log("Result:", response.data.result);
							console.log(
								"저장된 realEstateData:",
								realEstateData
							);
							setBankData(response.data.result);
							return response;
						}}
					/>
				);
			case 6:
				return (
					<VerificationStep2
						bankData={bankData}
						onNext={handleNext}
						onPrev={handlePrev}
					/>
				);

			case 7:
				return (
					<RecordingStep4
						{...commonProps}
						apiService={async (fileUrl) => {
							const response =
								await audioService.setWillInheritanceEtc(
									fileUrl
								);
							console.log("Full response:", response);
							console.log("Response data:", response.data);
							console.log("Result:", response.data.result);
							console.log("저장된 bankData:", bankData);
							setEtcData(response.data.result);
							return response;
						}}
						// apiService={audioService.setWillInheritanceEtc}
					/>
				);

			case 8:
				return (
					<VerificationStep3
						etcData={etcData}
						onNext={handleNext}
						onPrev={handlePrev}
					/>
				);
			case 9:
				return (
					<RecordingStep5
						{...commonProps}
						apiService={async (fileUrl) => {
							const response =
								await audioService.setWillInheritanceLastWords(
									fileUrl
								);
							console.log("Full response:", response);
							console.log("Response data:", response.data);
							console.log("Result:", response.data.result);
							console.log("저장된 etcData:", etcData);
							// setLastWordsData(response.data.result);
							return response;
						}}
						// apiService={audioService.setWillInheritanceLastWords}
					/>
				);
			case 10:
				return (
					<VerificationStep4
						lastWordsData={lastWordsData}
						onNext={handleNext}
						onPrev={handlePrev}
					/>
				);

			case 11:
				return (
					<RecordingStep6
						{...commonProps}
						apiService={async (fileUrl) => {
							const response =
								await audioService.setWillInheritanceConfirm(
									fileUrl
								);
							console.log("Full response:", response);
							console.log("Response data:", response.data);
							console.log("Result:", response.data.result);
							console.log("저장된 lastWordsData:", lastWordsData);
							setConfirmData(response.data.result);
							return response;
						}}
						// apiService={audioService.setWillInheritanceConfirm}
					/>
				);
			case 12:
				return <AudioPreviewPage {...commonProps} />;
			case 13:
				return <SetPersonPage {...commonProps} />;
			case 14:
				return <ShareTimePage {...commonProps} />;
			case 15:
				return (
					<WillRecordPage
						{...commonProps}
						setCurrentPage={setCurrentPage}
						bankData={bankData}
						realEstateData={realEstateData}
						etcData={etcData}
						lastWordsData={lastWordsData}
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

export default RecordPage;
