import { Executor } from "../../../../services/dto/Will";
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
            type: string; // 아파트, 빌라, 오피스텔, ...
            address: string;
            value: number;
        }>;
        finance: Array<{
            id: string;
            type: string; // 예적금, 주식, 채권, 펀드, ...
            detail: string;
            value: number;
        }>;
        others: Array<{
            id: string;
            type: string; // 자동차, 귀금속, ...
            detail: string;
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
    executors: Executor[];
    messages: Array<{
        name: string;
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
    name: string;
    relationship: string;
    content: string;
}