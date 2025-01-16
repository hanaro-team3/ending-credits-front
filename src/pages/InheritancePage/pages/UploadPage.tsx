import React from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import plusbtn from "../../../images/will-plus-btn.png";

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

const UploadPage: React.FC<PageProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

		if (file) {
			if (!allowedTypes.includes(file.type)) {
				alert("JPG, PNG, GIF 형식의 이미지 파일만 업로드 가능합니다.");
				return;
			}

			if (file.lastModified && Date.now() - file.lastModified < 60000) {
				alert("갤러리에서 기존 사진을 선택해주세요.");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				const imageUrl = reader.result as string;
				setFormData((prev) => ({
					...prev,
					uploadedPhotos: [...prev.uploadedPhotos, imageUrl],
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAddClick = () => {
		document.getElementById("photo-upload")?.click();
	};

	const handleDeleteImage = (indexToDelete: number) => {
		setFormData((prev) => ({
			...prev,
			uploadedPhotos: prev.uploadedPhotos.filter(
				(_, index) => index !== indexToDelete
			),
		}));
	};

	return (
		<styled.UploadPageContainer>
			<styled.Title>
				{formData.uploadedPhotos.length > 0
					? "올리신 사진을 확인해 주세요."
					: "사진을 업로드 해주세요."}
			</styled.Title>
			<styled.SubTitle>
				{formData.uploadedPhotos.length > 0
					? "사진을 다시 올리거나 추가할 수 있어요."
					: "아래 + 버튼을 눌러 유언장을 업로드 해주세요."}
			</styled.SubTitle>

			<input
				type="file"
				id="photo-upload"
				accept=".jpg,.jpeg,.png,.gif"
				onChange={handleImageUpload}
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
						formData.uploadedPhotos.length === 0
							? "1px solid #2b2b2b"
							: "none",
					marginTop: "20px",
					display: "flex",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{formData.uploadedPhotos.length > 0 ? (
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
									alt={`업로드된 유언장 ${index + 1}`}
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
						onClick={handleAddClick}
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

			{formData.uploadedPhotos.length > 0 && (
				<div
					style={{
						textAlign: "center",
						marginTop: "10px",
						color: "#666",
						fontSize: "12px",
					}}
				>
					{formData.uploadedPhotos.length}장의 사진 (위아래로
					스크롤하여 확인)
				</div>
			)}

			<styled.Page1EditSection>
				<BlueButton
					variant="small"
					onClick={handleAddClick}
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
					onClick={onPrev}
					style={{ marginRight: "8px" }}
				>
					이전으로
				</WhiteButton>
				<BlueButton
					variant="medium"
					onClick={onNext}
					disabled={formData.uploadedPhotos.length === 0}
				>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

export default UploadPage;
