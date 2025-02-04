import React, { useState } from "react";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import loadingicon from "../../../images/inheritance-loding.gif";
import { photoService } from "../../../services/api/Photo";

interface Ancestor {
	name: string;
	relation: string;
	ratio: number;
}

interface Inheritance {
	type: string;
	subType: string;
	financialInstitution: string | null;
	asset: string;
	amount: number;
	ancestors: Ancestor[];
}

interface Executor {
	name: string;
	relation: string;
	priority: number;
}

interface FinalMessage {
	name: string;
	relation: string;
	message: string;
}

const PhotoIntoTextPage: React.FC<PageProps> = ({
	onNext,
	formData,
	setFormData,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	const processInheritanceData = (result: any) => {
		const bankData = result.inheritances.filter(
			(item) => item.type === "금융"
		);
		const realEstateData = result.inheritances.filter(
			(item) => item.subType === "부동산"
		);
		const etcData = result.inheritances.filter(
			(item) => item.type !== "금융" && item.subType !== "부동산"
		);

		return {
			bankData,
			realEstateData,
			etcData,
		};
	};

	React.useEffect(() => {
		const convertToText = async () => {
			try {
				if (!formData.photoUrls?.length) {
					throw new Error("No photo URLs available");
				}

				const response = await photoService.photoToText(
					formData.photoUrls
				);
				const { result } = response.data;
				console.log("OCR response:", response.data);

				const { bankData, realEstateData, etcData } =
					processInheritanceData(result);

				setFormData((prev) => ({
					...prev,
					bankData,
					realEstateData,
					etcData,
					executors: result.executors,
					finalMessages: result.finalMessages,
					shareAt: result.shareAt,
				}));

				setIsLoading(false);
			} catch (error) {
				console.error("Failed to convert photos:", error);
				alert("텍스트 변환에 실패했습니다. 다시 시도해주세요.");
				setIsLoading(false);
			}
		};

		convertToText();
	}, []);

	const handleNext = () => {
		onNext();
	};

	return (
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
				<BlueButton
					variant="large"
					onClick={handleNext}
					disabled={isLoading}
				>
					다음으로
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.UploadPageContainer>
	);
};

export default PhotoIntoTextPage;
