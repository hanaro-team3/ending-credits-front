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
