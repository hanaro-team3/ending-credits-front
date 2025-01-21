import * as styled from "../styles";
import Header from "../../../layout/Header";
import plus from "../../../assets/icon/plus.png";
import Select from "../../../ui/Select";

function ProductComparePage() {
    return (
        <styled.Container>
            <Header title="상품 비교" />
            <styled.TitleContainer>
                <styled.Title>상품 선택 후 비교할 수 있어요.</styled.Title>
                <styled.SubTitle>아래 상자를 터치하여 비교할 상품을 선택해주세요.</styled.SubTitle>
            </styled.TitleContainer>
            <Select items={["연금저축", "퇴직연금"]} />
            <styled.CompareContainer>
                <styled.CompareItem style={{borderRight:"1px solid #b8b8b8"}}>
                    <div>
                        <img src={plus} alt="plus"/>
                    </div>
                    <span>상품을 선택해주세요.</span>
                </styled.CompareItem>
                <styled.CompareItem>
                    <div>
                        <img src={plus} alt="plus"/>
                    </div>
                    <span>상품을 선택해주세요.</span>
                </styled.CompareItem>
            </styled.CompareContainer>

            <h3>추천 상품</h3>
				<styled.GridContainer>
					{["추천 상품1", "추천 상품2"].map((name, index) => (
						<styled.GridItem key={index}>
							{name}
						</styled.GridItem>
					))}
                </styled.GridContainer>

        </styled.Container>
    );
}

export default ProductComparePage;

