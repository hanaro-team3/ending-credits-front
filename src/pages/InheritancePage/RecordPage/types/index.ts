export interface FormData {
	personalInfo: {
		name: string;
		birthDate: string;
		address: string;
	};
	recordings: {
		introductory: Blob | null;
		realEstate: Blob | null;
		financial: Blob | null;
		other: Blob | null;
		optional: Blob | null;
		finish: Blob | null;
	};
	executor: {
		name: string;
		relationship: string;
	};
	shareTimingChoice: "anytime" | "sickness" | "death" | null;
}

export interface RecordingProps {
	onNext: () => void;
	onPrev: () => void;
	formData: FormData;
	setFormData: (data: FormData) => void;
}
