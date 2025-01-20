import Navbar from "../../layout/Navbar";
import { Link } from "react-router-dom";
import * as styled from "./styles";
import click from "../../images/inheritance-click.png";
import record from "../../images/inheritance-record.png";
import upload from "../../images/inheritance-photo.png";

const Header = () => (
	<styled.HeaderContainer>
		<span>상속 설계</span>
	</styled.HeaderContainer>
);

const SelectSection = () => (
	<>
		<Link to="/inheritance/click" style={{ textDecoration: "none" }}>
			<styled.SelectDiv>
				<styled.SelectDivLeft>
					<styled.SelectDivTitle>클릭하기</styled.SelectDivTitle>
					<styled.SelectDivSub>
						준비된 단계에 따라 <br /> 클릭이나 입력을 해주세요.
					</styled.SelectDivSub>
				</styled.SelectDivLeft>
				<styled.SelectDivImg
					src={click}
					style={{
						width: "76px",
						height: "76px",
						marginLeft: "41px",
					}}
				/>
			</styled.SelectDiv>
		</Link>
		<Link to="/inheritance/record" style={{ textDecoration: "none" }}>
			<styled.SelectDiv>
				<styled.SelectDivLeft>
					<styled.SelectDivTitle>녹음하기</styled.SelectDivTitle>
					<styled.SelectDivSub>
						준비된 프롬프트에 맞춰 <br /> 천천히 따라 읽어주세요.
					</styled.SelectDivSub>
				</styled.SelectDivLeft>
				<styled.SelectDivImg
					src={record}
					style={{
						width: "62px",
						height: "62px",
						marginLeft: "67px",
					}}
				/>
			</styled.SelectDiv>
		</Link>
		<Link to="/inheritance/photo" style={{ textDecoration: "none" }}>
			<styled.SelectDiv>
				<styled.SelectDivLeft>
					<styled.SelectDivTitle>사진 업로드</styled.SelectDivTitle>
					<styled.SelectDivSub>
						이미 작성해놓은게 있으시면 <br /> 사진을 찍어서 업로드
						해주세요.
					</styled.SelectDivSub>
				</styled.SelectDivLeft>
				<styled.SelectDivImg
					src={upload}
					style={{
						width: "59px",
						height: "59px",
						marginLeft: "30px",
					}}
				/>
			</styled.SelectDiv>
		</Link>
	</>
);

function InheritancePage() {
	return (
		<styled.Container>
			<Header />
			<styled.Title>
				<span style={{ color: "#4792dc" }}>
					클릭, 녹음, 사진 업로드
				</span>{" "}
				중 하나를 골라
				<br /> 간편한 상속 설계를 시작해보세요.
			</styled.Title>
			<SelectSection />
			<Navbar />
		</styled.Container>
	);
}

export default InheritancePage;
