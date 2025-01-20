import * as styled from "../styles";
import { useNavigate } from "react-router-dom";
// [import { useChartData } from "./hooks/useBarChartData";
// import ReactApexChart from "react-apexcharts";

// components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";

// assets
import arrow from "../../../assets/icon/arrow.png";

interface AssetItemType {
    icon: string;
    alt: string;
    label: string;
    amount: string;
}

const ASSET_DATA: AssetItemType[] = [
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png",
        alt: "Classical Building",
        label: "은행",
        amount: "100,000,000원"
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png",
        alt: "Chart Increasing",
        label: "증권",
        amount: "100,000,000원"
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png",
        alt: "Coin",
        label: "가상자산",
        amount: "100,000,000원"
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Dollar%20Banknote.png",
        alt: "Dollar Banknote",
        label: "현금",
        amount: "100,000,000원"
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House%20with%20Garden.png",
        alt: "House with Garden",
        label: "부동산",
        amount: "100,000,000원"
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Automobile.png",
        alt: "Automobile",
        label: "자동차",
        amount: "100,000,000원"
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Briefcase.png",
        alt: "Briefcase",
        label: "연금",
        amount: "100,000,000원"
    }
];

const LOAN_DATA: AssetItemType[] = [
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Bank.png",
        alt: "Bank",
        label: "달달대출",
        amount: "잔액 100,000,000원"
    }
];

function AssetList({ items, showArrow }: { items: AssetItemType[], showArrow: boolean }) {
    return (
        <styled.AssetList>
            {items.map((item, index) => (
                <styled.AssetItem key={index}>
                    <styled.AssetItemLeft>
                        <styled.AssetIcon src={item.icon} alt={item.alt} />
                        <p>{item.label}</p>
                    </styled.AssetItemLeft>
                    <styled.AssetItemRight>
                        <p>{item.amount}</p>
                        {showArrow && <img src={arrow} alt="arrow" />}
                    </styled.AssetItemRight>
                </styled.AssetItem>
            ))}
        </styled.AssetList>
    );
}

function AssetDetailPage() {
    // const { chartData } = useChartData();
    const navigate = useNavigate();

    return (
        <styled.Container>
            <Header title="자산 상세" showClose={true} />
            
            <styled.TitleContainer>
                <styled.SubTitle>총 자산</styled.SubTitle>
                <styled.Title>100,000,000원</styled.Title>
                {/* <div>
                    <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                    />
                </div> */}
            </styled.TitleContainer>
            
            <styled.AssetContainer>
                <AssetList items={ASSET_DATA} showArrow={true} />
            </styled.AssetContainer>

            <styled.TitleContainer>
                <styled.SubTitle>총 대출 잔액</styled.SubTitle>
                <styled.Title>100,000,000원</styled.Title>
            </styled.TitleContainer>
            
            <styled.AssetContainer>
                <AssetList items={LOAN_DATA} showArrow={false} />
            </styled.AssetContainer>

            <BlueButton variant="large" onClick={() => navigate("/asset/register")}>
                <p>자산 연결 추가하기</p>
            </BlueButton>
        </styled.Container>
    );
}

export default AssetDetailPage;