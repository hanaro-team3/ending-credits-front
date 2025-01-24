import * as styled from "../styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { PensionSaving,Annuity } from "../../../services/dto/Product";

const TAB_DATA = [
	{ id: "연금저축", label: "연금저축" },
	{ id: "퇴직연금", label: "퇴직연금" }
] as const;

const AREA_CODES = ["은행(신탁)", "자산운용(펀드)", "생명보험", "손해보험"];

type ActiveTab = '연금저축' | '퇴직연금';

function ProductSearch() {
	const [activeTab, setActiveTab] = useState<ActiveTab>('연금저축');
	const [activeAreaCode, setActiveAreaCode] = useState<string>('1');
	const [dataNone, setDataNone] = useState<boolean>(false);
	const [searchKeyword, setSearchKeyword] = useState<string>('');

	const navigate = useNavigate();
	const searchParams = new URLSearchParams(window.location.search);
	const action = searchParams.get('action');
	const firstProduct = searchParams.get('firstProduct');
	const secondProduct = searchParams.get('secondProduct');
	const activeType = searchParams.get('activeType');

	const [productList, setProductList] = useState<PensionSaving[]|Annuity[]>();
	useEffect(()=>{
		async function getPensionSavings(){
			try{
				let response;
				if(activeTab === '퇴직연금'){
					response = await productService.getProductAnnuityAll()
				}else{
					response = await productService.getPensionSavings(activeAreaCode);
				}
				if(response?.data){
					setProductList(response.data.result);
					if(response.data.result.length === 0){
						setDataNone(true);
					}else{
						setDataNone(false);
					}
				}else{
					message.error('상품 목록 조회 실패');
				}
			}catch(error){
				console.error(error);
				message.error('상품 목록 조회 실패');
			}
		}
		getPensionSavings();
	}, [activeAreaCode, activeTab]);

	useEffect(() => {
		if (activeType) {
			setActiveTab(activeType as ActiveTab);
		}
	}, [activeType]);

	const handleItemClick = (id: string) => {
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
			navigate(`/product/detail/${id}?activeType=${activeTab}`);
		}
	};

	const handleSearch = async () => {
		try {
			let response;
			if(activeTab === '연금저축'){
				response = await productService.getPensionSavingsSearch(searchKeyword, activeAreaCode);
			} else {
				response = await productService.getProductAnnuitySearch(searchKeyword);
			}
			
			if(response?.data){
				setProductList(response.data.result);
				setDataNone(response.data.result.length === 0);
			} else {
				message.error('상품 검색 실패');
			}
		} catch(error) {
			console.error(error);
			message.error('상품 검색 실패');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);
	};

	const handleAreaChange = (areaCode: string) => {
		const area = AREA_CODES.findIndex(area => area === areaCode);
		setActiveAreaCode((area+1).toString());
	}
	return (
		<styled.Container>
			<Header title="상품 검색" />

			<SearchBar
				placeholder="상품을 검색해 보세요!"
				value={searchKeyword}
				onChange={handleInputChange}
				onSearch={handleSearch}
			/>

			{!activeType && (<Tabs>
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

			{activeTab === '연금저축' && <Select items={AREA_CODES} onSelect={handleAreaChange}/>}

			<styled.ProductList>
				{dataNone && <styled.ProductItem>
					<styled.ProductItemLeft>
						<styled.ProductInfo>
							<styled.ProductSubTitle>상품이 없습니다.</styled.ProductSubTitle>
						</styled.ProductInfo>
					</styled.ProductItemLeft>
				</styled.ProductItem>}
				{productList?.map((product, index) => (
					<styled.ProductItem key={index} onClick={() => handleItemClick(product.productId||product.companyId)}>
						<styled.ProductItemLeft>
							<styled.ProductInfo>
								{activeTab === '연금저축' && <styled.ProductSubTitle>{product.company}</styled.ProductSubTitle>}
								<styled.ProductTitle>{product.productName||product.company}</styled.ProductTitle>
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