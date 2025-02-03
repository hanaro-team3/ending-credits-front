import * as styled from "../styles"
import ReactApexChart from "react-apexcharts"
import { useChartData } from "../hooks/useChartData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";

// components
import Header from "../../../layout/Header"
import BlueButton from "../../../ui/BlueBtn";
import { RegisterModal } from "../components/RegisterModal";

// services
import { productService } from "../../../services/api/Product";
import * as dto from "../../../services/dto/Product";

// assets
const moneyWingImg = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20with%20Wings.png"
const moneyBagImg = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20Bag.png"
interface ProductInfoProps {
	activeType: string;
	productDetail: dto.PensionSavingDetail | dto.AnnuityDetail;
}

const ProductInfo = ({ activeType, productDetail }: ProductInfoProps) => (
	<styled.ProductInfoWrapper>
		<styled.ProductImage 
			src={activeType === '연금저축' ? moneyBagImg : moneyWingImg} 
			alt="Money" 
		/>
		{activeType === '연금저축' && 'productType' in productDetail && (
			<styled.ProductCompanyInfo>
				{productDetail.productArea} / {productDetail.company}
			</styled.ProductCompanyInfo>
		)}
		<styled.ProductName>
			{'productType' in productDetail ? productDetail.productName : productDetail.company}
		</styled.ProductName>
	</styled.ProductInfoWrapper>
);

interface ProductDetailsProps {
	productDetail?: dto.PensionSavingDetail;
}

const PensionSavingDetails = ({ productDetail }: ProductDetailsProps) => (
	<styled.ProductDetailsCard>
		<styled.DetailSection>
			<styled.DetailLabel>상품유형</styled.DetailLabel>
			<p>{productDetail?.productType}</p>
		</styled.DetailSection>
		<styled.DetailSection isBottom>
			<styled.DetailLabel>중도해지</styled.DetailLabel>
			<p>{productDetail?.withdraws}</p>
		</styled.DetailSection>
	</styled.ProductDetailsCard>
);

function ProductDetail() {
	const { id } = useParams();
	const searchParams = new URLSearchParams(window.location.search);
	const activeType = searchParams.get('activeType') || '연금저축';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productDetail, setProductDetail] = useState<dto.PensionSavingDetail | dto.AnnuityDetail>();
	const { chartData } = useChartData({ productDetail, activeType });

	useEffect(() => {
		async function getProductDetail() {
			if (!id) {
				message.error('존재하지 않는 상품입니다.');
				return;
			}
			try {
				const response = await (activeType === '연금저축' 
					? productService.getPensionSavingsDetail(id)
					: productService.getProductAnnuityDetail(id));
				
				if (response?.data) {
					setProductDetail(response.data.result);
				}
			} catch (error) {
				console.error('Failed to fetch:', error);
				message.error('상품 정보 조회에 실패했습니다.');
			}
		}

		getProductDetail();
	}, [id, activeType]);

	return (
		<styled.Container>
			<Header title="상품 상세" />
			{productDetail && <ProductInfo activeType={activeType} productDetail={productDetail} />}
			
			{activeType === '연금저축' && productDetail && (
				<PensionSavingDetails productDetail={productDetail as dto.PensionSavingDetail} />
			)}

			<styled.ChartTitle>
				{activeType === '연금저축' ? '수익률 추이' : '원리금 보장 수익률'}
			</styled.ChartTitle>
			<ReactApexChart 
				options={chartData.earnRate.options} 
				series={chartData.earnRate.series} 
				type="area" 
				height={350} 
			/>

			<styled.ChartTitle>
				{activeType === '연금저축' ? '수수료 추이' : '원리금 비보장 수익률'}
			</styled.ChartTitle>
			<ReactApexChart 
				options={chartData.feeRate.options} 
				series={chartData.feeRate.series} 
				type="area" 
				height={350} 
			/>

			<styled.ButtonContainer>
				<BlueButton onClick={() => setIsModalOpen(true)}>
					상품 가입하기
				</BlueButton>
			</styled.ButtonContainer>

			<RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</styled.Container>
	);
}

export default ProductDetail;


