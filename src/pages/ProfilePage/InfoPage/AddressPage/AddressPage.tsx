import React, { useState } from "react";
import * as styled from "../../styles";
import { useNavigate } from "react-router-dom";

export default function AddressPage() {
  const navigate = useNavigate();
  const [newAddress, setNewAddress] = useState<string>("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(event.target.value);
  };

  const clickHandler = () => {
    setNewAddress("");
    navigate(-1);
  };

  return (
    <styled.Container $color="white">
      <styled.BaseText
        style={{
          marginTop: "10vh",
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
          height: "47px",
          padding: "5%",
        }}
        placeholder="도로명+건물번호, 건물명, 지번 입력"
        value={newAddress}
        onChange={changeHandler}
      />
      <styled.FlexContainer
        $column={true}
        style={{
          paddingLeft: "2%",
          alignItems: "start",
        }}
      >
        <styled.FlexContainer
          $column={true}
          style={{
            alignItems: "start",
            gap: "0px",
          }}
        >
          <styled.BaseText
            style={{
              color: "#4792DC",
            }}
          >
            {"도로명 + 건물번호"}
          </styled.BaseText>
          <styled.BaseText>{"예) 서울시 강남구 테헤란로 231"}</styled.BaseText>
        </styled.FlexContainer>
        <styled.FlexContainer
          $column={true}
          style={{
            alignItems: "start",
            gap: "0px",
          }}
        >
          {" "}
          <styled.BaseText
            style={{
              color: "#4792DC",
            }}
          >
            {"지역명(동/리) + 번지"}
          </styled.BaseText>
          <styled.BaseText>{"예) 역삼동 676"}</styled.BaseText>
        </styled.FlexContainer>
        <styled.FlexContainer
          $column={true}
          style={{
            alignItems: "start",
            gap: "0px",
          }}
        >
          {" "}
          <styled.BaseText
            style={{
              color: "#4792DC",
            }}
          >
            {"지역명(동/리) + 건물명(아파트명)"}
          </styled.BaseText>
          <styled.BaseText>{"예) 역삼동 센터필드"}</styled.BaseText>
        </styled.FlexContainer>
      </styled.FlexContainer>
      <styled.LargeButtonContainer>
        <styled.LargeButton onClick={clickHandler}>저장하기</styled.LargeButton>
      </styled.LargeButtonContainer>
    </styled.Container>
  );
}
