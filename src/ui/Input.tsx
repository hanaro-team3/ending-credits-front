import styled from "styled-components";

interface InputProps {
    type: string;
    placeholder: string;
    suffix?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input<{ suffix?: string }>`
    width: 100%;
    border: 2px solid #4792DC;
    border-radius: 12px;
    height: 47px;
    font-size: 16px;
    padding: 5%;
    padding-right: ${props => props.suffix ? '50px' : '5%'};
    background-color: white;
    font-family: "Pretendard";
`;

const InputSuffix = styled.span`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    font-size: 15px;
`;

export const Input = ({ type, placeholder, suffix, value, onChange }: InputProps) => {
    return (
        <InputWrapper>
            <StyledInput
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                suffix={suffix}
            />
            {suffix && <InputSuffix>{suffix}</InputSuffix>}
        </InputWrapper>
    );
};