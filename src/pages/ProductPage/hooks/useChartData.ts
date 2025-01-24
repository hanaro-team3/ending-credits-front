import { useMemo } from 'react';
import { PensionSavingDetail } from '../../../services/dto/Product';

export const useChartData = (productDetail?: PensionSavingDetail) => {
    const chartData = useMemo(() => {
        const earnRateData = [
            productDetail?.threeYearsAgoEarnRate || 0,
            productDetail?.twoYearsAgoEarnRate || 0,
            productDetail?.previousYearEarnRate || 0,
            productDetail?.currentEarnRate || 0
        ];

        const feeRateData = [
            productDetail?.threeYearsAgoFeeRate || 0,
            productDetail?.twoYearsAgoFeeRate || 0,
            productDetail?.previousYearFeeRate || 0
        ];

        console.log(earnRateData);

        return {
            earnRate: {
                series: [{
                    name: '수익률',
                    data: earnRateData
                }],
                options: {
                    chart: {
                        type: 'area',
                        toolbar: { show: false,download: false,selection: false,zoom: false,zoomin: false,zoomout: false,pan: false,reset: false },
                        zoom: { enabled: false },
                    },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth' },
                    xaxis: {
                        categories: ['3년 전', '2년 전', '1년 전', '현재']
                    },
                    yaxis: {
                        labels: {
                            formatter: (value: number) => `${value.toFixed(2)}%`
                        }
                    }
                }
            },
            feeRate: {
                series: [{
                    name: '수수료',
                    data: feeRateData
                }],
                options: {
                    chart: {
                        type: 'area',
                        toolbar: { show: false,download: false,selection: false,zoom: false,zoomin: false,zoomout: false,pan: false,reset: false },
                        zoom: { enabled: false },
                    },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth' },
                    xaxis: {
                        categories: ['3년 전', '2년 전', '1년 전']
                    },
                    yaxis: {
                        labels: {
                            formatter: (value: number) => `${value.toFixed(2)}%`
                        }
                    }
                }
            }
        };
    }, [productDetail]);

    return { chartData };
}; 