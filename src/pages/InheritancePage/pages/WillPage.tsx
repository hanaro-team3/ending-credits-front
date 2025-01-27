import React from "react";
import { Link } from "react-router-dom";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import willdeco from "../../../images/will-decoration.png";
import { AssetsDetail } from "../../../services/dto/Asset";

interface Page8Props extends PageProps {
    setCurrentPage: (page: number) => void;
}

const WillPage: React.FC<Page8Props> = ({
    onNext,
    formData,
    setFormData,
    setCurrentPage,
}) => {
    const handleReset = () => {
        // formData를 초기 상태로 리셋
        const resetData = {
            uploadType: null,
            uploadedPhotos: [],
            inheritanceInfo: {},
            executors: [],
            messages: [],
            shareTimingChoice: null,
        };

        setFormData((prevState) => ({
            ...prevState,
            ...resetData,
        }));

        // 첫 페이지(0)로 이동
        setCurrentPage(0);
    };

    const transformFormDataToRequestBody = (formData: FormData) => {
        const {
            assets,
            inheritanceInfo,
            executors,
            messages,
            shareTimingChoice,
        } = formData;

        // 자산 정보
        const getFinancialInstitution = (
            assetCategory: string,
            asset: any
        ): string | null => {
            if (assetCategory === "finance") {
                return asset.detail?.split(" - ")[0] || null;
            }
            return null; // 기본값
        };

        const getType = (assetCategory: string): string => {
            switch (assetCategory) {
                case "realEstate":
                    return "부동산";
                case "finance":
                    return "금융";
                default:
                    return "기타";
            }
        };

        const inheritances = Object.entries(assets).flatMap(
            ([assetCategory, assetList]) => {
                return assetList.flatMap((asset) => {
                    const inheritanceInfoForAsset = inheritanceInfo[asset.id]; // inheritanceInfo에서 id로 상속자 정보 가져오기

                    if (inheritanceInfoForAsset) {
                        const detailParts = asset.detail?.split(" - ") || [];
                        return {
                            type: getType(assetCategory),
                            subType: asset.type,
                            financialInstitution: getFinancialInstitution(
                                assetCategory,
                                asset
                            ),
                            asset: asset.address || detailParts[1] || null,
                            amount: asset.value.toString(),
                            ancestors: inheritanceInfoForAsset.inheritors.map(
                                (inheritor) => ({
                                    name: inheritor.name,
                                    relation: inheritor.relation,
                                    ratio: inheritor.ratio,
                                })
                            ),
                        };
                    }

                    return []; // 상속자 정보가 없는 경우 빈 배열 반환
                });
            }
        );

        // 유언 집행자
        const transformedExecutors = executors.map((exec) => ({
            name: exec.name,
            relation: exec.relationship,
            priority: exec.priority,
        }));

        // 마지막 메시지
        const finalMessages = messages.map((msg) => ({
            name: msg.name,
            relation: msg.relationship,
            message: msg.content,
        }));

        // 공유 시점
        const shareAt = (() => {
            switch (shareTimingChoice) {
                case "anytime":
                    return 0; // 0: 일상
                case "sickness":
                    return 1; // 1: 병환 중
                case "death":
                    return 2; // 2: 사망 후
                default:
                    return null;
            }
        })();

        const requestBody = {
            inheritances,
            executors: transformedExecutors,
            finalMessages,
            shareAt,
        };

        console.log("requestBody:", requestBody);

        return requestBody;
    };

    transformFormDataToRequestBody(formData);
    return (
        <styled.UploadPageContainer>
            <styled.TopContainer>
                <styled.Title>
                    <span style={{ color: "#4792dc" }}>작성하신 유언</span>의
                    내용이 <br />
                    모두 일치하는지 확인해 주세요.
                </styled.Title>
                <styled.SubTitle>
                    내용이 모두 일치하면 제출하기 버튼을 눌러주세요. <br />
                    일치하지 않으면 다시 작성할 수 있어요.
                </styled.SubTitle>
                <styled.Page8WillFrameDiv>
                    <div />
                    <styled.Page8WillDecoration
                        className="top-left"
                        src={willdeco}
                    />
                    <styled.Page8WillDecoration
                        className="top-right"
                        src={willdeco}
                    />
                    <styled.Page8WillDecoration
                        className="bottom-right"
                        src={willdeco}
                    />
                    <styled.Page8WillDecoration
                        className="bottom-left"
                        src={willdeco}
                    />
                    유언장
                    <styled.Page8WillDate>2025.01.16</styled.Page8WillDate>
                </styled.Page8WillFrameDiv>
            </styled.TopContainer>
            <styled.ButtonBottomDiv>
                <WhiteButton
                    variant="medium"
                    onClick={handleReset}
                    style={{ marginRight: "8px" }}
                >
                    다시하기
                </WhiteButton>
                <Link to="/inheritance" style={{ textDecoration: "none" }}>
                    <BlueButton
                        variant="medium"
                        onClick={() => {
                            console.log("Page 8 - 제출하기:", formData);
                            onNext();
                        }}
                    >
                        제출하기
                    </BlueButton>
                </Link>
            </styled.ButtonBottomDiv>
        </styled.UploadPageContainer>
    );
};

export default WillPage;
