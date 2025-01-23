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

export type RealEstatesResponseDTO = RealEstate[];

export type CarsResponseDTO = Car[];

export type PensionsResponseDTO = Pension[];

export interface ConnectAllRequestDTO {
    bankNames: string[],
    securitiesCompanyNames: string[],
    exchangeNames: string[]
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
