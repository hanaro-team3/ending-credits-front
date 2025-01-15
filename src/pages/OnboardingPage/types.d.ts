export interface TextMiddle {
  size: number;
  textArray: {
    fontWeight: string;
    text: string;
  }[];
}

export interface OnboardingData {
  path: str
  textTop: string;
  textMiddle1: TextMiddle;
  textMiddle2: TextMiddle;
  textBottom: string;
}

