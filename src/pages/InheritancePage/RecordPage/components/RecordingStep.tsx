// import React from "react";
// import * as styled from "../styles";
// import { useRecording } from "../hooks/useRecording";
// import BlueButton from "../../../../ui/BlueBtn";
// import WhiteButton from "../../../../ui/WhiteBtn";
// import recordbtn from "../../../../images/record-button.png";
// import pausebtn from "../../../../images/pause-button.png";

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
// 	const { isRecording, showNav, error, canvasRef, handleRecordClick } =
// 		useRecording({
// 			onRecordingComplete,
// 		});

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

// 			{error && (
// 				<div
// 					style={{
// 						color: "red",
// 						textAlign: "center",
// 						marginTop: "10px",
// 					}}
// 				>
// 					{error}
// 				</div>
// 			)}

// 			{showNav ? (
// 				<styled.ButtonBottomDiv>
// 					<WhiteButton
// 						variant="medium"
// 						onClick={onPrev}
// 						style={{ marginRight: "8px" }}
// 					>
// 						이전으로
// 					</WhiteButton>
// 					<BlueButton variant="medium" onClick={onNext}>
// 						다음으로
// 					</BlueButton>
// 				</styled.ButtonBottomDiv>
// 			) : (
// 				<styled.RecordBottomDiv>
// 					<styled.RecordButton
// 						src={isRecording ? pausebtn : recordbtn}
// 						onClick={handleRecordClick}
// 						style={{
// 							transform: isRecording ? "scale(0.9)" : "scale(1)",
// 							transition: "transform 0.2s",
// 						}}
// 					/>
// 				</styled.RecordBottomDiv>
// 			)}
// 		</styled.UploadPageContainer>
// 	);
// };

import React from "react";
import * as styled from "../styles";
import { useRecording } from "../hooks/useRecording";
import BlueButton from "../../../../ui/BlueBtn";
import WhiteButton from "../../../../ui/WhiteBtn";
import recordbtn from "../../../../images/record-button.png";
import pausebtn from "../../../../images/pause-button.png";

interface RecordingStepProps {
	onNext: () => void;
	onPrev: () => void;
	title: React.ReactNode;
	subtitle: string;
	scriptContent: React.ReactNode;
	onRecordingComplete: (blob: Blob) => void;
}

export const RecordingStep: React.FC<RecordingStepProps> = ({
	onNext,
	onPrev,
	title,
	subtitle,
	scriptContent,
	onRecordingComplete,
}) => {
	const {
		isRecording,
		showNav,
		error,
		canvasRef,
		handleRecordClick,
		permissionGranted,
	} = useRecording({
		onRecordingComplete,
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

			{error && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error}
				</div>
			)}

			{showNav ? (
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
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
						}}
					/>
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};
