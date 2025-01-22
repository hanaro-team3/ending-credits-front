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
		assets: { type: string; address: string; value: number }[]
	) => (
		<styled.AssetInfoCategory>
			<styled.AssetInfoTitle>{title}</styled.AssetInfoTitle>
			{assets.map((asset, index) => (
				<React.Fragment key={index}>
					<styled.AssetInfoSubtitle>
						{`${index + 1}. ${asset.type}`}
					</styled.AssetInfoSubtitle>
					<styled.AssetInfoAddress>
						{asset.address}
						<br />
						<span>{(asset.value / 100000000).toFixed(0)}억</span>
					</styled.AssetInfoAddress>
				</React.Fragment>
			))}
		</styled.AssetInfoCategory>
	);

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
							address: asset.address,
							value: asset.value,
						}))
					)}

					<styled.AssetInfoLine />

					{/* 증권 섹션 */}
					{renderAssetCategory(
						"증권",
						formData.assets.stocks.map((stock) => ({
							type: stock.type,
							address: stock.details,
							value: stock.value,
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
