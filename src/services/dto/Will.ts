export interface ResponseDTO<T> {
    code: string;
    message: string;
    result: T;
}

export interface BasicResponseDTO {
    code: string;
    message: string;
}

export interface MemberDetail {
    birthDate: string;
    phoneNumber: string;
    address: string;
    name: string;
}

export interface Cash {
    cashId: string;
    amount: number;
}

export interface CashResponseDTO {
    code: string;
    message: string;
    result: Cash[];
}
