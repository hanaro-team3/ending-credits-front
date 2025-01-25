import { request } from "../request";
import { config } from "../../config/config";
import * as dto from "../dto/Will";

const BASE_URL = config.apiUrl;

export const willService = {
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
};
