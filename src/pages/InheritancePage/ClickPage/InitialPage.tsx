import React from "react";
import BlueButton from "../../../ui/BlueBtn";
import * as styled from "./styles";

interface InitialPageProps {
	onStartUpload: () => void;
}

const InitialPage: React.FC<InitialPageProps> = ({ onStartUpload }) => {
	return (
		<>
			<styled.Title>
				클릭 설계는 다음과 같은 절차로
				<br /> 진행돼요.
			</styled.Title>
			<StepSection />
			<BottomSection onStartUpload={onStartUpload} />
		</>
	);
};

const StepSection = () => (
	<styled.StepContainer>
		<styled.Step>
			<styled.Number>1</styled.Number>
			<styled.StepName>
				피상속인의 <span>인적 정보</span> 확인
			</styled.StepName>
		</styled.Step>
		<styled.NumberLine />
		<styled.Step>
			<styled.Number>2</styled.Number>
			<styled.StepName>
				피상속인의 <span>재산 정보</span> 확인
			</styled.StepName>
		</styled.Step>
		<styled.NumberLine />
		<styled.Step>
			<styled.Number>3</styled.Number>
			<styled.StepName>
				<span>유언 집행자</span> 지정
			</styled.StepName>
		</styled.Step>
		<styled.NumberLine />
		<styled.Step>
			<styled.Number>4</styled.Number>
			<styled.StepName>
				<span>남기고 싶은 말</span> 작성
			</styled.StepName>
		</styled.Step>
		<styled.NumberLine />
		<styled.Step>
			<styled.Number>5</styled.Number>
			<styled.StepName>
				<span>내용 공유 시점</span> 설정
			</styled.StepName>
		</styled.Step>
	</styled.StepContainer>
);

interface BottomSectionProps {
	onStartUpload: () => void;
}

const BottomSection = ({ onStartUpload }: BottomSectionProps) => (
	<>
		<styled.Line />
		<styled.BottomText>
			10분이면 완성하는 설계, 지금 시작해볼까요?
		</styled.BottomText>
		<BlueButton variant="large" onClick={onStartUpload}>
			클릭 설계 시작하기
		</BlueButton>
	</>
);

export default InitialPage;
