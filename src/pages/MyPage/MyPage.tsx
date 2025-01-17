import Header from "../../layout/Header";
import Navbar from "../../layout/Navbar";
import * as styled from "./styles";

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
          <styled.NavigateButton path="/my-page/info"></styled.NavigateButton>
        </styled.Base>
      </styled.BaseContainer>

      {/* 약관 */}
      <styled.BaseContainer>
        <styled.Label>약관</styled.Label>
        <styled.Base>
          <styled.BaseText>이용 약관 보기</styled.BaseText>
          <styled.NavigateButton path="/my-page/terms-of-use"></styled.NavigateButton>
        </styled.Base>
        <styled.Base>
          <styled.BaseText>개인정보처리방침</styled.BaseText>
          <styled.NavigateButton path="/my-page/privacy-policy"></styled.NavigateButton>
        </styled.Base>
      </styled.BaseContainer>

      {/* 서비스 이용 */}
      <styled.BaseContainer>
        <styled.Label>서비스 이용</styled.Label>
        <styled.Base>
          <styled.BaseText>서비스 탈퇴하기</styled.BaseText>
          <styled.NavigateButton path="/login"></styled.NavigateButton>
        </styled.Base>
      </styled.BaseContainer>
      <Navbar />
    </styled.Container>
  );
}
