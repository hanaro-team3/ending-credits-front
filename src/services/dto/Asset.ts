export interface DetailResponseDTO {
    result: DetailResponseDTO;
    assetsDetail: AssetsDetail;
    loan: Loan[];
    loanTotal: string;
}

export interface Loan {
    totalAmount: string;
    loanAmount: string;
    expiryRemainDay: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
}

export interface AssetsDetail {
    bank: string;
    securityCompany: string;
    virtual: string;
    cash: string;
    realEstate: string;
    car: string;
    pension: string;
    assetTotal: string;
}