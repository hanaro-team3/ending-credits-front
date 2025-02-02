import { useMemo } from 'react';
import { PensionSavingDetail, AnnuityDetail } from '../../../services/dto/Product';

type ChartDataProps = {
    productDetail?: PensionSavingDetail | AnnuityDetail;
    activeType: string;
}

export const useChartData = ({ productDetail, activeType }: ChartDataProps) => {
    const categories = {
        연금저축: ['3년 전', '2년 전', '1년 전', '현재'],
        퇴직연금: ['10년 전', '7년 전', '5년 전', '3년 전', '현재']
    }

    const options = {
        chart: {
            type: 'area' as const,
            toolbar: { show: false, download: false, selection: false, zoom: false, zoomin: false, zoomout: false, pan: false, reset: false },
            zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' as const },
        xaxis: {
            categories: categories[activeType as keyof typeof categories]
        },
        yaxis: {
            labels: {
                formatter: (value: number) => `${value.toFixed(2)}%`
            }
        }
    }

    const chartData = useMemo(() => {
        if (!productDetail) return {
            earnRate: { series: [{ name: '수익률', data: [] }], options },
            feeRate: { series: [{ name: '수수료', data: [] }], options }
        };

        if ('productType' in productDetail) {
            // PensionSavingDetail 타입인 경우
            const earnRateData = [
                productDetail.threeYearsAgoEarnRate || 0,
                productDetail.twoYearsAgoEarnRate || 0,
                productDetail.previousYearEarnRate || 0,
                productDetail.currentEarnRate || 0
            ];

            const feeRateData = [
                productDetail.threeYearsAgoFeeRate || 0,
                productDetail.twoYearsAgoFeeRate || 0,
                productDetail.previousYearFeeRate || 0
            ];

            return {
                earnRate: {
                    series: [{
                        name: '수익률',
                        data: earnRateData
                    }],
                    options
                },
                feeRate: {
                    series: [{
                        name: '수수료',
                        data: feeRateData
                    }],
                    options
                }
            };
        } else {
            // AnnuityDetail 타입인 경우
            const guaranted = productDetail?.earnRates["원리금 보장"];
            const unguaranted = productDetail?.earnRates["원리금 비보장"];

            return {
                earnRate: {
                    series: [
                        {
                            name: 'IRP',
                            data: [
                                guaranted?.irpEarnRate10 || 0,
                                guaranted?.irpEarnRate7 || 0,
                                guaranted?.irpEarnRate5 || 0,
                                guaranted?.irpEarnRate3 || 0,
                                guaranted?.irpEarnRate || 0,
                            ]
                        },
                        {
                            name: 'DC',
                            data: [
                                guaranted?.dcEarnRate10 || 0,
                                guaranted?.dcEarnRate7 || 0,
                                guaranted?.dcEarnRate5 || 0,
                                guaranted?.dcEarnRate3 || 0,
                                guaranted?.dcEarnRate || 0,
                            ]
                        },
                        {
                            name: 'DB',
                            data: [
                                guaranted?.dbEarnRate10 || 0,
                                guaranted?.dbEarnRate7 || 0,
                                guaranted?.dbEarnRate5 || 0,
                                guaranted?.dbEarnRate3 || 0,
                                guaranted?.dbEarnRate || 0,
                            ]
                        }
                    ],
                    options
                },
                feeRate: {
                    series: [
                        {
                            name: 'IRP',
                            data: [
                                unguaranted?.irpEarnRate10 || 0,
                                unguaranted?.irpEarnRate7 || 0,
                                unguaranted?.irpEarnRate5 || 0,
                                unguaranted?.irpEarnRate3 || 0,
                                unguaranted?.irpEarnRate || 0,
                            ]
                        },
                        {
                            name: 'DC',
                            data: [
                                unguaranted?.dbEarnRate10 || 0,
                                unguaranted?.dcEarnRate7 || 0,
                                unguaranted?.dcEarnRate5 || 0,
                                unguaranted?.dcEarnRate3 || 0,
                                unguaranted?.dcEarnRate || 0,
                            ]
                        },
                        {
                            name: 'DB',
                            data: [
                                unguaranted?.dbEarnRate10 || 0,
                                unguaranted?.dbEarnRate7 || 0,
                                unguaranted?.dbEarnRate5 || 0,
                                unguaranted?.dbEarnRate3 || 0,
                                unguaranted?.dbEarnRate || 0,
                            ]
                        }
                    ],
                    options
                }
            };
        }
    }, [productDetail, activeType, options]);

    return { chartData };
}; 