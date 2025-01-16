import * as styled from "./styles";
import { Link } from "react-router-dom";
import closeicon from "../../../images/close-icon.png";
import backicon from "../../../images/back-icon.png";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import { useState } from "react";
import roboticon from "../../../images/inheritance-robot.png";
import photoicon from "../../../images/inheritance-upload-photo.png";
import cameraicon from "../../../images/inheritance-camera.png";
import willexample1 from "../../../images/will-emaple-1.png";
import plusbtn from "../../../images/will-plus-btn.png";
import loadingicon from "../../../images/inheritance-loding.gif";
import anytime from "../../../images/inheritance-anytime.png";
import sick from "../../../images/inheritance-sick.png";
import die from "../../../images/inheritance-die.png";
import willdeco from "../../../images/will-decoration.png";

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

interface InitialContentProps {
	onStartUpload: () => void;
}

interface PageProps {
	onNext: () => void;
	onPrev: () => void;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface Page2Props {
	onSelectUploadType: (type: "album" | "camera") => void;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Header = () => (
	<styled.HeaderContainer>
		<span>사진 업로드</span>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<styled.CloseButton src={closeicon} />
		</Link>
	</styled.HeaderContainer>
);

const InitialContent = ({ onStartUpload }: InitialContentProps) => {
	return (
		<>
			<styled.Title>
				사진 업로드는 다음과 같은 절차로
				<br /> 진행돼요.
			</styled.Title>
			<StepSection />
			<BottomSection onStartUpload={onStartUpload} />
		</>
	);
};

const StepSection = () => (
	<styled.StepContainer>
		<styled.Step>
			<styled.Number>1</styled.Number>
			<styled.StepName>
				피상속인의 <span>인적 정보</span> 확인
			</styled.StepName>
		</styled.Step>
		<styled.NumberLine />
		<styled.Step>
			<styled.Number>2</styled.Number>
			<styled.StepName>
				사진 <span>촬영</span> 또는 사진 <span>업로드</span>
			</styled.StepName>
		</styled.Step>
		<styled.NumberLine />
		<styled.Step>
			<styled.Number>3</styled.Number>
			<styled.StepName>
				<span>유언 집행자</span> 지정
			</styled.StepName>
		</styled.Step>
		<styled.NumberLine />
		<styled.Step>
			<styled.Number>4</styled.Number>
			<styled.StepName>
				<span>내용 공유 시점</span> 설정
			</styled.StepName>
		</styled.Step>
	</styled.StepContainer>
);

interface BottomSectionProps {
	onStartUpload: () => void;
}

const BottomSection = ({ onStartUpload }: BottomSectionProps) => (
	<>
		<styled.Line />
		<styled.BottomText>
			10분이면 완성하는 사진 업로드, 지금 시작해볼까요?
		</styled.BottomText>
		<BlueButton variant="large" onClick={onStartUpload}>
			사진 업로드 시작하기
		</BlueButton>
	</>
);

interface PageProps {
	onNext: () => void;
	onPrev: () => void;
}

const Page1 = ({ onNext, onPrev, formData, setFormData }: PageProps) => {
	const [showEditPage, setShowEditPage] = useState(false);

	if (showEditPage) {
		return (
			<EditInfoPage
				onNext={onNext}
				onPrev={() => setShowEditPage(false)}
				formData={formData}
				setFormData={setFormData}
			/>
		);
	}

	return (
		<styled.UploadPageContainer>
			<styled.Title>
				1. 피상속인의{" "}
				<span style={{ color: "#4792dc" }}>인적 정보</span>를 <br />
				조회했어요.
			</styled.Title>
			<styled.SubTitle>
				정보가 모두 일치한다면 '다음으로' 버튼을 눌러주세요.
			</styled.SubTitle>
			<styled.Page1WhiteBox>
				<styled.Page1WhiteBoxInfo>
					<styled.Page1WhiteBoxInfoHead>
						성함 :
					</styled.Page1WhiteBoxInfoHead>
					<styled.Page1WhiteBoxInfoBody>
						{formData.personalInfo.name}
					</styled.Page1WhiteBoxInfoBody>
				</styled.Page1WhiteBoxInfo>
				<styled.Page1WhiteBoxInfo>
					<styled.Page1WhiteBoxInfoHead>
						생년월일 :
					</styled.Page1WhiteBoxInfoHead>
					<styled.Page1WhiteBoxInfoBody>
						{formData.personalInfo.birthDate}
					</styled.Page1WhiteBoxInfoBody>
				</styled.Page1WhiteBoxInfo>
				<styled.Page1WhiteBoxInfo style={{ alignItems: "flex-start" }}>
					<styled.Page1WhiteBoxInfoHead>
						주소 :
					</styled.Page1WhiteBoxInfoHead>
					<styled.Page1WhiteBoxInfoBody>
						{formData.personalInfo.address}
					</styled.Page1WhiteBoxInfoBody>
				</styled.Page1WhiteBoxInfo>
			</styled.Page1WhiteBox>
			<styled.Page1EditSection>
				<BlueButton
					variant="small"
					onClick={() => setShowEditPage(true)}
					style={{
						fontWeight: "500",
						fontSize: "11px",
						marginBottom: "230px",
						marginTop: "8px",
					}}
				>
					수정하기
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
				<BlueButton variant="medium" onClick={onNext}>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

const EditInfoPage = ({ onNext, onPrev, formData, setFormData }: PageProps) => {
	const [editedInfo, setEditedInfo] = useState({
		name: formData.personalInfo.name,
		birthDate: formData.personalInfo.birthDate,
		address: formData.personalInfo.address,
	});

	const handleSubmit = () => {
		setFormData((prev) => ({
			...prev,
			personalInfo: {
				name: editedInfo.name,
				birthDate: editedInfo.birthDate,
				address: editedInfo.address,
			},
		}));
		onNext();
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>인적 정보를 수정해 주세요.</styled.Title>
				<styled.SubTitle>
					수정이 완료되었다면 '완료' 버튼을 눌러주세요.
				</styled.SubTitle>
				<styled.EditInfoPageContainer>
					<styled.EditInfoPageText style={{ marginTop: "19px" }}>
						성함
					</styled.EditInfoPageText>
					<styled.EditInfoPageDiv>
						{formData.personalInfo.name}
					</styled.EditInfoPageDiv>
					<styled.EditInfoPageText>생년월일</styled.EditInfoPageText>
					<styled.EditInfoPageDiv>
						{formData.personalInfo.birthDate}
					</styled.EditInfoPageDiv>
					<styled.EditInfoPageText>주소</styled.EditInfoPageText>
					<styled.EditInfoPageInput
						value={editedInfo.address}
						onChange={(e) =>
							setEditedInfo((prev) => ({
								...prev,
								address: e.target.value,
							}))
						}
					/>
				</styled.EditInfoPageContainer>
			</styled.TopContainer>
			<styled.ButtonBottomDiv>
				<WhiteButton
					variant="medium"
					onClick={onPrev}
					style={{ marginRight: "8px" }}
				>
					이전으로
				</WhiteButton>
				<BlueButton variant="medium" onClick={handleSubmit}>
					완료
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

interface Page2Props extends PageProps {
	onSelectUploadType: (type: "album" | "camera") => void;
}

const Page2 = ({
	onSelectUploadType,
	onPrev,
	onNext,
	formData,
	setFormData,
}: Page2Props) => (
	<styled.UploadPageContainer>
		<styled.BackButton
			src={backicon}
			onClick={() => {
				onPrev();
			}}
		/>
		<styled.Title>
			2. 작성하신 유언장을 <br />
			<span style={{ color: "#4792dc" }}>업로드</span> 해보세요.
		</styled.Title>
		<styled.SubTitle>
			찍어놓은 사진을 업로드하거나 바로 촬영하는 것도 가능해요.
		</styled.SubTitle>
		<styled.Page2BlueBox>
			<styled.Page2RobotIcon src={roboticon} />
			<styled.Page2BlueBoxText>
				<styled.Page2BlueBoxTextTop>
					유언장을 블록체인으로
				</styled.Page2BlueBoxTextTop>
				<styled.Page2BlueBoxTextBottom>
					최신 OCR 기술을 사용해 <br />
					업로드 된 유언장을 텍스트 변환 후 <br />
					블록체인으로 안전하게 저장해요.
				</styled.Page2BlueBoxTextBottom>
			</styled.Page2BlueBoxText>
		</styled.Page2BlueBox>
		<styled.Page2SubTitle>업로드 방식 선택</styled.Page2SubTitle>
		<styled.Page2SelectBox
			onClick={() => {
				setFormData((prev) => ({ ...prev, uploadType: "album" }));
				console.log("Selected upload type: album");
				onSelectUploadType("album");
			}}
		>
			<styled.Page2SelectBoxText>
				앨범에서 가져오기
			</styled.Page2SelectBoxText>
			<styled.Page2SelectBoxImage src={photoicon} />
		</styled.Page2SelectBox>
		<styled.Page2SelectBox
			style={{ marginBottom: "100px" }}
			onClick={() => {
				setFormData((prev) => ({ ...prev, uploadType: "camera" }));
				console.log("Selected upload type: camera");
				onSelectUploadType("camera");
			}}
		>
			<styled.Page2SelectBoxText>촬영하기</styled.Page2SelectBoxText>
			<styled.Page2SelectBoxImage src={cameraicon} />
		</styled.Page2SelectBox>
	</styled.UploadPageContainer>
);

const Page3 = ({ onNext, onPrev, formData }: PageProps) => (
	<styled.UploadPageContainer>
		<styled.Title>
			유언장에는{" "}
			<span style={{ color: "#4792dc" }}>아래와 같은 내용들</span>이{" "}
			<br />
			포함되어야 해요.
		</styled.Title>
		<styled.SubTitle>
			아래의 예시와 가장 비슷한 형식으로 유언장을 작성해주세요.
		</styled.SubTitle>
		<styled.WillExample src={willexample1} />
		<styled.ButtonBottomDiv>
			<WhiteButton
				variant="medium"
				onClick={() => {
					console.log("Page 3 - Going back");
					onPrev();
				}}
				style={{ marginRight: "8px" }}
			>
				이전으로
			</WhiteButton>
			<BlueButton
				variant="medium"
				onClick={() => {
					console.log("Page 3 - Moving forward");
					onNext();
				}}
			>
				다음으로
			</BlueButton>
		</styled.ButtonBottomDiv>
	</styled.UploadPageContainer>
);

const Page4 = ({ onNext, onPrev, formData, setFormData }: PageProps) => {
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
					onClick={() => {
						console.log(
							"Page 4 - Going back:",
							formData.uploadedPhotos
						);
						onPrev();
					}}
					style={{ marginRight: "8px" }}
				>
					이전으로
				</WhiteButton>
				<BlueButton
					variant="medium"
					onClick={() => {
						console.log(
							"Page 4 - Moving forward:",
							formData.uploadedPhotos
						);
						onNext();
					}}
					disabled={formData.uploadedPhotos.length === 0}
				>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};
const Page5 = ({ onNext }: PageProps) => (
	<styled.UploadPageContainer>
		<styled.Title>
			사진을 <span style={{ color: "#4792dc" }}>텍스트로</span>{" "}
			변환중이에요.
		</styled.Title>
		<styled.SubTitle>
			변환된 텍스트는 블록체인으로 안전하게 관리돼요.
		</styled.SubTitle>
		<styled.LoadingIcon src={loadingicon} />
		<styled.ButtonBottomDiv>
			<BlueButton variant="large" onClick={onNext}>
				다음으로
			</BlueButton>
		</styled.ButtonBottomDiv>
	</styled.UploadPageContainer>
);

const Page6 = ({ onNext, onPrev, formData, setFormData }: PageProps) => (
	<styled.UploadPageContainer>
		<styled.TopContainer>
			<styled.Title>
				3. <span style={{ color: "#4792dc" }}>유언집행자</span>를
				지정해주세요.
			</styled.Title>
			<styled.SubTitle>
				유언 내용을 집행하기 위한 동기 이전, 예금 인출 동의 <br />
				사무처리에 대한 업무 권한을 가지는 사람을 지정해주세요.
			</styled.SubTitle>
			<styled.Page6InputDiv style={{ marginTop: "73px" }}>
				<styled.Page6InputDivText>성함 : </styled.Page6InputDivText>
				<styled.Page6Input
					value={formData.executor.name}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							executor: {
								...prev.executor,
								name: e.target.value,
							},
						}))
					}
					style={{ padding: "0 10px", fontSize: "14px" }}
				/>
			</styled.Page6InputDiv>
			<styled.Page6InputDiv style={{ marginTop: "10px" }}>
				<styled.Page6InputDivText>관계 : </styled.Page6InputDivText>
				<styled.Page6Select
					value={formData.executor.relationship}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							executor: {
								...prev.executor,
								relationship: e.target.value,
							},
						}))
					}
				>
					<option value="" disabled>
						관계를 선택해 주세요.
					</option>
					<option value="spouse">배우자</option>
					<option value="parents">부모</option>
					<option value="children">자녀</option>
					<option value="legalHeirs">법정상속인</option>
					<option value="nonHeirs">비상속인(유증)</option>
					<option value="donation">국가 등에 기부(유증)</option>
					<option value="establishment">공익 법인 설립(출연)</option>
				</styled.Page6Select>
			</styled.Page6InputDiv>
		</styled.TopContainer>
		<styled.ButtonBottomDiv>
			<WhiteButton
				variant="medium"
				onClick={() => {
					console.log("Page 6 - Going back:", formData.executor);
					onPrev();
				}}
				style={{ marginRight: "8px" }}
			>
				이전으로
			</WhiteButton>
			<BlueButton
				variant="medium"
				onClick={() => {
					console.log("Page 6 - Moving forward:", formData.executor);
					onNext();
				}}
			>
				다음으로
			</BlueButton>
		</styled.ButtonBottomDiv>
	</styled.UploadPageContainer>
);

const Page7 = ({ onNext, onPrev, formData, setFormData }: PageProps) => {
	const getSelectBoxStyle = (timing: "anytime" | "sickness" | "death") => ({
		marginBottom:
			timing === "anytime"
				? "20px"
				: timing === "sickness"
				? "20px"
				: undefined,
		marginTop: timing === "anytime" ? "38px" : undefined,
		border:
			formData.shareTimingChoice === timing
				? "2px solid #4792dc"
				: undefined,
		// backgroundColor:
		// 	formData.shareTimingChoice === timing ? "white" : "#ebebeb",
	});
	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					4. <span style={{ color: "#4792dc" }}>내용 공유 시점</span>
					을 선택해주세요.
				</styled.Title>
				<styled.SubTitle>
					작성한 유언은 가족이나 유언집행자에게 공유할 수 있습니다.{" "}
					<br />
					공개 시점을 선택해주세요.
				</styled.SubTitle>
				<styled.Page2SelectBox
					// style={{ marginTop: "38px", marginBottom: "20px" }}
					style={getSelectBoxStyle("anytime")}
					onClick={() =>
						setFormData((prev) => ({
							...prev,
							shareTimingChoice: "anytime",
						}))
					}
				>
					<styled.Page7TextDiv>
						<styled.Page2SelectBoxText>
							일상시
						</styled.Page2SelectBoxText>
						<styled.Page7TextDivSub>
							언제든지 공유대상자가 <br />
							열람할 수 있어요.
						</styled.Page7TextDivSub>
					</styled.Page7TextDiv>
					<styled.Page2SelectBoxImage src={anytime} />
				</styled.Page2SelectBox>
				<styled.Page2SelectBox
					// style={{ marginBottom: "20px" }}
					style={getSelectBoxStyle("sickness")}
					onClick={() =>
						setFormData((prev) => ({
							...prev,
							shareTimingChoice: "sickness",
						}))
					}
				>
					<styled.Page7TextDiv>
						<styled.Page2SelectBoxText>
							병환중
						</styled.Page2SelectBoxText>
						<styled.Page7TextDivSub>
							질병으로 의사결정이 어려울 때 <br />
							공유대상자가 열람할 수 있어요.
						</styled.Page7TextDivSub>
					</styled.Page7TextDiv>
					<styled.Page2SelectBoxImage src={sick} />
				</styled.Page2SelectBox>
				<styled.Page2SelectBox
					style={getSelectBoxStyle("death")}
					onClick={() =>
						setFormData((prev) => ({
							...prev,
							shareTimingChoice: "death",
						}))
					}
				>
					<styled.Page7TextDiv>
						<styled.Page2SelectBoxText>
							사망 후
						</styled.Page2SelectBoxText>
						<styled.Page7TextDivSub>
							사망 후에 공유대상자가 <br />
							열람할 수 있어요.
						</styled.Page7TextDivSub>
					</styled.Page7TextDiv>
					<styled.Page2SelectBoxImage src={die} />
				</styled.Page2SelectBox>
			</styled.TopContainer>
			<styled.ButtonBottomDiv>
				<WhiteButton
					variant="medium"
					onClick={() => {
						console.log(
							"Page 7 - Going back:",
							formData.shareTimingChoice
						);
						onPrev();
					}}
					style={{ marginRight: "8px" }}
				>
					이전으로
				</WhiteButton>
				<BlueButton
					variant="medium"
					onClick={() => {
						console.log(
							"Page 7 - Moving forward:",
							formData.shareTimingChoice
						);
						onNext();
					}}
				>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

const Page8 = ({
	onNext,
	formData,
	setFormData,
	setCurrentPage,
}: PageProps & { setCurrentPage: (page: number) => void }) => {
	const handleReset = () => {
		// formData를 초기 상태로 리셋
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
		// 첫 페이지(0)로 이동
		setCurrentPage(0);
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
				<styled.Page8WillFrameDiv>
					<div />
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
					유언장
					<styled.Page8WillDate>2025.01.16</styled.Page8WillDate>
				</styled.Page8WillFrameDiv>
			</styled.TopContainer>
			<styled.ButtonBottomDiv>
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
							console.log("Page 8 - 제출하기:", formData);
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

const Page10 = ({ onNext, onPrev }: PageProps) => <h1>page 10</h1>;

const FinalPage = () => (
	<div>
		<h2>모든 절차가 완료되었습니다</h2>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<BlueButton variant="large">완료</BlueButton>
		</Link>
	</div>
);

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
				return <InitialContent onStartUpload={handleNext} />;
			case 1:
				return (
					<Page1
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 2:
				return (
					<Page2
						onSelectUploadType={handleSelectUploadType}
						formData={formData}
						setFormData={setFormData}
						onNext={handleNext}
						onPrev={handlePrev}
					/>
				);
			case 3:
				return (
					<Page3
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 4:
				return (
					<Page4
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 5:
				return (
					<Page5
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 6:
				return (
					<Page6
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 7:
				return (
					<Page7
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 8:
				return (
					<Page8
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
				return <Page10 onNext={handleNext} onPrev={handlePrev} />;
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
