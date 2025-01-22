import { RecordingStep1 } from "./RecordingStep1";
import { RecordingStep2 } from "./RecordingStep2";
import { RecordingStep3 } from "./RecordingStep3";
import { RecordingStep4 } from "./RecordingStep4";
import { RecordingStep5 } from "./RecordingStep5";
import { RecordingStep6 } from "./RecordingStep6";

export {
	RecordingStep1,
	RecordingStep2,
	RecordingStep3,
	RecordingStep4,
	RecordingStep5,
	RecordingStep6,
};

export const RecordingSteps = {
	Step1: RecordingStep1,
	Step2: RecordingStep2,
	Step3: RecordingStep3,
	Step4: RecordingStep4,
	Step5: RecordingStep5,
	Step6: RecordingStep6,
} as const;

export enum RecordingStepNumbers {
	INTRODUCTION = 1,
	REAL_ESTATE = 2,
	FINANCIAL = 3,
	OTHER_ASSETS = 4,
	OPTIONAL = 5,
	FINAL = 6,
}
