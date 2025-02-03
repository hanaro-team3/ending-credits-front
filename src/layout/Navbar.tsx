import * as styled from "./styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import home from "../images/navbar-home.png";
import money from "../images/navbar-money.png";
import assets from "../images/navbar-assets.png";
import profile from "../images/navbar-profile.png";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<styled.Container>
			<styled.Category onClick={() => navigate("/")}>
				<styled.CategoryImageDiv>
					<styled.CategoryImage src={home} />
				</styled.CategoryImageDiv>
				<styled.CategoryName>홈</styled.CategoryName>
			</styled.Category>
			<styled.Category onClick={() => navigate("/inheritance")}>
				<styled.CategoryImageDiv>
					<styled.CategoryImage src={money} />
				</styled.CategoryImageDiv>
				<styled.CategoryName>상속</styled.CategoryName>
			</styled.Category>
			<styled.Category onClick={() => navigate("/asset")}>
				<styled.CategoryImageDiv>
					<styled.CategoryImage src={assets} />
				</styled.CategoryImageDiv>
				<styled.CategoryName>자산</styled.CategoryName>
			</styled.Category>
			<styled.Category onClick={() => navigate("/profile")}>
				<styled.CategoryImageDiv>
					<styled.CategoryImage src={profile} />
				</styled.CategoryImageDiv>
				<styled.CategoryName>내 정보</styled.CategoryName>
			</styled.Category>
		</styled.Container>
	);
};

export default Navbar;
