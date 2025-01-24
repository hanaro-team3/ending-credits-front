import styled from "styled-components";

export const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const ProductInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ProductImage = styled.img`
	width: 100px;
	margin-bottom: 30px;
`;

export const ProductCompanyInfo = styled.p`
	color: #888888;
	margin-bottom: 10px;
`;

export const ProductName = styled.p`
	font-size: 20px;
	font-weight: 600;
`;

export const ProductDetailsCard = styled.div`
	background-color: white;
	border-radius: 10px;
	padding: 10px;
	width: 100%;
`;

export const DetailSection = styled.div<{ isBottom?: boolean }>`
	${({ isBottom }) => !isBottom && 'border-bottom: 1px solid #E0E0E0;'}
	padding: ${({ isBottom }) => isBottom ? '10px 0 0 0' : '0 0 10px 0'};
	text-align: center;
`;

export const DetailLabel = styled.p`
	color: #888888;
	padding-bottom: 10px;
`;

export const ChartTitle = styled.h3`
	margin: 0;
`;

export const ButtonContainer = styled.div`
	margin-top: 20px;
`;

export const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
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

export const ProductCarousel = styled.div`
	display: flex;
	gap: 1rem;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	scrollbar-width: none;
	-ms-overflow-style: none;
	padding: 1.5rem 0;
	align-items: center;
	min-height: 300px;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const ProductCard = styled.div<{ $active?: boolean }>`
	width: 250px;
	min-height: ${props => props.$active ? '280px' : '250px'};
	flex-shrink: 0;
	border-radius: 12px;
	padding: 25px;
	display: flex;
	flex-direction: column;
	gap: 25px;
	justify-content: flex-end;
	align-items: center;
	transition: all 0.3s ease;
	opacity: ${props => props.$active ? 1 : 0.7};
	transform: ${props => props.$active ? 'scale(1.05)' : 'scale(1)'};

	p {
		width: 100%;
		font-size: ${props => props.$active ? '18px' : '14px'};
		font-weight: bold;
		line-height: 1.4;
		white-space: pre-line;
	}
`;

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	width: 100%;
`;

export const GridItem = styled.div`
	background-color: #e7e7e7;
	border-radius: 12px;
	width: 100%;
	height: 100px;

	display:flex;
	justify-content: center;
	align-items: center;
	text-align:center;
`;

export const CompareContainer = styled.div`
	display: flex;
	width: 100%;
	height: 350px;
`;

export const CompareItem = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

export const CompareButton = styled.div`
	background-color: white;
	width: 100px;
	height: 100px;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	
`;

export const CompareButtonText = styled.span`
	font-size: 14px;
	color: #878787;
`;

export const TabContainer = styled.div`
	font-weight: bold;
	font-size: 24px;
	width: 100%;
	display: flex;
	gap: 12px;
`;

export const TabText = styled.span<{ $active?: boolean }>`
	color: ${props => props.$active ? '#000' : '#878787'};
`;

export const ProductList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	background-color: white;
	padding: 16px;
	border-radius: 12px;
	max-height: 500px;
	overflow-y: scroll;
`;

export const ProductItem = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
	justify-content: space-between;
`;

export const ProductItemLeft = styled.div`
	display: flex;
	gap: 10px;
`;

export const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ProductTitle = styled.span`
	
`;

export const ProductSubTitle = styled.span`
	font-size: 12px;
	color: #878787;
`;

export const CompareItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const CompareItemText = styled.p`
	background-color: #E3EDF7;
	text-align: center;
	padding: 4px 10px;
	border-radius: 8px;
`;

export const CompareItemTextContainer = styled.div`
	display: flex;
	p{
		width: 100%;
		text-align: center;
		div{
			display: flex;
			gap: 8px;
			justify-content: center;

			span:first-child{
				font-weight: bold;
			}	
		}
	}
`;


