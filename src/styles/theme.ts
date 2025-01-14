export const theme = {
	colors: {
		primary: "#007AFF",
		secondary: "#5856D6",
		background: "#FFFFFF",
		text: "#000000",
		gray: {
			light: "#F2F2F7",
			medium: "#C7C7CC",
			dark: "#8E8E93",
		},
	},
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "16px",
		lg: "24px",
		xl: "32px",
	},
	breakpoints: {
		mobile: "320px",
		tablet: "768px",
		desktop: "1024px",
	},
};

export type Theme = typeof theme;
