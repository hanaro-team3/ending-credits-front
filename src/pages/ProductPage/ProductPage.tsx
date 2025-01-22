import * as styled from "./styles";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//component
import Header from "../../layout/Header";
import SearchBar from "../../ui/SearchBar";
import BlueButton from "../../ui/BlueBtn"
import WhiteButton from "../../ui/WhiteBtn"

const RECOMMEND_PRODUCTS = [
	{
		color: "#C4F1D9",
		title: "공격적인 투자를\n좋아한다면?",
	},
	{
		color: "#D6DEFF",
		title: "안정적인 투자를\n좋아한다면?",
	},
	{
		color: "#C1F3FE",
		title: "보수적인 투자를\n좋아한다면?",
	},
	{
		color: "#C4F1D9",
		title: "짧고 강력한 투자를\n좋아한다면?",
	}
];

function ProductPage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const navigate = useNavigate();
	useEffect(() => {
		// Intersection Observer 설정
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = Number(entry.target.getAttribute('data-index'));
						setActiveIndex(index);
					}
				});
			},
			{
				root: carouselRef.current,
				threshold: 0.6,  // 60% 이상 보일 때 활성화
				rootMargin: '0px'
			}
		);

		// 각 카드에 observer 연결
		const cards = document.querySelectorAll('.product-card');
		cards.forEach((card) => {
			if (observerRef.current) {
				observerRef.current.observe(card);
			}
		});

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	return (
		<styled.Container>
			<Header title="상품 목록" />
			<div onClick={() => navigate('/product/search')}>
				<SearchBar placeholder="상품을 검색해 보세요!" />
			</div>
			<styled.TitleContainer style={{alignItems: 'center'}}>
				<styled.Title>이런 상품은 어떠세요?</styled.Title>
				<styled.Title>홍길동님을 위한 맞춤 상품 추천</styled.Title>
			</styled.TitleContainer>
			<styled.ProductCarousel ref={carouselRef}>
				{RECOMMEND_PRODUCTS.map((product, index) => (
					<styled.ProductCard 
						key={index}
						className="product-card"
						data-index={index}
						$active={index === activeIndex}
						style={{ backgroundColor: product.color }}
						onClick={() => navigate(`/product/detail/0`)}
					>
						<p>{product.title}</p>
						<WhiteButton style={{width: '100%'}}>상품 알아보기</WhiteButton>
					</styled.ProductCard>
				))}
			</styled.ProductCarousel>

			<styled.ButtonContainer>
				<BlueButton onClick={() => navigate('/product/compare')}>
					상품 비교하기
				</BlueButton>
			</styled.ButtonContainer>

			<h3>하나은행 상품</h3>
			<styled.GridContainer>
				{["하나은행 상품1", "하나은행 상품2"].map((name, index) => (
					<styled.GridItem key={index}>
						{name}
					</styled.GridItem>
				))}
			</styled.GridContainer>

			<h3>전체 상품</h3>
			<styled.GridContainer>
				{["상품1", "상품2", "상품3", "상품4", "상품5", "상품6", "상품7", "상품8"].map((name, index) => (
					<styled.GridItem key={index}>
						{name}
					</styled.GridItem>
				))}
			</styled.GridContainer>
		</styled.Container>
	);
}

export default ProductPage;