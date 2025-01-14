import styled from "styled-components";

export const BackButton = styled.img`
	position: absolute;
	top: 50px;
	left: 21px;
	cursor: pointer;
	width: 15px;
	height: auto;
`;

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

export const Title = styled.h1`
	width: 352px;
	display: flex;
	justify-content: start;
	/* margin-left: 25px; */

	font-family: "Pretendard";
	font-weight: 800;
	font-size: 26px;
	text-align: left;
	margin-top: 100px;
	line-height: 1.2;
`;

export const Form = styled.form`
	width: 352px;
	height: auto;
	margin-top: 31px;
`;

export const Input = styled.input`
	width: 100%;
	height: 55px;
	border: 1.5px solid #eeeeee;
	border-radius: 12px;
	padding: 0 16px;
	margin-bottom: 20px;
	font-family: "Pretendard";
	font-size: 15px;
	background-color: white;
	padding-right: ${(props) => (props.type === "password" ? "48px" : "16px")};

	&:focus {
		outline: none;
		border-color: #4792dc;
	}

	color: black;

	&::placeholder {
		font-size: 15px;
		color: #dadada;
	}
`;

export const Select = styled.select`
	width: 100%;
	height: 55px;
	border: 1.5px solid #eeeeee;
	border-radius: 12px;
	padding: 0 22px 0 16px;
	margin-bottom: 20px;
	font-family: "Pretendard";
	font-size: 15px;
	background-color: white;

	&:focus {
		outline: none;
		border-color: #4792dc;
	}

	color: ${(props) => (props.value === "" ? "#dadada" : "black")};

	option {
		color: black;
	}

	option:first-child {
		color: #dadada;
	}

	&::placeholder {
		font-size: 15px;
		color: #dadada;
	}
`;

export const IdNumberDiv = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 20px;
`;

export const IdNumberFront = styled.div`
	width: 170px;
	height: 55px;
	border: 1.5px solid #eeeeee;
	border-radius: 12px;
	padding: 0 16px;
	font-family: "Pretendard";
	font-size: 15px;
	background-color: white;

	display: flex;
	justify-content: start;
	align-items: center;
`;

export const IdNumberBackDiv = styled.div`
	width: 170px;
	height: 55px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const IdNumberBackDivFront = styled.div`
	width: 48px;
	height: 55px;
	border: 1.5px solid #eeeeee;
	border-radius: 12px;
	padding: 0 16px;
	font-family: "Pretendard";
	font-size: 15px;
	background-color: white;

	display: flex;
	justify-content: start;
	align-items: center;
`;

export const IdNumberBackDivBack = styled.div`
	width: 100%;
	height: 55px;

	font-family: "Pretendard";
	font-weight: 900;
	font-size: 24px;

	padding-top: 8px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const NameDiv = styled.div`
	width: 100%;
	height: 55px;

	border: 1.5px solid #eeeeee;
	border-radius: 12px;
	padding: 0 16px;
	font-family: "Pretendard";
	font-size: 15px;
	background-color: white;

	display: flex;
	justify-content: start;
	align-items: center;
`;

export const InputLabel = styled.label`
	display: block;
	font-family: "Pretendard";
	font-weight: 700;
	font-size: 16px;
	margin-bottom: 4px;
`;

export const PasswordInputWrapper = styled.div`
	position: relative;
	width: 100%;
`;

export const ShowPasswordIcon = styled.img`
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	width: 22px;
	height: auto;
	cursor: pointer;
	margin-top: -10px;
`;

export const ErrorMessage = styled.p`
	color: #ff0000;
	font-size: 12px;
	margin-bottom: 16px;
`;

export const DupCheckBtn = styled.button`
	width: 60px;
	height: 41px;

	border-radius: 12px;
	font-family: "Pretendard";
	font-size: 11px;
	font-weight: 500;
	background-color: #4792dc;
	color: white;

	padding: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);

	cursor: pointer;
	margin-top: -10px;
`;

// export const CheckboxContainer = styled.div`
// 	width: 100%;
// 	height: 55px;

// 	background-color: #f3f4f6;
// 	padding: 0.75rem;
// 	border-radius: 12px;
// 	margin-top: 31px;

// 	font-family: "Pretendard";
// 	font-size: 15px;
// 	font-weight: 400;
// 	color: #2b2b2b;

// 	display: flex;
// 	align-items: center;
// 	justify-content: start;
// `;

export const CheckboxAllContainer = styled.div`
	width: 100%;
	height: 55px;
	background-color: #f3f4f6;
	padding: 12px 12px 12px 22px;
	border-radius: 12px;
	margin-top: 31px;
	font-family: "Pretendard";
	font-size: 15px;
	font-weight: 400;
	color: #2b2b2b;
	display: flex;
	align-items: center;
	justify-content: start;
	cursor: pointer;
	gap: 10px;
`;

export const CheckboxContainer = styled.div`
	width: 100%;
	height: 55px;
	background-color: white;

	padding: 12px 12px 12px 22px;
	border-radius: 12px;
	border: 1.5px solid #eeeeee;

	margin-top: 19px;
	font-family: "Pretendard";
	font-size: 15px;
	font-weight: 400;
	color: #2b2b2b;
	display: flex;
	align-items: center;
	justify-content: start;
	cursor: pointer;
	gap: 10px;
`;

export const Checkbox = styled.div`
	width: 19px;
	height: 19px;
	border: 1.5px solid #eeeeee;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => (props.checked ? "#4792DC" : "white")};

	&:after {
		content: "";
		display: ${(props) => (props.checked ? "block" : "none")};
		width: 3px;
		height: 6px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
		margin-bottom: 2px;
	}
`;
