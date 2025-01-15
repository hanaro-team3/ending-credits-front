import ReactApexChart from "react-apexcharts";
import * as styled from "./styles";
import { useChartData } from "./hooks/useChartData";
import logoInline from "../../assets/logo/logoInline.svg";
import moneyBag from "../../assets/icon/moneyBag.png";
import book from "../../assets/icon/book.png";
import plant from "../../assets/icon/plant.png";
import search from "../../assets/icon/search.png";
import dove from "../../assets/icon/dove.png";
import Navbar from "../../layout/Navbar";

const StatusSection = () => (
	<styled.Section>
		<styled.Title>홍길동님의 유언 및 상속 현황</styled.Title>
		<styled.StatusCard>
			<styled.StatusContent>
				<styled.StatusTitle>작성완료</styled.StatusTitle>
				<styled.StatusDescription>
					<span className="highlight">사망 후</span>공유대상자에 의해
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

	return (
		<styled.AssetSection>
			<styled.Title>자산 한눈에 보기</styled.Title>
			<styled.AssetCard>
				<ReactApexChart
					options={chartData.options}
					series={chartData.series}
					type="pie"
				/>
				<styled.AssetButton>상세보기</styled.AssetButton>
			</styled.AssetCard>
		</styled.AssetSection>
	);
};

const SearchBar = () => (
	<styled.SearchBarWrapper>
		<styled.SearchBar placeholder="궁금한 내용을 검색해 보세요!" />
		<styled.SearchIcon
			src={search}
			alt="검색"
			onClick={() => console.log("검색 실행")}
		/>
	</styled.SearchBarWrapper>
);

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

const GuideSection = () => (
	<styled.GuideContainer>
		<styled.GuideCard>
			<styled.GuideTitle>작성가이드</styled.GuideTitle>
			<styled.GuideDescription>
				사용법이 헷갈리지 않으세요?
			</styled.GuideDescription>
			<styled.GuideIcon src={book} width={30} alt="작성가이드" />
		</styled.GuideCard>
		<styled.GuideCard>
			<styled.GuideTitle>맞춤형 상품 추천</styled.GuideTitle>
			<styled.GuideDescription>
				퇴직 연금 운용을 도와드릴게요.
			</styled.GuideDescription>
			<styled.GuideIcon src={plant} width={30} alt="상품 추천" />
		</styled.GuideCard>
	</styled.GuideContainer>
);

const BannerSection = () => (
	<styled.Banner>
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

function MainPage() {
	return (
		<styled.Container>
			<styled.Logo src={logoInline} alt="Main Logo" />
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
