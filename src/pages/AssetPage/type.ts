import { TAB_DATA, BANK_DATA } from "./constants";

export interface BankDataType {
    type: string;
    banks: string[];
}

export type BankType = typeof TAB_DATA[number];
export type BankData = typeof BANK_DATA[number]; 