import { BankDataType } from "./type";

export const ASSET_DATA = [
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png",
        label: "은행",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png",
        label: "증권",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png",
        label: "가상자산",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Dollar%20Banknote.png",
        label: "현금",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House%20with%20Garden.png",
        label: "부동산",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Automobile.png",
        label: "자동차",
    },
    {
        icon: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Briefcase.png",
        label: "연금",
    }
];

export const BANK_DATA: BankDataType[] = [
    {
        type: "은행",
        banks: [
            "KB국민은행", "카카오뱅크", "신한은행", "NH농협은행", "지역농협", 
            "하나은행", "우리은행", "IBK기업은행", "케이뱅크", "새마을금고", 
            "우체국", "신협", "SC제일은행", "iM뱅크", "BNK부산은행", 
            "BNK경남은행", "광주은행", "전북은행", "수협은행", "수협중앙회", 
            "씨티은행", "제주은행", "KDB산업은행", "산림조합중앙회", 
            "한국수출입은행", "한국농수한식품유통공사", "한국장학재단", 
            "한국주택금융공사", "신용회복위원회", "서민금융진흥원"
        ],
    },
    {
        type: "저축은행",
        banks: [
            "SBI저축은행", "OK저축은행", "웰컴저축은행", "신한저축은행", 
            "KB저축은행", "페퍼저축은행", "다올저축은행", "애큐온저축은행", 
            "하나저축은행", "NH저축은행", "한국투자저축은행", "상상인저축은행", 
            "IBK저축은행", "우리금융저축은행", "BNK저축은행", "고려저축은행", 
            "국제저축은행", "금화저축은행", "남양저축은행", "대명저축은행"
        ],
    },
    {
        type: "증권",
        banks: [
            "한국투자증권", "키움증권", "미래에셋증권", "신한투자증권", 
            "NH투자증권", "KB증권", "삼성증권", "카카오페이증권", "하나증권", 
            "대신증권", "유안타증권", "한화투자증권", "DB금융투자", 
            "유진투자증권", "SK증권", "현대차증권", "IBK투자증권", 
            "하이투자증권", "신영증권", "LS증권", "우리종합금융", 
            "한국포스증권", "메리츠증권", "교보증권", "다올투자증권", 
            "코리아에셋투자증권", "BNK투자증권", "케이프투자증권", 
            "한국증권금융", "부국증권"
        ],
    },
    {
        type: "가상자산",
        banks: ["업비트", "빗썸", "코인원", "코빗", "고팍스"],
    },
];

export const TAB_DATA = ["은행", "저축은행", "증권", "가상자산"] as const;