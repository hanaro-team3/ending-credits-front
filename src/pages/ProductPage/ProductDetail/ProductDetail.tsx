import * as styled from "../styles"
import Header from "../../../layout/Header"
import ReactApexChart from "react-apexcharts"
import { useChartData } from "../hooks/useChartData";
// import { useParams } from "react-router-dom";
import BlueButton from "../../../ui/BlueBtn";

function ProductDetail() {
	// const { id } = useParams();
	const { chartData } = useChartData();

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

			<BlueButton>가입하기</BlueButton>
		</styled.Container>
	);
}

export default ProductDetail;
