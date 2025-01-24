import { request } from "../request";
import { config } from "../../config/config";
// import {
// 	SignupDTO,
// 	LoginDTO,
// 	LoginResponse,
// 	CheckDuplicateIdDTO,
// 	ChangeSimplePasswordDTO,
// 	SendSMSDTO,
// 	VerifySMSDTO,
// 	ChangePasswordDTO,
// 	ChangePhoneNumberDTO,
// 	GetMemberInfoDTO,
// } from "../dto/Auth";

const BASE_URL = config.apiUrl;

export const audioService = {
	uploadRecording: (data: FormData) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/upload`,
			data,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	setPurpose: (fileUrl: string) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/will/speech/purpose?fileUrl=${fileUrl}`,
		});
	},
};
