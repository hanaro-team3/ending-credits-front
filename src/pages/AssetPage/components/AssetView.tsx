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
import { MemberWishDTO } from "../../../services/dto/Member";

export function AssetView() {
    const { chartData } = useChartData();
    const navigate = useNavigate();
    const [wishAndAssets, setWishAndAssets] = useState<MemberWishDTO>();

    useEffect(() => {
        async function getMemberWish() {
            const response = await memberService.getMemberWish();
            if(response?.data) {
                setWishAndAssets(response.data.result);
            };
        }
        getMemberWish();
    }, []);

    return (
        <>
            <styled.TitleContainer>
                <styled.Title>홍길동님의 자산 현황</styled.Title>
            </styled.TitleContainer>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AssetCard label="희망하는 노후 자금" value={wishAndAssets?.wishFund || ""} onClick={() => {navigate("/asset/calculate")}}  />
                <AssetCard label="보유한 자금" value={wishAndAssets?.assetsDetail.assetTotal || ""} onClick={() => {navigate("/asset/list")}} />
                <AssetCard label="부족한 자금" value="" highlight="red" />
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