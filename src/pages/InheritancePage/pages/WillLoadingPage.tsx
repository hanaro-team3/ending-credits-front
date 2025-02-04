import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import * as styled from "../../InheritancePage/styles";

const WillLoadingPage = () => {

	return (
		<styled.BlockChainPageContainer>
			<styled.TopContainer>
				<styled.Title>
                    안전하게 관리된 <br />
					<span style={{ color: "#4792dc" }}>블록체인으로</span>{" "}
					저장된 유언장을 <br />
                    불러오고 있습니다.
				</styled.Title>
				<styled.SubTitle>
					블록체인 네트워크에서는 허가된 참여자만 접근이 가능하고,{" "}
					<br />
					생성 이력을 추적할 수 있기 때문에 유일성이 보장돼요.
				</styled.SubTitle>
                <DotLottieReact
                    src="https://lottie.host/b0202547-c342-4a93-8fad-f241ff629f78/lfGlz8UMsB.lottie"
                    loop
                    autoplay
                    style={{marginTop: "150px", width: "100px", height: "auto"}}
                />
			</styled.TopContainer>
		</styled.BlockChainPageContainer>
	);
};

export default WillLoadingPage;
