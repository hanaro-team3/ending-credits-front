import image1 from "../../images/onboarding/1.png";
import image2 from "../../images/onboarding/2.png";
import image3 from "../../images/onboarding/3.png";
import image4 from "../../images/onboarding/4.png";
import { OnboardingData } from "./types";

export const CopyData: OnboardingData[] = [
  {
    path: image1,
    textTop: "",
    textMiddle1: {
      size: 40,
      textArray: [
        {
          fontWeight: "bold",
          text: "복잡한 ",
        },
        {
          fontWeight: "normal",
          text: "상속관리",
        },
      ],
    },
    textMiddle2: {
      size: 40,
      textArray: [
        {
          fontWeight: "normal",
          text: "앱으로 ",
        },
        {
          fontWeight: "bold",
          text: "간편하게",
        },
      ],
    },
    textBottom: "당신의 가치가 당신의 뜻대로 상속되도록",
  },
  {
    path: image2,
    textTop: "100세 시대, 지금 당신에게 필요한건",
    textMiddle1: {
      size: 24,
      textArray: [
        {
          fontWeight: "normal",
          text: "나와 가족의 미래를 설계하는",
        },
      ],
    },
    textMiddle2: {
      size: 40,
      textArray: [
        {
          fontWeight: "bold",
          text: "종합 상속 솔루션",
        },
      ],
    },
    textBottom: "",
  },
  {
    path: image3,
    textTop: "성향별 분산 투자와 미래 연금 계산까지",
    textMiddle1: {
      size: 40,
      textArray: [
        {
          fontWeight: "bold",
          text: "퇴직금 운용",
        },
        {
          fontWeight: "normal",
          text: "을 위한",
        },
      ],
    },
    textMiddle2: {
      size: 40,
      textArray: [
        {
          fontWeight: "bold",
          text: "맞춤형 상품",
        },
        {
          fontWeight: "normal",
          text: "들 추천",
        },
      ],
    },
    textBottom: "",
  },
  {
    path: image4,
    textTop: "",
    textMiddle1: {
      size: 40,
      textArray: [
        {
          fontWeight: "normal",
          text: "잃어버릴 걱정 끝",
        },
      ],
    },
    textMiddle2: {
      size: 40,
      textArray: [
        {
          fontWeight: "bold",
          text: "NFT로 안전하게",
        },
      ],
    },
    textBottom: "24시간 안전하게 관리되는 나만의 유언장",
  },
];
