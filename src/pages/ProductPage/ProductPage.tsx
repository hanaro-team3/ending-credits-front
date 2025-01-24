import * as styled from "./styles";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//component
import Header from "../../layout/Header";
import SearchBar from "../../ui/SearchBar";
import BlueButton from "../../ui/BlueBtn"
import WhiteButton from "../../ui/WhiteBtn"
import { message } from "antd";

//services
import { productService } from "../../services/api/Product";
import { PensionSaving, Recommend } from "../../services/dto/Product";

const COLOR_LIST = ["#C4F1D9", "#D6DEFF", "#C1F3FE"];

const RECOMMEND_PRODUCTS = [
	{
		title: "공격적인 투자를\n좋아한다면?",
		strategyType: "공격적"
	},
	{
		title: "안정적인 투자를\n좋아한다면?",
		strategyType: "안정적"
	},
	{
		title: "짧고 강력한 투자를\n좋아한다면?",
		strategyType: "단기"
	},
	{
		title: "길고 안정적인 투자를\n좋아한다면?",
		strategyType: "장기"
	},
	{
		title: "적은 금액으로 투자를\n좋아한다면?",
		strategyType: "저비용"
	},
	{
		title: "공격적인 투자를\n좋아한다면?",
		strategyType: "공격적"
	},
	{
		title: "안정적인 투자를\n좋아한다면?",
		strategyType: "수익 안정성"
	},
	{
		title: "위험을 감수하는 투자를\n좋아한다면?",
		strategyType: "위험 감수형"
	},
];

function ProductPage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [recommendProducts, setRecommendProducts] = useState<Recommend[]>();
	const [hanaProducts, setHanaProducts] = useState<PensionSaving[]>();
	const [allProducts, setAllProducts] = useState<PensionSaving[]>();

	const carouselRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		getProductRecommend();
		getProductHana();
		getProductAll();
	}, [])

	async function getProductRecommend() {
		try {
			const response = await productService.getRecommend();
			if (response?.data) {
				setRecommendProducts(response.data.result);
			}
		} catch (error) {
			console.error('Failed to fetch:', error);
			message.error('상품 정보 조회에 실패했습니다.');
		}
	}

	async function getProductHana() {
		try {
			const response = await productService.getProductPensionSavingsDetailHana();

			if (response?.data) {
				setHanaProducts(response.data.result);
			}
		} catch (error) {
			console.error('Failed to fetch:', error);
			message.error('상품 정보 조회에 실패했습니다.');
		}
	}

	async function getProductAll() {
		try {
			const response = await productService.getPensionSavingsAll();

			if (response?.data) {
				setAllProducts(response.data.result);
			}
		} catch (error) {
			console.error('Failed to fetch:', error);
			message.error('상품 정보 조회에 실패했습니다.');
		}
	}


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
			<styled.TitleContainer style={{ alignItems: 'center' }}>
				<styled.Title>이런 상품은 어떠세요?</styled.Title>
				<styled.Title>홍길동님을 위한 맞춤 상품 추천</styled.Title>
			</styled.TitleContainer>
			<styled.ProductCarousel ref={carouselRef}>
				{recommendProducts?.map((product, index) => (
					<styled.ProductCard
						key={index}
						className="product-card"
						data-index={index}
						$active={index === activeIndex}
						style={{ backgroundColor: COLOR_LIST[index % COLOR_LIST.length] }}
					>
						<p>{RECOMMEND_PRODUCTS.find((item)=>item.strategyType===product.strategyType)?.title}</p>
						<WhiteButton style={{ width: '100%' }}
							onClick={() => navigate(`/product/detail/${product.productId}`)}
						>상품 알아보기</WhiteButton>
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
				{hanaProducts?.map((product, index) => (
					<styled.GridItem key={index}>
						{product.productName}
					</styled.GridItem>
				))}
			</styled.GridContainer>

			<h3>전체 상품</h3>
			<styled.GridContainer>
				{allProducts?.map((product, index) => (
					<styled.GridItem key={index}>
						{product.productName}
					</styled.GridItem>
				))}
			</styled.GridContainer>
		</styled.Container>
	);
}

export default ProductPage;