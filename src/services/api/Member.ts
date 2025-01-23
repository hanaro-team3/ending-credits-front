import { request } from '../request';
import { config } from '../../config/config';
import { MemberConnectedResponseDTO } from '../dto/Member';

const BASE_URL = config.apiUrl;

export const memberService = {
    getMemberConnected: () => {
        return request<MemberConnectedResponseDTO>({
            method: 'GET',
            url: `${BASE_URL}/member/connected`,
        });
    },
};
