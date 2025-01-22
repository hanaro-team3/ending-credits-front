import * as styled from "../styles";
import { useNavigate } from "react-router-dom";
import { AssetItemType } from "../type";

// components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import HorizontalStackedBar from "../components/HorizontalStackedBar";

// assets
import arrow from "../../../assets/icon/arrow.png";

const ASSET_DATA: AssetItemType[] = [
    {
        color: "#c5e2ff",
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png",
        alt: "Classical Building",
        label: "은행",
        amount: "100000000"
    },
    {
        color: "#ffa4a4",
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png",
        alt: "Chart Increasing",
        label: "증권",
        amount: "50000000"
    },
    {
        color: "#fff27f",
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png",
        alt: "Coin",
        label: "가상자산",
        amount: "50000000"
    },
    {
        color: "#9effb8",
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Dollar%20Banknote.png",
        alt: "Dollar Banknote",
        label: "현금",
        amount: "50000000"
    },
    {
        color: "#a5d2ff",
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House%20with%20Garden.png",
        alt: "House with Garden",
        label: "부동산",
        amount: "50000000"
    },
    {
        color: "#FFCAD4",
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Automobile.png",
        alt: "Automobile",
        label: "자동차",
        amount: "50000000"
    },
    {
        color: "#fadab5",
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Briefcase.png",
        alt: "Briefcase",
        label: "연금",
        amount: "50000000"
    }
];

const LOAN_DATA: AssetItemType[] = [
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Bank.png",
        alt: "Bank",
        label: "달달대출",
        amount: "100000000"
    }
];

function AssetList({ items, showArrow }: { items: AssetItemType[], showArrow: boolean }) {
    const navigate = useNavigate();

    return (
        <styled.AssetList>
            {items.map((item, index) => (
                <styled.AssetItem key={index}>
                    <styled.AssetItemLeft>
                        <div style={{ backgroundColor: item.color, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px" }}>
                            <styled.AssetIcon src={item.icon} alt={item.alt} />
                        </div>
                        <p>{item.label}</p>
                    </styled.AssetItemLeft>
                    <styled.AssetItemRight onClick={() => navigate(`/asset/detail/${item.label}`)}>
                        <p>{Number(item.amount).toLocaleString()}원</p>
                        {showArrow && <img src={arrow} alt="arrow" />}
                    </styled.AssetItemRight>
                </styled.AssetItem>
            ))}
        </styled.AssetList>
    );
}

function AssetListPage() {
    const navigate = useNavigate();

    return (
        <styled.Container>
            <Header title="자산 상세" showClose={true} />
            
            <styled.TitleContainer>
                <styled.SubTitle>총 자산</styled.SubTitle>
                <styled.Title>100,000,000원</styled.Title>
                <HorizontalStackedBar data={ASSET_DATA} width={350} height={25} />
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

export default AssetListPage;