import * as styled from "./styles";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { COLOR_LIST, RECOMMEND_PRODUCTS } from "./constants";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

//components
import Header from "../../layout/Header";
import SearchBar from "../../ui/SearchBar";
import BlueButton from "../../ui/BlueBtn"
import WhiteButton from "../../ui/WhiteBtn"
import { Tabs, Tab } from "../../ui/Tab"
import { message } from "antd";

//services
import { productService } from "../../services/api/Product";
import { PensionSaving, Recommend, Annuity } from "../../services/dto/Product";

function ProductPage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [recommendProducts, setRecommendProducts] = useState<Recommend[]>();
	const [hanaProducts, setHanaProducts] = useState<PensionSaving[]>();
	const [allPensionProducts, setAllPensionProducts] = useState<PensionSaving[]>();
	const [allAnnuityProducts, setAllAnnuityProducts] = useState<Annuity[]>();
	const [page, setPage] = useState(0);
	const [size] = useState(8);
	const [sort] = useState("asc");
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState('연금저축');


	const carouselRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const navigate = useNavigate();

	const TAB_DATA = [
		{ id: "연금저축", label: "연금저축" },
		{ id: "퇴직연금", label: "퇴직연금" }
	] as const;

	useEffect(() => {
		getProductRecommend();
		getProductHana();
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

	const loadMoreProducts = useCallback(async () => {
		if (loading || !hasMore) return;
		
		try {
		  setLoading(true);
		  let response;

		  if(activeTab=='연금저축'){
			response = await productService.getPensionSavingsAll(
				(page + 1).toString(), 
				size.toString(), 
				sort
			  );
	
		  if (response?.data) {
			const newProducts = response.data.result.content;
			setAllPensionProducts(prev => prev ? [...prev, ...newProducts] : newProducts);
			setPage(prev => prev + 1);
			setHasMore(newProducts.length === size);
		  }
		  }else{
			response = await productService.getProductAnnuityAll(
				(page + 1).toString(), 
				size.toString(), 
				sort
			  );
	
		  if (response?.data) {
			const newProducts = response.data.result.content;
			setAllAnnuityProducts(prev => prev ? [...prev, ...newProducts] : newProducts);
			setPage(prev => prev + 1);
			setHasMore(newProducts.length === size);
		  }
		  }

		   
		} catch (error) {
		  console.error('Failed to fetch:', error);
		  message.error('상품 정보 조회에 실패했습니다.');
		} finally {
		  setLoading(false);
		}
	  }, [page, size, sort, loading, hasMore, activeTab]);

	  const targetRef = useInfiniteScroll({
		threshold: 0.5,
		onIntersect: loadMoreProducts
	  });


	useEffect(() => {
		if (!recommendProducts?.length) return; // 상품이 없으면 실행하지 않음
		
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
				threshold: 0.6,
				rootMargin: '-20px 0px'
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
	}, [recommendProducts]);

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
			{(<Tabs>
				{TAB_DATA.map((tab, index) => (
					<Tab
						key={index}
						id={tab.id}
						label={tab.label}
						isActive={activeTab === tab.id}
						onClick={() => setActiveTab(tab.id)}
					/>
				))}
			</Tabs>)}
			<styled.GridContainer>
				
				{activeTab=='연금저축'? allPensionProducts?.map((product, index) => (
					<styled.GridItem key={index}>
						{product.productName}
					</styled.GridItem>
				)): allAnnuityProducts?.map((product, index) => (
					<styled.GridItem key={index}>
						{product.company}
					</styled.GridItem>
				))}
				 <div ref={targetRef} style={{ height: '10px' }} />
				 {loading && <div>로딩 중...</div>}
			</styled.GridContainer>
		</styled.Container>
	);
}

export default ProductPage;