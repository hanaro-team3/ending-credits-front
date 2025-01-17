import { privacyPolicy } from "./data";
import * as styled from "../styles";

const PrivacyPolicyComponent: React.FC = () => {
  return (
    <styled.Container>
      <styled.FlexContainer
        $column={true}
        style={{
          alignItems: "start",
        }}
      >
        <styled.BaseText $bold={true}>[목적]</styled.BaseText>
        <styled.BaseText>{privacyPolicy.purpose}</styled.BaseText>
      </styled.FlexContainer>

      <styled.FlexContainer
        $column={true}
        style={{
          alignItems: "start",
        }}
      >
        <styled.BaseText $bold={true}>[수집하는 개인정보 항목]</styled.BaseText>
        <styled.BaseText>{privacyPolicy.purpose}</styled.BaseText>
      </styled.FlexContainer>
      <ol>
        <li>
          <ul>
            <styled.BaseText>회원가입 시 수집 항목</styled.BaseText>
            <li>
              필수: {privacyPolicy.collectedInfo.memberSignup.required.join(", ")}
            </li>
            <li>
              선택: {privacyPolicy.collectedInfo.memberSignup.optional.join(", ")}
            </li>
          </ul>
        </li>
      </ol>
      <h3>서비스 이용 시 수집 항목</h3>
      <ul>
        {privacyPolicy.collectedInfo.serviceUsage.collected.map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      <h2>개인정보의 수집 및 이용목적</h2>
      <ul>
        {privacyPolicy.usagePurpose.map((purpose, index) => (
          <li key={index}>{purpose}</li>
        ))}
      </ul>

      <h2>개인정보 보유 및 이용기간</h2>
      <ul>
        {privacyPolicy.retentionPeriods.map((period, index) => (
          <li key={index}>
            {period.description}: {period.period}
          </li>
        ))}
      </ul>

      <h2>개인정보의 제3자 제공</h2>
      <ul>
        {privacyPolicy.thirdPartyProvision.conditions.map(
          (condition, index) => (
            <li key={index}>{condition}</li>
          )
        )}
      </ul>

      <h2>이용자의 권리 및 행사 방법</h2>
      <h3>권리</h3>
      <ul>
        {privacyPolicy.userRights.rights.map((right, index) => (
          <li key={index}>{right}</li>
        ))}
      </ul>
      <h3>행동</h3>
      <ul>
        {privacyPolicy.userRights.actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>

      <h2>개인정보 보호를 위한 기술적/관리적 대책</h2>
      <ul>
        {privacyPolicy.securityMeasures.measures.map((measure, index) => (
          <li key={index}>{measure}</li>
        ))}
      </ul>

      <h2>문의처</h2>
      <p>담당 부서: {privacyPolicy.inquiryContact.department}</p>
      <p>이메일: {privacyPolicy.inquiryContact.email}</p>
      <p>연락처: {privacyPolicy.inquiryContact.phone}</p>
    </styled.Container>
  );
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PrivacyPolicyComponent></PrivacyPolicyComponent>
    </div>
  );
}
