import styled from "styled-components";

export const Text = styled.span`
  color: white;
  font-size: ${(props) => props.style?.fontSize};
  font-weight: ${(props) => props.style?.fontWeight};
`;

export const Button = styled.button`
  width: 90%;
  height: 55px;
  background-color: ${(props) => props.style?.backgroundColor};
  color: ${(props) => props.style?.color};
  outline: ${(props) => props.style?.outline};
  border-radius: 12px;
`;

export const SlideContainer = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.$index * 100}vw);
  width: calc(100vw);
`;

export const Slide = styled.div`
  flex-shrink: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const IndicatorDot = styled.div<{ $active?: boolean }>`
  width: ${(props) => (props.$active ? "18px" : "8px")};
  height: 8px;
  border-radius: ${(props) => (props.$active ? "25px" : "100%")};
  background-color: ${(props) => (props.$active ? "white" : "gray")};
  transition: background-color 0.5s ease-in-out;
`;
