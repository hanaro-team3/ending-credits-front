import * as styled from "../styles";
import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { PensionSaving } from "../../../services/dto/Product";
import { productService } from "../../../services/api/Product";

import hana1 from "../../../assets/img/hana1.jpg";
import hana2 from "../../../assets/img/hana2.jpg";

const HanaProducts = () => {
	const [hanaProducts, setHanaProducts] = useState<PensionSaving[]>();
    const navigate = useNavigate();

    const fetchHanaProducts = useCallback(async () => {
		const images = [hana1, hana2];
		try {
			const response = await productService.getProductPensionSavingsDetailHana();
			if (response?.data) {
				setHanaProducts(response.data.result.slice(0, 2).map((item, index)=>({...item, image: images[index]})));
			}
		} catch (error) {
			console.error('Failed to fetch Hana products:', error);
			message.error('하나은행 상품 정보 조회에 실패했습니다.');
		}
	}, []);

    	// 초기 데이터 로드
	useEffect(() => {
		fetchHanaProducts();
	}, [fetchHanaProducts]);

    const handleItemClick = (id: string) => {
		
			navigate(`/product/detail/${id}?activeType=연금저축`);
		
	};
    
    return (
        <>
            <h3>하나은행 상품</h3>
            <styled.GridContainer>
                {hanaProducts?.map((product, index) => (
                    <styled.BackgroundItem key={index} style={{ backgroundImage: `url(${product.image})` }} onClick={() => handleItemClick(product.productId)}>
						<styled.GridItem key={index}>
						{product.productName}
						</styled.GridItem>
                    </styled.BackgroundItem>
                ))}
            </styled.GridContainer>
        </>
    );
}

export default HanaProducts;