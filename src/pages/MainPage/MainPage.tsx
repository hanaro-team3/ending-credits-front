import * as styled from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// assets
import logoInline from "../../assets/logo/logoInline.svg";
import moneyBag from "../../assets/icon/moneyBag.png";
import book from "../../assets/icon/book.png";
import plant from "../../assets/icon/plant.png";
import dove from "../../assets/icon/dove.png";
import coin from "../../assets/icon/coin.png";
import pen from "../../assets/icon/pen.png";

// components
import Navbar from "../../layout/Navbar";
import SearchBar from "../../ui/SearchBar";
import AssetChart from "../AssetPage/components/AssetChart";

//services
import { willService } from "../../services/api/Will";
import { memberService } from "../../services/api/Member";

const StatusSection = () => {
	const [hasWill, setHasWill] = useState(false);
	const [shareAt, setShareAt] = useState("");
	const [name, setName] = useState("");
	const navigate = useNavigate();

	const getShareAt = (shareAt: number | null) => {
		switch (shareAt) {
			case 0:
				return "일상 시";
			case 1:
				return "병환 중";
			case 2:
				return "사망 후";
			default:
				return null;
		}
	};

	useEffect(() => {
		if(!localStorage.getItem("accessToken")) {
			navigate("/onboarding");
		}
		
		const storedName = localStorage.getItem("name");
		if (storedName) {
			setName(storedName);
		}

		willService.getWillFile().then((response) => {
			if (response?.data?.code == "COMMON200") {
				setHasWill(true);
				setShareAt(getShareAt(response?.data.result.shareAt) || "");
			}
		});
	}, []);

	return (
		<styled.Section>
			<styled.Title>{name}님의 상속 설계 현황</styled.Title>
			<styled.StatusCard
				onClick={() => {
					navigate("/inheritance");
				}}
			>
				{hasWill ? (
					<>
						<styled.StatusContent>
							<styled.StatusTitle>작성완료</styled.StatusTitle>
							<styled.StatusDescription>
								<span className="highlight">{shareAt}</span>
								유언집행자에 의해
								<br />
								해당 유언장이 공유됩니다.
							</styled.StatusDescription>
						</styled.StatusContent>
						<img src={dove} alt="Dove" width="100" height="100" />
					</>
				) : (
					<>
						<styled.StatusContent>
							<styled.StatusTitle>미작성</styled.StatusTitle>
							<styled.StatusDescription>
								음성, 클릭, 자필로 <br />
								간편하게 상속을 준비하세요.
							</styled.StatusDescription>
						</styled.StatusContent>
						<img src={pen} alt="Pen" width="100" height="100" />
					</>
				)}
			</styled.StatusCard>
		</styled.Section>
	);
};

const AssetSection = () => {
	const navigate = useNavigate();
	const [hasAssets, setHasAssets] = useState(false);

	useEffect(() => {
		memberService.getMemberConnected().then((response) => {
			setHasAssets(response.data.result);
		});
	}, []);

	return (
		<styled.AssetSection>
			<styled.Title>자산 한눈에 보기</styled.Title>
			{hasAssets ? (
				<styled.AssetCard
					onClick={() => {
						navigate("/asset");
					}}
				>
					<AssetChart />
				</styled.AssetCard>
			) : (
				<styled.StatusCard
					onClick={() => {
						navigate("/asset");
					}}
				>
					<styled.StatusContent>
						<styled.StatusTitle>자산 미연결</styled.StatusTitle>
						<styled.StatusDescription>
							1분 내로 자산을 연결하고 <br />
							상품 추천을 받아보세요.
						</styled.StatusDescription>
					</styled.StatusContent>
					<img src={coin} alt="Coin" width="100" height="100" />
				</styled.StatusCard>
			)}
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
