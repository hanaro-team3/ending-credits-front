export interface SignupDTO {
	identifier: string;
	password: string;
	loginType: string;
	birthDate: string;
	phoneNumber: string;
	address: string;
	name: string;
	email: string;
}

export interface LoginDTO {
	identifier: string;
	password: string;
}

export interface CheckDuplicateIdDTO {
	identifier: string;
}

export interface LoginResponse {
	code: string;
	message: string;
	result: {
		accessToken: string;
		refreshToken: string;
	};
}

export interface ChangeSimplePasswordDTO {
	identifier: string;
	simplePassword: string;
}

export interface SendSMSDTO {
	phoneNumber: string;
}

export interface VerifySMSDTO {
	phoneNumber: string;
	certificationCode: string;
}

export interface ChangePasswordDTO {
	phoneNumber: string;
	password: string;
}
