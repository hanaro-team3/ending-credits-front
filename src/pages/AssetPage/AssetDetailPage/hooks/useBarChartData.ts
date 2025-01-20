import { useState } from 'react';

export const useChartData = () => {
    const [chartData] = useState({
        series: [
        {
            name: 'Marine Sprite',
            data: [44],
        },
        {
            name: 'Striking Calf',
            data: [53],
        },
        {
            name: 'Tank Picture',
            data: [12],
        },
        {
            name: 'Bucket Slope',
            data: [9],
        },
        {
            name: 'Reborn Kid',
            data: [25],
        },
        ],
        options: {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
        },
        plotOptions: {
            bar: {
            horizontal: true,
            },
        },
        xaxis: {
            categories: [2008],
            labels: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        axisBorder: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        }
        },
    });

    return { chartData };
};
