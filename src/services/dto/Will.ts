export interface WillResponseDTO {
    result: Will;
}

export interface Will {
    willId: string;
    inheritances: Inheritance[];
    executors: Executor[];
    finalMessages: FinalMessage[];
    shareAt: number;
}

export interface WillData {
    inheritances: Inheritance[];
    executors: Executor[];
    finalMessages: FinalMessage[];
    shareAt: number;
}

export interface Inheritance {
    type: string;
    subType: string;
    financialInstitution: string;
    asset: string;
    amount: string;
    ancestors: Ancestor[];
}

export interface Executor {
    name: string;
    relation: string;
    priority: number;
}

export interface FinalMessage {
    name: string;
    relation: string;
    message: string;
}

export interface Ancestor {
    name: string;
    relation: string;
    ratio: number;
}

export interface WillPostResponseDTO {
    result: {
        willId: string;
    };
}
