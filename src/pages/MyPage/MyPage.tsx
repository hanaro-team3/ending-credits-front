import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import * as styled from "./styles";
import frontIcon from "../../images/front-icon.png";

const FrontButton = ({ path }: { path: string }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(path);
  };
  return <styled.Button src={frontIcon} onClick={clickHandler}></styled.Button>;
};

export default function MyPage() {
  return (
    <styled.Container>
      <Header title="내 정보 관리" showClose={true} />
      {/* 내 정보 */}
      <styled.BaseContainer>
        <styled.LabelContainer>
          <styled.FlexContainer>
            <styled.Label $myInfo={true}>홍길동</styled.Label>
            <styled.LoginTypeBadge loginType="kakao"></styled.LoginTypeBadge>
          </styled.FlexContainer>
          <styled.LogoutButton>로그아웃</styled.LogoutButton>
        </styled.LabelContainer>
        <styled.Base>
          <styled.BaseText>내 정보 확인</styled.BaseText>
          <FrontButton path="/my-page/info"></FrontButton>
        </styled.Base>
      </styled.BaseContainer>

      {/* 약관 */}
      <styled.BaseContainer>
        <styled.Label>약관</styled.Label>
        <styled.Base>
          <styled.BaseText>이용 약관 보기</styled.BaseText>
          <FrontButton path="/my-page/terms-of-use"></FrontButton>
        </styled.Base>
        <styled.Base>
          <styled.BaseText>개인정보처리방침</styled.BaseText>
          <FrontButton path="/my-page/privacy-policy"></FrontButton>
        </styled.Base>
      </styled.BaseContainer>

      {/* 서비스 이용 */}
      <styled.BaseContainer>
        <styled.Label>서비스 이용</styled.Label>
        <styled.Base>
          <styled.BaseText>서비스 탈퇴하기</styled.BaseText>
          <FrontButton path="/login"></FrontButton>
        </styled.Base>
      </styled.BaseContainer>
    </styled.Container>
  );
}
