import * as styled from "../styles"
import ReactApexChart from "react-apexcharts"
import { useChartData } from "../hooks/useChartData";
// import { useParams } from "react-router-dom";
import { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



// components
import Header from "../../../layout/Header"
import BlueButton from "../../../ui/BlueBtn";
import Modal from "../../../layout/Modal";

function ProductDetail() {
	// const { id } = useParams();
	const { chartData } = useChartData();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	}

	const closeModal = () => {
		setIsModalOpen(false);
	}

	return (
		<styled.Container>
			<Header title="상품 상세" />
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20Bag.png" alt="Money Bag" width="100" style={{ marginBottom: '30px' }} />
				<p style={{ color: '#888888', marginBottom: '10px' }}>자산운용(펀드)  / 삼성자산운용</p>
				<p style={{ fontSize: '20px', fontWeight: '600' }}>삼성신종MMF종류형D 2(C-P)</p>
			</div>
			<div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: "100%" }}>
				<div style={{ borderBottom: '1px solid #E0E0E0', paddingBottom: '10px', textAlign: 'center' }}>
					<p style={{ color: '#888888', paddingBottom: '10px' }}>상품유형</p>
					<p>단기금융</p>
				</div>
				<div style={{ paddingTop: '10px', textAlign: 'center' }}>
					<p style={{ color: '#888888', paddingBottom: '10px' }}>중도해지</p>
					<p>불가</p>
				</div>
			</div>

			<h3>수익률 추이</h3>
			<ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />

			<h3>수수료 추이</h3>
			<ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />


			<h3>관련 상품</h3>
			<styled.GridContainer>
				{["상품1", "상품2"].map((name, index) => (
					<styled.GridItem key={index}>
						{name}
					</styled.GridItem>
				))}
			</styled.GridContainer>
			<styled.ButtonContainer>
				<BlueButton onClick={() => openModal()}>
					상품 가입하기
				</BlueButton>
			</styled.ButtonContainer>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', textAlign: 'center', fontSize: '18px' }}>

					<div>
						<DotLottieReact
							src="https://lottie.host/4f4850d1-a0b3-4887-8615-108bba756fd0/NUT4PqgDtr.json"
							loop
							autoplay
						/>
						<p>2천 만원으로 3년 가입 시<br />150만원의 수익을 예상해요.</p>
					</div>
					<p style={{fontWeight: '600'}}>3년 후에는 1년에 7만원,<br />한달에 5천원 더 사용할 수 있어요.</p>
					<BlueButton>가입하기</BlueButton>
				</div>
			</Modal>
		</styled.Container>
	);
}

export default ProductDetail;


