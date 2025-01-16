import styled from "styled-components";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "large" | "medium" | "small";

// props 타입 정의
interface WhiteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
}

interface StyledButtonProps {
	variant: ButtonVariant;
}

const getButtonSize = (variant: ButtonVariant) => {
	switch (variant) {
		case "large":
			return {
				width: "352px",
				height: "55px",
			};
		case "medium":
			return {
				width: "164px",
				height: "52px",
			};
		case "small":
			return {
				width: "69px",
				height: "29px",
			};
	}
};

const StyledWhiteButton = styled.button<StyledButtonProps>`
	width: ${({ variant }) => getButtonSize(variant).width};
	height: ${({ variant }) => getButtonSize(variant).height};
	background: white;
	border-radius: 12px;
	font-family: "Pretendard";
	font-weight: 600;
	color: black;
	cursor: pointer;
	border: none;

	&:active {
		background-color: #ebebeb; // 클릭 시 더 어두운 색상
		border: none;
	}
`;

const WhiteButton = ({
	children,
	variant = "large",
	...props
}: WhiteButtonProps) => {
	return (
		<StyledWhiteButton variant={variant} {...props}>
			<span>{children}</span>
		</StyledWhiteButton>
	);
};

export default WhiteButton;
