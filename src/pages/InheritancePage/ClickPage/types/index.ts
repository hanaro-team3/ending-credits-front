// Page props interface
export interface PageProps {
	onNext: () => void;
	onPrev: () => void;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	setCurrentPage?: (page: number) => void;
}

// Form data interface
export interface FormData {
	personalInfo: {
		name: string;
		birthDate: string;
		address: string;
	};
	assets: {
		realEstate: Array<{
			id: string;
			type: string;
			address: string;
			value: number;
		}>;
		stocks: Array<{
			id: string;
			type: string;
			details: string;
			value: number;
		}>;
	};
	inheritanceInfo: {
		[key: string]: {
			inheritors: Array<{
				id: string;
				name: string;
				relation: string;
				ratio: number;
			}>;
		};
	};
	executor: {
		name: string;
		relationship: string;
	};
	messages: Array<{
		relationship: string;
		content: string;
	}>;
	shareTimingChoice: "anytime" | "sickness" | "death" | null;
}

// Modal props interface
export interface InheritorModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { name: string; relation: string }) => void;
}

// Message interface
export interface Message {
	relationship: string;
	content: string;
}
