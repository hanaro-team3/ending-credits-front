import * as styled from "../styles";
import BlueButton from "../../../ui/BlueBtn";
import Navbar from "../../../layout/Navbar";
import ReactApexChart from "react-apexcharts";
import { useChartData } from "../hooks/useChartData";
import { AssetCard } from "./AssetCard";

export function AssetView() {
    const { chartData } = useChartData();

    return (
        <>
            <styled.TitleContainer>
                <styled.Title>홍길동님의 자산 현황</styled.Title>
            </styled.TitleContainer>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AssetCard label="희망하는 노후 자금" value="8천 2백만원" onClick={() => {}} />
                <AssetCard label="보유한 자금" value="6천 2백만원" />
                <AssetCard label="부족한 자금" value="2천만원" highlight />
                <div>
                    <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="pie"
                    />
                </div>

                <BlueButton variant="large">투자로 돈 불리기</BlueButton>
            </div>

            <Navbar />
        </>
    );
} 