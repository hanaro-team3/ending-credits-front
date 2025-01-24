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