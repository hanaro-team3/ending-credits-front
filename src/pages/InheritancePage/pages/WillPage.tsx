import React from "react";
import { Link } from "react-router-dom";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import willdeco from "../../../images/will-decoration.png";

interface Page8Props extends PageProps {
	setCurrentPage: (page: number) => void;
}

const WillPage: React.FC<Page8Props> = ({
	onNext,
	formData,
	setFormData,
	setCurrentPage,
}) => {
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

export default WillPage;
