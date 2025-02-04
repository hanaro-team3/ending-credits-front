import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../../services/api/SignUp";
import Header from "../../../../layout/Header";
import * as styled from "../../styles";
import Modal, { ModalOverlay } from "../../components/Modal";

export default function AddressPage() {
  // State
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>("");
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 입력값 처리
  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    setIsAddressValid(newAddress.trim().length > 0); // 입력값 유효성 검사
  };

  const handleAddressSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // if (!accessToken) {
      //   alert("토큰이 없습니다. 다시 로그인해주세요.");
      //   navigate("/login");
      //   return;
      // }

      // console.log("API 요청 시작");
      console.log("보낼 주소:", address);
      // console.log("토큰:", accessToken);
      
      // API 호출
      await userService.changeAddress(
        { address },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("주소가 성공적으로 변경되었습니다.");
      navigate(-1);
    } catch (error) {
      console.error("주소 변경 실패:", error);
            console.log(userService);

      alert("주소 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <styled.Container $color="white">
      <Header title="주소 변경"></Header>
      <styled.BaseContainer
        style={{
          alignItems: "start",
        }}
      >
        <styled.BaseText
          style={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {"주소를 입력해 주세요"}
        </styled.BaseText>

        <input
          type="text"
          style={{
            width: "100%",
            border: "2px solid #4792DC",
            borderRadius: "12px",
            height: "55px",
            padding: "1rem",
            backgroundColor: "white",
            color: "black",
          }}
          placeholder="주소 입력"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
        />
      </styled.BaseContainer>

      <styled.LargeButtonContainer>
        <styled.LargeButton
          onClick={openModal}
          disabled={!isAddressValid}
          style={{
            backgroundColor: isAddressValid ? "#4792DC" : "#D9D9D9",
          }}
        >
          주소 수정하기
        </styled.LargeButton>
      </styled.LargeButtonContainer>

      {isModalOpen && (
        <>
          <Modal
            mainText="주소를 수정하시겠습니까?"
            onConfirm={handleAddressSave}
            
            onCancel={closeModal}
          />
          <ModalOverlay onClick={closeModal}></ModalOverlay>
        </>
      )}
    </styled.Container>
  );
}
