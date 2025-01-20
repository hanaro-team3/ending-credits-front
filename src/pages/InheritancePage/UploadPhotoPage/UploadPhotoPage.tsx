import * as styled from "./styles";
import { PageProps } from "../types";
import { Link } from "react-router-dom";
import closeicon from "../../../images/close-icon.png";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import plusbtn from "../../../images/will-plus-btn.png";
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
// import CameraPage from "../pages/CameraPage"; // 페이지 10 - 사진 촬영
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

interface CameraPageProps extends Omit<PageProps, "onNext" | "onPrev"> {
	setCurrentPage: (page: number) => void;
}

const CameraPage: React.FC<CameraPageProps> = ({
	setCurrentPage,
	formData,
	setFormData,
}) => {
	const DeleteButton = ({ onClick }: { onClick: () => void }) => (
		<button
			onClick={onClick}
			style={{
				position: "absolute",
				top: "10px",
				right: "10px",
				width: "20px",
				height: "20px",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				border: "none",
				borderRadius: "12px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				cursor: "pointer",
				padding: 0,
				zIndex: 10,
			}}
		>
			<svg
				width="10"
				height="10"
				viewBox="0 0 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 1L13 13M1 13L13 1"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		</button>
	);

	const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// 이미지 파일 타입 검사
		const allowedTypes = ["image/jpeg", "image/png"];
		if (!allowedTypes.includes(file.type)) {
			alert("카메라로 촬영한 사진만 업로드할 수 있습니다.");
			return;
		}

		// 파일이 최근에 생성되었는지 확인 (최근 1분 이내)
		const currentTime = Date.now();
		const fileTime = file.lastModified;
		const timeDiff = currentTime - fileTime;

		if (timeDiff > 60000) {
			// 1분 = 60000 밀리초
			alert("촬영한 사진만 업로드할 수 있습니다.");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			const imageUrl = reader.result as string;
			setFormData((prev) => ({
				...prev,
				uploadedPhotos: [...(prev.uploadedPhotos || []), imageUrl],
			}));
		};
		reader.readAsDataURL(file);
	};

	const handleCameraClick = () => {
		document.getElementById("camera-capture")?.click();
	};

	const handleDeleteImage = (indexToDelete: number) => {
		setFormData((prev) => ({
			...prev,
			uploadedPhotos: (prev.uploadedPhotos || []).filter(
				(_, index) => index !== indexToDelete
			),
		}));
	};

	return (
		<styled.UploadPageContainer>
			<styled.Title>
				{formData?.uploadedPhotos?.length > 0
					? "촬영한 사진을 확인해 주세요."
					: "사진을 촬영해주세요."}
			</styled.Title>
			<styled.SubTitle>
				{formData?.uploadedPhotos?.length > 0
					? "사진을 다시 촬영할 수 있어요."
					: "아래 + 버튼을 눌러 유언장을 촬영해주세요."}
			</styled.SubTitle>

			<input
				type="file"
				id="camera-capture"
				accept="image/*"
				capture="environment"
				onChange={handleImageCapture}
				style={{ display: "none" }}
				onClick={(event) => {
					const target = event.target as HTMLInputElement;
					target.value = "";
				}}
			/>

			<div
				style={{
					width: "296px",
					height: "434px",
					border:
						formData?.uploadedPhotos?.length === 0
							? "1px solid #2b2b2b"
							: "none",
					marginTop: "20px",
					display: "flex",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{formData?.uploadedPhotos?.length > 0 ? (
					<div
						style={{
							width: "100%",
							height: "100%",
							overflowY: "auto",
							overflowX: "hidden",
							scrollBehavior: "smooth",
							msOverflowStyle: "none",
							scrollbarWidth: "none",
							"&::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						{formData.uploadedPhotos.map((photo, index) => (
							<div
								key={index}
								style={{
									width: "100%",
									height: "434px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
									marginBottom:
										index !==
										formData.uploadedPhotos.length - 1
											? "20px"
											: 0,
									position: "relative",
								}}
							>
								<DeleteButton
									onClick={() => handleDeleteImage(index)}
								/>
								<img
									src={photo}
									alt={`촬영된 유언장 ${index + 1}`}
									style={{
										maxWidth: "100%",
										maxHeight: "100%",
										objectFit: "contain",
										border: "1px solid #eee",
										borderRadius: "8px",
									}}
								/>
							</div>
						))}
					</div>
				) : (
					<div
						onClick={handleCameraClick}
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
						}}
					>
						<styled.PlusBtn src={plusbtn} />
					</div>
				)}
			</div>

			{formData?.uploadedPhotos?.length > 0 && (
				<div
					style={{
						textAlign: "center",
						marginTop: "10px",
						color: "#666",
						fontSize: "12px",
					}}
				>
					{formData.uploadedPhotos.length}장의 사진
				</div>
			)}

			<styled.Page1EditSection>
				<BlueButton
					variant="small"
					onClick={handleCameraClick}
					style={{
						fontWeight: "500",
						fontSize: "11px",
						marginTop: "8px",
						marginBottom: "60px",
						marginRight: "15px",
					}}
				>
					추가하기
				</BlueButton>
			</styled.Page1EditSection>

			<styled.ButtonBottomDiv>
				<WhiteButton
					variant="medium"
					onClick={() => setCurrentPage(3)}
					style={{ marginRight: "8px" }}
				>
					이전으로
				</WhiteButton>
				<BlueButton
					variant="medium"
					onClick={() => setCurrentPage(5)}
					disabled={!formData?.uploadedPhotos?.length}
				>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

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
		setFormData((prev) => ({
			...prev,
			uploadType: type,
		}));
		// 앨범이든 카메라든 무조건 page3(WillSamplePage)로 먼저 이동
		setCurrentPage(3);
	};

	const handleWillSampleNext = () => {
		// WillSamplePage에서 다음으로 갈 때 uploadType에 따라 분기
		if (formData.uploadType === "camera") {
			setCurrentPage(10); // CameraPage로 이동
		} else {
			setCurrentPage(4); // UploadPage로 이동
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
						onNext={handleWillSampleNext}
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
			case 10:
				return (
					<CameraPage
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

export default UploadPhotoPage;
