import * as styled from "../styles";

import arrow from "../../../assets/icon/arrow.png";

interface AssetCardProps {
    label: string;
    value: string;
    highlight?: string;
    onClick?: () => void;
}

export function AssetCard({ label, value, highlight, onClick }: AssetCardProps) {
    return (
        <styled.CardColumn highlight={highlight}>
            <span>{label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span>{value}원</span>
                {onClick && <img src={arrow} alt="arrow" onClick={onClick}/>}
            </div>
        </styled.CardColumn>
    );
} 