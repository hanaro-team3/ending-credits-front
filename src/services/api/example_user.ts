import { request } from '../request';
import { config } from '../../config/config';
import { UserResponseDTO } from '../dto/example_user';

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
  
export const userService = {
    registerUser: ( data: UserResponseDTO) => {
    return request<void>({
        method: 'POST',
        url: `${BASE_URL}/members/signUp`,
        data,
    });
}
}