import styled from "styled-components";
import { LoginType, RightArrowButtonProps } from "./types";
import kakao from "../../images/loginType/kakao.svg";
import endingCredit from "../../images/loginType/endingCredit.svg";
import { useNavigate } from "react-router-dom";
import frontIcon from "../../images/front-icon.png";

export const Container = styled.div<{ $color?: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.$color ? props.$color : "")};
  min-height: 100vh;
  gap: 2rem;
  padding: 1.5rem;
  padding-bottom: 10rem;
`;

export const LabelContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexContainer = styled.div<{ $column?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$column ? "column" : "row")};
  align-items: center;
  gap: 15px;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  font-size: 1rem;
  color: black;
`;

export const Label = styled.div<{ $myInfo?: boolean }>`
  font-size: ${(props) => (props.$myInfo ? "22px" : "18px")};
  font-weight: bold;
  width: ${(props) => (props.$myInfo ? "" : "90%")};
`;

export const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const Base = styled.div`
  background-color: #ffffff;
  height: 65px;
  border-radius: 17px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

export const BaseText = styled.p<{ $bold?: boolean }>`
  font-size: 16px;
  display: block;
  font-weight: ${(props) => (props.$bold ? "bold" : "normal")};
`;

export const ImgButton = styled.img`
  cursor: pointer;
  width: 11px;
  height: 11px;
`;

export const Badge = styled.img`
  width: 25px;
  height: 25px;
`;

export const LoginTypeBadge = ({ loginType }: LoginType) => {
  const getLoginTypeImage = (loginType: "kakao" | "endingCredit") => {
    if (loginType === "kakao") return kakao;
    else return endingCredit;
  };
  return <Badge src={getLoginTypeImage(loginType)}></Badge>;
};

export const NavigateButton = ({ path }: { path: string }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(path);
  };
  return <ImgButton src={frontIcon} onClick={clickHandler}></ImgButton>;
};

export const RightArrowButton = ({ onClick }: RightArrowButtonProps) => {
  return <ImgButton src={frontIcon} onClick={onClick}></ImgButton>;
};

// 내 정보 확인
export const InfoRow = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dedfe0;
`;

// 큰 버튼
export const LargeButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 12px;
  background-color: #4792dc;
  color: white;
`;

export const LargeButtonContainer = styled.div`
  width: 100%;

  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, #ffffff 70%, rgba(255, 255, 255, 0));

  border-radius: 17px 17px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 100px 22.5px;
`;
