export type TabType = "상속" | "연금";

export interface StepData {
    number: string;
    title: string;
    description: string;
    image: string;
}

export interface GuideContentProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}