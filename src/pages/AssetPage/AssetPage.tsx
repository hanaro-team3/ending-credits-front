import * as styled from "./styles";
import { useState, useEffect } from "react";

// components
import Header from "../../layout/Header";
import BlueButton from "../../ui/BlueBtn";
import Navbar from "../../layout/Navbar";

// assets
import coin from "../../assets/icon/coin.png";
import magicWand from "../../assets/icon/magicWand.png";

// constants
const BANK_DATA = [
    {
        type: "은행",
        banks: ["KB국민은행", "카카오뱅크", "신한은행", "NH농협은행", "지역농협", "하나은행", "우리은행", "IBK기업은행", "케이뱅크", "새마을금고", "우체국", "신협", "SC제일은행", "iM뱅크", "BNK부산은행", "BNK경남은행", "광주은행", "전북은행", "수협은행", "수협중앙회", "씨티은행", "제주은행", "KDB산업은행", "산림조합중앙회", "한국수출입은행", "한국농수한식품유통공사", "한국장학재단", "한국주택금융공사", "신용회복위원회", "서민금융진흥원"],
    },
    {
        type: "저축은행",
        banks: ["SBI저축은행", "OK저축은행", "웰컴저축은행", "신한저축은행", "KB저축은행", "페퍼저축은행", "다올저축은행", "애큐온저축은행", "하나저축은행", "NH저축은행", "한국투자저축은행", "상상인저축은행", "IBK저축은행", "우리금융저축은행", "BNK저축은행", "고려저축은행", "국제저축은행", "금화저축은행", "남양저축은행", "대명저축은행"]
    },
    {
        type: "증권",
        banks: ["한국투자증권", "키움증권", "미래에셋증권", "신한투자증권", "NH투자증권", "KB증권", "삼성증권", "카카오페이증권", "하나증권", "대신증권", "유안타증권", "한화투자증권", "DB금융투자", "유진투자증권", "SK증권", "현대차증권", "IBK투자증권", "하이투자증권", "신영증권", "LS증권", "우리종합금융", "한국포스증권", "메리츠증권", "교보증권", "다올투자증권", "코리아에셋투자증권", "BNK투자증권", "케이프투자증권", "한국증권금융", "부국증권"]
    },
    {
        type: "가상자산",
        banks: ["업비트", "빗썸", "코인원", "코빗", "고팍스"]
    }
];

const TAB_DATA = ["은행", "저축은행", "증권", "가상자산"] as const;

// 초기 화면 컴포넌트
interface AssetViewProps {
    onRegister: () => void;
}

function AssetView({ onRegister }: AssetViewProps) {
    return (
        <>
            <styled.TitleContainer>
                <styled.Title>앗 아직 자산을 연결하지 않으셨네요!</styled.Title>
                <styled.SubTitle>
                    1분 내로 모든 자산을 한 번에 연결하고 <br />
                    자산을 굴릴 수 있는 상품 추천을 받아보세요.
                </styled.SubTitle>
            </styled.TitleContainer>
            <styled.CoinImageWrapper>
                <img src={coin} alt="coin" width={120} />
            </styled.CoinImageWrapper>
            <BlueButton variant="large" onClick={onRegister}>자산 연결하기</BlueButton>
            <Navbar />
        </>
    );
}

// 자산 연결 컴포넌트
function AssetRegister() {
    const [activeTab, setActiveTab] = useState<typeof TAB_DATA[number]>("은행");
    const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
        TAB_DATA.reduce((acc, type) => ({ ...acc, [type]: [] }), {})
    );

    const handleSelectedItem = (bankType: string, bankName: string) => {
        const currentSelected = selectedItems[bankType] || [];
        const isSelected = currentSelected.includes(bankName);
        
        setSelectedItems({
            ...selectedItems,
            [bankType]: isSelected
                ? currentSelected.filter(item => item !== bankName)
                : [...currentSelected, bankName]
        });
    };

    const handleSelectAll = (bankType: string) => {
        const currentSelected = selectedItems[bankType] || [];
        const bankList = BANK_DATA.find(data => data.type === bankType)?.banks || [];
        
        setSelectedItems({
            ...selectedItems,
            [bankType]: currentSelected.length === bankList.length ? [] : bankList
        });
    };

    const isItemSelected = (bankType: string, bankName: string) => 
        selectedItems[bankType]?.includes(bankName) || false;

    const hasSelectedItems = Object.values(selectedItems).some(bank => bank.length > 0);

    return (
        <styled.RegisterContainer>
            <styled.MagicButton>
                <img src={magicWand} alt="요술봉" width={34} />
                <span>모든 자산을 한 번에 연결해 보세요</span>
            </styled.MagicButton>

            <styled.TabContainer>
                {TAB_DATA.map(tab => (
                    <styled.TabText
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </styled.TabText>
                ))}
            </styled.TabContainer>

            {BANK_DATA.filter(data => data.type === activeTab).map((data, index) => (
                <styled.Section key={index}>
                    <styled.SectionHeader>
                        <h3>{data.type}</h3>
                        <span onClick={() => handleSelectAll(data.type)}>
                            한 번에 선택
                        </span>
                    </styled.SectionHeader>
                    <styled.GridContainer>
                        {data.banks.map((bankName, index) => (
                            <styled.GridItem
                                key={index}
                                className={isItemSelected(data.type, bankName) ? 'active' : ''}
                                onClick={() => handleSelectedItem(data.type, bankName)}
                            >
                                {bankName}
                            </styled.GridItem>
                        ))}
                    </styled.GridContainer>
                </styled.Section>
            ))}

            {hasSelectedItems && (
                <styled.ButtonWrapper>
                    <BlueButton variant="large">연결하기</BlueButton>
                </styled.ButtonWrapper>
            )}
        </styled.RegisterContainer>
    );
}

// 메인 컴포넌트
function AssetPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [title, setTitle] = useState("자산 현황");

    useEffect(() => {
        if (isRegister) setTitle("자산 연결");
    }, [isRegister]);

    return (
        <styled.Container>
            <Header title={title} showClose={false} />
            {isRegister ? (
                <AssetRegister />
            ) : (
                <AssetView onRegister={() => setIsRegister(true)} />
            )}
        </styled.Container>
    );
}

export default AssetPage;
