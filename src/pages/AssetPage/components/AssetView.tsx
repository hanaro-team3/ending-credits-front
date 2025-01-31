import * as styled from "../styles";
import ReactApexChart from "react-apexcharts";
import { useChartData } from "../hooks/useChartData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//components
import BlueButton from "../../../ui/BlueBtn";
import Navbar from "../../../layout/Navbar";
import { AssetCard } from "./AssetCard";

//services
import { memberService } from "../../../services/api/Member";

export function AssetView() {
    const { chartData } = useChartData();
    const navigate = useNavigate();
    const [wish, setWish] = useState("");
    const [asset, setAsset] = useState("");
    const [calculated, setCalculated] = useState(0);

    useEffect(() => {
        async function getMemberWish() {
            const response = await memberService.getMemberWish();
            if(response?.data) {
                setWish(response.data.result.wishFund);
                setAsset(response.data.result.assetsDetail.assetTotal);
                setCalculated(Number(wish.replace(/,/g, ''))-Number(asset.replace(/,/g, '')));
            };
        }
        getMemberWish();
    }, []);

    return (
        <>
            <styled.TitleContainer>
                <styled.Title>고객님의 자산 현황</styled.Title>
            </styled.TitleContainer>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AssetCard label="희망하는 노후 자금" value={wish} onClick={() => {navigate("/asset/calculate")}}  />
                <AssetCard label="보유한 자금" value={asset} onClick={() => {navigate("/asset/list")}} />
                {calculated>0?(<AssetCard label="부족한 자금" value={calculated.toLocaleString()} highlight="red" />):(<AssetCard label="여유 자금" value={Math.abs(calculated).toLocaleString()} highlight="blue" />)}
                
                <div>
                    <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="pie"
                    />
                </div>

                <BlueButton variant="large" onClick={() => {navigate("/product")}}>투자로 돈 불리기</BlueButton>
            </div>

            <Navbar />
        </>
    );
} 