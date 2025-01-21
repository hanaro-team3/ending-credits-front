import React from "react";
import { RecordingProps } from "../../types/index";
import { RecordingStep } from "../RecordingStep";

export const RecordingStep1: React.FC<RecordingProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const handleRecordingComplete = (blob: Blob) => {
		setFormData({
			...formData,
			recordings: {
				...formData.recordings,
				introductory: blob,
			},
		});
	};

	return (
		<RecordingStep
			onNext={onNext}
			onPrev={onPrev}
			title={
				<>
					2. <span style={{ color: "#4792dc" }}>녹음 버튼</span>을
					누르고 <br />
					유언 내용을 말씀해 주세요.
				</>
			}
			subtitle="빈 칸에는 필요한 정보를 넣어주시면 돼요."
			scriptContent={
				<>
					<div>
						나 <span>[이름]</span>은/는 2025년 1월 7일 <br />
					</div>
					재산 상속을 위한 유언을 남기며,
					<br /> <br />이 모든 내용은 <br /> 자의로 하는 것임을
					밝힙니다.
				</>
			}
			onRecordingComplete={handleRecordingComplete}
		/>
	);
};
