export interface FormData {
	// Page 1 data
	personalInfo: {
		name: string;
		birthDate: string;
		address: string;
	};
	// Page 2 data
	uploadType: "album" | "camera" | null;
	// Page 4 data
	uploadedPhotos: string[];
	// Page 6 data
	executor: {
		name: string;
		relationship: string;
	};
	// Page 7 data
	shareTimingChoice: "anytime" | "sickness" | "death" | null;
}

export interface PageProps {
	onNext: () => void;
	onPrev: () => void;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
