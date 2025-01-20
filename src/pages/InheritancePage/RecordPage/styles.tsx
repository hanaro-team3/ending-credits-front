import styled from "styled-components";

export const HeaderContainer = styled.div`
	width: 100%;
	height: auto;
	padding-top: 20px;
	background-color: #f2f4f5;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 16px;
	color: black;
`;

export const CloseButton = styled.img`
	position: absolute;
	top: 25px;
	right: 29px;
	cursor: pointer;
	width: 12px;
	height: auto;
`;

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const UploadPageContainer = styled.div`
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

export const Title = styled.div`
	width: 330px;
	justify-content: start;
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 23px;
	color: black;
	text-align: left;
	margin-top: 40px;
	line-height: 1.2;
`;

export const SubTitle = styled.div`
	width: 330px;
	justify-content: start;
	font-family: "Pretendard";
	font-weight: 400;
	font-size: 14px;
	color: black;
	text-align: left;
	margin-top: 8px;
	line-height: 1.2;
`;

// Components for InitialPage
export const StepContainer = styled.div`
	width: 330px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	margin-top: 47px;
`;

export const Step = styled.div`
	width: 330px;
	display: flex;
	align-items: center;
	justify-content: start;
`;

export const Number = styled.div`
	width: 34px;
	height: 34px;
	background: #4792dc;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 18px;
	color: white;
`;

export const NumberLine = styled.div`
	width: 36px;
	height: 0px;
	border: 1px dashed #6e6e6e;
	transform: rotate(90deg);
	margin: 22px 0;
	padding-right: 2px;
`;

export const StepName = styled.div`
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 17px;
	color: #2b2b2b;
	margin-left: 15px;

	> span {
		color: #4792dc;
		font-weight: 700;
	}
`;

export const Line = styled.div`
	width: 393px;
	height: 0px;
	border: 0.5px solid #6d6d6d;
	margin-top: 180px;
`;

export const BottomText = styled.div`
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 14px;
	color: #2b2b2b;
	margin-top: 15px;
	margin-bottom: 20px;
`;

export const ButtonBottomDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 100px;
`;

export const TopContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

export const ScriptDiv = styled.div`
	width: 330px;
	height: 385px;
	border: 1px solid #909090;
	border-radius: 12px;
	margin-top: 52px;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 22px;
	color: #2b2b2b;

	span {
		color: #8b8b8b;
	}
`;

export const WaveformContainer = styled.div`
	width: 330px;
	height: 60px;
	background-color: #f2f4f5;
	border-radius: 12px;
	margin: 20px 0;
	position: absolute;
	bottom: 165px;
	z-index: 1;
`;

export const RecordBottomDiv = styled.div`
	width: 393px;
	height: 180px;
	bottom: 0;
	background: #d0d4d7;
	display: flex;
	justify-content: center;
`;

export const RecordButton = styled.img`
	width: 67px;
	height: 67px;
	position: relative;
	top: 30px;
`;
