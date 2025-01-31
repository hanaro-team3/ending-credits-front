import { request } from '../request';
import { config } from '../../config/config';
import { WillData, WillPostResponseDTO, WillResponseDTO } from '../dto/Will';

const BLOCK_BASE_URL = config.blockapiUrl;

export const willService = {
	getWill: (willId: string) => {
		return request<WillResponseDTO>({
			method: 'GET',
			url: `${BLOCK_BASE_URL}/wills/${willId}`,
		});
	},

	postWill: (data: WillData) => {
		return request<WillPostResponseDTO>({
			method: 'POST',
			url: `${BLOCK_BASE_URL}/wills`,
			data
		})
	}
}