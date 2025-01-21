import styled from "styled-components";

interface TabProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

interface TabContainerProps {
    children: React.ReactNode;
}

const TabContainer = styled.div`
    width: 100%;
    display: flex;
    border-bottom: 1px solid #C4C4C4;
`;

const TabText = styled.p<{ $active: boolean }>`
    width: 100%;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    padding: 10px 0;
    color: ${props => props.$active ? props.theme.colors.text : '#C4C4C4'};
    border-bottom: ${props => props.$active ? `2px solid ${props.theme.colors.primary}` : 'none'};
    cursor: pointer;
`;

export function Tab({ id, label, isActive, onClick }: TabProps) {
    return (
        <TabText
            key={id}
            $active={isActive}
            onClick={onClick}
        >
            {label}
        </TabText>
    );
}

export function Tabs({ children }: TabContainerProps) {
    return (
        <TabContainer>
            {children}
        </TabContainer>
    );
}
