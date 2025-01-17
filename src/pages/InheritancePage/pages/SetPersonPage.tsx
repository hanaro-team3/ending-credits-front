import React from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";

const SetPersonPage: React.FC<PageProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => (
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

export default SetPersonPage;
