import * as styled from "../styles"
import Header from "../../../layout/Header";
import { useParams } from "react-router-dom";
import { AssetCard } from "../components/AssetCard";
import BlueButton from "../../../ui/BlueBtn";

const ASSET_DATA = [
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png",
        label: "은행",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png",
        label: "증권",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png",
        label: "가상자산",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Dollar%20Banknote.png",
        label: "현금",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House%20with%20Garden.png",
        label: "부동산",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Automobile.png",
        label: "자동차",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Briefcase.png",
        label: "연금",
    }
];

function Bank() {
    return(
        <>
            <styled.AccountSection>
                <styled.AccountTitle>예금/신탁</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountBank>하나은행</styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>달달하나</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountNumber>자유입출금 • 123-456-7890</styled.AccountNumber>
                    </styled.AccountItem>
                    <styled.AccountItem>
                        <styled.AccountBank>하나은행</styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>달달하나</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountNumber>자유입출금 • 123-456-7890</styled.AccountNumber>
                    </styled.AccountItem>
                </styled.AccountList>
            </styled.AccountSection>

            <styled.AccountSection>
                <styled.AccountTitle>펀드</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountBank>하나은행</styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>달달하나</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber>자유입출금 • 123-456-7890</styled.AccountNumber>
                            <styled.AccountReturn>+15.0%</styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem>
                </styled.AccountList>
            </styled.AccountSection>
        </>
    )
}

function Stock() {
    return(
        <>
          <styled.AccountSection>
                <styled.AccountTitle>국내</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountBank>하나증권</styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>달달전자</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber>123-456-7890</styled.AccountNumber>
                            <styled.AccountReturn>+15.0%</styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem>
                </styled.AccountList>
            </styled.AccountSection>
            <styled.AccountSection>
                <styled.AccountTitle>해외</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountBank>하나증권</styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>달달전자</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber>123-456-7890</styled.AccountNumber>
                            <styled.AccountReturn>+15.0%</styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem>
                </styled.AccountList>
            </styled.AccountSection>
        </>
    )
}

function Coin() {
    return(
        <>
          <styled.AccountSection>
                <styled.AccountTitle>보유한 가상자산</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountBank>업비트</styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>비트코인</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber></styled.AccountNumber>
                            <styled.AccountReturn>+15.0%</styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem>
                </styled.AccountList>
            </styled.AccountSection>
        </>
    )
}

function Cash() {
    return(
        <>
          <styled.AccountSection>
                <styled.AccountTitle>보유한 돈</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountRow>
                            <p>50,000,000원</p>
                            <button>수정</button>
                        </styled.AccountRow>
                    </styled.AccountItem>

                    {/* <styled.AccountItem>
                        <styled.AccountBank></styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName></styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber></styled.AccountNumber>
                            <styled.AccountReturn></styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem> */}
                </styled.AccountList>
            </styled.AccountSection>
        </>
    )
}

function RealEstate() {
    return(
        <>
          <styled.AccountSection>
                <styled.AccountTitle>보유한 집</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountBank></styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>역삼동우정에쉐르II</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber>주소주소주소주소</styled.AccountNumber>
                            <styled.AccountReturn></styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem>
                </styled.AccountList>
            </styled.AccountSection>
        </>
    )
}

function Automobile() {
    return(
        <>
            <styled.AccountSection>
                <styled.AccountTitle>보유한 차</styled.AccountTitle>
                <styled.AccountList>
                    <styled.AccountItem>
                        <styled.AccountBank></styled.AccountBank>
                        <styled.AccountRow>
                            <styled.AccountName>17사 1932</styled.AccountName>
                            <p>50,000,000원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber>2.0 Cooper S Clubman</styled.AccountNumber>
                            <styled.AccountReturn></styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem>
                </styled.AccountList>
            </styled.AccountSection>
        </>   
    )
}

function Pension() {
    return(
        <>
            <styled.TitleContainer>
                <styled.Title>앞으로 24년간 <br /> <span style={{color: "#4792DC"}}>월 100만원</span>씩 받을 수 있어요.</styled.Title>
            </styled.TitleContainer>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AssetCard label="국민연금" value="8천 2백만원" />
                <AssetCard label="퇴직연금" value="6천 2백만원" />
                <AssetCard label="개인연금" value="2천만원" />
                <AssetCard label="합계" value="2천만원" highlight='blue' />

                <BlueButton variant="large">투자로 돈 불리기</BlueButton>
            </div>
        </>
    )
}

function AssetDetailPage() {
    const { label } = useParams();
    return (
        <styled.Container>
            <Header title={label || ""} showClose={true} />
            <styled.IconWrapper>
                <img 
                    src={ASSET_DATA.find(item => item.label === label)?.icon} 
                    alt={ASSET_DATA.find(item => item.label === label)?.label} 
                    width={80} 
                />
            </styled.IconWrapper>
            {label === "은행" && <Bank />}
            {label === "증권" && <Stock />}
            {label === "가상자산" && <Coin />}
            {label === "현금" && <Cash />}
            {label === "부동산" && <RealEstate />}
            {label === "자동차" && <Automobile />}
            {label === "연금" && <Pension />}
        
        </styled.Container>
    )
}

export default AssetDetailPage;