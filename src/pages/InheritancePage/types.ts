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
        [key: string]: Array<{
            id: string;
            type: string;
            address: string;
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
    executors: Array<{
        name: string;
        relationship: string;
        priority: number;
    }>;
    // Page 7 - 메시지
    messages: Array<{
        name: string;
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
    name: string;
    relationship: string;
    content: string;
}
