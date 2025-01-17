import * as styled from "./styles";
import { Link } from "react-router-dom";
import closeicon from "../../../images/close-icon.png";
import { useState } from "react";

//pages
import InitialPage from "./InitialPage"; // 초기 페이지
import ProfileViewPage from "../pages/ProfileViewPage"; //페이지 1 - 인적 정보 조회
import UploadOrCameraPage from "../pages/UploadOrCameraPage"; //페이지 2 - 앨범 or 촬영
import WillSamplePage from "../pages/WillSamplePage"; //페이지 3 - 유언장 예시
import UploadPage from "../pages/UploadPage"; //페이지 4 - 사진 업로드
import PhotoIntoTextPage from "../pages/PhotoIntoTextPage"; //페이지 5 - 로딩페이지
import SetPersonPage from "../pages/SetPersonPage"; //페이지 6 - 유언 집행자 지정
import ShareTimePage from "../pages/ShareTimePage"; // 페이지 7 - 내용 공유 시점 설정
import WillPage from "../pages/WillPage"; // 페이지 8 - 유언장 완성
import CameraPage from "../pages/CameraPage"; // 페이지 10 - 사진 촬영
import Header from "../components/Header";

interface FormData {
	// Page 1 data
	personalInfo: {
		name: string;
		birthDate: string;
		address: string;
	};
	// Page 2 data
	uploadType: "album" | "camera" | null;
	// Page 4 data
	uploadedPhotos: string[];
	// Page 6 data
	executor: {
		name: string;
		relationship: string;
	};
	// Page 7 data
	shareTimingChoice: "anytime" | "sickness" | "death" | null;
}

// const Header = () => (
// 	<styled.HeaderContainer>
// 		<span>사진 업로드</span>
// 		<Link to="/inheritance" style={{ textDecoration: "none" }}>
// 			<styled.CloseButton src={closeicon} />
// 		</Link>
// 	</styled.HeaderContainer>
// );

function UploadPhotoPage() {
	const [currentPage, setCurrentPage] = useState(0);
	const [formData, setFormData] = useState<FormData>({
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

	const handleSelectUploadType = (type: "album" | "camera") => {
		if (type === "album") {
			setCurrentPage(3); // Page3로 이동
		} else {
			setCurrentPage(10); // Page4로 이동
		}
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
					<UploadOrCameraPage
						onSelectUploadType={handleSelectUploadType}
						formData={formData}
						setFormData={setFormData}
						onNext={handleNext}
						onPrev={handlePrev}
					/>
				);
			case 3:
				return (
					<WillSamplePage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 4:
				return (
					<UploadPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 5:
				return (
					<PhotoIntoTextPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 6:
				return (
					<SetPersonPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 7:
				return (
					<ShareTimePage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 8:
				return (
					<WillPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
						setCurrentPage={setCurrentPage}
					/>
				);
			// case 9:
			// 	return <FinalPage />;
			case 10:
				return <CameraPage onNext={handleNext} onPrev={handlePrev} />;
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

export default UploadPhotoPage;
