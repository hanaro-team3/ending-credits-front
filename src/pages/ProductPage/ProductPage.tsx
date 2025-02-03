import * as styled from "./styles";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { COLOR_LIST, RECOMMEND_PRODUCTS, TAB_DATA } from "./constants";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

//components
import Header from "../../layout/Header";
import SearchBar from "../../ui/SearchBar";
import BlueButton from "../../ui/BlueBtn"
import WhiteButton from "../../ui/WhiteBtn"
import { Tabs, Tab } from "../../ui/Tab"
import { message } from "antd";
import HanaProducts from "./components/HanaProducts";

//services
import { productService } from "../../services/api/Product";
import { PensionSaving, Recommend, Annuity } from "../../services/dto/Product";

// assets
import arrow from "../../assets/icon/arrow.png";

const INITIAL_PAGE_SIZE = 8;
const INITIAL_SORT = "asc";

function ProductPage() {
	// 상태 관리
	const [activeIndex, setActiveIndex] = useState(0);
	const [recommendProducts, setRecommendProducts] = useState<Recommend[]>();
	const [allPensionProducts, setAllPensionProducts] = useState<PensionSaving[]>();
	const [allAnnuityProducts, setAllAnnuityProducts] = useState<Annuity[]>();
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<typeof TAB_DATA[number]['id']>('연금저축');

	// refs
	const carouselRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	
	const navigate = useNavigate();

	// API 호출 함수들
	const fetchRecommendProducts = useCallback(async () => {
		try {
			const response = await productService.getRecommend();
			if (response?.data) {
				setRecommendProducts(response.data.result);
			}
		} catch (error) {
			console.error('Failed to fetch recommend products:', error);
			message.error('상품 추천 정보 조회에 실패했습니다.');
		}
	}, []);

	const loadMoreProducts = useCallback(async () => {
		if (loading || !hasMore) return;
		
		try {
			setLoading(true);
			const nextPage = (page + 1).toString();
			const size = INITIAL_PAGE_SIZE.toString();
			
			const response = await (activeTab === '연금저축' 
				? productService.getPensionSavingsAll(nextPage, size, INITIAL_SORT)
				: productService.getProductAnnuityAll(nextPage, size, INITIAL_SORT));

			if (response?.data) {
				const newProducts = response.data.result.content;
				if (activeTab === '연금저축') {
					const newPensionProducts = newProducts as PensionSaving[];
					setAllPensionProducts((prev) => 
						prev ? [...prev, ...newPensionProducts] : newPensionProducts
					);
				} else {
					const newAnnuityProducts = newProducts as Annuity[];
					setAllAnnuityProducts((prev) => 
						prev ? [...prev, ...newAnnuityProducts] : newAnnuityProducts
					);
				}
				setPage(prev => prev + 1);
				setHasMore(newProducts.length === INITIAL_PAGE_SIZE);
			}
		} catch (error) {
			console.error('Failed to fetch products:', error);
			message.error('상품 정보 조회에 실패했습니다.');
		} finally {
			setLoading(false);
		}
	}, [page, loading, hasMore, activeTab]);

	// Infinite Scroll
	const targetRef = useInfiniteScroll({
		threshold: 0.5,
		onIntersect: loadMoreProducts
	});

	// Carousel Observer 설정
	useEffect(() => {
		if (!recommendProducts?.length) return;
		
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

		const cards = document.querySelectorAll('.product-card');
		cards.forEach((card) => {
			observerRef.current?.observe(card);
		});

		return () => {
			observerRef.current?.disconnect();
		};
	}, [recommendProducts]);

	const handleTabClick = (tabId: string) => {
		setActiveTab(tabId);
		setPage(0);
		setHasMore(true);
		setAllPensionProducts([]);
		setAllAnnuityProducts([]);
	};

	const handleItemClick = (id: string) => {
		navigate(`/product/detail/${id}?activeType=${activeTab}`);
	};

	// 초기 데이터 로드
	useEffect(() => {
		fetchRecommendProducts();
	}, [fetchRecommendProducts]);

	useEffect(() => {
		// 메인 상품 페이지에 진입할 때 비교 관련 데이터 모두 정리
		localStorage.removeItem('compareFirstProduct');
		localStorage.removeItem('compareSecondProduct');
		localStorage.removeItem('compareSelectMode');
		localStorage.removeItem('compareActiveTab');
	}, []);

	// 렌더링 컴포넌트들
	const renderRecommendSection = () => (
		<>
			<styled.TitleContainer style={{ alignItems: 'center' }}>
				<styled.Title>이런 상품은 어떠세요?</styled.Title>
				<styled.Title>{localStorage.getItem("name")}님을 위한 맞춤 상품 추천</styled.Title>
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
						<p>{RECOMMEND_PRODUCTS.find((item) => item.strategyType === product.strategyType)?.title}</p>
						<WhiteButton 
							style={{ width: '100%' }}
							onClick={() => navigate(`/product/detail/${product.productId}`)}
						>
							상품 알아보기
						</WhiteButton>
					</styled.ProductCard>
				))}
			</styled.ProductCarousel>
		</>
	);

	const isPensionSaving = (product: PensionSaving | Annuity): product is PensionSaving => {
		return 'productName' in product;
	};

	const renderProductList = () => {
		const products = activeTab === '연금저축' ? allPensionProducts : allAnnuityProducts;
		return (
			<styled.ProductList>
				{products?.map((product, index) => (
					<styled.ProductItem key={index} onClick={() => handleItemClick(isPensionSaving(product) ? product.productId : product.companyId)}>
						<styled.ProductItemLeft>
						<styled.ProductInfo>
								<styled.ProductSubTitle>{isPensionSaving(product) ? product.company : "IRPㆍDCㆍDB"}</styled.ProductSubTitle>
								<styled.ProductTitle>{isPensionSaving(product) ? product.productName : product.company}</styled.ProductTitle>
							</styled.ProductInfo>
						
						</styled.ProductItemLeft>
						<img src={arrow} alt="arrow" />
					</styled.ProductItem>
				))}
				<div ref={targetRef} style={{ height: '10px' }} />
				{loading && <div>로딩 중...</div>}
			</styled.ProductList>
		);
	};

	return (
		<styled.Container>
			<Header title="상품 목록" onClose={()=>navigate("/asset")} />
			<div onClick={() => navigate('/product/search')}>
				<SearchBar placeholder="상품을 검색해 보세요!" />
			</div>
			
			{renderRecommendSection()}

			<styled.ButtonContainer>
				<BlueButton onClick={() => navigate('/product/compare')}>
					상품 비교하기
				</BlueButton>
			</styled.ButtonContainer>

			<HanaProducts />

			<h3>전체 상품</h3> 
			<Tabs>
				{TAB_DATA.map((tab, index) => (
					<Tab
						key={index}
						id={tab.id}
						label={tab.label}
						isActive={activeTab === tab.id}
						onClick={() => handleTabClick(tab.id)}
					/>
				))}
			</Tabs>
			
			{renderProductList()}
		</styled.Container>
	);
}

export default ProductPage;