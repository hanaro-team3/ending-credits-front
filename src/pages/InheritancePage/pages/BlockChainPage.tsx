import * as styled from "../../InheritancePage/styles";
import { useNavigate } from "react-router-dom";
import BlueButton from "../../../ui/BlueBtn";
import blockchainicon from "../../../images/congrats-icon.png";

const BlockChainPage = () => {
	const navigate = useNavigate();

	return (
		<styled.BlockChainPageContainer>
			<styled.TopContainer>
				<styled.Title>
					이제부터 유언장은 <br />
					<span style={{ color: "#4792dc" }}>블록체인으로</span>{" "}
					안전하게 관리돼요.
				</styled.Title>
				<styled.SubTitle>
					블록체인 네트워크에서는 허가된 참여자만 접근이 가능하고,{" "}
					<br />
					생성 이력을 추적할 수 있기 때문에 유일성이 보장돼요.
				</styled.SubTitle>
				<styled.BlockChainIcon src={blockchainicon} />
			</styled.TopContainer>
			<styled.ButtonBottomDiv>
				<BlueButton
					variant="large"
					onClick={() => navigate("/inheritance")}
				>
					확인
				</BlueButton>
			</styled.ButtonBottomDiv>
		</styled.BlockChainPageContainer>
	);
};

export default BlockChainPage;
