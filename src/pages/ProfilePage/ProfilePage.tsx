import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate import 추가
import Header from "../../layout/Header";
import Navbar from "../../layout/Navbar";
import Modal, { ModalOverlay } from "../../ui/Modal";
import * as styled from "./styles";
// import { userService } from "../../services/api/SignUp";
import { memberService } from "../../services/api/Member";

export default function ProfilePage() {
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
	const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
		useState<boolean>(false);
	const navigate = useNavigate(); // navigate 선언

	const openLogoutModal = () => setIsLogoutModalOpen(true);
	const closeLogoutModal = () => setIsLogoutModalOpen(false);

	const openDeleteAccountModal = () => setIsDeleteAccountModalOpen(true);
	const closeDeleteAccountModal = () => setIsDeleteAccountModalOpen(false);

	// 로그아웃 처리 함수
	const handleLogout = () => {
		localStorage.clear(); // 로컬 스토리지의 모든 데이터 삭제
		console.log("로그아웃 완료: 모든 토큰 삭제");
		navigate("/login"); // /login 페이지로 라우팅
	};

	// 회원 탈퇴 처리 함수
	const handleDeleteAccount = async () => {
		try {
			const token = localStorage.getItem("accessToken"); // 토큰 가져오기
			await memberService.deleteAccount({
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("토큰: ", token);
			localStorage.clear(); // 로컬 스토리지 초기화
			navigate("/onboarding"); // 탈퇴 후 온보딩 페이지로 이동
		} catch (error) {
			console.error("회원 탈퇴 중 에러 발생:", error);
		}
	};

	return (
		<styled.Container>
			<Header title="내 정보 관리" showClose={true} />
			{/* 내 정보 */}
			<styled.BaseContainer>
				<styled.LabelContainer>
					<styled.FlexContainer>
						<styled.Label $myInfo={true}>{localStorage.getItem("name")}</styled.Label>
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
							handleLogout(); // 로그아웃 로직 실행
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
							handleDeleteAccount(); // 회원 탈퇴 로직 실행
						}}
						onCancel={closeDeleteAccountModal}
					/>
					<ModalOverlay
						onClick={closeDeleteAccountModal}
					></ModalOverlay>
				</>
			)}
		</styled.Container>
	);
}
