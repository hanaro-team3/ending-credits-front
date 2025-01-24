export interface PensionSaving {
    productId: string;
    company: string;
    productName: string;
    areaCode?: string;
}

export interface PensionSavingDetail {
    productArea: string; // 은행
    company: string; // 신한은행
    productName: string; // 연금저축신탁 안정형제1호
    productType: string; // 안정형
    withdraws: string; // 가능
    currentEarnRate: number; // 현재 수익률
    previousYearEarnRate: number; // 지난 1년 수익률
    twoYearsAgoEarnRate: number; // 지난 2년 수익률
    threeYearsAgoEarnRate: number; // 지난 3년 수익률
    previousYearFeeRate: number; // 지난 1년 수수료률
    twoYearsAgoFeeRate: number; // 지난 2년 수수료률
    threeYearsAgoFeeRate: number; // 지난 3년 수수료률
}

export interface PensionSavingComparison {
    productId: string;
    area: string;
    company: string;
    product: string;
    productType: string;
    rcvMethod: string;
    feeType: string;
    sells: string;
    withdraws: string;
    guarantees: string;
    currentBalance: string;
    previousYearBalance: string;
    twoYearsAgoBalance: string;
    threeYearsAgoBalance: string;
    currentReserve: string;
    previousYearReserve: string;
    twoYearsAgoReserve: string;
    threeYearsAgoReserve: string;
    currentEarnRate: number;
    previousYearEarnRate: number;
    twoYearsAgoEarnRate: number;
    threeYearsAgoEarnRate: number;
    previousYearFeeRate: number;
    twoYearsAgoFeeRate: number;
    threeYearsAgoFeeRate: number;
}



export interface Annuity{
    companyId: string;
    area?: string;
    company: string;
    dbTotalCostRate?: number;
    dbTotalFee?: number;
    dbOprtMngFee?: number;
    dbAsstMngFee?: number;
    dbFundTotalCost?: number;
    dcTotalCostRate?: number;
    dcTotalFee?: number;
    dcOprtMngFee?: number;
    dcAsstMngFee?: number;
    dcFundTotalCost?: number;
    irpTotalCostRate?: number;
    irpTotalFee?: number;
    irpOprtMngFee?: number;
    irpAsstMngFee?: number;
    irpFundTotalCost?: number;
}

export interface earnRates {
    dbEarnRate: number;
    dbEarnRate3: number;
    dbEarnRate5: number;
    dbEarnRate7: number;
    dbEarnRate10: number;
    dcEarnRate: number;
    dcEarnRate3: number;
    dcEarnRate5: number;
    dcEarnRate7: number;
    dcEarnRate10: number;
    irpEarnRate: number;
    irpEarnRate3: number;
    irpEarnRate5: number;
    irpEarnRate7: number;
    irpEarnRate10: number;
}

export interface AnnuityDetail{   
    company: string;
    area: string;
    earnRates: {
        "원리금 비보장": earnRates,
        "원리금 보장": earnRates,
    } 
}

export interface Recommend {
    productId: string;
    strategyType: string;
}

export interface PensionSavingsCalculate {
    expectedProfit: number; //5110352
    annualAdditionalUsage: number; //511035
    monthlyAdditionalUsage: number; //42586
    expectedEarnRate: number; //7.88
}

export interface PensionSavingsAllResponseDTO {
    code: string;
    message: string;
    result: PensionSaving[];
}

export interface PensionSavingsDetailResponseDTO {
    code: string;
    message: string;
    result: PensionSavingDetail;
}

export interface PensionSavingsSearchParamsDTO {
    keyword: string;
    areaCode: string;
}

export interface PensionSavingsSearchResponseDTO {
    code: string;
    message: string;
    result: PensionSaving[];
}

export interface PensionSavingsResponseDTO {
    code: string;
    message: string;
    result: PensionSaving[];
}

export interface PensionSavingsComparisonResponseDTO {
    code: string;
    message: string;
    result: PensionSavingComparison;
}

export interface PensionSavingsCalculateResponseDTO {
    code: string;
    message: string;
    result: PensionSavingsCalculate
}

export interface AnnuityComparisonResponseDTO {
    code: string;
    message: string;
    result: Annuity;
}

export interface AnnuitySearchResponseDTO {
    code: string;
    message: string;
    result: Annuity[];
}

export interface RecommendResponseDTO {
    code: string;
    message: string;
    result: Recommend[];
}

export interface AnnuityDetailResponseDTO {
    code: string;
    message: string;
    result: AnnuityDetail;
}

export interface PensionSavingsDetailHanaResponseDTO {
    code: string;
    message: string;
    result: PensionSaving[];
}