// Emotion Enum - 감정 관련 열거형 및 설정
// 프로젝트에서 사용되는 감정 데이터 타입 및 관련 정보

import { colors } from "@/commons/constants/color";

// 감정 타입 열거형
export enum EmotionType {
  HAPPY = "HAPPY",
  SAD = "SAD",
  ANGRY = "ANGRY",
  SURPRISE = "SURPRISE",
  ETC = "ETC",
}

// 감정별 표시 정보 인터페이스
export interface EmotionInfo {
  label: string;
  images: {
    medium: string;
    small: string;
  };
  color: string;
}

// 감정별 설정 정보 매핑
export const emotionConfig: Record<EmotionType, EmotionInfo> = {
  [EmotionType.HAPPY]: {
    label: "행복해요",
    images: {
      medium: "/images/emotion-happy-m.png",
      small: "/images/emotion-happy-s.png",
    },
    color: colors.error[600], // red60에 해당하는 색상 (error.600 = #dc2626)
  },
  [EmotionType.SAD]: {
    label: "슬퍼요",
    images: {
      medium: "/images/emotion-sad-m.png",
      small: "/images/emotion-sad-s.png",
    },
    color: colors.info[600], // blue60에 해당하는 색상 (info.600 = #2563eb)
  },
  [EmotionType.ANGRY]: {
    label: "화나요",
    images: {
      medium: "/images/emotion-angry-m.png",
      small: "/images/emotion-angry-s.png",
    },
    color: colors.neutral[600], // gray60에 해당하는 색상 (neutral.600 = #52525b)
  },
  [EmotionType.SURPRISE]: {
    label: "놀랐어요",
    images: {
      medium: "/images/emotion-surprise-m.png",
      small: "/images/emotion-surprise-s.png",
    },
    color: colors.warning[600], // yellow60에 해당하는 색상 (warning.600 = #d97706)
  },
  [EmotionType.ETC]: {
    label: "기타",
    images: {
      medium: "/images/emotion-etc-m.png",
      small: "/images/emotion-etc-s.png",
    },
    color: colors.success[600], // green60에 해당하는 색상 (success.600 = #16a34a)
  },
} as const;

// 유틸리티 함수들
export const getEmotionInfo = (emotionType: EmotionType): EmotionInfo => {
  return emotionConfig[emotionType];
};

export const getEmotionLabel = (emotionType: EmotionType): string => {
  return emotionConfig[emotionType].label;
};

export const getEmotionImage = (
  emotionType: EmotionType,
  size: "medium" | "small" = "medium"
): string => {
  return emotionConfig[emotionType].images[size];
};

export const getEmotionColor = (emotionType: EmotionType): string => {
  return emotionConfig[emotionType].color;
};

// 모든 감정 타입 배열 (순회용) - 피그마 디자인 순서와 일치
export const allEmotionTypes = [
  EmotionType.HAPPY,
  EmotionType.SAD,
  EmotionType.SURPRISE,
  EmotionType.ANGRY,
  EmotionType.ETC,
];

// 감정 타입 검증 함수
export const isValidEmotionType = (value: string): value is EmotionType => {
  return Object.values(EmotionType).includes(value as EmotionType);
};
