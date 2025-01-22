import * as styled from "../styles";
import { GuideContentProps, StepData } from "../types";
import { useState, useEffect } from "react";

// assets
import register from "../../../assets/img/register.png";
import sangsok from "../../../assets/img/sangsok.png";
import yueon from "../../../assets/img/yueon.png";
import yeongeum from "../../../assets/img/yeongeum.png";
import chuchoen from "../../../assets/img/chuchoen.png";

const GUIDE_DATA: Record<string, StepData[]> = {
    상속: [
        {
            number: "STEP 01",
            title: "회원가입",
            description: "엔딩크레딧 앱을 설치하고, 회원가입을 진행해주세요.",
            image: register
        },
        {
            number: "STEP 02",
            title: "상속 설계",
            description: "세 가지 방법(클릭, 녹음, 사진 업로드) 중 원하는 방법을 선택 후 유언장을 작성해주세요.",
            image: sangsok
        },
        {
            number: "STEP 03",
            title: "유언장 확인",
            description: "작성된 유언장을 확인해주세요.",
            image: yueon
        }
    ],
    연금: [
        {
            number: "STEP 01",
            title: "회원가입",
            description: "엔딩크레딧 앱을 설치하고, 회원가입을 진행해주세요.",
            image: register
        },
        {
            number: "STEP 02",
            title: "자산 및 연금 조회",
            description: "연동한 자산과 미래 연금을 모두 조회해보세요.",
            image: yeongeum
        },
        {
            number: "STEP 03",
            title: "맞춤형 상품 추천",
            description: "퇴직금 운용을 위한 맞춤형 상품들을 추천 받고, 연금 운용을 시작해보세요.",
            image: chuchoen
        }
    ]
};

export function GuideContent({ activeTab }: GuideContentProps) {
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [prevTab, setPrevTab] = useState(activeTab);

    useEffect(() => {
        // 탭 변경 방향 감지 (슬라이드 효과)
        if (activeTab === '연금' && prevTab === '상속') {
            setDirection('right');
        } else if (activeTab === '상속' && prevTab === '연금') {
            setDirection('left');
        }
        setPrevTab(activeTab);
    }, [activeTab, prevTab]);

    return (
            <styled.Content $direction={direction}>
                <styled.Section>
                    {GUIDE_DATA[activeTab].map((step, index) => (
                        <styled.Step key={index}>
                            <div>
                                <styled.StepNumber>{step.number}</styled.StepNumber>
                                <styled.StepTitle>{step.title}</styled.StepTitle>
                            </div>
                            <p>{step.description}</p>
                            <img src={step.image} alt={step.title} width={338} />
                        </styled.Step>
                    ))}
                </styled.Section>
            </styled.Content>
    );
} 