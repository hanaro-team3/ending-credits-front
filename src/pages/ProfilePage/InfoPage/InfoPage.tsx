import { useState } from "react";
import Header from "../../../layout/Header";
import * as styled from "../styles";

export default function InfoPage() {
  const [name, setName] = useState("홍길동");
  const [birthDate, setBirthDate] = useState("1960-11-15");
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
  const [address, setAddress] = useState(
    "ㅇㅇ도 ㅇㅇ시 ㅇㅇ구 ㅇㅇ동 ㅇㅇ아파트 ㅇㅇ동 ㅇㅇ호"
  );

  return (
    <styled.Container $color="white">
      <Header title="내 정보 관리" showClose={true}></Header>
      {/* 약관 */}
      <styled.BaseContainer>
        {/* 이름 */}
        <styled.InfoRow>
          <styled.BaseText>이름</styled.BaseText>
          <styled.FlexContainer>
            <styled.BaseText>{name}</styled.BaseText>
            <styled.ModalOpenButton></styled.ModalOpenButton>
          </styled.FlexContainer>
        </styled.InfoRow>

        {/* 생년월일 */}
        <styled.InfoRow>
          <styled.BaseText>생년월일</styled.BaseText>
          <styled.FlexContainer>
            <styled.BaseText>{birthDate}</styled.BaseText>
            <styled.ModalOpenButton></styled.ModalOpenButton>
          </styled.FlexContainer>
        </styled.InfoRow>

        {/* 전화번호 */}
        <styled.InfoRow>
          <styled.BaseText>전화번호</styled.BaseText>
          <styled.FlexContainer>
            <styled.BaseText>{phoneNumber}</styled.BaseText>
            <styled.ModalOpenButton></styled.ModalOpenButton>
          </styled.FlexContainer>
        </styled.InfoRow>

        {/* 거주지 */}
        <styled.InfoRow>
          <styled.BaseText>거주지</styled.BaseText>
          <styled.FlexContainer style={{
            maxWidth: "70%"
          }}>
            <styled.BaseText
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {address}
            </styled.BaseText>
            <styled.ModalOpenButton></styled.ModalOpenButton>
          </styled.FlexContainer>
        </styled.InfoRow>
      </styled.BaseContainer>
    </styled.Container>
  );
}
