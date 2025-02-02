import { request } from "../request";
import { config } from "../../config/config";
import { WillResponseDTO } from "../dto/WillFromBE"

const BASE_URL = config.apiUrl;

export const willBeService = {
    getWill: () => {
        return request<WillResponseDTO>({
            method: 'GET',
            url: `${BASE_URL}/will`,
        });
    },
}