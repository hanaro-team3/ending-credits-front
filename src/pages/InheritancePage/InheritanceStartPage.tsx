import Navbar from "../../layout/Navbar";
import { Link } from "react-router-dom";
import * as styled from "./styles";
import click from "../../images/inheritance-click.png";
import record from "../../images/inheritance-record.png";
import upload from "../../images/inheritance-photo.png";
import law from "../../images/law-icon.png";
import book from "../../images/book-icon.png";
import backbutton from "../../images/back-icon2.png";
import { useState } from "react";

const Header = () => (
	<styled.HeaderContainer>
		<span>상속 설계</span>
	</styled.HeaderContainer>
);

const FinishInheritancePage = ({
	onRewriteClick,
}: {
	onRewriteClick: () => void;
}) => (
	<styled.Container>
		<styled.Title style={{ width: "330px" }}>
			홍길동님이 작성하신 유언장
		</styled.Title>
		<styled.SelectDiv style={{ marginTop: "10px" }}>
			<styled.SelectDivLeft>
				<styled.SelectDivTitle>홍길동님의 유언</styled.SelectDivTitle>
				<styled.SelectDivSub>
					작성일 : 2025.01.21
					<br /> 유언 집행자 : 홍OO (아들)
				</styled.SelectDivSub>
			</styled.SelectDivLeft>
			<styled.PercentDiv>
				<span>100%</span>
			</styled.PercentDiv>
		</styled.SelectDiv>
		<styled.ContactDiv
			onClick={() =>
				window.open(
					"https://m.hanabank.com/m/oqs/livingCounsel.do?coopChnl=0003",
					"_blank"
				)
			}
		>
			<styled.ContactDivImg src={law} />
			<styled.ContactDivText>
				<styled.ContactDivTextTitle>
					유언장 공증
				</styled.ContactDivTextTitle>
				<styled.ContactDivTextSub>
					법적 효력을 갖는 유언장이 필요한가요?
				</styled.ContactDivTextSub>
			</styled.ContactDivText>
			<styled.ContactDivButton src={backbutton} />
		</styled.ContactDiv>
		<styled.Title style={{ width: "330px", marginBottom: "0" }}>
			유언을 다시 작성하고 싶으신가요?
		</styled.Title>
		<styled.SubTitle style={{ width: "330px" }}>
			작성된 유언은 블록체인으로 저장되기 때문에 <br />
			수정이 불가하고, 새로 작성하셔야 해요.
		</styled.SubTitle>
		<styled.SelectDiv
			onClick={onRewriteClick}
			style={{ cursor: "pointer" }}
		>
			<styled.SelectDivLeft>
				<styled.SelectDivTitle>
					유언 다시 작성하기
				</styled.SelectDivTitle>
				<styled.SelectDivSub>
					세 가지 방법 중 하나로 <br />
					다시 작성하실 수 있어요.
				</styled.SelectDivSub>
			</styled.SelectDivLeft>
			<styled.BookImg src={book} />
		</styled.SelectDiv>
	</styled.Container>
);

const SelectSection = () => (
	<>
		<styled.Title>
			<span style={{ color: "#4792dc" }}>클릭, 녹음, 사진 업로드</span> 중
			하나를 골라
			<br /> 간편한 상속 설계를 시작해보세요.
		</styled.Title>
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
	const [showSelectSection, setShowSelectSection] = useState(false);

	const handleRewriteClick = () => {
		setShowSelectSection(true);
	};

	return (
		<styled.Container>
			<Header />

			{showSelectSection ? (
				<SelectSection />
			) : (
				<FinishInheritancePage onRewriteClick={handleRewriteClick} />
			)}
			<Navbar />
		</styled.Container>
	);
}

export default InheritancePage;
