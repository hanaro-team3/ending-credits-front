import React from "react";
import { Link } from "react-router-dom";
import * as styled from "../UploadPhotoPage/styles";
import closeicon from "../../../images/close-icon.png";

const Header: React.FC = () => (
	<styled.HeaderContainer>
		<span>사진 업로드</span>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<styled.CloseButton src={closeicon} />
		</Link>
	</styled.HeaderContainer>
);

export default Header;
