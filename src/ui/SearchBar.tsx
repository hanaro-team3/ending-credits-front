import styled from "styled-components";
import search from "../assets/icon/search.png";
import { ChangeEvent } from "react";

const SearchBarWrapper = styled.div`
	position: relative;
	width: 100%;
`;

const SearchInput = styled.input`
	width: 100%;
	height: 40px;
	border: 1px solid #eee;
	border-radius: 15px;
	padding: 15px;
	font-size: 15px;
	padding-right: 30px;
	font-family: "Pretendard";
	background-color: white;
`;

const SearchIcon = styled.img`
	position: absolute;
	right: 15px;
	top: 50%;
	transform: translateY(-50%);
	width: 20px;
	height: 20px;
	cursor: pointer;
`;

interface SearchBarProps {
	placeholder?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onSearch?: () => void;
}

const SearchBar = ({ 
	placeholder='궁금한 내용을 검색해 보세요!',
	value,
	onChange,
	onSearch 
}: SearchBarProps) => (
	<SearchBarWrapper>
		<SearchInput 
			name="search" 
			placeholder={placeholder} 
			value={value}
			onChange={onChange} 
		/>
		<SearchIcon
			src={search}
			alt="검색"
			onClick={onSearch}
		/>
	</SearchBarWrapper>
);

export default SearchBar;