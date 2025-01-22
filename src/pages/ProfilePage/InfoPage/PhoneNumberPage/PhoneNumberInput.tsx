import React, { useState } from "react";
import styled from "styled-components";

interface PhoneNumberInputProps {
  prefixOptions?: string[]; // 선택 가능한 접두사 옵션
  defaultPrefix?: string; // 기본 접두사
  onChange?: (phoneNumber: string) => void; // 전체 전화번호가 변경될 때 호출
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  width: 100%;
`;

const Select = styled.select`
  color: black;
  background-color: white;
  border: 2px solid #4792dc;
  border-radius: 12px 0px 0px 12px;
  padding: 1rem;
  font-size: 16px;
  height: 100%;
`;

const Input = styled.input`
  color: black;
  background-color: white;
  border: 2px solid #4792dc;
  border-radius: 0px 12px 12px 0px;
  padding: 1rem;
  font-size: 16px;
  width: 100%;
  height: 100%;
`;

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  prefixOptions = ["010", "011", "016", "017", "018", "019"],
  defaultPrefix = "010",
  onChange,
}) => {
  const [prefix, setPrefix] = useState<string>(defaultPrefix);
  const [mainNumber, setMainNumber] = useState<string>("");

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrefix = e.target.value;
    setPrefix(newPrefix);
    onChange?.(`${newPrefix}-${mainNumber}`);
  };

  const handleMainNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length > 8) value = value.slice(0, 8);

    // 하이픈 추가
    if (value.length > 4) {
      value = `${value.slice(0, 4)}-${value.slice(4)}`;
    }

    setMainNumber(value);
    onChange?.(`${prefix}-${value}`);
  };

  return (
    <Container>
      <Select value={prefix} onChange={handlePrefixChange}>
        {prefixOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Input
        type="tel"
        value={mainNumber}
        onChange={handleMainNumberChange}
        placeholder="-없이 입력"
      />
    </Container>
  );
};

export default PhoneNumberInput;
