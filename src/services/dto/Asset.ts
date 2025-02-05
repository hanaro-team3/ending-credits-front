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

export interface RealEstate {
    realEstateId: string;
    realEstateName: string;
    realEstateType: string;
    address: string;
    purchasePrice: number;
    currentPrice: number;
}

export interface Car {
    carId: string;
    model: string;
    carNumber: string;
    purchasePrice: number;
    currentPurchasePrice: number;
    mileage: number;
    year: number;
}

export interface Pension {
    pensionId: string;
    pensionType: string;
    pensionAge: number;
    monthlyPayment: number;
    paymentDuration: number;
    totalExpectedAmount: number;
}

export interface Virtual {
    virtualAssetId: string;
    exchangeName: string;
    virtualAssetName: string;
    currentPrice: number;
    purchasePrice: number;
    profitRatio: number;
    quantity: number;
    totalValue: number;
	currencyCode: string;
}

export interface Securities {
    securitiesAssetId: string;
    securitiesCompanyName: string;
    stockName: string;
    accountNumber: string;
    amount: number;
    profitRate: number;
    currencyCode: string;
}

export interface Banks {
    bankName: string;
    assetType: string;
    accountName: string;
    accountNumber: string;
    amount: number;
    profitRate: number;
}
export interface RealEstatesResponseDTO {
    code: string;
    message: string;
    result: RealEstate[];
}

export interface CarsResponseDTO {
    code: string;
    message: string;
    result: Car[];
}

export interface PensionsResponseDTO {
    code: string;
    message: string;
    result: Pension[];
}

export interface ConnectSelectedRequestDTO {
    bankNames: string[];
    securitiesCompanyNames: string[];
    exchangeNames: string[];
}

export interface ConnectResponseDTO {
    code: string;
    message: string;
}

export interface CarRequestDTO {
    model: string;
    carNumber: string;
    purchasePrice: number;
    currentPurchasePrice: number;
    mileage: number;
    year: number;
}

export interface CarResponseDTO {
    carId: string;
    model: string;
    carNumber: string;
    purchasePrice: number;
    currentPurchasePrice: number;
    mileage: number;
    year: number;
}

export interface RealEstateRequestDTO {
    name: string;
    address: string;
    purchasePrice: number;
    currentPrice: number;
}

export interface RealEstateResponseDTO {
    realEstateId: string;
    realEstateName: string;
    address: string;
    purchasePrice: number;
    currentPrice: number;
}

export interface VirtualResponseDTO {
    code: string;
    message: string;
    result: Virtual[];
}
export interface SecuritiesResponseDTO {
    code: string;
    message: string;
    result: Securities[];
}

export interface BanksResponseDTO {
    code: string;
    message: string;
    result: Banks[];
}

export interface CashResponseDTO {
    code: string;
    message: string;
	result: {
		id: string;
		amount: number;
	};
}
export interface PatchCashResponstDTO{
	code: string;
    message: string;
	result: number;
}

export interface PatchCashRequestDTO {
    amount: number;
}

export interface PostCarRequestDTO {
    model: string;
    carNumber: string;
    purchasePrice: number;
    currentPurchasePrice?: number;
    mileage?: number;
    year?: number;
}

export interface PostCarResponseDTO {
    code: string;
    message: string;
}

export interface PostRealEstateRequestDTO {
    name: string;
    address: string;
    purchasePrice: number;
    currentPrice?: number;
    realEstateType: string;
}

export interface PostRealEstateResponseDTO {
    code: string;
    message: string;
}