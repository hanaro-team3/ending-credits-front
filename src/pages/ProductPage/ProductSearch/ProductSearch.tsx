import * as styled from "../styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../layout/Header";
import SearchBar from "../../../ui/SearchBar";
import Select from "../../../ui/Select";
import { Tab, Tabs } from "../../../ui/Tab";

// assets
import img from "../../../assets/icon/plant.png";
import arrow from "../../../assets/icon/arrow.png";

const TAB_DATA = [
	{ id: "연금저축", label: "연금저축" },
	{ id: "퇴직연금", label: "퇴직연금" }
] as const;

const PRODUCT_LIST = [
	{
		id: 1,
		bank: "하나은행",
		title: "연금저축신탁 안정형 제1호",
	},
	{
		id: 2,
		bank: "KB국민은행",
		title: "연금저축신탁 안정형 제2호",
	},
	{
		id: 3,
		bank: "신한은행",
		title: "연금저축신탁 안정형 제3호",
	},
	{
		id: 4,
		bank: "우리은행",
		title: "연금저축신탁 안정형 제4호",
		image: img
	}
];

type ActiveTab = '연금저축' | '퇴직연금';

function ProductSearch() {
	const [activeTab, setActiveTab] = useState<ActiveTab>('연금저축');
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(window.location.search);
	const action = searchParams.get('action');
	const firstProduct = searchParams.get('firstProduct');
	const secondProduct = searchParams.get('secondProduct');
	const activeType = searchParams.get('activeType');

	useEffect(() => {
		if (activeType) {
			setActiveTab(activeType as ActiveTab);
		}
	}, [activeType]);

	const handleItemClick = (id: number) => {
		if (action === 'selectFirstProduct') {
			// secondProduct가 이미 선택되어 있다면 유지
			let query = `activeType=${activeTab}&firstProduct=${id}`;
			if (secondProduct) {
				query += `&secondProduct=${secondProduct}`;
			}
			navigate(`/product/compare?${query}`);
		} else if (action === 'selectSecondProduct') {
			// firstProduct가 이미 선택되어 있다면 유지
			let query = `activeType=${activeTab}&secondProduct=${id}`;
			if (firstProduct) {
				query += `&firstProduct=${firstProduct}`;
			}
			navigate(`/product/compare?${query}`);
		} else {
			navigate(`/product/detail/${id}`);
		}
	};

	return (
		<styled.Container>
			<Header title="상품 검색" />

			<SearchBar
				placeholder="상품을 검색해 보세요!"
			/>

			{!activeType && (<Tabs>
				{TAB_DATA.map((tab) => (
					<Tab
						id={tab.id}
						label={tab.label}
						isActive={activeTab === tab.id}
						onClick={() => setActiveTab(tab.id)}
					/>
				))}
			</Tabs>)}

			{activeTab === '연금저축' && <Select items={['은행(신탁)', '자산운용(펀드)', '생명보험', '손해보험']} />}

			<styled.ProductList>
				{PRODUCT_LIST.map((product) => (
					<styled.ProductItem key={product.id} onClick={() => handleItemClick(product.id)}>
						<styled.ProductItemLeft>
							<styled.ProductInfo>
								<styled.ProductSubTitle>{product.bank}</styled.ProductSubTitle>
								<styled.ProductTitle>{product.title}</styled.ProductTitle>
							</styled.ProductInfo>
						</styled.ProductItemLeft>
						<img src={arrow} alt="arrow" />
					</styled.ProductItem>
				))}
			</styled.ProductList>
		</styled.Container>
	);
}

export default ProductSearch;