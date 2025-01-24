import React, { useState } from "react";
import * as styled from "./styles";
import { FormData } from "./types";
import { Header } from "./components/Header";

// pages
import AssetsViewPage from "./pages/AssetsViewPage";
import { SelectInheritorPage } from "./pages/SelectInheritorPage";
import { WritePage } from "./pages/WritePage";
import InitialPage from "./ClickInitialPage"; // 초기 페이지
import ProfileViewPage from "../pages/ProfileViewPage"; //페이지 1 - 인적 정보 조회
import SetPersonPage from "../pages/SetPersonPage"; //페이지 6 - 유언 집행자 지정
import ShareTimePage from "../pages/ShareTimePage"; // 페이지 7 - 내용 공유 시점 설정
import WillPage from "../pages/WillPage"; // 페이지 8 - 유언장 완성

const ClickPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        // Page 1 data
        personalInfo: {
            name: "홍길동",
            birthDate: "19OO. OO. OO.",
            address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
        },
        assets: {
            realEstate: [
                {
                    id: "asset1",
                    type: "아파트",
                    address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
                    value: 3000000000,
                },
                {
                    id: "asset2",
                    type: "빌라",
                    address: "서울특별시 OO구 OO동 OO빌라",
                    value: 2000000000,
                },
                {
                    id: "asset3",
                    type: "토지",
                    address: "서울특별시 OO구 OO동 OO-OO",
                    value: 1000000000,
                },
            ],
            stocks: [
                {
                    id: "stock1",
                    type: "주식",
                    details: "삼성전자",
                    value: 1000000000,
                },
            ],
        },
        inheritanceInfo: {},
        executors: [],
        messages: [],
        shareTimingChoice: null,
    });

    const handleNext = () => {
        console.log(`Moving from page ${currentPage} to ${currentPage + 1}`);
        console.log("Current form data:", formData);
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        console.log(`Moving from page ${currentPage} to ${currentPage - 1}`);
        console.log("Current form data:", formData);
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };

    const renderPage = () => {
        const commonProps = {
            onNext: handleNext,
            onPrev: handlePrev,
            formData,
            setFormData,
        };

        switch (currentPage) {
            case 0:
                return <InitialPage onStartUpload={handleNext} />;
            case 1:
                return <ProfileViewPage {...commonProps} />;
            case 2:
                return <AssetsViewPage {...commonProps} />;
            case 3:
                return <SelectInheritorPage {...commonProps} />;
            case 4:
                return <SetPersonPage {...commonProps} />;
            case 5:
                return <WritePage {...commonProps} />;
            case 6:
                return <ShareTimePage {...commonProps} />;
            case 7:
                return (
                    <WillPage
                        {...commonProps}
                        setCurrentPage={setCurrentPage}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <styled.Container>
            <Header />
            {renderPage()}
        </styled.Container>
    );
};

export default ClickPage;
