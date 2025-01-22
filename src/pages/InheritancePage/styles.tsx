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
	font-weight: 500;
	font-size: 18px;
	color: black;
`;

export const BackButton = styled.img`
	position: absolute;
	top: 35px;
	left: 21px;
	cursor: pointer;
	width: 15px;
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

export const Title = styled.div`
	width: 352px;
	/* display: flex; */
	justify-content: start;
	/* margin-left: 25px; */

	font-family: "Pretendard";
	font-weight: 700;
	font-size: 23px;
	color: black;
	text-align: left;
	margin-top: 40px;
	line-height: 1.2;

	margin-bottom: 18px;
`;

export const SelectDiv = styled.div`
	width: 338px;
	height: 144px;

	background: #ffffff;
	border: 1.5px solid #eeeeee;
	border-radius: 14px;

	display: flex;
	align-items: center;
	justify-content: center;

	margin-top: 24px;

	&:active {
		background-color: #ebebeb; // 클릭 시 더 어두운 색상
		border: none;
	}
`;

export const SelectDivLeft = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
`;

export const SelectDivTitle = styled.div`
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 24px;
	color: #2b2b2b;
	text-align: left;
`;

export const SelectDivSub = styled.div`
	font-family: "Pretendard";
	font-weight: 400;
	font-size: 14px;
	color: #2b2b2b;
	text-align: left;
	margin-top: 6px;
	line-height: normal;
`;

export const SelectDivImg = styled.img`
	width: auto;
	height: 100%;
`;

export const PercentDiv = styled.div`
	width: 73px;
	height: 73px;
	border-radius: 50%;
	border: 10px solid #4792dc;
	margin-left: 49px;

	display: flex;
	align-items: center;
	justify-content: center;

	font-family: "Pretendard";
	font-weight: 700;
	font-size: 16px;
	color: #4792dc;
`;

export const ContactDiv = styled.div`
	width: 338px;
	height: 65px;
	background-color: #5082a9;
	border-radius: 14px;
	margin-top: 14px;

	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

export const ContactDivImg = styled.img`
	width: 34px;
	height: 34px;
	margin-left: 23px;
`;

export const ContactDivText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	margin-left: 18px;
`;

export const ContactDivTextTitle = styled.div`
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 16px;
	color: #ffffff;
	text-align: left;
`;

export const ContactDivTextSub = styled.div`
	font-family: "Pretendard";
	font-weight: 400;
	font-size: 11px;
	color: #ffffff;
	text-align: left;
`;

export const ContactDivButton = styled.img`
	width: 14px;
	height: 14px;
	margin-left: 65px;
`;

export const SubTitle = styled.div`
	width: 352px;
	font-family: "Pretendard";
	font-weight: 400;
	font-size: 14px;
	color: #2b2b2b;
	text-align: left;
	margin-top: 11px;
	line-height: 1.2;
`;

export const BookImg = styled.img`
	width: 55px;
	height: auto;
	margin-left: 30px;
`;
