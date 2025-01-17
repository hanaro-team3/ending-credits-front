import * as styled from "../styles";
import BlueButton from "../../../ui/BlueBtn";
import magicWand from "../../../assets/icon/magicWand.png";
import { BANK_DATA, TAB_DATA } from "../constants";
import { useState } from "react";

interface AssetRegisterProps {
    onRegister: () => void;
}

export function AssetRegister({ onRegister }: AssetRegisterProps) {
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

    return (
        <styled.RegisterContainer>
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
                    <BlueButton variant="large" onClick={onRegister}>연결하기</BlueButton>
                </styled.ButtonWrapper>
            )}
        </styled.RegisterContainer>
    );
} 