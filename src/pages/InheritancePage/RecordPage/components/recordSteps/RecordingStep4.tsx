import React from "react";
import { RecordingProps2 } from "../../types/index";
import { RecordingStep } from "../RecordingStep";

export const RecordingStep4: React.FC<RecordingProps2> = ({
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
				other: blob,
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
					가지고 계신{" "}
					<span style={{ color: "#4792dc" }}>자산의 종류</span>에 따라
					<br />
					여러 번 녹음을 진행할게요.
				</>
			}
			subtitle="기타 자산에 대해 녹음을 해주세요."
			scriptContent={
				<>
					[기타 자산] <br />
					<br />
					나는 사후에 <br />
					<div>
						내가 보유하고 있는 <span>OOO</span>을<br />
					</div>
					<div>
						상속인 중 <span>OOO에게</span> <span>O%</span>만큼,
						<br />
					</div>
					<div>
						상속인 중 <span>OOO에게</span> <span>O%</span>만큼,
						<br />
					</div>
					상속하겠습니다.
				</>
			}
			onRecordingComplete={handleRecordingComplete}
		/>
	);
};
