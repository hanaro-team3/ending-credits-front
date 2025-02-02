import React from "react";
import * as styled from "../styles";
import { PageProps } from "../types";
import BlueButton from "../../../../ui/BlueBtn";
import WhiteButton from "../../../../ui/WhiteBtn";

const AssetsViewPage: React.FC<PageProps> = ({
    onNext,
    onPrev,
    formData,
    setFormData,
}) => {
    const renderAssetCategory = (
        title: string,
        assets: { type: string; detail: string; value: number }[]
    ) => {
        // type별로 분류
        const groupedAssets = new Map<
            string,
            { detail: string; value: number }[]
        >();

        assets.forEach((asset) => {
            if (!groupedAssets.has(asset.type)) {
                groupedAssets.set(asset.type, []);
            }
            groupedAssets
                .get(asset.type)
                ?.push({ detail: asset.detail, value: asset.value });
        });

        const formatValue = (value: number) => {
            if (value >= 100000000) {
                // 억 단위
                return `${(value / 100000000).toFixed(0)}억`;
            } else if (value >= 1000000) {
                // 천만 원 단위
                return `${(value / 1000000).toFixed(0)}천만 원`;
            } else if (value >= 10000) {
                // 만 원 단위
                return `${(value / 10000).toFixed(0)}만 원`;
            } else if (value >= 1000) {
                // 천 원 단위
                return `${(value / 1000).toFixed(0)}천 원`;
            } else {
                // 1000원 이하
                return `${value.toFixed(0)}원`;
            }
        };

        return (
            <styled.AssetInfoCategory>
                <styled.AssetInfoTitle>{title}</styled.AssetInfoTitle>
                {[...groupedAssets.entries()].map(([type, assets], index) => (
                    <React.Fragment key={type}>
                        <styled.AssetInfoSubtitle>{`${
                            index + 1
                        }. ${type}`}</styled.AssetInfoSubtitle>
                        {assets.map((asset, assetIndex) => (
                            <styled.AssetInfoAddress key={assetIndex}>
                                {asset.detail}
                                <br />
                                <span>{formatValue(asset.value)}</span>
                            </styled.AssetInfoAddress>
                        ))}
                    </React.Fragment>
                ))}
            </styled.AssetInfoCategory>
        );
    };

    return (
        <styled.UploadPageContainer>
            <styled.TopContainer>
                <styled.Title>
                    2. 피상속인의{" "}
                    <span style={{ color: "#4792dc" }}>재산 정보</span>를 <br />
                    조회했어요.
                </styled.Title>
                <styled.SubTitle>
                    정보가 모두 일치한다면 '다음으로' 버튼을 눌러주세요.
                </styled.SubTitle>

                <styled.AssetWhiteBox>
                    {/* 부동산 섹션 */}
                    {renderAssetCategory(
                        "부동산",
                        formData.assets.realEstate.map((asset) => ({
                            type: asset.type,
                            detail: asset.address,
                            value: asset.value,
                        }))
                    )}

                    <styled.AssetInfoLine />

                    {/* 금융 섹션 */}
                    {renderAssetCategory(
                        "금융",
                        formData.assets.finance.map((finance) => ({
                            type: finance.type,
                            detail: finance.detail,
                            value: finance.value,
                        }))
                    )}

                    <styled.AssetInfoLine />

                    {/* 기타 섹션 */}
                    {renderAssetCategory(
                        "기타",
                        formData.assets.others.map((other) => ({
                            type: other.type,
                            detail: other.detail,
                            value: other.value,
                        }))
                    )}
                </styled.AssetWhiteBox>
            </styled.TopContainer>

            <styled.ButtonBottomDiv>
                <WhiteButton
                    variant="medium"
                    onClick={onPrev}
                    style={{ marginRight: "8px" }}
                >
                    이전으로
                </WhiteButton>
                <BlueButton variant="medium" onClick={onNext}>
                    다음으로
                </BlueButton>
            </styled.ButtonBottomDiv>
        </styled.UploadPageContainer>
    );
};

export default AssetsViewPage;
