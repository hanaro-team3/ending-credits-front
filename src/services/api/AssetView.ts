import { request } from '../request.tsx';
import { config } from '../../config/config.ts';
import { RealEstatesResponseDTO, CarsResponseDTO, PensionsResponseDTO, ConnectAllRequestDTO, CarRequestDTO, CarResponseDTO, RealEstateRequestDTO, RealEstateResponseDTO} from '../dto/AssetView.ts';

const BASE_URL = config.apiUrl;

  /**
   * 사용방법
   * 1. /src/services/dto에 타입 정의
   * 2. 아래와 같이 api 정의 (method(필수), url(필수), data, headers, params)
   * 3. api를 사용할 페이지에서 아래와 같이 사용
   * ```
   * try {
      const response = await userService.registerUser(data);
      if (response?.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
    ```
   */
  
export const assetService = {
    getRealEstates: () => {
        return request<RealEstatesResponseDTO>({
            method: 'GET',
            url: `${BASE_URL}/asset/real-estates`,
        });
    },
    getCars: () => {
      return request<CarsResponseDTO>({
          method: 'GET',
          url: `${BASE_URL}/asset/cars`,
      });
    },
    getPensions: () => {
      return request<PensionsResponseDTO>({
          method: 'GET',
          url: `${BASE_URL}/asset/pensions`,
      });
    },
    postConnectAll: (data: ConnectAllRequestDTO) => {
      return request<void>({
          method: 'POST',
          url: `${BASE_URL}/asset/connect-all`,
          data,
      });
    },
    postCar: (data: CarRequestDTO) => {
      return request<CarResponseDTO>({
          method: 'POST',
          url: `${BASE_URL}/asset/car`,
          data,
      });
    },
    postRealEstate: (data: RealEstateRequestDTO) => {
      return request<RealEstateResponseDTO>({
          method: 'POST',
          url: `${BASE_URL}/asset/real-estate`,
          data,
      });
    }
}