import * as styled from "../styles";
import { useState } from "react";

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
		image: img,
	},
	{
		id: 2,
		bank: "KB국민은행",
		title: "연금저축신탁 안정형 제2호",
		image: img,
	},
	{
		id: 3,
		bank: "신한은행",
		title: "연금저축신탁 안정형 제3호",
		image: img,
	},
	{
		id: 4,
		bank: "우리은행",
		title: "연금저축신탁 안정형 제4호",
		image: img
	}
];

function ProductSearch() {
	const [activeTab, setActiveTab] = useState<'연금저축' | '퇴직연금'>('연금저축');
	// const [searchTerm, setSearchTerm] = useState('');

	// const filteredProducts = PRODUCT_LIST.filter(product => 
	// 	product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 	product.bank.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	return (
		<styled.Container>
			<Header title="상품 검색" />
			
			<SearchBar 
				placeholder="상품을 검색해 보세요!"
			/>

			<Tabs>
				{TAB_DATA.map((tab) => (
					<Tab 
						id={tab.id}
						label={tab.label} 
						isActive={activeTab === tab.id} 
						onClick={() => setActiveTab(tab.id)}
					/>
				))}
			</Tabs>
			
			{activeTab === '연금저축' && <Select items={['은행(신탁)', '자산운용(펀드)', '생명보험', '손해보험']} />}

			<styled.ProductList>
				{PRODUCT_LIST.map((product) => (
					<styled.ProductItem key={product.id}>
						<styled.ProductItemLeft>
							<styled.ProductImage 
								src={product.image} 
								alt={product.title} 
							/>
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