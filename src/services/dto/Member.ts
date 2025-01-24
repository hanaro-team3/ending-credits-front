import { AssetsDetail } from "./Asset";

export type MemberConnectedResponseDTO = {
    result: boolean;
};

export type MemberWishResponseDTO = {
    code: string,
    message: string,
    result: MemberWishDTO
}

export type MemberWishDTO = {
    assetsDetail: AssetsDetail,
    wishFund: string
}

export type MemberInfoResponseDTO = {
    code: string;
    message: string;
    result: MemberInfo;
}

export type MemberInfo = {
    name: string;
    birthDate: string;
    phoneNumber: string;
    address: string;
}