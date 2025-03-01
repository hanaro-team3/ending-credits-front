import React, { useState } from "react";
import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import { PageProps } from "../types";
import * as styled from "../UploadPhotoPage/styles";
import { message } from "antd";

// service
import { willService } from "../../../services/api/Will";

const EditInfoPage: React.FC<PageProps> = ({
    onNext,
    onPrev,
    formData,
    setFormData,
}) => {
    const [editedInfo, setEditedInfo] = useState({
        name: formData.personalInfo.name,
        birthDate: formData.personalInfo.birthDate,
        address: formData.personalInfo.address,
    });

    const handleSubmit = async () => {
        try {
            const response = await willService.updateMemberAddress(
                editedInfo.address
            );

            if (response?.data?.code === "COMMON200") {
                setFormData((prev) => ({
                    ...prev,
                    personalInfo: {
                        name: editedInfo.name,
                        birthDate: editedInfo.birthDate,
                        address: editedInfo.address,
                    },
                }));
                onNext();
            } else {
                message.error(
                    "인적 정보를 수정하는 데 실패했습니다. 다시 시도해 주세요."
                );
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            message.error("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    return (
        <styled.UploadPageContainer>
            <styled.TopContainer>
                <styled.Title>인적 정보를 수정해 주세요.</styled.Title>
                <styled.SubTitle>
                    수정이 완료되었다면 '완료' 버튼을 눌러주세요.
                </styled.SubTitle>
                <styled.EditInfoPageContainer>
                    <styled.EditInfoPageText style={{ marginTop: "19px" }}>
                        성함
                    </styled.EditInfoPageText>
                    <styled.EditInfoPageDiv>
                        {formData.personalInfo.name}
                    </styled.EditInfoPageDiv>
                    <styled.EditInfoPageText>생년월일</styled.EditInfoPageText>
                    <styled.EditInfoPageDiv>
                        {formData.personalInfo.birthDate}
                    </styled.EditInfoPageDiv>
                    <styled.EditInfoPageText>주소</styled.EditInfoPageText>
                    <styled.EditInfoPageInput
                        value={editedInfo.address}
                        onChange={(e) =>
                            setEditedInfo((prev) => ({
                                ...prev,
                                address: e.target.value,
                            }))
                        }
                    />
                </styled.EditInfoPageContainer>
            </styled.TopContainer>
            <styled.ButtonBottomDiv>
                <WhiteButton
                    variant="medium"
                    onClick={onPrev}
                    style={{ marginRight: "8px" }}
                >
                    이전으로
                </WhiteButton>
                <BlueButton variant="medium" onClick={handleSubmit}>
                    완료
                </BlueButton>
            </styled.ButtonBottomDiv>
        </styled.UploadPageContainer>
    );
};

export default EditInfoPage;
