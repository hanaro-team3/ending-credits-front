import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 1.5rem;
	padding-bottom: 6rem;
`;

export const Logo = styled.img`
	width: 160px;
	height: auto;
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Title = styled.h3`
	font-size: 1.5rem;
	font-weight: bold;
`;

export const SearchBarWrapper = styled.div`
	position: relative;
	width: 100%;
`;

export const SearchBar = styled.input`
	width: 100%;
	height: 40px;
	border: 1px solid #eee;
	border-radius: 1rem;
	padding: 1rem;
	font-size: 15px;
	padding-right: 3rem;
	font-family: "Pretendard";
	background-color: white;
`;

export const SearchIcon = styled.img`
	position: absolute;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	width: 20px;
	height: 20px;
	cursor: pointer;
`;

export const Carousel = styled.div`
	display: flex;
	gap: 1rem;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	-webkit-overflow-scrolling: touch;
	scrollbar-width: none;
	-ms-overflow-style: none;
	
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
	
	-webkit-overflow-scrolling: touch;
	
	scrollbar-gutter: stable both-edges;
`;

export const CarouselItem = styled.div<{ $bgColor?: string }>`
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	gap: 0.2rem;
	padding: 1rem;
	background-color: ${props => props.$bgColor || 'white'};
	width: 140px;
	height: 140px;
	border-radius: 1rem;
`;

export const CarouselDescription = styled.span`
	font-size: 0.9rem;
	font-weight: bold;
	color: ${props => props.theme.colors?.gray600 || '#666'};
`;

export const CarouselTitle = styled.p`
	font-size: 0.9rem;
	font-weight: bold;
`;

export const StatusCard = styled.div`
	background-color: white;
	border-radius: 1rem;
	padding: 1rem;
	width: 100%;
	min-height: 144px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
`;

export const StatusContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StatusTitle = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
`;

export const StatusDescription = styled.p`
	font-weight: 500;
	line-height: 1.2rem;
	.highlight {
		color: ${props => props.theme.colors?.primary || '#4C7EA5'};
		margin-right: 0.2rem;
		font-weight: bold;
	}
`;

export const AssetCard = styled.div`
	background-color: white;
	border-radius: 1rem;
	padding: 1rem;
	width: 100%;
	min-height: 144px;

	.apexcharts-canvas {
		background: transparent !important;
	}
`;

export const AssetSection = styled(Section)`
	position: relative;
`;

export const AssetButton = styled.button`
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	background-color: ${props => props.theme.colors?.primary || '#4C7EA5'};
	color: white;
	border-radius: 1rem;
	padding: 0.5rem 1rem;
`;

export const EndingCreditSection = styled(Section)``;

export const GuideContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
`;

export const GuideCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	background-color: white;
	border-radius: 1rem;
	padding: 1rem;
`;

export const GuideTitle = styled.h4`
	font-weight: bold;
`;

export const GuideDescription = styled.p`
	color: ${props => props.theme.colors?.gray600 || '#666'};
`;

export const GuideIcon = styled.img`
	width: 30px;
	height: auto;
	align-self: flex-end;
`;

export const Banner = styled.div`
	background-color: #4C7EA5;
	border-radius: 0.5rem;
	padding: 1rem;
	color: white;
	font-weight: bold;
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const BannerDescription = styled.small`
	font-size: 0.7rem;
`;

export const BannerContent = styled.div`
	/* display: flex;
	flex-direction: column;
	gap: 0.5rem; */
`;

export const BannerTitle = styled.p`
	/* font-size: 1.2rem; */
`;
