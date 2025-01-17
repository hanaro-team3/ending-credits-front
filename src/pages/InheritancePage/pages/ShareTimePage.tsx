import React from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import anytime from "../../../images/inheritance-anytime.png";
import sick from "../../../images/inheritance-sick.png";
import die from "../../../images/inheritance-die.png";

const ShareTimePage: React.FC<PageProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
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

export default ShareTimePage;
