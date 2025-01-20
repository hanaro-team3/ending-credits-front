import React from "react";
import { AssetItemType } from "../type"

interface HorizontalStackedBarProps {
  data: AssetItemType[]; // 데이터 배열
  width?: number; // 전체 그래프 너비
  height?: number; // 전체 그래프 높이
}

const HorizontalStackedBar: React.FC<HorizontalStackedBarProps> = ({ data, width = 400, height = 30 }) => {
  // 전체 값 계산
    const totalValue = data.reduce((sum, segment) => sum + Number(segment.amount), 0);

    return (
        <svg width={width} height={height} style={{ borderRadius: "30px" }}>
        {data.map((segment, index) => {
            // 각 섹션의 너비 비율 계산
            const segmentWidth = (Number(segment.amount) / totalValue) * width;

            // 이전 섹션들의 누적 너비 계산
            const offsetX = data
            .slice(0, index)
            .reduce((sum, prevSegment) => sum + (Number(prevSegment.amount) / totalValue) * width, 0);

            return (
            <rect
                key={index}
                x={offsetX} // 시작 X 위치
                y={0} // 시작 Y 위치
                width={segmentWidth} // 너비
                height={height} // 높이
                fill={segment.color} // 색상
            />
            );
        })}
        </svg>
    );
};

export default HorizontalStackedBar;
