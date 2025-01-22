import React from "react";
import { Link } from "react-router-dom";
import * as styled from "../styles";
import closeicon from "../../../../images/close-icon.png";

export const Header: React.FC = () => (
	<styled.HeaderContainer>
		<span>클릭 설계</span>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<styled.CloseButton src={closeicon} />
		</Link>
	</styled.HeaderContainer>
);
