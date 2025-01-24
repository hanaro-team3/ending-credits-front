import { useEffect, useState } from "react";
import * as styled from "../styles";
import { useNavigate } from "react-router-dom";

// assets
import arrow from "../../../assets/icon/arrow.png";

// types
import { AssetItemType } from "../type"

// services
import { assetService } from "../../../services/api/Asset";
import { DetailResponseDTO } from "../../../services/dto/Asset";

//components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import HorizontalStackedBar from "../components/HorizontalStackedBar";

interface LoanItem {
    label: string;
    amount: number;
    icon: string;
    alt: string;
    color?: string;
    expiryRemainDay: string;
}

function AssetList({ items, showArrow }: { items: AssetItemType[], showArrow: boolean }) {
    const navigate = useNavigate();

    return (
        <styled.AssetList>
            {items.map((item, index) => (
                <styled.AssetItem key={index}>
                    <styled.AssetItemLeft>
                        <div style={{ backgroundColor: item.color, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px" }}>
                            {item.icon && <styled.AssetIcon src={item.icon} alt={item.alt || item.label} />}
                        </div>
                        <div>
                            {item.bankName && <styled.AccountBank>{item.bankName}</styled.AccountBank>}
                            <p>{item.label}</p> 
                        </div>
                    </styled.AssetItemLeft>
                    <styled.AssetItemRight onClick={() => navigate(`/asset/detail/${item.label}`)}>
                        <div>
                            <p>{item.amount.toLocaleString()}원</p>
                            {item.expiryRemainDay && <styled.AccountReturn>만기 {item.expiryRemainDay}일전</styled.AccountReturn>}
                        </div>
                        {showArrow && <img src={arrow} alt="arrow" />}

                    </styled.AssetItemRight>
                </styled.AssetItem>
            ))}
        </styled.AssetList>
    );
}

function AssetListPage() {
    const navigate = useNavigate();
    const [assetData, setAssetData] = useState<AssetItemType[]>([]);
    const [loanData, setLoanData] = useState<LoanItem[]>([]);
    const [assetTotal, setAssetTotal] = useState("0");
    const [loanTotal, setLoanTotal] = useState("0");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAssetData = async () => {
            try {
                setIsLoading(true);
                const response = await assetService.getDetail();
                const result: DetailResponseDTO = response.data.result;
                const assetDetail = result.assetsDetail;

                // 자산 데이터 가공
                const assets = [
                    { 
                        label: "은행", 
                        alt: "Classical Building", 
                        amount: Number(assetDetail.bank.replace(/,/g, '')),
                        color: "#c5e2ff", 
                        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png" 
                    },
                    { 
                        label: "증권", 
                        alt: "Chart Increasing", 
                        amount: Number(assetDetail.securityCompany.replace(/,/g, '')),
                        color: "#ffa4a4", 
                        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png" 
                    },
                    { 
                        label: "가상자산", 
                        alt: "Coin", 
                        amount: Number(assetDetail.virtual.replace(/,/g, '')),
                        color: "#fff27f", 
                        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png" 
                    },
                    { 
                        label: "현금", 
                        alt: "Dollar Banknote", 
                        amount: Number(assetDetail.cash.replace(/,/g, '')),
                        color: "#9effb8", 
                        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Dollar%20Banknote.png" 
                    },
                    { 
                        label: "부동산", 
                        alt: "House with Garden", 
                        amount: Number(assetDetail.realEstate.replace(/,/g, '')),
                        color: "#a5d2ff", 
                        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House%20with%20Garden.png" 
                    },
                    { 
                        label: "자동차", 
                        alt: "Automobile", 
                        amount: Number(assetDetail.car.replace(/,/g, '')),
                        color: "#FFCAD4", 
                        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Automobile.png" 
                    },
                    { 
                        label: "연금", 
                        alt: "Briefcase", 
                        amount: Number(assetDetail.pension.replace(/,/g, '')),
                        color: "#fadab5", 
                        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Briefcase.png" 
                    },
                ];

                // 대출 데이터 가공
                const loans = result.loan.map(loan => ({
                    icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Bank.png",
                    alt: "Bank",
                    label: loan.accountName,
                    bankName: loan.bankName,
                    amount: Number(loan.totalAmount.replace(/,/g, '')),
                    expiryRemainDay: loan.expiryRemainDay,
                }));

                setAssetData(assets);
                setLoanData(loans);
                setAssetTotal(assetDetail.assetTotal);
                setLoanTotal(result.loanTotal);
            } catch (error) {
                console.error("Failed to fetch asset data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssetData();
    }, []);



    return (
        <styled.Container>
            <Header title="자산 상세" showClose={true} />
            
            <styled.TitleContainer>
                <styled.SubTitle>총 자산</styled.SubTitle>
                <styled.Title>{assetTotal}원</styled.Title>
                {!isLoading && assetData.length > 0 && (
                    <HorizontalStackedBar data={assetData} width={350} height={25} />
                )}
            </styled.TitleContainer>
            
            <styled.AssetContainer>
                <AssetList items={assetData} showArrow={true} />
            </styled.AssetContainer>

            <styled.TitleContainer>
                <styled.SubTitle>총 대출 잔액</styled.SubTitle>
                <styled.Title>{loanTotal}원</styled.Title>
            </styled.TitleContainer>
            
            <styled.AssetContainer>
                <AssetList items={loanData} showArrow={false} />
            </styled.AssetContainer>

            <BlueButton variant="large" onClick={() => navigate("/asset/register")}>
                <p>자산 연결 추가하기</p>
            </BlueButton>
        </styled.Container>
    );
}

export default AssetListPage;