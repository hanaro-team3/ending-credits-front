import * as styled from "../styles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";
import { Input } from "../../../ui/Input";
import { message } from "antd";

// services
import { assetService } from "../../../services/api/Asset";
import { PostCarRequestDTO, PostRealEstateRequestDTO } from "../../../services/dto/Asset";

function AssetAddPage() {
    const { label } = useParams(); 
    const navigate = useNavigate();
    const [car, setCar] = useState<PostCarRequestDTO>();
    const [realEstate, setRealEstate] = useState<PostRealEstateRequestDTO>();
    const [name, setName] = useState<string>(''); // car: carNumber, realEstate: name
    const [info, setInfo] = useState<string>(''); // car: model, realEstate: address
    const [purchasePrice, setPurchasePrice] = useState<number | ''>(0);


    useEffect(() => {
        if(label === "자동차") {  
            setCar({model:info, carNumber:name, purchasePrice: purchasePrice || 0});
        }else if(label === "부동산") {
            setRealEstate({name:info, address:name, purchasePrice: purchasePrice || 0, currentPrice: purchasePrice || 0, realEstateType: "기타"});
        }
    }, [info, name, purchasePrice]);


    const handleAdd = async () => {
        if(!info || !name || !purchasePrice) {
            message.error("모든 필드를 입력해주세요.");
            return;
        }
        if(car) {
            const response = await assetService.postCar(car);
            if (response?.data) {
                if(response.data.code === "COMMON200") {
                    navigate(`/asset/detail/${label}`);
                }
            }
        }else if(realEstate) {
            const response = await assetService.postRealEstate(realEstate);
            if (response?.data) {
                if(response.data.code === "COMMON200") {
                    navigate(`/asset/detail/${label}`);
                }
            }
        }
    }

    return (
        <styled.Container>
            <Header title={label||''} showClose={true} />
            <styled.Title>{label} 추가하기</styled.Title>
            <Input
                type="text"
                placeholder={label === "자동차" ? "12나 3456" : "역삼동 롯데캐슬"}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                type="text"
                placeholder={label === "자동차" ? "차량 모델" : "서울특별시 강남구 도곡로13길 19"}
                onChange={(e) => setInfo(e.target.value)}
            />
            <Input
                type="number"
                placeholder="구매한 금액"
                suffix="원"
                onChange={(e) => setPurchasePrice(e.target.value === '' ? '' : Number(e.target.value))}
            />

            <BlueButton variant="large" onClick={() => handleAdd()}>추가하기</BlueButton>
        </styled.Container>
    );
} 

export default AssetAddPage;