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
            labels: ['부동산', '예금', '주식', '채권'],
            colors: ['#FFD998', '#98B2FF', '#FF989A', '#8EF8BF'],
            dataLabels: {
                enabled: false
            }
        }
    });

    return { chartData };
}; 