import * as styled from "../styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_DATA } from "../constants";

// components
import Header from "../../../layout/Header";
import SearchBar from "../../../ui/SearchBar";
import Select from "../../../ui/Select";
import { Tab, Tabs } from "../../../ui/Tab";
import { message } from "antd";

// assets
import arrow from "../../../assets/icon/arrow.png";

// services
import { productService } from "../../../services/api/Product";
import { PensionSaving, Annuity } from "../../../services/dto/Product";

const AREA_CODES = ["은행(신탁)", "자산운용(펀드)", "생명보험", "손해보험"];
const page = 0;
const size = 50;
const sort = "asc";

function ProductSearch() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<typeof TAB_DATA[number]['id']>('연금저축');
	const [activeAreaCode, setActiveAreaCode] = useState<string>('1');
	const [dataNone, setDataNone] = useState<boolean>(false);
	const [searchKeyword, setSearchKeyword] = useState<string>('');
	const [productList, setProductList] = useState<PensionSaving[]|Annuity[]>();

	useEffect(() => {
		loadProducts();
	}, [activeTab, activeAreaCode]);

	const loadProducts = async () => {
		try {
			let response;
			if (activeTab === '퇴직연금') {
				response = await productService.getProductAnnuityAll(page.toString(), size.toString(), sort);
				if (response?.data) {
					setProductList(response.data.result.content);
					setDataNone(response.data.result.content.length === 0);
				}
			} else {
				response = await productService.getPensionSavings(activeAreaCode);
				if (response?.data) {
					setProductList(response.data.result);
					setDataNone(response.data.result.length === 0);
				}
			}
		} catch (error) {
			console.error(error);
			message.error('상품 목록 조회 실패');
		}
	};

	const handleSearch = async () => {
		try {
			let response;
			if (activeTab === '연금저축') {
				response = await productService.getPensionSavingsSearch(searchKeyword, activeAreaCode);
			} else {
				response = await productService.getProductAnnuitySearch(searchKeyword);
			}
			
			if (response?.data) {
				setProductList(response.data.result);
				setDataNone(response.data.result.length === 0);
			}
		} catch (error) {
			console.error(error);
			message.error('상품 검색 실패');
		}
	};

	const handleItemClick = (id: string) => {
		navigate(`/product/detail/${id}?activeType=${activeTab}`);
	};

	const handleTabSelect = (type: string) => {
		setActiveTab(type);
		setActiveAreaCode('1');
	};

	const handleAreaChange = (areaCode: string) => {
		const area = AREA_CODES.findIndex(area => area === areaCode);
		setActiveAreaCode((area + 1).toString());
	};

	const isPensionSaving = (product: PensionSaving | Annuity): product is PensionSaving => {
		return 'productName' in product;
	};

	return (
		<styled.Container>
			<Header title="상품 검색" onClose={() => navigate('/product')} />

			<SearchBar
				placeholder="상품을 검색해 보세요!"
				value={searchKeyword}
				onChange={(e) => setSearchKeyword(e.target.value)}
				onSearch={handleSearch}
			/>

			<Tabs>
				{TAB_DATA.map((tab, index) => (
					<Tab
						key={index}
						id={tab.id}
						label={tab.label}
						isActive={activeTab === tab.id}
						onClick={() => handleTabSelect(tab.id)}
					/>
				))}
			</Tabs>

			{activeTab === '연금저축' && <Select items={AREA_CODES} onSelect={handleAreaChange} />}

			<styled.ProductList>
				{dataNone && (
					<styled.ProductItem>
						<styled.ProductItemLeft>
							<styled.ProductInfo>
								<styled.ProductSubTitle>상품이 없습니다.</styled.ProductSubTitle>
							</styled.ProductInfo>
						</styled.ProductItemLeft>
					</styled.ProductItem>
				)}
				{productList?.map((product, index) => (
					<styled.ProductItem 
						key={index} 
						onClick={() => handleItemClick(isPensionSaving(product) ? product.productId : product.companyId)}
					>
						<styled.ProductItemLeft>
							<styled.ProductInfo>
								{activeTab === '연금저축' && (
									<styled.ProductSubTitle>{product.company}</styled.ProductSubTitle>
								)}
								<styled.ProductTitle>
									{isPensionSaving(product) ? product.productName : product.company}
								</styled.ProductTitle>
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