export interface Will {
    willCodeId: string;
    createdType: string;
    files: string[];
    shareAt: number;
}

export interface WillResponseDTO {
    code: string;
    message: string;
    result: Will;
}