export interface PageProps {
	onNext: () => void;
	onPrev: () => void;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	setCurrentPage?: (page: number) => void;
}

// Form data interface
export interface FormData {
	// Page 1 - 인적 정보
	personalInfo: {
		name: string;
		birthDate: string;
		address: string;
	};
	// Page 2 - 업로드 타입
	uploadType: "album" | "camera" | null;
	// Page 3 - 재산 정보
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
	// Page 4 - 업로드된 사진
	uploadedPhotos: string[];
	// Page 5 - 상속 정보
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
	// Page 6 - 유언 집행자
	executor: {
		name: string;
		relationship: string;
	};
	// Page 7 - 메시지
	messages: Array<{
		relationship: string;
		content: string;
	}>;
	// Page 8 - 공유 시점
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
