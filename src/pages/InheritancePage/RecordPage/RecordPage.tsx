import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as styled from "./styles";
import closeicon from "../../../images/close-icon.png";
import { FormData } from "./types";

// Components
import InitialPage from "./InitialPage";
import ProfileViewPage from "../pages/ProfileViewPage";
import SetPersonPage from "../pages/SetPersonPage";
import ShareTimePage from "../pages/ShareTimePage";
import WillPage from "../pages/WillPage";
import { AudioPreviewPage } from "./components/AudioPreviewPage";
import {
	RecordingStep1,
	RecordingStep2,
	RecordingStep3,
	RecordingStep4,
	RecordingStep5,
	RecordingStep6,
} from "./components/recordSteps";

const Header = () => (
	<styled.HeaderContainer>
		<span>유언 녹음</span>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<styled.CloseButton src={closeicon} />
		</Link>
	</styled.HeaderContainer>
);

function RecordPage() {
	const [currentPage, setCurrentPage] = useState(0);
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
				return <RecordingStep1 {...commonProps} />;
			case 3:
				return <RecordingStep2 {...commonProps} />;
			case 4:
				return <RecordingStep3 {...commonProps} />;
			case 5:
				return <RecordingStep4 {...commonProps} />;
			case 6:
				return <RecordingStep5 {...commonProps} />;
			case 7:
				return <RecordingStep6 {...commonProps} />;
			case 8:
				return <AudioPreviewPage {...commonProps} />;
			case 9:
				return <SetPersonPage {...commonProps} />;
			case 10:
				return <ShareTimePage {...commonProps} />;
			case 11:
				return (
					<WillPage
						{...commonProps}
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

export default RecordPage;
