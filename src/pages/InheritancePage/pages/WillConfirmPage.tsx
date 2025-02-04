import { useState, useEffect } from "react";
import * as styled from "../UploadPhotoPage/styles";
import BlueButton from "../../../ui/BlueBtn";
import { Will } from "../../../services/dto/Will";
import { willService } from "../../../services/api/Will";
import willdeco from "../../../images/will-decoration.png";

const WillConfirmPage = ({ willId, onClose }: { willId: string, onClose: () => void }) => {
    const [will, setWill] = useState<Will>({
        willId: "",
        inheritances: [],
        executors: [],
        finalMessages: [],
        shareAt: 0,
        createdAt: ""
    });
    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        birthDate: "",
        address: "",
    });

    useEffect(() => {  
        willService.getMemberDetail().then((response) => {
            if(response?.data?.result) {
                setPersonalInfo({
                    name: response.data.result.name,
                    birthDate: response.data.result.birthDate.replace(
                        /-/g,
                        "."
                    ),
                    address: response.data.result.address,
                });
            }
        });
                            
        willService.getWill(willId).then((response) => {
            if (response.data.result != null) {
                setWill(response.data.result);
            }
        });
    }, []);

	const formatAmount = (amount: number) => {
		return new Intl.NumberFormat("ko-KR").format(amount);
	};

    const calculateTotalAmount = () => {
		const total = will.inheritances.reduce((sum, item) => sum + Number(item.amount), 0);
	
		return formatAmount(total);
    }

    const getShareAt = ((shareAt: number | null) => {
		switch (shareAt) {
			case 0:
				return "일상";
			case 1:
				return "병환 중";
			case 2:
				return "사망 후";
			default:
				return null;
		}
	});

    return (
        <styled.UploadPageContainer>
            <styled.TopContainer>
                <styled.Title style={{width: "330px", textAlign: "center"}}>
                    <span style={{ color: "#4792dc" }}>작성하신 유언</span>의
                    내용입니다. <br />
                </styled.Title>
                <div
                    style={{
                        width: "330px",
                        marginTop: "38px",
                        marginBottom: "30px",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            padding: "3px",
                            background: "white",
                            border: "1px solid #524e4d",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                border: "3px solid #524e4d",
                                padding: "3px",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #524e4d",
                                    padding: "20px",
                                }}
                            >
                                <styled.Page8WillDecoration
                                    className="top-left"
                                    src={willdeco}
                                />
                                <styled.Page8WillDecoration
                                    className="top-right"
                                    src={willdeco}
                                />
                                <styled.Page8WillDecoration
                                    className="bottom-right"
                                    src={willdeco}
                                />
                                <styled.Page8WillDecoration
                                    className="bottom-left"
                                    src={willdeco}
                                />
                                <h2
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        marginBottom: "8px",
                                        textAlign: "center",
                                        fontFamily: "Pretendard",
                                    }}
                                >
                                    유언장
                                </h2>
                                <div
                                    style={{
                                        width: "100%",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "16px",
                                            marginBottom: "8px",
                                            fontFamily: "Pretendard",
                                        }}
                                    >
                                        작성자 정보
                                    </h3>
                                    <div
                                        style={{
                                            padding: "8px",
                                            backgroundColor: "#f8f9fa",
                                            borderRadius: "8px",
                                            fontSize: "13px",
                                        }}
                                    >
                                        <p>
                                            성명: {personalInfo.name}
                                        </p>
                                        <p>
                                            생년월일:{" "}
                                            {personalInfo.birthDate}
                                        </p>
                                        <p>
                                            주소:{" "}
                                            {personalInfo.address}
                                        </p>
                                    </div>
                                </div>

                                {will.executors != null && (
                                    <div
                                        style={{
                                            width: "100%",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: "16px",
                                                marginBottom: "8px",
                                                fontFamily: "Pretendard",
                                            }}
                                        >
                                            유언집행자
                                        </h3>
                                        {will.executors.map((item, index) => (
                                            <div
                                                style={{
                                                    padding: "8px",
                                                    backgroundColor: "#f8f9fa",
                                                    borderRadius: "8px",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                <p>성명: {item.name}</p>
                                                <p>
                                                    관계:{" "}
                                                    {item.relation}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {will.inheritances.length > 0 && (
                                    <div
                                        style={{
                                            width: "100%",
                                            marginTop: "15px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                color: "#4792dc",
                                                fontSize: "16px",
                                                marginBottom: "8px",
                                                fontFamily: "Pretendard",
                                            }}
                                        >
                                            부동산 자산
                                        </h3>
                                        {will.inheritances
                                        .filter((item, index) => item.type === "부동산")
                                        .map((item, index) => (
                                            <div
                                                key={`real-estate-${index}`}
                                                style={{
                                                    marginBottom: "12px",
                                                    padding: "8px",
                                                    backgroundColor: "#f8f9fa",
                                                    borderRadius: "8px",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                <p>주소: {item.asset}</p>
                                                <p>
                                                    현재가:{" "}
                                                    {item.amount}
                                                    원
                                                </p>
                                                <p>상속인:</p>
                                                {item.ancestors.map(
                                                    (ancestor, idx) => (
                                                        <p
                                                            key={`real-estate-ancestor-${idx}`}
                                                        >
                                                            {ancestor.name}(
                                                            {ancestor.relation})
                                                            - {ancestor.ratio}%
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {will.inheritances.length > 0 && (
                                    <div
                                        style={{
                                            width: "100%",
                                            marginTop: "15px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                color: "#4792dc",
                                                fontSize: "16px",
                                                marginBottom: "8px",
                                                fontFamily: "Pretendard",
                                            }}
                                        >
                                            금융 자산
                                        </h3>
                                        {will.inheritances
                                        .filter((item, index) => item.type === "금융")
                                        .map((item, index) => (
                                            <div
                                                key={`bank-${index}`}
                                                style={{
                                                    marginBottom: "12px",
                                                    padding: "8px",
                                                    backgroundColor: "#f8f9fa",
                                                    borderRadius: "8px",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                <p>
                                                    {item.financialInstitution}{" "}
                                                    - {item.asset}
                                                </p>
                                                <p>
                                                    금액:{" "}
                                                    {item.amount}
                                                    원
                                                </p>
                                                <p>상속인:</p>
                                                {item.ancestors.map(
                                                    (ancestor, idx) => (
                                                        <p
                                                            key={`bank-ancestor-${idx}`}
                                                        >
                                                            {ancestor.name}(
                                                            {ancestor.relation})
                                                            - {ancestor.ratio}%
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {will.inheritances.length > 0 && (
                                    <div
                                        style={{
                                            width: "100%",
                                            marginTop: "15px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                color: "#4792dc",
                                                fontSize: "16px",
                                                marginBottom: "8px",
                                                fontFamily: "Pretendard",
                                            }}
                                        >
                                            기타 자산
                                        </h3>
                                        {will.inheritances
                                            .filter((item, index) => item.type === "기타")
                                            .map((item, index) => (
                                            <div
                                                key={`etc-${index}`}
                                                style={{
                                                    marginBottom: "12px",
                                                    padding: "8px",
                                                    backgroundColor: "#f8f9fa",
                                                    borderRadius: "8px",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                <p>
                                                    {item.subType} -{" "}
                                                    {item.asset}
                                                </p>
                                                <p>
                                                    금액:{" "}
                                                    {item.amount}
                                                    원
                                                </p>
                                                <p>상속인:</p>
                                                {item.ancestors.map(
                                                    (ancestor, idx) => (
                                                        <p
                                                            key={`etc-ancestor-${idx}`}
                                                        >
                                                            {ancestor.name}(
                                                            {ancestor.relation})
                                                            - {ancestor.ratio}%
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div
                                    style={{
                                        width: "100%",
                                        marginTop: "15px",
                                        borderTop: "1px solid #eee",
                                        paddingTop: "8px",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "16px",
                                            marginBottom: "8px",
                                            fontFamily: "Pretendard",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        총 자산 금액: {calculateTotalAmount()}원
                                    </h3>
                                </div>


                                {will.finalMessages.length > 0 && (
                                    <div
                                        style={{
                                            width: "100%",
                                            marginTop: "15px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                color: "#4792dc",
                                                fontSize: "16px",
                                                marginBottom: "8px",
                                                fontFamily: "Pretendard",
                                            }}
                                        >
                                            마지막 말씀
                                        </h3>
                                        {will.finalMessages.map((item, index) => (
                                            <div
                                                key={`message-${index}`}
                                                style={{
                                                    marginBottom: "12px",
                                                    padding: "8px",
                                                    backgroundColor: "#f8f9fa",
                                                    borderRadius: "8px",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                <p>
                                                    To. {item.name}(
                                                    {item.relation})
                                                </p>
                                                <p style={{ marginTop: "4px" }}>
                                                    {item.message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div
                                    style={{
                                        width: "100%",
                                        marginTop: "15px",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "16px",
                                            marginBottom: "8px",
                                            fontFamily: "Pretendard",
                                        }}
                                    >
                                        공개 시점
                                    </h3>
                                    <div
                                        style={{
                                            padding: "8px",
                                            backgroundColor: "#f8f9fa",
                                            borderRadius: "8px",
                                            fontSize: "13px",
                                        }}
                                    >
                                        <p>{getShareAt(will.shareAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </styled.TopContainer>

            <styled.ButtonBottomDiv style={{ paddingBottom: "100px" }}>
                <BlueButton
                    variant="medium"
                    onClick={() => {onClose()}}
                >
                    닫기
                </BlueButton>
            </styled.ButtonBottomDiv>
        </styled.UploadPageContainer>
    );
};

export default WillConfirmPage;

