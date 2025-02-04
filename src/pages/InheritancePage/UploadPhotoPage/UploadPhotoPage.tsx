import * as styled from "./styles";
import { PageProps } from "../types";
import { Link } from "react-router-dom";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import plusbtn from "../../../images/will-plus-btn.png";
import { useEffect, useState } from "react";

import InitialPage from "./InitialPage";
import ProfileViewPage from "../pages/ProfileViewPage";
import UploadOrCameraPage from "../pages/UploadOrCameraPage";
import WillSamplePage from "../pages/WillSamplePage";
import UploadPage from "../pages/UploadPage";
import PhotoIntoTextPage from "../pages/PhotoIntoTextPage";
import ShareTimePage from "../pages/ShareTimePage";
import WillPhotoPage from "../pages/WillPhotoPage";
import BlockChainPage from "../pages/BlockChainPage";
import Header from "../components/Header";

// service
import { willService } from "../../../services/api/Will";
import { message } from "antd";

interface FormData {
    personalInfo: {
        name: string;
        birthDate: string;
        address: string;
    };
    uploadType: "album" | "camera" | null;
    photoUrls: string[];
    uploadedFiles: File[];
    bankData: Array<{
        type: string;
        subType: string;
        financialInstitution: string;
        asset: string;
        amount: number;
        ancestors: Array<{
            name: string;
            relation: string;
            ratio: number;
        }>;
    }>;
    realEstateData: Array<{
        type: string;
        subType: string;
        financialInstitution: null;
        asset: string;
        amount: number;
        ancestors: Array<{
            name: string;
            relation: string;
            ratio: number;
        }>;
    }>;
    etcData: Array<{
        type: string;
        subType: string;
        financialInstitution: string | null;
        asset: string;
        amount: number;
        ancestors: Array<{
            name: string;
            relation: string;
            ratio: number;
        }>;
    }>;
    assets: any;
    inheritanceInfo: any;
    executors: Array<{
        name: string;
        relation: string;
        priority: number;
    }>;
    messages: Array<{
        name: string;
        relationship: string;
        content: string;
    }>;
    finalMessages: Array<{
        name: string;
        relation: string;
        message: string;
    }>;
    shareTimingChoice: "anytime" | "sickness" | "death" | null;
}

interface CameraPageProps extends Omit<PageProps, "onNext" | "onPrev"> {
    setCurrentPage: (page: number) => void;
}

const CameraPage: React.FC<CameraPageProps> = ({
    setCurrentPage,
    formData,
    setFormData,
}) => {
    const DeleteButton = ({ onClick }: { onClick: () => void }) => (
        <button
            onClick={onClick}
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "20px",
                height: "20px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "none",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
                zIndex: 10,
            }}
        >
            <svg
                width="10"
                height="10"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );

    const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            alert("카메라로 촬영한 사진만 업로드할 수 있습니다.");
            return;
        }

        const currentTime = Date.now();
        const fileTime = file.lastModified;
        const timeDiff = currentTime - fileTime;

        if (timeDiff > 60000) {
            alert("촬영한 사진만 업로드할 수 있습니다.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            setFormData((prev) => ({
                ...prev,
                photoUrls: [...(prev.photoUrls || []), imageUrl],
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleCameraClick = () => {
        document.getElementById("camera-capture")?.click();
    };

    const handleDeleteImage = (indexToDelete: number) => {
        setFormData((prev) => ({
            ...prev,
            photoUrls: (prev.photoUrls || []).filter(
                (_, index) => index !== indexToDelete
            ),
        }));
    };

    return (
        <styled.UploadPageContainer>
            <styled.Title>
                {formData?.photoUrls?.length > 0
                    ? "촬영한 사진을 확인해 주세요."
                    : "사진을 촬영해주세요."}
            </styled.Title>
            <styled.SubTitle>
                {formData?.photoUrls?.length > 0
                    ? "사진을 다시 촬영할 수 있어요."
                    : "아래 + 버튼을 눌러 유언장을 촬영해주세요."}
            </styled.SubTitle>

            <input
                type="file"
                id="camera-capture"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                style={{ display: "none" }}
                onClick={(event) => {
                    const target = event.target as HTMLInputElement;
                    target.value = "";
                }}
            />

            <div
                style={{
                    width: "296px",
                    height: "434px",
                    border:
                        formData?.photoUrls?.length === 0
                            ? "1px solid #2b2b2b"
                            : "none",
                    marginTop: "20px",
                    display: "flex",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {formData?.photoUrls?.length > 0 ? (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            overflowY: "auto",
                            overflowX: "hidden",
                            scrollBehavior: "smooth",
                            msOverflowStyle: "none",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    >
                        {formData.photoUrls.map((photo, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "100%",
                                    height: "434px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    marginBottom:
                                        index !== formData.photoUrls.length - 1
                                            ? "20px"
                                            : 0,
                                    position: "relative",
                                }}
                            >
                                <DeleteButton
                                    onClick={() => handleDeleteImage(index)}
                                />
                                <img
                                    src={photo}
                                    alt={`촬영된 유언장 ${index + 1}`}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        border: "1px solid #eee",
                                        borderRadius: "8px",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        onClick={handleCameraClick}
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <styled.PlusBtn src={plusbtn} />
                    </div>
                )}
            </div>

            {formData?.photoUrls?.length > 0 && (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "10px",
                        color: "#666",
                        fontSize: "12px",
                    }}
                >
                    {formData.photoUrls.length}장의 사진
                </div>
            )}

            <styled.Page1EditSection>
                <BlueButton
                    variant="small"
                    onClick={handleCameraClick}
                    style={{
                        fontWeight: "500",
                        fontSize: "11px",
                        marginTop: "8px",
                        marginBottom: "60px",
                        marginRight: "15px",
                    }}
                >
                    추가하기
                </BlueButton>
            </styled.Page1EditSection>

            <styled.ButtonBottomDiv>
                <WhiteButton
                    variant="medium"
                    onClick={() => setCurrentPage(3)}
                    style={{ marginRight: "8px" }}
                >
                    이전으로
                </WhiteButton>
                <BlueButton
                    variant="medium"
                    onClick={() => setCurrentPage(5)}
                    disabled={!formData?.photoUrls?.length}
                >
                    다음으로
                </BlueButton>
            </styled.ButtonBottomDiv>
        </styled.UploadPageContainer>
    );
};

function UploadPhotoPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        personalInfo: {
            name: "",
            birthDate: "",
            address: "",
        },
        uploadType: null,
        photoUrls: [],
        uploadedFiles: [],
        bankData: [],
        realEstateData: [],
        etcData: [],
        assets: {},
        inheritanceInfo: {},
        executors: [],
        messages: [],
        finalMessages: [],
        shareTimingChoice: null,
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
                message.error(
                    "피상속인의 인적 정보를 불러오는 데 실패했습니다."
                );
                console.error("Failed to fetch: ", error);
            }
        }

        getMemberDetail();
    }, []);

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

    const handleSelectUploadType = (type: "album" | "camera") => {
        setFormData((prev) => ({
            ...prev,
            uploadType: type,
        }));
        setCurrentPage(3);
    };

    const handleWillSampleNext = () => {
        if (formData.uploadType === "camera") {
            setCurrentPage(10);
        } else {
            setCurrentPage(4);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 0:
                return <InitialPage onStartUpload={handleNext} />;
            case 1:
                return (
                    <ProfileViewPage
                        onNext={handleNext}
                        onPrev={handlePrev}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 2:
                return (
                    <UploadOrCameraPage
                        onSelectUploadType={handleSelectUploadType}
                        formData={formData}
                        setFormData={setFormData}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                );
            case 3:
                return (
                    <WillSamplePage
                        onNext={handleWillSampleNext}
                        onPrev={handlePrev}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 4:
                return (
                    <UploadPage
                        onNext={handleNext}
                        onPrev={handlePrev}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 5:
                return (
                    <PhotoIntoTextPage
                        onNext={handleNext}
                        onPrev={handlePrev}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 6:
                return (
                    <ShareTimePage
                        onNext={handleNext}
                        onPrev={handlePrev}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 7:
                return (
                    <WillPhotoPage
                        onNext={handleNext}
                        onPrev={handlePrev}
                        formData={formData}
                        setFormData={setFormData}
                        setCurrentPage={setCurrentPage}
                    />
                );
            case 8:
                return <BlockChainPage />;
            case 10:
                return (
                    <CameraPage
                        formData={formData}
                        setFormData={setFormData}
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
}

export default UploadPhotoPage;
