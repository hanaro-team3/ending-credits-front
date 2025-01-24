import * as styled from "../styles"
import ReactApexChart from "react-apexcharts"
import { useChartData } from "../hooks/useChartData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import Header from "../../../layout/Header"
import BlueButton from "../../../ui/BlueBtn";
import { RegisterModal } from "../components/RegisterModal";

// services
import {productService} from "../../../services/api/Product";
import * as dto from "../../../services/dto/Product";

function ProductDetail() {
	const { id } = useParams();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productDetail, setProductDetail] = useState<dto.PensionSavingDetail>();
	const { chartData } = useChartData(productDetail);

	const openModal = () => {
		setIsModalOpen(true);
	}

	const closeModal = () => {
		setIsModalOpen(false);
	}


    useEffect(() => {
        async function getProductDetail() {
			if (!id) return;
            try {
                const response = await productService.getPensionSavingsDetail(id);
                if (response?.data) {
                    setProductDetail(response.data.result);
                }
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        }

        getProductDetail();

    }, []);

	return (
		<styled.Container>
			<Header title="상품 상세" />
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20Bag.png" alt="Money Bag" width="100" style={{ marginBottom: '30px' }} />
				<p style={{ color: '#888888', marginBottom: '10px' }}>{productDetail?.productArea}  / {productDetail?.company}</p>
				<p style={{ fontSize: '20px', fontWeight: '600' }}>{productDetail?.productName}</p>
			</div>
			<div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: "100%" }}>
				<div style={{ borderBottom: '1px solid #E0E0E0', paddingBottom: '10px', textAlign: 'center' }}>
					<p style={{ color: '#888888', paddingBottom: '10px' }}>상품유형</p>
					<p>{productDetail?.productType}</p>
				</div>
				<div style={{ paddingTop: '10px', textAlign: 'center' }}>
					<p style={{ color: '#888888', paddingBottom: '10px' }}>중도해지</p>
					<p>{productDetail?.withdraws}</p>
				</div>
			</div>

			<h3>수익률 추이</h3>
			<ReactApexChart 
				options={chartData.earnRate.options} 
				series={chartData.earnRate.series} 
				type="area" 
				height={350} 
			/>

			<h3>수수료 추이</h3>
			<ReactApexChart 
				options={chartData.feeRate.options} 
				series={chartData.feeRate.series} 
				type="area" 
				height={350} 
			/>

			<styled.ButtonContainer>
				<BlueButton onClick={openModal}>
					상품 가입하기
				</BlueButton>
			</styled.ButtonContainer>

			<RegisterModal isOpen={isModalOpen} onClose={closeModal} />
		</styled.Container>
	);
}

export default ProductDetail;


