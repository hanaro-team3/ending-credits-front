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
