import ReactApexChart from "react-apexcharts";
import * as styled from "./styles";
import { useChartData } from "./hooks/useChartData";
import { Link, useNavigate } from "react-router-dom";

// assets
import logoInline from "../../assets/logo/logoInline.svg";
import moneyBag from "../../assets/icon/moneyBag.png";
import book from "../../assets/icon/book.png";
import plant from "../../assets/icon/plant.png";
import dove from "../../assets/icon/dove.png";

// components
import Navbar from "../../layout/Navbar";
import SearchBar from "../../ui/SearchBar";

const StatusSection = () => (
	<styled.Section>
		<styled.Title>홍길동님의 유언 및 상속 현황</styled.Title>
		<styled.StatusCard>
			<styled.StatusContent>
				<styled.StatusTitle>작성완료</styled.StatusTitle>
				<styled.StatusDescription>
					<span className="highlight">사망 후</span>유언집행자에 의해
					<br />
					해당 유언장이 공유됩니다.
				</styled.StatusDescription>
			</styled.StatusContent>
			<img src={dove} alt="Dove" width="100" height="100" />
		</styled.StatusCard>
	</styled.Section>
);

const AssetSection = () => {
	const { chartData } = useChartData();
	const navigate = useNavigate();

	return (
		<styled.AssetSection>
			<styled.Title>자산 한눈에 보기</styled.Title>
			<styled.AssetCard>
				<ReactApexChart
					options={chartData.options}
					series={chartData.series}
					type="pie"
				/>
				<styled.AssetButton
					onClick={() => {
						navigate("/asset");
					}}
				>
					상세보기
				</styled.AssetButton>
			</styled.AssetCard>
		</styled.AssetSection>
	);
};

const CarouselSection = () => (
	<styled.Carousel>
		{[
			{
				color: "#FFD998",
				title: "장례절차는 어떻게 이루어지나요?",
				category: "장례식",
			},
			{
				color: "#98B2FF",
				title: "공증 수수료는 어떻게 되나요?",
				category: "상속유언",
			},
			{
				color: "#FF989A",
				title: "장례절차는 어떻게 이루어지나요?",
				category: "장례식",
			},
		].map((item, index) => (
			<styled.CarouselItem key={index} $bgColor={item.color}>
				<styled.CarouselDescription>
					{item.category}
				</styled.CarouselDescription>
				<styled.CarouselTitle>{item.title}</styled.CarouselTitle>
			</styled.CarouselItem>
		))}
	</styled.Carousel>
);

const GuideSection = () => {
	const navigate = useNavigate();
	return (
		<styled.GuideContainer>
			<styled.GuideCard
				onClick={() =>
					navigate("/guide", { state: { fromMain: true } })
				}
			>
				<styled.GuideTitle>작성가이드</styled.GuideTitle>
				<styled.GuideDescription>
					사용법이 헷갈리지 않으세요?
				</styled.GuideDescription>
				<styled.GuideIcon src={book} width={30} alt="작성가이드" />
			</styled.GuideCard>
			<styled.GuideCard onClick={() => navigate("/product")}>
				<styled.GuideTitle>맞춤형 상품 추천</styled.GuideTitle>
				<styled.GuideDescription>
					퇴직 연금 운용을 도와드릴게요.
				</styled.GuideDescription>
				<styled.GuideIcon src={plant} width={30} alt="상품 추천" />
			</styled.GuideCard>
		</styled.GuideContainer>
	);
};

const BannerSection = () => {
	const navigate = useNavigate();
	return (
		<styled.Banner onClick={() => navigate("/inheritance")}>
			<img src={moneyBag} alt="배너" />
			<styled.BannerContent>
				<styled.BannerDescription>
					미리 준비하는 나만의 상속 설계
				</styled.BannerDescription>
				<styled.BannerTitle>
					미리 준비하는 나만의 상속 설계
				</styled.BannerTitle>
			</styled.BannerContent>
		</styled.Banner>
	);
};

function MainPage() {
	return (
		<styled.Container>
			<Link to="/login">
				<styled.Logo src={logoInline} alt="Main Logo" />
			</Link>
			<StatusSection />
			<AssetSection />

			<styled.EndingCreditSection>
				<styled.Title>엔딩 크레딧이 궁금하다면?</styled.Title>
				<SearchBar />
				<CarouselSection />
				<BannerSection />
				<GuideSection />
			</styled.EndingCreditSection>

			<Navbar />
		</styled.Container>
	);
}

export default MainPage;
