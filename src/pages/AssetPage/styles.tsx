import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 0 20px;
	padding-bottom: 100px;
	min-height: 100vh;
`;

export const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
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
	height: 400px;
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
	gap: 15px;
	margin-bottom: 30px;
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
	gap: 15px;
	padding-bottom: 80px;
	position: relative;
	min-height: 100%;
`;

export const ButtonWrapper = styled.div`
	position: fixed;
	bottom: 40px;
	left: 20px;
`;

export const CardColumn = styled.div<{ highlight?: string }>`
	background-color: ${({ highlight }) => highlight=='blue' ? "#4792dc31" : highlight=='red' ? "rgba(246, 162, 162, 0.15)" : "white"};
	border-radius: 12px;
	padding: 24px 16px;
	display: flex;
	justify-content: space-between;

	span {
		font-weight: ${({ highlight }) => highlight ? 700 : 400};
	}
`;

export const InputWrapper = styled.div`
	position: relative;
	width: 100%;
`;

export const Input = styled.input`
	font-family: "Pretendard";
	font-size: 15px;
	border-radius: 12px;
	border: 1px solid #4792DC;
	padding: 10px;
	padding-right: 50px;
	width: 100%;
	text-align: right;
`;

export const InputSuffix = styled.span`
	position: absolute;
	right: 12px;
	top: 50%;
	transform: translateY(-50%);
	color: #666;
	font-size: 15px;
`;

export const AssetList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const AssetItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
`;

export const AssetItemLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const AssetItemRight = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	text-align: right;
`;

export const AssetContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	background-color: white;
	border-radius: 12px;
	padding: 8px;
`;

export const AssetIcon = styled.img`
	width: 30px;
	height: 30px;
`;

// AssetDetailPage 스타일
export const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 20px;
	padding-bottom: 100px;
`;

export const DetailTitle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-bottom: 16px;

	h2 {
		font-size: 20px;
		font-weight: bold;
	}

	p {
		font-size: 24px;
		font-weight: bold;
		color: ${props => props.theme.colors.primary};
	}
`;

export const DetailSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const DetailCard = styled.div`
	background-color: white;
	border-radius: 12px;
	padding: 16px;
`;

export const DetailList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const DetailItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
`;

export const DetailItemLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;

	img {
		width: 32px;
		height: 32px;
	}

	p {
		font-size: 15px;
	}
`;

export const DetailItemRight = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	p {
		font-size: 15px;
		font-weight: 500;
	}
`;

export const ChartContainer = styled.div`
	margin: 16px 0;
	
	.apexcharts-canvas {
		margin: 0 auto;
	}
`;

export const IconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const AccountSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const AccountTitle = styled.h3`
	font-size: 16px;
	font-weight: bold;
`;

export const AccountList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 16px;
	background-color: white;
	padding: 16px;
	border-radius: 12px;
`;

export const AccountItem = styled.li`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const AccountBank = styled.p`
	font-size: 13px;
	color: ${props => props.theme.colors.primary};
`;

export const AccountRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const AccountName = styled.p`
	font-weight: bold;
`;

export const AccountNumber = styled.p`
	font-size: 12px;
	color: #888888;
`;

export const AccountReturn = styled.p`
	font-size: 12px;
	color: #ff4848;
`;
