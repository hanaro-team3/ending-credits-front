import { data } from "./data";
import * as styled from "../styles";
import Header from "../../../layout/Header";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyComponent: React.FC = () => {
  return (
    <>
      {data.map((item, index) => (
        <styled.FlexContainer
          $column={true}
          key={index}
          style={{ alignItems: "start", gap: "5px" }}
        >
          <styled.BaseText $bold={true}>[{item.title}]</styled.BaseText>
          <styled.FlexContainer
            $column={true}
            style={{ alignItems: "start", gap: "0" }}
          >
            {/* \n과 \t 처리 */}
            {item.description.split("\n").map((line, lineIndex) => (
              <styled.BaseText
                key={lineIndex}
                style={{ display: "flex", alignItems: "start" }}
              >
                {/* \t를 들여쓰기 처리 */}
                <styled.BaseText
                  style={{ paddingLeft: `${line.split("\t").length - 1}rem` }}
                >
                  {line.replace(/\t/g, "")}
                </styled.BaseText>
              </styled.BaseText>
            ))}
          </styled.FlexContainer>
        </styled.FlexContainer>
      ))}
    </>
  );
};

const CloseButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // 위의 함수가 끝난 후 실행하기 위해 딜레이 추가
    setTimeout(() => {
      navigate(-1);
    }, 280);
  };
  return (
    <styled.LargeButtonContainer>
      <styled.LargeButton onClick={handleBack}>닫기</styled.LargeButton>
    </styled.LargeButtonContainer>
  );
};

export default function PrivacyPolicyPage() {
  return (
    <styled.Container $color="white">
      <Header title="개인정보처리방침" showClose={false}></Header>
      <PrivacyPolicyComponent></PrivacyPolicyComponent>
      <CloseButton></CloseButton>
    </styled.Container>
  );
}
