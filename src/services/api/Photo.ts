import { request } from "../request";
import { config } from "../../config/config";

const BASE_URL = config.apiUrl;

export const photoService = {
	uploadPhoto: (data: FormData) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/upload/files`,
			data,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});
	},
	photoToText: (fileUrls: string[]) => {
		return request({
			method: "POST",
			url: `${BASE_URL}/will/ocr?fileUrls=${fileUrls.join(",")}`,
		});
	},
};
