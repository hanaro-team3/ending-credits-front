import * as styled from "../styles"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ASSET_DATA } from "../constants";

//components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import { AssetCard } from "../components/AssetCard";

//services
import { assetService } from "../../../services/api/AssetView";
import { CarsResponseDTO, PensionsResponseDTO, RealEstatesResponseDTO } from "../../../services/dto/AssetView";




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
    const [realEstates, setRealEstates] = useState<RealEstatesResponseDTO>();

    useEffect(() => {
        async function getRealEstates() {
            try {
                const response = await assetService.getRealEstates();
                if (response?.data) {
                    setRealEstates(response.data.result);
                }
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        }

        getRealEstates();

    }, []);
    return(
        <>
            <styled.AccountSection>
                <styled.AccountTitle>보유한 집</styled.AccountTitle>
                <styled.AccountList>
                    {realEstates?.map((item) => (
                        <styled.AccountItem key={item.realEstateId}>
                            <styled.AccountBank></styled.AccountBank>
                            <styled.AccountRow>
                            <styled.AccountName>{item.realEstateName}</styled.AccountName>
                            <p>{item.purchasePrice.toLocaleString()}원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber>{item.address}</styled.AccountNumber>
                            <styled.AccountReturn></styled.AccountReturn>
                        </styled.AccountRow>
                    </styled.AccountItem>
                    ))}
                </styled.AccountList>
            </styled.AccountSection>
        </>
    )
}

function Car() {
    const [cars, setCars] = useState<CarsResponseDTO>();

    useEffect(() => {
        async function getCars() {
            const response = await assetService.getCars();
            if (response?.data) {
                console.log(response.data);
                setCars(response.data.result);
            }
        }
        getCars();
    }, []);
    return(
        <>
            <styled.AccountSection>
                <styled.AccountTitle>보유한 차</styled.AccountTitle>
                <styled.AccountList>
                    {cars?.map((item) => (
                        <styled.AccountItem key={item.carId}>
                            <styled.AccountBank></styled.AccountBank>
                            <styled.AccountRow>
                                <styled.AccountName>{item.carNumber}</styled.AccountName>
                            <p>{item.purchasePrice.toLocaleString()}원</p>
                        </styled.AccountRow>
                        <styled.AccountRow>
                            <styled.AccountNumber>{item.model}</styled.AccountNumber>
                            <styled.AccountReturn></styled.AccountReturn>
                            </styled.AccountRow>
                        </styled.AccountItem>
                    ))}
                </styled.AccountList>
            </styled.AccountSection>
        </>   
    )
}

function Pension() {
    const navigate = useNavigate(); 
    const [pensions, setPensions] = useState<PensionsResponseDTO>();

    useEffect(() => {
        async function getPensions() {
            const response = await assetService.getPensions();
            if (response?.data) {
                console.log(response.data);
                setPensions(response.data.result);
            }
        }
        getPensions();
    }, []);

    function getPensionAsset(pensionType: string) {
        return pensions?.filter(item => item.pensionType === pensionType).reduce((acc, item) => acc + item.monthlyPayment, 0);
    }

    function getPensionTotalAsset() {
        return pensions?.reduce((acc, item) => acc + item.monthlyPayment, 0);
    }

    return(
        <>
            <styled.TitleContainer>
                <styled.Title>앞으로 24년간 <br /> <span style={{color: "#4792DC"}}>월 100만원</span>씩 받을 수 있어요.</styled.Title>
            </styled.TitleContainer>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AssetCard label="국민연금" value={getPensionAsset("NATIONAL")?.toLocaleString() || "0"} />
                <AssetCard label="퇴직연금" value={getPensionAsset("RETIREMENT")?.toLocaleString() || "0"} />
                <AssetCard label="개인연금" value={getPensionAsset("PERSONAL")?.toLocaleString() || "0"} />
                <AssetCard label="합계" value={getPensionTotalAsset()?.toLocaleString() || "0"} highlight='blue' />

                <BlueButton variant="large" onClick={() => {navigate("/product")}}>투자로 돈 불리기</BlueButton>
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
            {label === "자동차" && <Car />}
            {label === "연금" && <Pension />}
        
        </styled.Container>
    )
}

export default AssetDetailPage;