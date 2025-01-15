import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 140px;

	position: absolute;
	bottom: 0;
	left: 0;
	background-color: white;

	border-radius: 17px 17px 0 0;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0 22.5px;
`;

export const Category = styled.div`
	width: 78px;
	height: 100%;
	padding-bottom: 60px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	cursor: pointer;
`;

export const CategoryImageDiv = styled.div`
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const CategoryImage = styled.img`
	width: 32px;
	height: auto;
`;

export const CategoryName = styled.div`
	font-family: "Pretendard";
	font-size: 12px;
	color: #2b2b2b;
	margin-top: 4px;
`;

export const Header = styled.header`
	position:relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 0;
`;

export const HeaderTitle = styled.h1`
	font-size: 18px;
	font-weight: bold;
`;

export const IconButton = styled.img`
	position: absolute;
	right: 10px;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
	padding: 8px;
`;
