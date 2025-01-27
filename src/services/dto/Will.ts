// 기본 응답 DTO
export interface ResponseDTO<T> {
    code: string;
    message: string;
    result: T;
}

export interface BasicResponseDTO {
    code: string;
    message: string;
}

// 회원 DTO
export interface MemberDetail {
    birthDate: string;
    phoneNumber: string;
    address: string;
    name: string;
}

// 자산 DTO (현금)
export interface Cash {
    id: string;
    cashId: string;
    amount: number;
}

export interface CashResponseDTO {
    code: string;
    message: string;
    result: Cash[];
}

// 유언장 DTO
interface Ancestor {
    name: string;
    relation: string;
    ratio: number;
}

interface Inheritance {
    type: string;
    subType: string;
    financialInstitution: string;
    asset: string;
    amount: string;
    ancestors: Ancestor[];
}

interface Executor {
    name: string;
    relation: string;
    priority: number;
}

interface FinalMessage {
    name: string;
    relation: string;
    message: string;
}

export interface WillRequestDTO {
    inheritances: Inheritance[];
    executors: Executor[];
    finalMessages: FinalMessage[];
    shareAt: number | null;
}

export interface WillResponseDTO {
    result: {
        willId: string;
    };
}