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

export const BackButton = styled.img`
	position: absolute;
	top: 25px;
	left: 21px;
	cursor: pointer;
	width: 15px;
	height: auto;
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
	/* justify-content: space-between; */
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

export const StepContainer = styled.div`
	width: 330px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	margin-top: 47px;
`;

export const StepContainerLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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

export const StepContainerRight = styled.div`
	width: 100%;
	height: 274px;
	border: 1px solid black;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
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

// Page 1 --------------------------------------------

export const Page1WhiteBox = styled.div`
	width: 330px;
	height: 206px;

	background: #ffffff;
	border: 1.5px solid #eeeeee;
	border-radius: 12px;

	margin-top: 36px;
	padding: 33px 23px 33px 23px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
`;

export const Page1WhiteBoxInfo = styled.div`
	display: flex;
	align-items: center; // center에서 flex-start로 변경
	justify-content: flex-start; // center에서 flex-start로 변경
	width: 100%; // width 추가
`;

export const Page1WhiteBoxInfoHead = styled.div`
	width: auto;
	min-width: 85px;
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 18px;
	color: #2b2b2b;
`;

export const Page1WhiteBoxInfoBody = styled.div`
	font-family: "Pretendard";
	font-weight: 400;
	font-size: 16px;
	color: #2b2b2b;
	margin-left: 10px;
`;

export const Page1EditSection = styled.div`
	width: 330px;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

// Page 2 --------------------------------------------

export const Page2BlueBox = styled.div`
	width: 330px;
	height: 168px;

	background: #4792dc;
	border-radius: 12px;

	margin-top: 17px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Page2RobotIcon = styled.img`
	width: 72px;
	height: auto;
	margin-right: 15px;
`;

export const Page2BlueBoxText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

export const Page2BlueBoxTextTop = styled.div`
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 22px;
	color: white;
`;

export const Page2BlueBoxTextBottom = styled.div`
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 14px;
	color: white;
	line-height: normal;
	margin-top: 14px;
`;

export const Page2SubTitle = styled.div`
	width: 330px;
	justify-content: start;
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 20px;
	color: #2b2b2b;
	margin-top: 40px;
	margin-bottom: 8px;
`;

export const Page2SelectBox = styled.div`
	width: 330px;
	height: 144px;

	background: #ffffff;
	border: 1.5px solid #eeeeee;
	border-radius: 12px;

	margin-bottom: 10px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0 33px;
`;

export const Page2SelectBoxText = styled.div`
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 24px;
	color: #2b2b2b;
`;

export const Page2SelectBoxImage = styled.img`
	width: 56px;
	height: 56px;
`;

// page3 ---------------------------------------

export const WillExampleContainer = styled.div`
	height: 480px;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: scroll;
	margin-top: 20px;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const WillExample = styled.img`
	width: 296px;
	height: auto;

	border: 0.5px solid #2b2b2b;
`;

export const WillExampleText = styled.div`
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 14px;
	color: #2b2b2b;
	margin-top: 10px;
	margin-bottom: 20px;
`;

// page4 -----------------------------------------
export const WillDiv = styled.div`
	width: 296px;
	height: 434px;

	border: 0.5px solid #2b2b2b;
	margin-top: 20px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const PlusBtn = styled.img`
	width: 30px;
	height: auto;
`;

// page5 -------------------------------------------
export const LoadingIcon = styled.img`
	width: 180px;
	height: auto;
	margin-top: 150px;
	margin-bottom: 220px;
`;

// page6 -------------------------------------------
export const TopContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

export const Page6InputDiv = styled.div`
	width: 330px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
`;

export const Page6InputDivText = styled.div`
	min-width: 80px;
	text-align: left;
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 20px;
	color: #2b2b2b;
`;

export const Page6Input = styled.input`
	width: 208px;
	height: 39px;

	background: #ffffff;
	border: 1px solid #c4c4c4;
	border-radius: 8px;
`;

export const Page6Select = styled.select`
	width: 208px;
	height: 39px;

	background: #ffffff;
	border: 1px solid #c4c4c4;
	border-radius: 8px;
	
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 14px;
	color: #2b2b2b;

`;

// page7 -------------------------------------------
export const Page7TextDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

export const Page7TextDivSub = styled.div`
	font-family: "Pretendard";
	font-weight: 400;
	font-size: 14px;
	color: #2b2b2b;
	line-height: normal;
	margin-top: 7px;
`;

// page8 -------------------------------------------
export const Page8WillFrameDiv = styled.div`
	position: relative;
	width: 330px;
	height: auto;
	min-height: 450px;
	padding: 30px;
	margin-top: 38px;
	margin-bottom: 30px;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	/* 첫 번째(가장 바깥쪽) 테두리 */
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 1px solid #524e4d;
	}

	/* 두 번째(중간) 테두리 */
	&::after {
		content: "";
		position: absolute;
		top: 4px;
		left: 4px;
		right: 4px;
		bottom: 4px;
		border: 3px solid #524e4d;
	}

	/* 세 번째(안쪽) 테두리 */
	& > div {
		position: absolute;
		top: 10px;
		left: 10px;
		right: 10px;
		bottom: 10px;
		border: 1px solid #524e4d;
	}
`;

export const Page8WillDecoration = styled.img`
	position: absolute;
	width: 50px;
	height: 50px;
	background-size: contain;
	background-repeat: no-repeat;

	&.top-left {
		top: 10px;
		left: 10px;
	}

	&.top-right {
		top: 10px;
		right: 10px;
		transform: rotate(90deg);
	}

	&.bottom-right {
		bottom: 10px;
		right: 10px;
		transform: rotate(180deg);
	}

	&.bottom-left {
		bottom: 10px;
		left: 10px;
		transform: rotate(270deg);
	}
`;

export const Page8WillInnerDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: auto;
`;

export const Page8WillDate = styled.div`
	width: 316px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 10px;
	color: #2b2b2b;
`;

// EditInfoPage -------------------------------------------
export const EditInfoPageContainer = styled.div`
	width: 330px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

export const EditInfoPageText = styled.div`
	width: 330px;
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 16px;
	color: #2b2b2b;

	display: flex;
	justify-content: flex-start;
	margin-top: 24px;
`;

export const EditInfoPageDiv = styled.div`
	width: 330px;
	height: 55px;

	background: #ffffff;
	border: 1px solid #c4c4c4;
	border-radius: 12px;

	font-family: "Pretendard";
	font-weight: 500;
	font-size: 15px;
	color: #888888;

	margin-top: 6px;

	padding: 18px 20px;
`;

export const EditInfoPageInput = styled.input`
	width: 330px;
	height: 55px;

	background: #ffffff;
	border: 1px solid #c4c4c4;
	border-radius: 12px;

	font-family: "Pretendard";
	font-weight: 500;
	font-size: 15px;
	color: #2b2b2b;

	margin-top: 6px;

	padding: 18px 20px;
`;

//-------------------------
export const InheritorPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	height: 500px;
	overflow-y: scroll;
	margin-top: 28px;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const InheritorPageSection = styled.div`
	background-color: white;
	width: 330px;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	gap: 12px;
	margin-bottom: 16px;
	background: white;
	padding: 12px 24px 24px 24px;
	border-radius: 12px;
`;

export const ButtonSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 15px;
`;

// ------------------------------------

export const WillContent = styled.div`
	padding: 20px;
	text-align: left;

	h2 {
		text-align: center;
		margin-bottom: 10px;
		font-size: 24px;
		font-weight: bold;
	}

	h3 {
		color: #4792dc;
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: 18px;
	}
`;

export const WillSection = styled.div`
	margin: 20px 0;
	padding: 15px;
	border-bottom: 1px solid #eee;

	div {
		margin-bottom: 15px;
		padding: 10px;
		background-color: #f8f9fa;
		border-radius: 8px;
	}

	p {
		margin: 5px 0;
		font-size: 14px;
		line-height: 1.5;
	}
`;

export const DragHandle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background: #f5f5f5;
    border-radius: 4px;
    cursor: grab;
    margin-right: 10px;

    &:active {
        cursor: grabbing;
    }
`;


