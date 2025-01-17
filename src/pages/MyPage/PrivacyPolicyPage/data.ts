type PersonalInfo = {
  required: string[];
  optional: string[];
};

type ServiceUsageInfo = {
  collected: string[];
};

type RetentionPeriod = {
  description: string;
  period: string;
};

type ThirdPartyProvision = {
  conditions: string[];
};

type UserRights = {
  rights: string[];
  actions: string[];
};

type SecurityMeasures = {
  measures: string[];
};

type InquiryContact = {
  department: string;
  email: string;
  phone: string;
};

type PrivacyPolicy = {
  purpose: string;
  collectedInfo: {
    memberSignup: PersonalInfo;
    serviceUsage: ServiceUsageInfo;
  };
  usagePurpose: string[];
  retentionPeriods: RetentionPeriod[];
  thirdPartyProvision: ThirdPartyProvision;
  userRights: UserRights;
  securityMeasures: SecurityMeasures;
  inquiryContact: InquiryContact;
};

export const privacyPolicy: PrivacyPolicy = {
  purpose:
    "엔딩크레딧은 이용자의 개인정보를 중요하게 여기며, 개인정보보호법 및 관련 법령을 준수합니다. 본 방침은 회사가 수집하는 개인정보의 항목, 이용목적, 보관 및 처리 방침을 안내합니다.",
  collectedInfo: {
    memberSignup: {
      required: ["이름", "이메일", "비밀번호", "연락처"],
      optional: ["생년월일", "주소"],
    },
    serviceUsage: {
      collected: [
        "유언 대용 신탁 설계 정보",
        "연금 운용 관련 정보",
        "상속계획 자료",
        "접속 로그",
        "쿠키",
        "IP 주소 등 서비스 이용기록",
      ],
    },
  },
  usagePurpose: [
    "회원 관리: 본인 확인, 회원 서비스 이용 안내",
    "서비스 제공: 유언 설계, 상속계획 지원 및 연금 운용 상담",
    "법적 의무 준수: 관련 법령에 따른 기록 보존",
  ],
  retentionPeriods: [
    { description: "계약 및 청약철회 기록", period: "5년" },
    { description: "소비자 불만 처리 기록", period: "3년" },
  ],
  thirdPartyProvision: {
    conditions: [
      "이용자가 사전에 동의한 경우",
      "법령에 따라 제공 의무가 있는 경우",
    ],
  },
  userRights: {
    rights: ["개인정보 조회", "개인정보 수정", "개인정보 삭제 요청"],
    actions: ["지체 없이 처리"],
  },
  securityMeasures: {
    measures: [
      "개인정보는 암호화된 채널을 통해 저장 및 전송됩니다.",
      "해킹 및 보안 침해 방지를 위해 정기적인 보안 점검을 시행합니다.",
    ],
  },
  inquiryContact: {
    department: "개인정보관리팀 임수진",
    email: "sujin0659@gmail.com",
    phone: "010-9920-4794",
  },
};
