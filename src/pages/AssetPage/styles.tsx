import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 1.5rem;
	padding-bottom: 6rem;
	min-height: 100vh;
`;

export const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Title = styled.h2`
	font-size: 23px;
	font-weight: bold;
`;

export const SubTitle = styled.p`
	font-size: 15px;
	color: ${props => props.theme.colors?.gray600};
	line-height: 1.4;
`;

export const CoinImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 350px;
`;

export const MagicButton = styled.button`
	height: 143px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 14px;
	gap: 12px;
	background-color: ${({ theme }) => theme.colors.primary};
	color: white;
`;

export const TabContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 12px;
	border-bottom: 1px solid #C4C4C4;
	overflow-x: scroll;
	
	&::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		-webkit-appearance: none;
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: transparent;
	}
`;

export const TabText = styled.p`
	flex-shrink: 0;
	font-size: 15px;
	text-align: center;
	font-weight: bold;
	padding: 10px 4px;
	color: #C4C4C4;
	
	&.active {
		border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.text};
	}
`;

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;
`;

export const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	h3 {
		font-weight: bold;
	}

	span {
		color: #D9D9D9;
	}
`;

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
	width: 100%;
`;

export const GridItem = styled.div`
	background-color: #e7e7e7;
	border-radius: 12px;
	width: 100%;
	height: 72px;

	display:flex;
	justify-content: center;
	align-items: center;
	text-align:center;

	&.active{
		border: 2px solid ${({ theme }) => theme.colors.primary};
	}
`;

export const RegisterContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding-bottom: 80px;
	position: relative;
	min-height: 100%;
`;

export const ButtonWrapper = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 1rem 1.5rem;
`;