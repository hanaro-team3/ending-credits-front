import * as styled from "../styles";
import { useParams } from "react-router-dom";
import { assetService } from "../../../services/api/AssetView";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import { Input } from "../../../ui/Input";

function AssetModifyPage() {
    const { label } = useParams(); 
    const [value, setValue] = useState<number>(0);
    const navigate = useNavigate();

    const handleModify = async (value: number) => {
        const response = await assetService.patchCash({amount:value});
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
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <BlueButton variant="large"onClick={() => handleModify(value)}>저장하기</BlueButton>
        </styled.Container>
    );
} 

export default AssetModifyPage;