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

export interface TokenPairResponseDto{
	accessToken: string;
	refreshToken: string;
}

export interface LoginResponse {
	code: string;
	message: string;
	result: {
		name: string;
		tokenPair: TokenPairResponseDto;
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

export interface ChangePhoneNumberDTO {
	phoneNumber: string;
	headers?: {
		Authorization: string;
	};
}

export interface ChangeAddressDTO{
	address: string;
	headers?:{
		Authorization: string;
	}
}
export interface UploadResponse {
	url: string;
	message: string;
}

export interface GetMemberInfoDTO {
	headers?: {
		Authorization: string;
	};
}

export interface IdCardResponse {
	code: string;
	message: string;
	result: {
	  name: string;
	  address: string;
	  idNumber: string;  // 주민번호 형식 (예: 000111-3)
	};
  }
  
  export interface IdCardUploadDTO {
	file: File;
  }