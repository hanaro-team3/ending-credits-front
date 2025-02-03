import { request } from "../request";
import { config } from "../../config/config";
import * as dto from "../dto/Will";
import * as assetDto from "../dto/Asset";

const BASE_URL = config.apiUrl;
const BLOCK_BASE_URL = config.blockapiUrl;

export const willService = {    
    // 유언장 생성
    postWill: (data: dto.WillRequestDTO) => {
        return request<dto.WillPostResponseDTO>({
            method: 'POST',
            url: `${BLOCK_BASE_URL}/wills`,
            data
        })
    },
  
    getMemberDetail: () => {
        return request<dto.ResponseDTO<dto.MemberDetail>>({
            method: "GET",
            url: `${BASE_URL}/member/me`,
        });
    },

    updateMemberAddress: (address: string) => {
        return request<dto.BasicResponseDTO>({
            method: "PATCH",
            url: `${BASE_URL}/member/me`,
            params: {
                address: address,
            },
        });
    },

    // 부동산 자산 조회
    getRealEstateAssets: () => {
        return request<assetDto.RealEstatesResponseDTO>({
            method: "GET",
            url: "/asset/real-estates",
        });
    },

    // 금융 자산 조회
    getFinanceAssets: async () => {
        const bankResponse = await request<assetDto.BanksResponseDTO>({
            method: "GET",
            url: "/asset/bank",
        });

        const virtualResponse = await request<assetDto.VirtualResponseDTO>({
            method: "GET",
            url: "/asset/virtual",
        });

        const securitiesResponse =
            await request<assetDto.SecuritiesResponseDTO>({
                method: "GET",
                url: "/asset/securities",
            });

        const pensionsResponse = await request<assetDto.PensionsResponseDTO>({
            method: "GET",
            url: "/asset/pensions",
        });

        return {
            bank: bankResponse.data?.result || [],
            virtual: virtualResponse.data?.result || [],
            securities: securitiesResponse.data?.result || [],
            pensions: pensionsResponse.data?.result || [],
        };
    },

    // 기타 자산 조회
    getOtherAssets: async () => {
        const cashResponse = await request<dto.CashResponseDTO>({
            method: "GET",
            url: "/asset/cash",
        });

        const carsResponse = await request<assetDto.CarsResponseDTO>({
            method: "GET",
            url: "/asset/cars",
        });

        return {
            cash: cashResponse.data?.result || [],
            cars: carsResponse.data?.result || [],
        };
    },
};