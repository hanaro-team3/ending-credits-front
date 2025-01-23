import { request } from '../request';
import { config } from '../../config/config';
import { DetailResponseDTO } from '../dto/Asset';

const BASE_URL = config.apiUrl;

export const assetService = {
    detail : () => {
      return request<DetailResponseDTO>({
          method: 'GET',
          url: `${BASE_URL}/asset/detail`,
      });
    }
}

