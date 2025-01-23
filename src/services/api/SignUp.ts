import { request } from "../request";
import { config } from "../../config/config";
import {
	SignupDTO,
	LoginDTO,
	LoginResponse,
	CheckDuplicateIdDTO,
	ChangeSimplePasswordDTO,
	SendSMSDTO,
	VerifySMSDTO,
	ChangePasswordDTO,
	ChangePhoneNumberDTO,
	GetMemberInfoDTO,
} from "../dto/Auth";

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
	registerUser: (data: SignupDTO) => {
		const queryParams = new URLSearchParams({
			identifier: data.identifier,
			password: data.password,
			loginType: data.loginType.toUpperCase(), // NORMAL로 변환
			birthDate: data.birthDate,
			phoneNumber: data.phoneNumber,
			address: data.address || "주소", // 없으면 기본값
			name: data.name,
			email: data.email || "admin@admin.com", // 없으면 기본값
		}).toString();

		return request<void>({
			method: "POST",
			url: `/auth/signup?${queryParams}`,
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
			},
		});
	},
	login: (data: LoginDTO) => {
		return request<LoginResponse>({
			method: "POST",
			url: `${BASE_URL}/auth/login?identifier=${data.identifier}&password=${data.password}`,
			data,
		});
	},
	checkDuplicateId: (data: CheckDuplicateIdDTO) => {
		return request<void>({
			method: "POST",
			url: `/auth/id?identifier=${data.identifier}`,
		});
	},
	changeSimplePassword: (data: ChangeSimplePasswordDTO) => {
		return request<void>({
			method: "PATCH",
			url: `/auth/simple-password?identifier=${data.identifier}&simplePassword=${data.simplePassword}`,
		});
	},
	sendSMS: (data: SendSMSDTO) => {
		return request<void>({
			method: "POST",
			url: `auth/send-sms?phoneNumber=${data.phoneNumber}`,
		});
	},
	verifySMS: (data: VerifySMSDTO) => {
		return request<void>({
			method: "POST",
			url: `auth/verify-sms?phoneNumber=${data.phoneNumber}&certificationCode=${data.certificationCode}`,
		});
	},
	changePassword: (data: ChangePasswordDTO) => {
		return request<void>({
			method: "PATCH",
			url: `auth/password?phoneNumber=${data.phoneNumber}&password=${data.password}`,
		});
	},
	changePhoneNumber: (
		data: ChangePhoneNumberDTO,
		config?: { headers: { Authorization: string } }
	) => {
		return request<void>({
			method: "PATCH",
			url: `member/me?phoneNumber=${data.phoneNumber}`,
			headers: config?.headers,
		});
	},
	getMemberInfo: (
		data: GetMemberInfoDTO,
		config?: { headers: { Authorization: string } }
	) => {
		return request<void>({
			method: "GET",
			url: `member/me`,
			headers: config?.headers,
		});
	},
};
