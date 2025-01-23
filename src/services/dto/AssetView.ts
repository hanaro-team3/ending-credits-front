interface RealEstate {
	realEstateId: string;
	realEstateName: string;
	address: string;
	purchasePrice: number;
	currentPrice: number;
}

interface Car {
	carId: string;
	model: string;
	carNumber: string;
	purchasePrice: number;
	currentPurchasePrice: number;
	mileage: number;
	year: number;
}

interface Pension {
	pensionId: string;
	pensionType: string;
	pensionAge: number;
	monthlyPayment: number;
	paymentDuration: number;
	totalExpectedAmount: number;
}

export interface Virtual {
	exchangeName: string;
    virtualAssetName: string;
    currentPrice: number;
    purchasePrice: number;
    profitRatio: number;
    quantity: number;
    totalValue: number;
}

export interface Securities {
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

export type RealEstatesResponseDTO = RealEstate[];

export type CarsResponseDTO = Car[];

export type PensionsResponseDTO = Pension[];


export interface ConnectSelectedRequestDTO {
    bankNames: string[],
    securitiesCompanyNames: string[],
    exchangeNames: string[]
}

export interface ConnectSelectedResponseDTO {
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
	result: number;
}

export interface CashRequestDTO {
    amount: number;
}

