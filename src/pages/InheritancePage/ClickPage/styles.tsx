import styled from "styled-components";

export const StepContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 47px;
`;

export const Step = styled.div`
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: start;
`;

export const Number = styled.div`
    width: 34px;
    height: 34px;
    background: #4792dc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 18px;
    color: white;
`;

export const NumberLine = styled.div`
    width: 36px;
    height: 0px;
    border: 1px dashed #6e6e6e;
    transform: rotate(90deg);
    margin: 22px 0;
    padding-right: 2px;
`;

export const StepName = styled.div`
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 17px;
    color: #2b2b2b;
    margin-left: 15px;

    > span {
        color: #4792dc;
        font-weight: 700;
    }
`;

export const Line = styled.div`
    width: 393px;
    height: 0px;
    border: 0.5px solid #6d6d6d;
    margin-top: 90px;
`;

export const BottomText = styled.div`
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 14px;
    color: #2b2b2b;
    margin-top: 15px;
    margin-bottom: 20px;
`;

export const HeaderContainer = styled.div`
    width: 100%;
    height: auto;
    padding-top: 20px;
    background-color: #f2f4f5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 16px;
    color: black;
`;

export const CloseButton = styled.img`
    position: absolute;
    top: 25px;
    right: 29px;
    cursor: pointer;
    width: 12px;
    height: auto;
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const UploadPageContainer = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.div`
    width: 330px;
    justify-content: start;
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 23px;
    color: black;
    text-align: left;
    margin-top: 40px;
    line-height: 1.2;
`;

export const SubTitle = styled.div`
    width: 330px;
    justify-content: start;
    font-family: "Pretendard";
    font-weight: 400;
    font-size: 14px;
    color: black;
    text-align: left;
    margin-top: 8px;
    line-height: 1.2;
`;

export const ButtonBottomDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
`;

export const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export const AssetWhiteBox = styled.div`
    width: 330px;
    height: 400px;
    background: #ffffff;
    border: 1.5px solid #eeeeee;
    border-radius: 12px;
    margin-top: 36px;
    padding: 33px 23px 33px 23px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: scroll;
`;

export const AssetInfoCategory = styled.div`
    margin-bottom: 35px;
`;

export const AssetInfoTitle = styled.div`
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 22px;
    color: #2b2b2b;
`;

export const AssetInfoSubtitle = styled.div`
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 17px;
    color: #2b2b2b;
    margin-top: 12px;
`;

export const AssetInfoAddress = styled.div`
    font-family: "Pretendard";
    font-weight: 400;
    font-size: 15px;
    color: #2b2b2b;
    margin-top: 6px;
    margin-left: 14px;

    > span {
        margin-top: 4px;
    }
`;

export const AssetInfoLine = styled.div`
    width: 280px;
    height: 0px;
    border: 1px solid #c0c0c0;
    margin-bottom: 30px;
`;

// WritePage 관련 스타일
export const Page6InputDiv = styled.div`
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const Page6InputDivText = styled.div`
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 20px;
    color: #2b2b2b;
`;

export const Page6Select = styled.select`
    width: 208px;
    height: 39px;
    background: #ffffff;
    border: 1px solid #c4c4c4;
    border-radius: 12px;
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 14px;
    color: #2b2b2b;
    margin-left: 12px;
`;

export const WritePageContainer = styled.div`
    width: 330px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const WritePageDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const WritePageSmallInput = styled.input`
    width: 208px;
    height: 39px;
    display: flex;

    background: #ffffff;
    border: 1px solid #c4c4c4;
    border-radius: 12px;

    color: black;

    margin-left: 12px;
`;

export const WritePageInput = styled.textarea`
    width: 330px;
    height: 208px;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #c4c4c4;
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 400;
    color: #2b2b2b;
    margin-top: 9px;
    padding: 14px;

    &:focus {
        outline: none;
    }
`;

export const WritePageEditSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const SelectInheriPageContainer = styled.div`
    width: 333px;
    height: 500px;
    background: none;
    border-radius: 12px;
    margin-top: 36px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const SelectInheriPageWhiteBox = styled.div`
    width: 330px;
    height: auto;
    background: #ffffff;
    border: 1.5px solid #eeeeee;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 17px;
    padding: 23px 23px 35px 23px;
    position: relative;
`;

export const SelectInheriPageBody = styled.div`
    font-family: "Pretendard";
    font-weight: 400;
    font-size: 14px;
    color: #9a9a9a;
    margin: 24px 0 0 0;
`;

export const SelectInheriPageLine = styled.div`
    width: 330px;
    height: 0px;
    border: 1px solid #c0c0c0;
    margin: 30px 0;
`;

export const AddInheritorBtn = styled.div`
    box-sizing: border-box;
    width: 29px;
    height: 29px;
    background: #4792dc;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    position: absolute;
    top: 11px;
    right: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 16px;
    color: white;
    cursor: pointer;
`;

//--------------------------------------------
export const SuggestionsContainer = styled.div`
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const SuggestionChip = styled.button`
    padding: 4px 12px;
    background: #f5f5f5;
    border: 1px solid #eeeeee;
    border-radius: 16px;
    font-family: "Pretendard";
    font-size: 12px;
    color: #2b2b2b;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #e8e8e8;
    }
`;

//---------------------------------------------

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    width: 100%;
    height: auto;
    background: white;
    border-radius: 12px 12px 0 0;
    padding: 41px 28px;
    position: relative;
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 56px;
    background: #4792dc;
    border-radius: 12px;
    border: none;
    color: white;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 30px;
`;

export const ModalTitle = styled.div`
    font-family: "Pretendard";
    font-size: 24px;
    text-align: left;
    margin-bottom: 24px;
    font-weight: 600;
`;

export const InheritorForm = styled.div`
    margin-top: 32px;
`;

export const FormLabel = styled.div`
    font-family: "Pretendard";
    font-size: 20px;
    font-weight: 600;
    color: #2b2b2b;
    margin-right: 12px;
`;

export const FormInput = styled.input`
    width: 208px;
    height: 43px;
    border: 1px solid #eeeeee;
    border-radius: 12px;
    padding: 0 16px;
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 400;
    color: #2b2b2b;
    background-color: white;

    &:focus {
        outline: none;
        border: 1px solid #eeeeee;
    }
    &::placeholder {
        color: #9a9a9a;
    }
`;

export const FormSelect = styled.select`
    width: 208px;
    height: 43px;
    border: 1px solid #eeeeee;
    border-radius: 12px;
    padding: 0 16px;
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 400;
    color: #2b2b2b;
    appearance: none;
    background: white;

    &:focus {
        outline: none;
        border: 1px solid #eeeeee;
    }

    &:invalid,
    & option[value=""] {
        color: #9a9a9a;
    }
`;

export const InheritorDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
    margin: 24px 0 16px 0;
`;

export const InheritorInfo = styled.div`
    width: 100%;
`;

export const InheritanceRatio = styled.div`
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 14px;
    color: #2b2b2b;
    margin-bottom: 12px;
`;

export const DeleteButton = styled.button`
    width: 24px;
    height: 24px;
    /* background: #f5f5f5 */
    background: none;
    /* border: 1px solid #eeeeee; */
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* margin-left: 8px; */
    padding: 0 0 2px 0;

    font-family: "Pretendard";
    font-weight: 700;
    font-size: 20px;
    color: #e34141;

    &:hover {
        background: #eeeeee;
    }
`;

export const ProgressBarContainer = styled.div`
    display: flex;
    align-items: center;
    /* gap: 12px; */
    width: 100%;
`;

export const ProgressLabel = styled.div`
    font-family: "Pretendard";
    font-weight: 400;
    font-size: 14px;
    color: #4792dc;
    width: 45px;
`;

export const ProgressValue = styled.div`
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 14px;
    color: #2b2b2b;
    width: 45px;
    text-align: right;
`;

export const ProgressInput = styled.input`
    width: 45px;
    height: 24px;
    border: 1px solid #eeeeee;
    background-color: white;
    border-radius: 6px;
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 14px;
    color: #2b2b2b;
    text-align: center;
    padding: 0 4px;
    margin-left: 15px;

    &:focus {
        outline: none;
        border-color: #4792dc;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const ProgressSlider = styled.input.attrs({ type: "range" })<{
    $value: number;
    $maxAvailable?: number;
}>`
    flex: 1;
    height: 2px;
    -webkit-appearance: none;
    margin: 0;
    background: transparent;

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        background: linear-gradient(
            to right,
            #4792dc 0%,
            #4792dc ${(props) => props.$value}%,
            #eeeeee ${(props) => props.$value}%,
            #eeeeee 100%
        );
        border: none;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        background: #4792dc;
        border-radius: 50%;
        margin-top: -8px;
        cursor: pointer;
    }

    &::-moz-range-track {
        width: 100%;
        height: 2px;
        background: linear-gradient(
            to right,
            #4792dc 0%,
            #4792dc ${(props) => props.$value}%,
            #eeeeee ${(props) => props.$value}%,
            #eeeeee 100%
        );
        border: none;
    }

    &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        background: #4792dc;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;
