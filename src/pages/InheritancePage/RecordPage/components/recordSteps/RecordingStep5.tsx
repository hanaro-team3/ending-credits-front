import React from "react";
import { RecordingProps2 } from "../../types/index";
import { RecordingStep } from "../RecordingStep";

export const RecordingStep5: React.FC<RecordingProps2> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
	apiService,
}) => {
	const handleRecordingComplete = (blob: Blob) => {
		setFormData({
			...formData,
			recordings: {
				...formData.recordings,
				optional: blob,
			},
		});
	};

	return (
		<RecordingStep
			onNext={onNext}
			onPrev={onPrev}
			apiService={apiService}
			title={
				<>
					선택 사항으로{" "}
					<span style={{ color: "#4792dc" }}>남기고 싶은 말</span>을{" "}
					<br />
					말씀해 주세요.
				</>
			}
			subtitle="어떤 내용이든 괜찮아요."
			scriptContent={
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "left",
					}}
				>
					자유롭게
					<br />
					말씀해 주세요.
				</div>
			}
			onRecordingComplete={handleRecordingComplete}
		/>
	);
};
