import { request } from "../request";
import { config } from "../../config/config";

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
	setWillInheritanceRealEstate: (fileUrl: string) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/will/speech/inheritance?fileUrl=${fileUrl}&type=etc`,
		});
	},
	setWillInheritanceBank: (fileUrl: string) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/will/speech/inheritance?fileUrl=${fileUrl}&type=bank`,
		});
	},
	setWillInheritanceEtc: (fileUrl: string) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/will/speech/inheritance?fileUrl=${fileUrl}&type=etc`,
		});
	},
	setWillInheritanceLastWords: (fileUrl: string) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/will/speech/final-message?fileUrl=${fileUrl}`,
		});
	},
	setWillInheritanceConfirm: (fileUrl: string) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/will/speech/confirmation?fileUrl=${fileUrl}`,
		});
	},
};
