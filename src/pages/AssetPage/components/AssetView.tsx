import * as styled from "../styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//components
import BlueButton from "../../../ui/BlueBtn";
import Navbar from "../../../layout/Navbar";
import { AssetCard } from "./AssetCard";
import AssetChart from "./AssetChart";

//services
import { memberService } from "../../../services/api/Member";

export function AssetView() {
    const navigate = useNavigate();
    const [wish, setWish] = useState("");
    const [assetTotal, setAssetTotal] = useState("");
    const [calculated, setCalculated] = useState(0);

    useEffect(() => {
        async function getMemberWish() {
            const response = await memberService.getMemberWish();
            if(response?.data) {
                const wishAmount = response.data.result.wishFund;
                const totalAmount = response.data.result.assetsDetail.assetTotal;
                
                setWish(wishAmount);
                setAssetTotal(totalAmount);
                setCalculated(Number(wishAmount.replace(/,/g, '')) - Number(totalAmount.replace(/,/g, '')));
            };
        }
        getMemberWish();
    }, []);

    return (
        <>
            <styled.TitleContainer>
                <styled.Title>{localStorage.getItem("name")}님의 자산 현황</styled.Title>
            </styled.TitleContainer>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AssetCard label="희망하는 노후 자금" value={wish} onClick={() => {navigate("/asset/calculate")}}  />
                <AssetCard label="보유한 자금" value={assetTotal} onClick={() => {navigate("/asset/list")}} />
                { calculated >= 0 ?
                    (<AssetCard label="부족한 자금" value={calculated.toLocaleString()} highlight="red" />)
                    : (<AssetCard label="여유 자금" value={Math.abs(calculated).toLocaleString()} highlight="blue" />)
                }
                <AssetChart />

                <BlueButton variant="large" onClick={() => {navigate("/product")}}>투자로 돈 불리기</BlueButton>
            </div>

            <Navbar />
        </>
    );
} 