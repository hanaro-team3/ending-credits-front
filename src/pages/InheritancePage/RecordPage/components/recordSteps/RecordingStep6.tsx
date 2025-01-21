import React from "react";
import { RecordingProps } from "../../types/index";
import { RecordingStep } from "../RecordingStep";

export const RecordingStep6: React.FC<RecordingProps> = ({
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
				finish: blob,
			},
		});
	};

	return (
		<RecordingStep
			onNext={onNext}
			onPrev={onPrev}
			title={
				<>
					이제 <span style={{ color: "#4792dc" }}>마지막</span>이에요.
				</>
			}
			subtitle="유언장이 법적 효력을 가질 수 있도록 화면에 보이는 내용을 따라 읽어주세요."
			scriptContent={
				<>
					이 녹음은
					<br />
					저의 유언장을
					<br />
					설망하는 데 사용되며,
					<br />
					다른 모든 이전의 유언장을 <br />
					무효화 합니다.
					<br />
					<br />
					저는 이 유언이 저의 진심이며,
					<br />
					법적 구속력이 있길 원합니다.
					<br />
					이상으로 유언 내용을 마칩니다.
				</>
			}
			onRecordingComplete={handleRecordingComplete}
		/>
	);
};
