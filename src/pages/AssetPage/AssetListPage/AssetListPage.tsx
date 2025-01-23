import React, { useEffect, useState } from "react";
import * as styled from "../styles";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import HorizontalStackedBar from "../components/HorizontalStackedBar";
import arrow from "../../../assets/icon/arrow.png";
import { assetService } from "../../../services/api/Asset";
import { DetailResponseDTO } from "../../../services/dto/Asset";
import { AssetItemType } from "../type"


interface LoanItem {
    label: string;
    amount: string;
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
                        <p>{item.label}</p>
                    </styled.AssetItemLeft>
                    <styled.AssetItemRight onClick={() => navigate(`/asset/detail/${item.label}`)}>
                        <p>{item.amount}원</p>
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

    useEffect(() => {
        const fetchAssetData = async () => {
            try {
                const response = await assetService.detail();
                const result: DetailResponseDTO = response.data.result;
                const assetDetail = result.assetsDetail;

                console.log(result);

                // 자산 데이터 가공
                const assets = [
                    { label: "은행", alt: "Classical Building", amount: assetDetail.bank, color: "#c5e2ff", icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png" },
                    { label: "증권", alt: "Chart Increasing", amount: assetDetail.securityCompany, color: "#ffa4a4", icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png" },
                    { label: "가상자산", alt: "Coin", amount: assetDetail.virtual, color: "#fff27f", icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png" },
                    { label: "현금", alt: "Dollar Banknote", amount: assetDetail.cash, color: "#9effb8", icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Dollar%20Banknote.png" },
                    { label: "부동산", alt: "House with Garden", amount: assetDetail.realEstate, color: "#a5d2ff", icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House%20with%20Garden.png" },
                    { label: "자동차", alt: "Automobile", amount: assetDetail.car, color: "#FFCAD4", icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Automobile.png" },
                    { label: "연금", alt: "Briefcase", amount: assetDetail.pension, color: "#fadab5", icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Briefcase.png" },
                ];

                // 대출 데이터 가공
                const loans = result.loan.map(loan => ({
                    icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Bank.png",
                    alt: "Bank",
                    label: `${loan.bankName} (${loan.accountName})`,
                    amount: loan.totalAmount,
                }));

                setAssetData(assets);
                setLoanData(loans);
                setAssetTotal(assetDetail.assetTotal);
                setLoanTotal(result.loanTotal);
            } catch (error) {
                console.error("Failed to fetch asset data:", error);
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
                <HorizontalStackedBar data={assetData} width={350} height={25} />
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