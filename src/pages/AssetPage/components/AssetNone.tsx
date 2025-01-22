import * as styled from "../styles";
import BlueButton from "../../../ui/BlueBtn";
import Navbar from "../../../layout/Navbar";
import coin from "../../../assets/icon/coin.png";
import { useNavigate } from "react-router-dom";


export function AssetNone() {
    const navigate = useNavigate();

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
            <BlueButton variant="large" onClick={() => navigate("/asset/register")}>자산 연결하기</BlueButton>
            <Navbar />
        </>
    );
} 