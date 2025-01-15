import styled, { keyframes } from "styled-components";

const slideOut = keyframes`
	from {
		transform: translateX(0);
		opacity: 1;
	}
	to {
		transform: translateX(100%);
		opacity: 0;
	}
`;

const slideLeft = keyframes`
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
`;

const slideRight = keyframes`
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0);
	}
`;

export const Container = styled.div<{ $isLeaving: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 0 1.5rem 6rem 1.5rem;
	animation: ${props => props.$isLeaving ? slideOut : 'none'} 0.3s ease-in-out;
	min-height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	/* -webkit-overflow-scrolling: touch; */

`;

export const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3px;
`;

export const Title = styled.h2`
	font-size: 23px;
	font-weight: bold;
`;

export const SubTitle = styled.p`
	font-size: 15px;
`;

export const TabContainer = styled.div`
	width: 100%;
	display: flex;
	border-bottom: 1px solid #C4C4C4;
`;

export const TabText = styled.p`
	width: 100%;
	font-size: 15px;
	text-align: center;
	font-weight: bold;
	padding: 10px 0;
	color: #C4C4C4;
	
	&.active {
		border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.text};
	}
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 36px;
	width: 100%;
`;

export const Step = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;

	img {
		max-width: 100%;
		height: auto;
	}
`;

export const StepNumber = styled.p`
	color: ${({ theme }) => theme.colors.primary};
	font-size: 13px;
	font-weight: bold;
`;

export const StepTitle = styled.h4`
	font-size: 18px;
	font-weight: bold;
`;

export const ContentWrapper = styled.div`
	flex: 1;
	overflow-y: auto;
	padding-bottom: 2rem;
	position: relative;
	width: 100%;
	overflow-x: hidden;
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

export const Content = styled.div<{ $direction: 'left' | 'right' }>`
	position: absolute;
	width: 100%;
	left: 0;
	animation: ${props => props.$direction === 'left' ? slideLeft : slideRight} 0.3s ease-in-out;
`;
