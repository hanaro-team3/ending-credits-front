import * as styled from "../styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../layout/Header";
import BlueButton from "../../../ui/BlueBtn";

// assets
import magicWand from "../../../assets/icon/magicWand.png";

// constants
import { BANK_DATA, TAB_DATA } from "../constants";

function AssetRegisterPage() {
    const [activeTab, setActiveTab] = useState<typeof TAB_DATA[number]>("은행");
    const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
        TAB_DATA.reduce((acc, type) => ({ ...acc, [type]: [] }), {})
    );

    const handleSelectedItem = (bankType: string, bankName: string) => {
        setSelectedItems(prev => {
            const currentSelected = prev[bankType] || [];
            const isSelected = currentSelected.includes(bankName);
            
            return {
                ...prev,
                [bankType]: isSelected
                    ? currentSelected.filter(item => item !== bankName)
                    : [...currentSelected, bankName]
            };
        });
    };

    const handleSelectAll = (bankType: string) => {
        setSelectedItems(prev => {
            const currentSelected = prev[bankType] || [];
            const bankList = BANK_DATA.find(data => data.type === bankType)?.banks || [];
            
            return {
                ...prev,
                [bankType]: currentSelected.length === bankList.length ? [] : bankList
            };
        });
    };

    const isItemSelected = (bankType: string, bankName: string) =>
        selectedItems[bankType]?.includes(bankName) || false;

    const hasSelectedItems = Object.values(selectedItems).some(bank => bank.length > 0);

    const navigate = useNavigate();

    return (
        <styled.Container>
            <Header title="자산 연결" showClose={true} />

            <styled.MagicButton>
                <img src={magicWand} alt="요술봉" width={34} />
                <span>모든 자산을 한 번에 연결해 보세요</span>
            </styled.MagicButton>

            <styled.TabContainer>
                {TAB_DATA.map(tab => (
                    <styled.TabText
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </styled.TabText>
                ))}
            </styled.TabContainer>

            {BANK_DATA.filter(data => data.type === activeTab).map((data, index) => (
                <styled.Section key={index}>
                    <styled.SectionHeader>
                        <h3>{data.type}</h3>
                        <span onClick={() => handleSelectAll(data.type)}>
                            한 번에 선택
                        </span>
                    </styled.SectionHeader>
                    <styled.GridContainer>
                        {data.banks.map((bankName, index) => (
                            <styled.GridItem
                                key={index}
                                className={isItemSelected(data.type, bankName) ? 'active' : ''}
                                onClick={() => handleSelectedItem(data.type, bankName)}
                            >
                                {bankName}
                            </styled.GridItem>
                        ))}
                    </styled.GridContainer>
                </styled.Section>
            ))}

            {hasSelectedItems && (
                <styled.ButtonWrapper>
                    <BlueButton variant="large" onClick={() => navigate("/asset/list")}>연결하기</BlueButton>
                </styled.ButtonWrapper>
            )}
        </styled.Container>
    );
} 

export default AssetRegisterPage;