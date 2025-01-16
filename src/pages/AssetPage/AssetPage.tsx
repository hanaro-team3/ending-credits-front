import Header from "../../layout/Header";
import * as styled from "./styles";
import BlueButton from "../../ui/BlueBtn";
import Navbar from "../../layout/Navbar";

import coin from "../../assets/icon/coin.png";


function AssetPage() {
    return (
        <styled.Container>
            <Header
                title="자산 현황"
                showClose={false}
            />

            {/* 타이틀 섹션 */}
            <styled.TitleContainer>
                <styled.Title>
                    앗 아직 자산을 연결하지 않으셨네요!                </styled.Title>
                <styled.SubTitle>
                    1분 내로 모든 자산을 한 번에 연결하고 <br />
                    자산을 굴릴 수 있는 상품 추천을 받아보세요.                </styled.SubTitle>
            </styled.TitleContainer>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "350px" }}>
                <img src={coin} alt="coin" width={120} />

            </div>


            <BlueButton variant="large">자산 연결하기</BlueButton>

            <Navbar />
        </styled.Container>
    );
}

export default AssetPage;
