// import React, { useState } from "react";
// import * as styled from "../styles";
// import { useRecording } from "../hooks/useRecording";
// import { audioService } from "../../../../services/api/Recording";
// import BlueButton from "../../../../ui/BlueBtn";
// import WhiteButton from "../../../../ui/WhiteBtn";
// import recordbtn from "../../../../images/record-button.png";
// import pausebtn from "../../../../images/pause-button.png";
// import { convertWebMToMP4 } from "../utils/audioConverter";

// interface RecordingStepProps {
// 	onNext: () => void;
// 	onPrev: () => void;
// 	title: React.ReactNode;
// 	subtitle: string;
// 	scriptContent: React.ReactNode;
// 	onRecordingComplete: (blob: Blob) => void;
// }

// export const RecordingStep: React.FC<RecordingStepProps> = ({
// 	onNext,
// 	onPrev,
// 	title,
// 	subtitle,
// 	scriptContent,
// 	onRecordingComplete,
// }) => {
// 	const [isUploading, setIsUploading] = useState(false);
// 	const [uploadError, setUploadError] = useState("");

// 	const handleRecordingFinished = async (blob: Blob) => {
// 		try {
// 			setIsUploading(true);
// 			setUploadError("");

// 			// Convert WebM to MP4
// 			const mp4Blob = await convertWebMToMP4(blob);

// 			const formData = new FormData();
// 			formData.append(
// 				"file",
// 				new File([mp4Blob], "recording.mp4", { type: "audio/mp4" })
// 			);

// 			const response = await audioService.uploadRecording(formData);
// 			console.log("Upload Response:", {
// 				code: response.data.code,
// 				message: response.data.message,
// 				result: response.data.result,
// 			});

// 			onRecordingComplete(mp4Blob);
// 		} catch (error) {
// 			console.error("Upload failed:", error);
// 			setUploadError("업로드에 실패했습니다. 다시 시도해 주세요.");
// 		} finally {
// 			setIsUploading(false);
// 		}
// 	};

// 	const {
// 		isRecording,
// 		showNav,
// 		error,
// 		canvasRef,
// 		handleRecordClick,
// 		permissionGranted,
// 	} = useRecording({
// 		onRecordingComplete: handleRecordingFinished,
// 	});

// 	return (
// 		<styled.UploadPageContainer>
// 			<styled.TopContainer>
// 				<styled.Title>{title}</styled.Title>
// 				<styled.SubTitle>{subtitle}</styled.SubTitle>
// 				<styled.ScriptDiv>{scriptContent}</styled.ScriptDiv>
// 			</styled.TopContainer>

// 			{isRecording && (
// 				<styled.WaveformContainer>
// 					<canvas
// 						ref={canvasRef}
// 						width={330}
// 						height={50}
// 						style={{
// 							borderRadius: "8px",
// 							backgroundColor: "#f2f4f5",
// 							border: "1px solid #909090",
// 						}}
// 					/>
// 				</styled.WaveformContainer>
// 			)}

// 			{(error || uploadError) && (
// 				<div
// 					style={{
// 						color: "red",
// 						textAlign: "center",
// 						marginTop: "10px",
// 					}}
// 				>
// 					{error || uploadError}
// 				</div>
// 			)}

// 			{showNav ? (
// 				<styled.ButtonBottomDiv>
// 					<WhiteButton
// 						variant="medium"
// 						onClick={onPrev}
// 						disabled={isUploading}
// 						style={{ marginRight: "8px" }}
// 					>
// 						이전으로
// 					</WhiteButton>
// 					<BlueButton
// 						variant="medium"
// 						onClick={onNext}
// 						disabled={isUploading}
// 					>
// 						다음으로
// 					</BlueButton>
// 				</styled.ButtonBottomDiv>
// 			) : (
// 				<styled.RecordBottomDiv>
// 					<styled.RecordButton
// 						src={isRecording ? pausebtn : recordbtn}
// 						onClick={handleRecordClick}
// 						disabled={isUploading}
// 						style={{
// 							transform: isRecording ? "scale(0.9)" : "scale(1)",
// 							transition: "transform 0.2s",
// 							opacity: isUploading ? 0.5 : 1,
// 						}}
// 					/>
// 					{isUploading && <div>업로드 중...</div>}
// 				</styled.RecordBottomDiv>
// 			)}
// 		</styled.UploadPageContainer>
// 	);
// };

import React, { useState } from "react";
import * as styled from "../styles";
import { useRecording } from "../hooks/useRecording";
import { audioService } from "../../../../services/api/Recording";
import BlueButton from "../../../../ui/BlueBtn";
import WhiteButton from "../../../../ui/WhiteBtn";
import recordbtn from "../../../../images/record-button.png";
import pausebtn from "../../../../images/pause-button.png";
import { convertWebMToMP4 } from "../utils/audioConverter";

interface RecordingStepProps {
	onNext: () => void;
	onPrev: () => void;
	title: React.ReactNode;
	subtitle: string;
	scriptContent: React.ReactNode;
	onRecordingComplete: (blob: Blob) => void;
	apiService: (fileUrl: string) => Promise<any>;
}

export const RecordingStep: React.FC<RecordingStepProps> = ({
	onNext,
	onPrev,
	title,
	subtitle,
	scriptContent,
	onRecordingComplete,
	apiService,
}) => {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState("");

	const handleRecordingFinished = async (blob: Blob) => {
		try {
			setIsUploading(true);
			setUploadError("");

			// Convert WebM to MP4
			const mp4Blob = await convertWebMToMP4(blob);

			const formData = new FormData();
			formData.append(
				"file",
				new File([mp4Blob], "recording.mp4", { type: "audio/mp4" })
			);

			const response = await audioService.uploadRecording(formData);
			console.log("Upload Response:", {
				code: response.data.code,
				message: response.data.message,
				result: response.data.result,
			});

			// const response2 = await audioService.setPurpose(
			// 	response.data.result
			// );
			// console.log("API Response:", response2.data);

			console.log(response.data.result);

			if (!apiService) {
				throw new Error("apiService is undefined");
			}

			const apiResponse = await apiService(response.data.result);
			console.log("API Response2:", apiResponse.data.result);

			onRecordingComplete(mp4Blob);
		} catch (error) {
			console.error("Upload failed:", error);
			setUploadError(`업로드에 실패했습니다: ${error.message}`);
		} finally {
			setIsUploading(false);
		}
	};

	const {
		isRecording,
		showNav,
		error,
		canvasRef,
		handleRecordClick,
		permissionGranted,
	} = useRecording({
		onRecordingComplete: handleRecordingFinished,
	});

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>{title}</styled.Title>
				<styled.SubTitle>{subtitle}</styled.SubTitle>
				<styled.ScriptDiv>{scriptContent}</styled.ScriptDiv>
			</styled.TopContainer>

			{isRecording && (
				<styled.WaveformContainer>
					<canvas
						ref={canvasRef}
						width={330}
						height={50}
						style={{
							borderRadius: "8px",
							backgroundColor: "#f2f4f5",
							border: "1px solid #909090",
						}}
					/>
				</styled.WaveformContainer>
			)}

			{(error || uploadError) && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error || uploadError}
				</div>
			)}

			{showNav ? (
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={onPrev}
						disabled={isUploading}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton
						variant="medium"
						onClick={onNext}
						disabled={isUploading}
					>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						disabled={isUploading}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
							opacity: isUploading ? 0.5 : 1,
						}}
					/>
					{isUploading && <div>업로드 중...</div>}
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};
