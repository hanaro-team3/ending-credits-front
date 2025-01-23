import { request } from '../request.tsx';
import { config } from '../../config/config.ts';
import { BanksResponseDTO,RealEstatesResponseDTO, CarsResponseDTO, PensionsResponseDTO, VirtualResponseDTO, CarRequestDTO, CarResponseDTO, RealEstateRequestDTO, RealEstateResponseDTO, ConnectSelectedRequestDTO, ConnectSelectedResponseDTO, SecuritiesResponseDTO, CashResponseDTO, CashRequestDTO} from '../dto/AssetView.ts';

const BASE_URL = config.apiUrl;
  
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
    postConnectAll: () => {
      return request<void>({
          method: 'POST',
          url: `${BASE_URL}/asset/connect/all`,
      });
    },
    postConnectSelected: (data: ConnectSelectedRequestDTO) => {
      return request<ConnectSelectedResponseDTO>({
          method: 'POST',
          url: `${BASE_URL}/asset/connect/selected`,
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
    },
    getVirtual: () => {
      return request<VirtualResponseDTO>({
          method: 'GET',
          url: `${BASE_URL}/asset/virtual`,
      });
    },
    getSecurities: () => {
      return request<SecuritiesResponseDTO>({
          method: 'GET',
          url: `${BASE_URL}/asset/securities`,
      });
    },
    getBanks: () => {
      return request<BanksResponseDTO>({
          method: 'GET',
          url: `${BASE_URL}/asset/bank`,
      });
    },
    getCash: () => {
      return request<CashResponseDTO>({
          method: 'GET',
          url: `${BASE_URL}/asset/cash`,
      });
    },
    patchCash: (data: CashRequestDTO) => {
      return request<CashResponseDTO>({
          method: 'PATCH',
          url: `${BASE_URL}/asset/cash`,
          data,
      });
    },

}