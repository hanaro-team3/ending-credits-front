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
	background: ${props => props.theme.colors?.background || '#F2F4F5'};
	overflow-y: auto;
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
`;

export const Step = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
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
	position: relative;
	width: 100%;
`;

export const Content = styled.div<{ $direction: 'left' | 'right' }>`
	position: absolute;
	width: 100%;
	animation: ${props => props.$direction === 'left' ? slideLeft : slideRight} 0.3s ease-in-out;
`;
