import React from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import loadingicon from "../../../images/inheritance-loding.gif";

const PhotoIntoTextPage: React.FC<PageProps> = ({ onNext }) => (
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

export default PhotoIntoTextPage;
