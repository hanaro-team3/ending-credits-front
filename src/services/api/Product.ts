import { request } from '../request';
import { config } from '../../config/config';
import * as dto from '../dto/Product';

const BASE_URL = config.apiUrl;

export const productService = {
  // 투자 전략에 맞는 금융 상품 추천
    getRecommend: () => {
        return request<dto.RecommendResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/recommend`,
        });
    },
    // 연금저축 상품 전체 조회
    getPensionSavingsAll: (page: string, size: string, sort: string) => {
        return request<dto.PensionSavingsAllResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/pension-savings/all`,
        params: { page, size, sort },
        });
    },
    // 연금저축 상품 상세 조회
    getPensionSavingsDetail: (productId: string) => {
        return request<dto.PensionSavingsDetailResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/pension-savings/detail/${productId}`,
        });
    },
    // 연금저축 상품 검색
    getPensionSavingsSearch: (keyword:string, areaCode:string) => {
        return request<dto.PensionSavingsSearchResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/pension-savings/search`,
        params: { keyword, areaCode },
        });
    },
    // 연금저축 상품 검색 목록
    getPensionSavings: (areaCode: string) => {
        return request<dto.PensionSavingsResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/pension-savings`,
        params: { areaCode },
        });
    },
    // 연금저축 상품 비교 상세 조회
    getPensionSavingsComparison: (productId: string) => {
        return request<dto.PensionSavingsComparisonResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/pension-savings/comparison/${productId}`,
        });
    },
    // 연금저축 상품 예상 수익률 조회
    getPensionSavingsCalculate: (productId: string) => {
        return request<dto.PensionSavingsCalculateResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/pension-savings/calculate/${productId}`,
        });
    },
    // 퇴직연금 기업별 비교 상세 조회
    getAnnuityComparison: (companyId: string) => {
        return request<dto.AnnuityComparisonResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/annuity/comparison/${companyId}`,
        });
    },
    // 퇴직연금 기업 전체 조회
    getProductAnnuityAll: (page: string, size: string, sort: string) => {
        return request<dto.AnnuityAllResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/annuity/all`,
        params: { page, size, sort },
        });
    },
    // 퇴직연금 기업별 상세 조회
    getProductAnnuityDetail: (companyId: string) => {
        return request<dto.AnnuityDetailResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/annuity/detail/${companyId}`,
        });
    },
    // 퇴직연금 기업 검색
    getProductAnnuitySearch: (keyword: string) => {
        return request<dto.AnnuitySearchResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/annuity/search`,
        params: { keyword },
        });
    },
    // 퇴직연금 기업 검색 목록
    getProductAnnuity: (areaCode: string) => {
        return request<dto.AnnuitySearchResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/annuity`,
        params: { areaCode },
        });
    },
    // 하나은행 상품 조회
    getProductPensionSavingsDetailHana:()=>{
        return request<dto.PensionSavingsDetailHanaResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/product/pension-savings/detail/hana`,
        });
    }
};
