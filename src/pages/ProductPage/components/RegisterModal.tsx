import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import BlueButton from "../../../ui/BlueBtn";
import Modal from "../../../layout/Modal";
import { message } from 'antd';

// services
import { productService } from '../../../services/api/Product';
import {PensionSavingsCalculate} from '../../../services/dto/Product';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [productDetail, setProductDetail] = useState<PensionSavingsCalculate>();
    const {id} = useParams();

    useEffect(() => {
        async function getPensionSavingsCalculate() {
            if (!id) {
                message.error("존재하지 않는 상품입니다");
                return;
            }
            try{
                const response = await productService.getPensionSavingsCalculate(id);
                if (response?.data) {
                    setProductDetail(response.data.result);
                }else{
                    message.error('상품 상세 조회 실패');
                }
            }catch(error){
                console.error(error);
                message.error('상품 상세 조회 실패');
            }
        }
        getPensionSavingsCalculate();
    }, [id]);

    const handleRegister = () => {
        message.success('상품 가입 신청 완료!');
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '30px', 
                textAlign: 'center', 
                fontSize: '18px' 
            }}>
                <div>
                    <DotLottieReact
                        src="https://lottie.host/4f4850d1-a0b3-4887-8615-108bba756fd0/NUT4PqgDtr.json"
                        loop
                        autoplay
                    />
                    <p>2천 만원으로 3년 가입 시<br />{Number(productDetail?.expectedProfit).toLocaleString()}원의 수익을 예상해요.</p>
                </div>
                <p style={{fontWeight: '600'}}>
                    3년 후에는 1년에 {Number(productDetail?.annualAdditionalUsage).toLocaleString()}원,<br />한달에 {Number(productDetail?.monthlyAdditionalUsage).toLocaleString()}원 더 사용할 수 있어요.
                </p>
                <BlueButton onClick={handleRegister}>가입하기</BlueButton>
            </div>
        </Modal>
    );
} 