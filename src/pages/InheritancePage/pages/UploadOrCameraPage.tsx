import React from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import backicon from "../../../images/back-icon.png";
import roboticon from "../../../images/inheritance-robot.png";
import photoicon from "../../../images/inheritance-upload-photo.png";
import cameraicon from "../../../images/inheritance-camera.png";

interface Page2Props extends PageProps {
	onSelectUploadType: (type: "album" | "camera") => void;
}

const UploadOrCameraPage: React.FC<Page2Props> = ({
	onSelectUploadType,
	onPrev,
	formData,
	setFormData,
}) => (
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
				onSelectUploadType("camera");
			}}
		>
			<styled.Page2SelectBoxText>촬영하기</styled.Page2SelectBoxText>
			<styled.Page2SelectBoxImage src={cameraicon} />
		</styled.Page2SelectBox>
	</styled.UploadPageContainer>
);

export default UploadOrCameraPage;
