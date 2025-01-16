import React, { useState } from "react";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import EditInfoPage from "./EditInfoPage";

const ProfileViewPage: React.FC<PageProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
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

export default ProfileViewPage;
