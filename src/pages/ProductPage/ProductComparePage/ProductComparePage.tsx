import * as styled from "../styles";
import plus from "../../../assets/icon/plus.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//components
import Header from "../../../layout/Header";
import Select from "../../../ui/Select";
import BlueButton from "../../../ui/BlueBtn";


// 상품 타입 정의
interface Product {
    area: string;
    company: string;
    product: string;
    productType: string;
    rcvMethod: string;
    feeType: string;
    sells: string;
    withdraws: string;
    guarantees: string;
    currentBalance: string;
    previousYearBalance: string;
    twoYearsAgoBalance: string;
    threeYearsAgoBalance: string;
    currentReserve: string;
    previousYearReserve: string;
    twoYearsAgoReserve: string;
    threeYearsAgoReserve: string;
    currentEarnRate: number;
    previousYearEarnRate: number;
    twoYearsAgoEarnRate: number;
    threeYearsAgoEarnRate: number;
    previousYearFeeRate: number;
    twoYearsAgoFeeRate: number;
    threeYearsAgoFeeRate: number;
}
interface ProductData {
    Balance: string;
    Reserve: string;
    EarnRate: string;
    FeeRate: string;
}

// Mock 데이터
const PRODUCT_LIST: Product[] = [
    {
        area: "은행",
        company: "신한은행",
        product: "연금저축신탁 안정형 제1호",
        productType: "안정형",
        rcvMethod: "연금 수령시 선택형",
        feeType: "증가형",
        sells: "중단",
        withdraws: "가능",
        guarantees: "보장",
        currentBalance: "850,279",
        previousYearBalance: "950,710",
        twoYearsAgoBalance: "1,109,867",
        threeYearsAgoBalance: "1,362,391",
        currentReserve: "1,232,822",
        previousYearReserve: "1,287,607",
        twoYearsAgoReserve: "1,373,802",
        threeYearsAgoReserve: "1,650,997",
        currentEarnRate: 7.88,
        previousYearEarnRate: 7.12,
        twoYearsAgoEarnRate: -1.85,
        threeYearsAgoEarnRate: -0.05,
        previousYearFeeRate: 0.73,
        twoYearsAgoFeeRate: 0.69,
        threeYearsAgoFeeRate: 0.77
    }, {
        area: "은행",
        company: "신한은행",
        product: "연금저축신탁 안정형 제1호",
        productType: "안정형",
        rcvMethod: "연금 수령시 선택형",
        feeType: "증가형",
        sells: "중단",
        withdraws: "가능",
        guarantees: "보장",
        currentBalance: "850,279",
        previousYearBalance: "950,710",
        twoYearsAgoBalance: "1,109,867",
        threeYearsAgoBalance: "1,362,391",
        currentReserve: "1,232,822",
        previousYearReserve: "1,287,607",
        twoYearsAgoReserve: "1,373,802",
        threeYearsAgoReserve: "1,650,997",
        currentEarnRate: 7.88,
        previousYearEarnRate: 7.12,
        twoYearsAgoEarnRate: -1.85,
        threeYearsAgoEarnRate: -0.05,
        previousYearFeeRate: 0.73,
        twoYearsAgoFeeRate: 0.69,
        threeYearsAgoFeeRate: 0.77
    }]

// 비교 항목 컴포넌트
interface CompareRowProps {
    label: string;
    firstValue?: string | number;
    secondValue?: string | number;
    suffix?: string;
}

function CompareRow({ label, firstValue, secondValue, suffix = "" }: CompareRowProps) {
    return (
        <>
            <styled.CompareItemText>{label}</styled.CompareItemText>
            <styled.CompareItemTextContainer>
                <p>{firstValue}{suffix}</p>
                <p>{secondValue}{suffix}</p>
            </styled.CompareItemTextContainer>
        </>
    );
}

// 연도별 데이터 행 컴포넌트
interface YearlyDataRowProps {
    label: string;
    firstProduct?: Product;
    secondProduct?: Product;
    dataKey: keyof ProductData;
    suffix?: string;
}

function YearlyDataRow({ label, firstProduct, secondProduct, dataKey, suffix = "" }: YearlyDataRowProps) {
    return (
        <>
            <styled.CompareItemText>{label}</styled.CompareItemText>
            <styled.CompareItemTextContainer>
                <p>
                    {firstProduct && ['current', 'previousYear', 'twoYearsAgo', 'threeYearsAgo'].map((period) => (
                        <div key={period}>
                            <span>{period === 'current' ? '현재' :
                                period === 'previousYear' ? '과거 1년' :
                                    period === 'twoYearsAgo' ? '과거 2년' : '과거 3년'}</span>
                            <span>{firstProduct[`${period}${dataKey}` as keyof Product] ?? ''}{suffix}</span>
                        </div>
                    ))}
                </p>
                <p>
                    {secondProduct && ['current', 'previousYear', 'twoYearsAgo', 'threeYearsAgo'].map((period) => (
                        <div key={period}>
                            <span>{period === 'current' ? '현재' :
                                period === 'previousYear' ? '과거 1년' :
                                    period === 'twoYearsAgo' ? '과거 2년' : '과거 3년'}</span>
                            <span>{secondProduct[`${period}${dataKey}` as keyof Product] ?? ''}{suffix}</span>
                        </div>
                    ))}
                </p>
            </styled.CompareItemTextContainer>
        </>
    );
}

function ProductComparePage() {
    const navigate = useNavigate();
    const [firstProduct, setFirstProduct] = useState<Product | undefined>(undefined);
    const [secondProduct, setSecondProduct] = useState<Product | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<string | undefined>('연금저축');
    const searchParams = new URLSearchParams(window.location.search);
    const firstProductId = searchParams.get('firstProduct');
    const secondProductId = searchParams.get('secondProduct');
    const activeType = searchParams.get('activeType');

    useEffect(() => {
        if (firstProductId) {
            setFirstProduct(PRODUCT_LIST[Number(firstProductId) - 1]);
        }
    }, [firstProductId]);

    useEffect(() => {
        if (secondProductId) {
            setSecondProduct(PRODUCT_LIST[Number(secondProductId) - 1]);
        }
    }, [secondProductId]);

    useEffect(() => {
        if (activeType) {
            setActiveTab(activeType);
        }
    }, [activeType]);

    const handleTabSelect = (type: string) => {
        setActiveTab(type);
    }

    const handleFirstProduct = () => {
        // secondProduct가 있다면 유지하면서 이동
        const query = secondProductId ? `activeType=${activeTab}&action=selectFirstProduct&secondProduct=${secondProductId}` : `activeType=${activeTab}&action=selectFirstProduct`;
        navigate(`/product/search?${query}`);
    };

    const handleSecondProduct = () => {
        // firstProduct가 있다면 유지하면서 이동
        const query = firstProductId ? `activeType=${activeTab}&action=selectSecondProduct&firstProduct=${firstProductId}` : `activeType=${activeTab}&action=selectSecondProduct`;
        navigate(`/product/search?${query}`);
    };

    const renderProductSelector = (product: Product | undefined, onClick: () => void) => {
        return (
            <styled.CompareItem onClick={onClick}>
                {!product ? (
                    <>
                        <styled.CompareButton>
                            <img src={plus} alt="plus" />
                        </styled.CompareButton>
                        <styled.CompareButtonText>상품을 선택해주세요.</styled.CompareButtonText>
                    </>
                ) : (
                    <>
                        <p>{product.area}</p>
                        <p>{product.product}</p>
                        <p>{product.company}</p>
                        <BlueButton variant="small" style={{ width: "100px" }} onClick={() => navigate(`/product/detail/0`)}>상품 상세</BlueButton>
                    </>
                )}
            </styled.CompareItem>
        )
    }

    return (
        <styled.Container>
            <Header title="상품 비교" />
            {!firstProduct && (
                <>
                    <styled.TitleContainer>
                        <styled.Title>상품 선택 후 비교할 수 있어요.</styled.Title>
                        <styled.SubTitle>아래 상자를 터치하여 비교할 상품을 선택해주세요.</styled.SubTitle>
                    </styled.TitleContainer>
                    <Select items={["연금저축", "퇴직연금"]} onSelect={handleTabSelect} />
                </>
            )}

            <styled.CompareContainer>
                {renderProductSelector(firstProduct, handleFirstProduct)}
                {renderProductSelector(secondProduct, handleSecondProduct)}
            </styled.CompareContainer>

            {(firstProduct || secondProduct) ? (
                <styled.CompareItemContainer>
                    <CompareRow label="상품 유형" firstValue={firstProduct?.productType} secondValue={secondProduct?.productType} />
                    <CompareRow label="수령 기간" firstValue={firstProduct?.rcvMethod} secondValue={secondProduct?.rcvMethod} />
                    <CompareRow label="수수료 구조" firstValue={firstProduct?.feeType} secondValue={secondProduct?.feeType} />
                    <CompareRow label="판매 여부" firstValue={firstProduct?.sells} secondValue={secondProduct?.sells} />
                    <CompareRow label="중도 해지" firstValue={firstProduct?.withdraws} secondValue={secondProduct?.withdraws} />
                    <CompareRow label="원금 보장" firstValue={firstProduct?.guarantees} secondValue={secondProduct?.guarantees} />
                    <YearlyDataRow
                        label="납입 원금"
                        firstProduct={firstProduct}
                        secondProduct={secondProduct}
                        dataKey="Balance"
                        suffix="원"
                    />
                    <YearlyDataRow
                        label="적립금"
                        firstProduct={firstProduct}
                        secondProduct={secondProduct}
                        dataKey="Reserve"
                        suffix="원"
                    />
                    <YearlyDataRow
                        label="수익률"
                        firstProduct={firstProduct}
                        secondProduct={secondProduct}
                        dataKey="EarnRate"
                        suffix="%"
                    />
                    <YearlyDataRow
                        label="수수료율"
                        firstProduct={firstProduct}
                        secondProduct={secondProduct}
                        dataKey="FeeRate"
                        suffix="%"
                    />
                </styled.CompareItemContainer>
            ) : (<>
                <h3>하나은행 상품</h3>
                <styled.GridContainer>
                    {["추천 상품1", "추천 상품2"].map((name, index) => (
                        <styled.GridItem key={index}>
                            {name}
                        </styled.GridItem>
                    ))}
                </styled.GridContainer>
            </>)}
        </styled.Container>
    );

}

export default ProductComparePage;

