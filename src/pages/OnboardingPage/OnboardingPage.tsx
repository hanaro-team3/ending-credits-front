import { useState } from "react";
import image1 from "../../images/onboarding/1.png";
import image2 from "../../images/onboarding/2.png";
import image3 from "../../images/onboarding/3.png";
import image4 from "../../images/onboarding/4.png";
import BlueButton from "../../ui/BlueBtn";

const OnboadingData = [
  {
    path: image1,
    textTop: "",
    textMiddle: "복잡한 상속관리 앱으로 간편하게",
    textBottom: "당신의 가치가 당신의 뜻대로 상속되도록",
  },
  {
    path: image2,
    textTop: "100세 시대, 지금 당신에게 필요한건",
    textMiddle: "나와 가족의 미래를 설계하는 종합 상속 솔루션",
    textBottom: "",
  },
  {
    path: image3,
    textTop: "성향별 분산 투자와 미래 연금 계산까지",
    textMiddle: "퇴직금 운용을 위한 맞춤형 상품들 추천",
    textBottom: "",
  },
  {
    path: image4,
    textTop: "",
    textMiddle: "잃어버릴 걱정 끝 NFT로 안전하게",
    textBottom: "24시간 안전하게 관리되는 나만의 유언장",
  },
];

export default function OnboardingPage(): JSX.Element {
  const [image, setImage] = useState<string>(image1);
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        height: "100vh",
        width: "100vw",
      }}
    >
      <BlueButton />
    </div>
  );
}
