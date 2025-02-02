import * as styled from "../styles";
import { useNavigate } from "react-router-dom";
import BlueButton from "../../../ui/BlueBtn";
import plus from "../../../assets/icon/plus.png"
import {PensionSavingComparison, Annuity} from "../../../services/dto/Product"

interface ProductSelectorProps {
    product?: PensionSavingComparison | Annuity;
    onClick: () => void;
}

function ProductSelector({ product, onClick }: ProductSelectorProps) {
    const navigate = useNavigate()
    return (
        <styled.CompareItem>
            {!product ? (
                <styled.CompareButtonContainer>
                    <styled.CompareButton onClick={onClick}>
                        <img src={plus} alt="plus" />
                    </styled.CompareButton>
                    <styled.CompareButtonText>상품을 선택해주세요.</styled.CompareButtonText>
                </styled.CompareButtonContainer>
            ) : (
                <>
                    <styled.ProductSubTitle>{product.company}</styled.ProductSubTitle>
                    <p style={{ width: "100%", wordBreak: "keep-all", overflowWrap: "break-word", height: "70px" }}>
                        {'product' in product ? product.product : product.company}
                    </p>
                    <BlueButton variant="small" style={{ width: "100px" }} onClick={() => navigate(`/product/detail/${product?.productId || product?.companyId}`)}>
                        상품 상세
                    </BlueButton>
                </>
            )}
        </styled.CompareItem>
    );
}

export default ProductSelector;
