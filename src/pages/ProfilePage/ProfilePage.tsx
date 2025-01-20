import { useState } from "react";
import Header from "../../layout/Header";
import Navbar from "../../layout/Navbar";
import Modal, { ModalOverlay } from "./components/Modal";
import * as styled from "./styles";

export default function ProfilePage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState<boolean>(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const openDeleteAccountModal = () => setIsDeleteAccountModalOpen(true);
  const closeDeleteAccountModal = () => setIsDeleteAccountModalOpen(false);

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
          <styled.LogoutButton onClick={openLogoutModal}>
            로그아웃
          </styled.LogoutButton>
        </styled.LabelContainer>
        <styled.Base>
          <styled.BaseText>내 정보 확인</styled.BaseText>
          <styled.NavigateButton path="/profile/info"></styled.NavigateButton>
        </styled.Base>
      </styled.BaseContainer>

      {/* 약관 */}
      <styled.BaseContainer>
        <styled.Label>약관</styled.Label>
        <styled.Base>
          <styled.BaseText>이용 약관 보기</styled.BaseText>
          <styled.NavigateButton path="/profile/terms-of-use"></styled.NavigateButton>
        </styled.Base>
        <styled.Base>
          <styled.BaseText>개인정보처리방침</styled.BaseText>
          <styled.NavigateButton path="/profile/privacy-policy"></styled.NavigateButton>
        </styled.Base>
      </styled.BaseContainer>

      {/* 서비스 이용 */}
      <styled.BaseContainer>
        <styled.Label>서비스 이용</styled.Label>
        <styled.Base>
          <styled.BaseText>서비스 탈퇴하기</styled.BaseText>
          <styled.RightArrowButton
            onClick={openDeleteAccountModal}
          ></styled.RightArrowButton>
        </styled.Base>
      </styled.BaseContainer>
      <Navbar />
      {/* LogoutModal */}
      {isLogoutModalOpen && (
        <>
          <Modal
            mainText="로그아웃 하시겠습니까?"
            onConfirm={() => {
              closeLogoutModal();
              console.log("로그아웃 처리"); // 로그아웃 로직 추가
            }}
            onCancel={closeLogoutModal}
          />
          <ModalOverlay onClick={closeLogoutModal}></ModalOverlay>
        </>
      )}

      {/* DeleteAccountModal */}
      {isDeleteAccountModalOpen && (
        <>
          <Modal
            mainText="정말 탈퇴하시겠습니까?"
            subText="탈퇴 후에는 복구하실 수 없습니다."
            onConfirm={() => {
              closeDeleteAccountModal();
              console.log("서비스 탈퇴 처리"); // 탈퇴 로직 추가
            }}
            onCancel={closeDeleteAccountModal}
          />
          <ModalOverlay onClick={closeDeleteAccountModal}></ModalOverlay>
        </>
      )}
    </styled.Container>
  );
}
