import { useState } from 'react';

export const useChartData = () => {
    const [chartData] = useState({
        series: [30, 25, 20, 15],
        options: {
            chart: {
                type: 'pie' as const,
                background: 'transparent',
                height: 100,
                fontFamily: 'Pretendard',
            },
            labels: ['부동산', '예금', '주식', '부족한 자금'],
            colors: ['#FFD998', '#98B2FF', '#8EF8BF', '#FF989A'],
            dataLabels: {
                enabled: false
            }
        }
    });

    return { chartData };
}; 