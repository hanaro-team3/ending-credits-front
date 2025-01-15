import * as styled from "./styles";
import Header from "../../layout/Header";
import { useState, useLayoutEffect } from "react";
import { GuideContent } from "./components/GuideContent";
import { TabType } from "./types";

// 탭 데이터
const TAB_DATA = [
    { id: "상속", label: "상속 설계" },
    { id: "연금", label: "연금 관리" }
] as const;

function GuidePage() {
    const [activeTab, setActiveTab] = useState<TabType>("상속");
    const [isLeaving, setIsLeaving] = useState(false);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = () => {
        setIsLeaving(true);
    };

    return (
        <styled.Container $isLeaving={isLeaving}>
            <Header 
                title="작성 가이드" 
                onClose={handleBack} 
            />
            
            {/* 타이틀 섹션 */}
            <styled.TitleContainer>
                <styled.Title>
                    엔딩크레딧 사용법을 알려드릴게요.
                </styled.Title>
                <styled.SubTitle>
                    엔딩크레딧은 크게 두 가지 기능으로 나뉘어요.
                </styled.SubTitle>
            </styled.TitleContainer>
            
            {/* 탭 섹션 */}
            <styled.TabContainer>
                {TAB_DATA.map(({ id, label }) => (
                    <styled.TabText
                        key={id}
                        className={activeTab === id ? "active" : ""}
                        onClick={() => setActiveTab(id as TabType)}
                    >
                        {label}
                    </styled.TabText>
                ))}
            </styled.TabContainer>

            {/* 컨텐츠 섹션 */}
            <styled.ContentWrapper>
                <GuideContent 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab}
                />
            </styled.ContentWrapper>
        </styled.Container>
    );
}

export default GuidePage;