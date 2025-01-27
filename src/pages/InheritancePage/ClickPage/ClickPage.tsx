import React, { useEffect, useState } from "react";
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

// service
import { willService } from "../../../services/api/Will";
import { RealEstate } from "../../../services/dto/Asset";

const ClickPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        personalInfo: {
            name: "",
            birthDate: "",
            address: "",
        },
        assets: {
            realEstate: [],
            finance: [],
            others: [],
        },
        inheritanceInfo: {},
        executors: [],
        messages: [],
        shareTimingChoice: null,
        // Page 1 data
        // personalInfo: {
        //     name: "홍길동",
        //     birthDate: "19OO. OO. OO.",
        //     address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
        // },
        // assets: {
        //     realEstate: [
        //         {
        //             id: "asset1",
        //             type: "아파트",
        //             address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
        //             value: 3000000000,
        //         },
        //         {
        //             id: "asset2",
        //             type: "빌라",
        //             address: "서울특별시 OO구 OO동 OO빌라",
        //             value: 2000000000,
        //         },
        //         {
        //             id: "asset3",
        //             type: "토지",
        //             address: "서울특별시 OO구 OO동 OO-OO",
        //             value: 1000000000,
        //         },
        //     ],
        //     stocks: [
        //         {
        //             id: "stock1",
        //             type: "주식",
        //             details: "삼성전자",
        //             value: 1000000000,
        //         },
        //     ],
        // },
        // inheritanceInfo: {},
        // executors: [],
        // messages: [],
        // shareTimingChoice: null,
    });

    useEffect(() => {
        async function getMemberDetail() {
            try {
                const response = await willService.getMemberDetail();
                if (response?.data?.result) {
                    const personalInfo = {
                        name: response.data.result.name,
                        birthDate: response.data.result.birthDate.replace(
                            /-/g,
                            "."
                        ),
                        address: response.data.result.address,
                    };

                    setFormData((prevData) => ({
                        ...prevData,
                        personalInfo,
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch: ", error);
            }
        }

        async function getMemberAssets() {
            try {
                const assets = await getAssetDetail();
                setFormData((prev) => ({
                    ...prev,
                    assets,
                }));
            } catch (error) {
                console.error("Failed to fetch: ", error);
            }
        }

        getMemberDetail();
        getMemberAssets();
    }, []);

    async function getAssetDetail() {
        try {
            const realEstateAssets = await willService.getRealEstateAssets();
            const financeAssets = await willService.getFinanceAssets();
            const otherAssets = await willService.getOtherAssets();

            const assets: FormData["assets"] = {
                realEstate: (realEstateAssets.data?.result || []).map(
                    (item: RealEstate) => ({
                        id: item.realEstateId,
                        type: item.realEstateType,
                        address: item.address,
                        value: item.currentPrice,
                    })
                ),
                finance: [
                    ...financeAssets.bank.map((bank) => ({
                        id: bank.accountNumber,
                        type: "예적금",
                        detail: `${bank.bankName} - ${bank.accountName}`,
                        value: bank.amount,
                    })),
                    ...financeAssets.virtual.map((virtual) => ({
                        id: virtual.virtualAssetId,
                        type: "가상자산",
                        detail: `${virtual.exchangeName} - ${virtual.virtualAssetName}`,
                        value: virtual.totalValue,
                    })),
                    ...financeAssets.securities.map((security) => ({
                        id: security.securitiesAssetId,
                        type: "증권",
                        detail: `${security.securitiesCompanyName} - ${security.stockName}`,
                        value: security.amount,
                    })),
                    ...financeAssets.pensions.map((pension) => ({
                        id: pension.pensionId,
                        type: "연금",
                        detail: `${
                            pensionTypeMap[pension.pensionType] ||
                            pension.pensionType
                        }\n연금 나이: ${pension.pensionAge}, 월 지급액: ${
                            pension.monthlyPayment
                        }`,
                        value: pension.totalExpectedAmount,
                    })),
                ],
                others: [
                    // 자동차 자산
                    ...otherAssets.cars.map((car) => ({
                        id: car.carId,
                        type: "자동차",
                        detail: `${car.model} ${car.carNumber} (${car.year}년식)`,
                        value:
                            car.currentPurchasePrice || car.purchasePrice || 0,
                    })),
                    // 현금 자산
                    ...(otherAssets.cash
                        ? [
                              {
                                  id: otherAssets.cash.id,
                                  type: "현금",
                                  detail: "소지 현금",
                                  value: otherAssets.cash.amount || 0,
                              },
                          ]
                        : []),
                ],
            };
            return assets;
        } catch (error) {
            console.error("Failed to fetch: ", error);
            throw error;
        }
    }

    const pensionTypeMap: Record<string, string> = {
        NATIONAL: "국민연금",
        RETIREMENT: "퇴직연금",
        PERSONAL: "개인연금",
    };

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
