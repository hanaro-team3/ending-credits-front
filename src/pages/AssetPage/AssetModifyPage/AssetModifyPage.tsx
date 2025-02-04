import * as styled from "../styles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import { Input } from "../../../ui/Input";

// services
import { assetService } from "../../../services/api/Asset";

function AssetModifyPage() {
    const { label } = useParams(); 
    const navigate = useNavigate();
    const [cash, setCash] = useState<number | ''>(0);

    useEffect(() => {
        async function getCash() {
            const response = await assetService.getCash();
            if (response?.data) {
                setCash(response.data.result.amount);
            }
        }
        getCash();
    }, []);

    const handleModify = async (value: number) => {
        const response = await assetService.patchCash({amount: value});
        if (response?.data) {
            if(response.data.code === "COMMON200") {
                navigate(`/asset/detail/${label}`);
            }
        }
    }

    return (
        <styled.Container>
            <Header title={label||''} showClose={true} />
            <styled.Title>보유한 돈</styled.Title>
            <Input
                type="number"
                placeholder="보유한 돈"
                suffix="원"
                value={cash === 0 ? '' : cash}
                onChange={(e) => setCash(e.target.value === '' ? '' : Number(e.target.value))}
            />
            <BlueButton variant="large" onClick={() => handleModify(cash || 0)}>저장하기</BlueButton>
        </styled.Container>
    );
} 

export default AssetModifyPage;