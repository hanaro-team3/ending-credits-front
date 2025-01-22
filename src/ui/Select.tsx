import { useState } from "react";
import styled from "styled-components";


const SelectContainer = styled.div`
	display: flex;
	gap: 8px;

    width: 100%;
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

const SelectItem = styled.div`
	flex-shrink: 0;
	background-color: #EEEEEE;
	color: #878787;
	padding: 5px 15px;
	border-radius: 20px;
    font-size: 14px;

	&.active {
		background-color: #4792dc;
		color: white;
	}
`;

const Select = ({ items }: { items: string[] }) => {
    const [activeItem, setActiveItem] = useState(0);

    const handleClick = (index: number) => {
        setActiveItem(index);
    };

    return (
        <SelectContainer>
            {items.map((item, index) => (
                <SelectItem key={index} className={index === activeItem ? "active" : ""} onClick={() => handleClick(index)}>{item}</SelectItem>
            ))}
        </SelectContainer>
    );
};

export default Select;