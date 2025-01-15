import * as styled from "./styles";
import { useNavigate } from "react-router-dom";
import ex from "../assets/icon/ex.png";

interface HeaderProps {
    title: string;
    showClose?: boolean;
}

function Header({ 
    title, 
    showClose = true,
}: HeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
            navigate(-1);
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