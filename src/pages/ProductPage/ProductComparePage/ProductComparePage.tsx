import * as styled from "../styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//components
import Header from "../../../layout/Header";
import Select from "../../../ui/Select";
import HanaProducts from "../components/HanaProducts";
import ProductSelector from "../components/ProductSelector";
import { message } from "antd";

//services
import { productService } from "../../../services/api/Product"
import { PensionSavingComparison, Annuity } from "../../../services/dto/Product"

// productType 타입 정의 추가
type CompareProductType = PensionSavingComparison | Annuity;

// 비교 항목 컴포넌트
interface CompareRowProps {
    label: string;
    firstValue?: string | number;
    secondValue?: string | number;
    suffix?: string;
}

interface ProductData {
    Balance: string;
    Reserve: string;
    EarnRate: string;
    FeeRate: string;
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
    firstProduct?: PensionSavingComparison;
    secondProduct?: PensionSavingComparison;
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
                            <span>{firstProduct[`${period}${dataKey}`] ?? ''}{suffix}</span>
                        </div>
                    ))}
                </p>
                <p>
                    {secondProduct && ['current', 'previousYear', 'twoYearsAgo', 'threeYearsAgo'].map((period) => (
                        <div key={period}>
                            <span>{period === 'current' ? '현재' :
                                period === 'previousYear' ? '과거 1년' :
                                    period === 'twoYearsAgo' ? '과거 2년' : '과거 3년'}</span>
                            <span>{secondProduct[`${period}${dataKey}`] ?? ''}{suffix}</span>
                        </div>
                    ))}
                </p>
            </styled.CompareItemTextContainer>
        </>
    );
}

// 퇴직연금 비교 행 컴포넌트
interface AnnuityFeeDataRowProps {
    label: string;
    type: string;
    firstProduct: Annuity;
    secondProduct: Annuity;
    suffix?: string;
}

function AnnuityFeeDataRow({ label, type, firstProduct, secondProduct, suffix = "" }:AnnuityFeeDataRowProps) {
    return (
        <>
            <styled.CompareItemText>{label}</styled.CompareItemText>
            <styled.CompareItemTextContainer>
                <p>
                    <div>
                        <span>운용관리</span>
                        <span>{firstProduct[`${type}OprtMngFee`]?.toLocaleString()}{suffix}</span>
                    </div>
                    <div>
                        <span>자산관리</span>
                        <span>{firstProduct[`${type}AsstMngFee`]?.toLocaleString()}{suffix}</span>
                    </div>
                    <div>
                        <span>펀드총비용</span>
                        <span>{firstProduct[`${type}FundTotalCost`]?.toLocaleString()}{suffix}</span>
                    </div>
                    <div>
                        <span>총비용</span>
                        <span>{firstProduct[`${type}TotalFee`]?.toLocaleString()}{suffix}</span>
                    </div>
                </p>
                <p>
                    <div>
                        <span>운용관리</span>
                        <span>{secondProduct[`${type}OprtMngFee`]?.toLocaleString()}{suffix}</span>
                    </div>
                    <div>
                        <span>자산관리</span>
                        <span>{secondProduct[`${type}AsstMngFee`]?.toLocaleString()}{suffix}</span>
                    </div>
                    <div>
                        <span>펀드총비용</span>
                        <span>{secondProduct[`${type}FundTotalCost`]?.toLocaleString()}{suffix}</span>
                    </div>
                    <div>
                        <span>총비용</span>
                        <span>{secondProduct[`${type}TotalFee`]?.toLocaleString()}{suffix}</span>
                    </div>
                </p>
            </styled.CompareItemTextContainer>
        </>
    );
}

interface ComparisonProps {
    first: PensionSavingComparison;
    second: PensionSavingComparison;
}

function PensionComparison({ first, second }: ComparisonProps) {
    return (
        <styled.CompareItemContainer>
            <CompareRow label="상품 유형" firstValue={first.productType} secondValue={second.productType} />
            <CompareRow label="수령 기간" firstValue={first.rcvMethod} secondValue={second.rcvMethod} />
            <CompareRow label="수수료 구조" firstValue={first.feeType} secondValue={second.feeType} />
            <CompareRow label="판매 여부" firstValue={first.sells} secondValue={second.sells} />
            <CompareRow label="중도 해지" firstValue={first.withdraws} secondValue={second.withdraws} />
            <CompareRow label="원금 보장" firstValue={first.guarantees} secondValue={second.guarantees} />
            <YearlyDataRow label="납입 원금" firstProduct={first} secondProduct={second} dataKey="Balance" suffix="원" />
            <YearlyDataRow label="적립금" firstProduct={first} secondProduct={second} dataKey="Reserve" suffix="원" />
            <YearlyDataRow label="수익률" firstProduct={first} secondProduct={second} dataKey="EarnRate" suffix="%" />
            <YearlyDataRow label="수수료율" firstProduct={first} secondProduct={second} dataKey="FeeRate" suffix="%" />
        </styled.CompareItemContainer>
    );
}

interface AnnuityComparisonProps {
    first: Annuity;
    second: Annuity;
}

function AnnuityComparison({ first, second }: AnnuityComparisonProps) {
    return (
        <styled.CompareItemContainer>
            <CompareRow label="DB 총비용부담률" firstValue={first.dbTotalCostRate} secondValue={second.dbTotalCostRate} suffix="%" />
            <AnnuityFeeDataRow label="DB 수수료" type="db" firstProduct={first} secondProduct={second} suffix="원" />
            <CompareRow label="DC 총비용부담률" firstValue={first.dcTotalCostRate} secondValue={second.dcTotalCostRate} suffix="%" />
            <AnnuityFeeDataRow label="DC 수수료" type="dc" firstProduct={first} secondProduct={second} suffix="원" />
            <CompareRow label="IRP 총비용부담률" firstValue={first.irpTotalCostRate} secondValue={second.irpTotalCostRate} suffix="%" />
            <AnnuityFeeDataRow label="IRP 수수료" type="irp" firstProduct={first} secondProduct={second} suffix="원" />
            {/* ... 나머지 비교 항목들 ... */}
        </styled.CompareItemContainer>
    );
}

function ProductComparePage() {
    const navigate = useNavigate();
    const [firstProduct, setFirstProduct] = useState<CompareProductType>();
    const [secondProduct, setSecondProduct] = useState<CompareProductType>();
    // const [activeTab, setActiveTab] = useState<string>('연금저축');
    
    // 데이터 로드 로직 단순화
    const loadProduct = async (id: string, isPension: boolean) => {
        try {
            const response = isPension 
                ? await productService.getPensionSavingsComparison(id)
                : await productService.getAnnuityComparison(id);
            return response.data.result;
        } catch (error) {
            console.error(error);
            message.error('상품 정보 로드 실패');
            return null;
        }
    };

    useEffect(() => {
        const init = async () => {
            const storedTab = localStorage.getItem('compareActiveTab') || '연금저축';  // 기본값 설정
            const firstId = localStorage.getItem('compareFirstProduct');
            const secondId = localStorage.getItem('compareSecondProduct');
            
            const isPension = storedTab !== '퇴직연금';
            localStorage.setItem('compareActiveTab', storedTab);  // 기본값 저장
            
            if (firstId) {
                const product = await loadProduct(firstId, isPension);
                if (product) setFirstProduct(product);
            }
            
            if (secondId) {
                const product = await loadProduct(secondId, isPension);
                if (product) setSecondProduct(product);
            }
        };
        
        init();
    }, []);

    const handleTabSelect = (type: string) => {
        const selectedTab = type || '연금저축';  // 기본값 설정
        localStorage.setItem('compareActiveTab', selectedTab);
        [setFirstProduct, setSecondProduct].forEach(setter => setter(undefined));
        ['compareFirstProduct', 'compareSecondProduct'].forEach(key => 
            localStorage.removeItem(key)
        );
    };

    const handleProductSelect = (position: 'first' | 'second') => {
        localStorage.setItem('compareSelectMode', position);
        navigate('/product/search/compare');
    };

    // 타입 가드를 활용한 간단한 렌더링 로직
    const renderComparison = () => {
        if (!firstProduct || !secondProduct) return null;

        const isPension = 'productType' in firstProduct;
        if (isPension !== ('productType' in secondProduct)) return null;

        return isPension 
            ? <PensionComparison first={firstProduct as PensionSavingComparison} second={secondProduct as PensionSavingComparison} />
            : <AnnuityComparison first={firstProduct as Annuity} second={secondProduct as Annuity} />;
    };

    return (
        <styled.Container>
            <Header title="상품 비교" onClose={() => navigate("/product")}/>
            
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
                <ProductSelector 
                    product={firstProduct} 
                    onClick={() => handleProductSelect('first')} 
                />
                <ProductSelector 
                    product={secondProduct} 
                    onClick={() => handleProductSelect('second')} 
                />
            </styled.CompareContainer>

            {(firstProduct || secondProduct) ? renderComparison() : <HanaProducts />}
        </styled.Container>
    );
}

export default ProductComparePage;

