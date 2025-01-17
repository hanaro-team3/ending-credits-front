import * as styled from "./styles";
import { useNavigate } from "react-router-dom";
import ex from "../assets/icon/ex.png";

interface HeaderProps {
    title: string;
    showClose?: boolean;
    onClose?: () => void;
}

function Header({ 
    title, 
    showClose = true,
    onClose
}: HeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        // 페이지 이동 애니메이션 등을 위해 추가
        if (onClose) {
            onClose();
        }
        // 위의 함수가 끝난 후 실행하기 위해 딜레이 추가
        setTimeout(() => {
            navigate(-1);
        }, 280);
    };

    return (
            <styled.Header>
                <styled.HeaderTitle>{title}</styled.HeaderTitle>
                {showClose && (
                    <styled.IconButton 
                        src={ex} 
                        alt="닫기" 
                        onClick={handleBack}
                    />
                )}
            </styled.Header>
    );
}

export default Header; 