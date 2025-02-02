import ReactApexChart from 'react-apexcharts';
import { useState, useEffect, useMemo } from 'react';
import { memberService } from '../../../services/api/Member';

interface AssetsDetail {
    bank: string;
    car: string;
    cash: string;
    pension: string;
    realEstate: string;
    securityCompany: string;
    virtual: string;
}

const AssetChart = () => {
    const [assetDetail, setAssetDetail] = useState<AssetsDetail>({
        bank: '0',
        car: '0',
        cash: '0',
        pension: '0',
        realEstate: '0',
        securityCompany: '0',
        virtual: '0'
    });

    const chartData = useMemo(() => ({
        series: [
            Number(assetDetail.bank.replace(/,/g, '')),
            Number(assetDetail.securityCompany.replace(/,/g, '')),
            Number(assetDetail.virtual.replace(/,/g, '')),
            Number(assetDetail.cash.replace(/,/g, '')),
            Number(assetDetail.realEstate.replace(/,/g, '')),
            Number(assetDetail.car.replace(/,/g, '')),
            Number(assetDetail.pension.replace(/,/g, '')),
        ],
        options: {
            chart: {
                type: 'pie' as const,
                background: 'transparent',
                height: 100,
                fontFamily: 'Pretendard',
            },
            labels: ['은행', '증권', '가상자산', '현금', '부동산', '자동차', '연금'],
            colors: ['#c5e2ff', '#ffa4a4', '#fff27f', '#9effb8', '#a5d2ff', '#FFCAD4', '#fadab5' ],
            dataLabels: {
                enabled: false,
            },
        },
    }), [assetDetail]);

    useEffect(() => {
        async function getMemberWish() {
            const response = await memberService.getMemberWish();
            if(response?.data) {
                const { ...assetsWithoutTotal } = response.data.result.assetsDetail;
                setAssetDetail(assetsWithoutTotal);
            };
        }
        getMemberWish();
    }, []);

    return (
        <div>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="pie"
            />
        </div>
    );
};

export default AssetChart;
