import React from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import willexample1 from "../../../images/will-emaple-1.png";

const WillSamplePage: React.FC<PageProps> = ({ onNext, onPrev }) => (
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

export default WillSamplePage;
