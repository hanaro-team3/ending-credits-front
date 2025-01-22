import styled from "styled-components";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "large" | "medium" | "small";

// props 타입 정의
interface BlueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	disabled?: boolean;
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

const StyledBlueButton = styled.button<StyledButtonProps>`
	width: ${({ variant }) => getButtonSize(variant).width};
	height: ${({ variant }) => getButtonSize(variant).height};
	background: #4792dc;
	border-radius: 12px;
	font-family: "Pretendard";
	font-weight: 600;
	color: white;
	cursor: pointer;
	border: none;

	&:active {
		background-color: #306394;
		border: none;
	}

	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.7;
	}
`;

const BlueButton = ({
	children,
	variant = "large",
	disabled = false,
	...props
}: BlueButtonProps) => {
	return (
		<StyledBlueButton variant={variant} disabled={disabled} {...props}>
			<span>{children}</span>
		</StyledBlueButton>
	);
};

export default BlueButton;
