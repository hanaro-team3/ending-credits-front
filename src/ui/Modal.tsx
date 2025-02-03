import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 185px;
  width: 85%;
  background: white;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
`;

const ModalTextContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalMainText = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const ModalSubText = styled.p`
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  font-size: 14px;
  border: solid 1px #e8e8e8;
  border-radius: 12px;
  cursor: pointer;
  &:first-child {
    background: #4792dc;
    color: white;
  }
  &:last-child {
    background: #f2f4f5;
    color: black;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 50%;
  background-color: black;
`;

interface ModalProps {
  mainText: string;
  subText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  mainText,
  subText,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <ModalContainer>
      <ModalTextContainer>
        <ModalMainText>{mainText}</ModalMainText>
        <ModalSubText>{subText}</ModalSubText>
      </ModalTextContainer>
      <ButtonContainer>
        <ModalButton onClick={onConfirm}>예</ModalButton>
        <ModalButton onClick={onCancel}>아니오</ModalButton>
      </ButtonContainer>
    </ModalContainer>
  );
}
