import * as styled from "../styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import {message} from "antd"

// services
import { memberService } from "../../../services/api/Member";


function AssetCalculatePage() {
    const [total, setTotal] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [retirementAge, setRetirementAge] = useState(0);
    const [expectedLife, setExpectedLife] = useState(0);

    const handleCalculate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = Number(value);

        // 현재 입력된 값과 다른 상태값들을 이용해서 계산
        if(name === "monthlyExpense") {
            setMonthlyExpense(numValue*10000);
            setTotal(numValue * 12 * (expectedLife - retirementAge));
        } else if(name === "retirementAge") {
            setRetirementAge(numValue);
            setTotal(monthlyExpense * 12 * (expectedLife - numValue));
        } else if(name === "expectedLife") {
            setExpectedLife(numValue);
            setTotal(monthlyExpense * 12 * (numValue - retirementAge));
        }
    }

    useEffect(()=>{
        if(total > 0){
            patchMemberWith(total.toString());
        }
    },[monthlyExpense, retirementAge, expectedLife, total])

    const patchMemberWith = async (total:string) => {
        try {
            const response = await  memberService.patchMemberWish(total);
            return response.data.result;
        } catch (error) {
            console.error(error);
            message.error('희망 자산 저장 실패');
            return null;
        }
    };

    const formatKoreanNumber = (num: number) => {
        if (num === 0) return "0";
        
        const units = ["", "만", "억", "조"];
        let result = "";
        let unitIndex = 0;
        
        while (num > 0) {
            const part = num % 10000;
            if (part > 0) {
                result = part + units[unitIndex] + " " + result;
            }
            num = Math.floor(num / 10000);
            unitIndex++;
        }
        
        return result.trim();
    };

    const navigate = useNavigate();

    return (
        <styled.Container>
            <Header title="자금 계산" showClose={true} />
            <h3>희망하는 월 생활비</h3>
            <styled.InputWrapper>
                <styled.Input type="number" name="monthlyExpense" onChange={handleCalculate} />
                <styled.InputSuffix>만원</styled.InputSuffix>
            </styled.InputWrapper>

            <h3>은퇴 예정 나이</h3>
            <styled.InputWrapper>
                <styled.Input type="number" name="retirementAge" onChange={handleCalculate} />
                <styled.InputSuffix>세</styled.InputSuffix>
            </styled.InputWrapper>

            <h3>기대 수명</h3>
            <styled.InputWrapper>
                <styled.Input type="number" name="expectedLife" onChange={handleCalculate} />
                <styled.InputSuffix>세</styled.InputSuffix>
            </styled.InputWrapper>

            {total > 0 && (
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"200px"}}>
                    <p style={{fontSize:"20px", fontWeight:"bold", textAlign:"center"}}>
                        총 <span style={{color:"#4792DC"}}>{formatKoreanNumber(total)}원</span>의 자산이 필요해요.
                    </p>
                </div>
            )}
            <styled.ButtonWrapper>
                <BlueButton variant="large" onClick={() => {navigate("/asset")}}>저장하기</BlueButton>
            </styled.ButtonWrapper>
        </styled.Container>
    );
}

export default AssetCalculatePage;
