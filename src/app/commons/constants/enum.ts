// Emotion Enum - 감정 관련 열거형 및 설정
// 프로젝트에서 사용되는 감정 데이터 타입 및 관련 정보

import { colors } from './color';

// 감정 타입 열거형
export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SURPRISE = 'SURPRISE',
  ETC = 'ETC',
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
    label: '행복해요',
    images: {
      medium: '/icons/emotion-happy-m.svg',
      small: '/icons/emotion-happy-s.svg', // 요구사항에 따라 설정하지만 실제 파일은 없음
    },
    color: colors.error[600], // red60에 해당하는 색상 (error.600 = #dc2626)
  },
  [EmotionType.SAD]: {
    label: '슬퍼요',
    images: {
      medium: '/icons/emotion-sad-m.svg',
      small: '/icons/emotion-sad-s.svg', // 요구사항에 따라 설정하지만 실제 파일은 없음
    },
    color: colors.info[600], // blue60에 해당하는 색상 (info.600 = #2563eb)
  },
  [EmotionType.ANGRY]: {
    label: '화나요',
    images: {
      medium: '/icons/emotion-angry-m.svg',
      small: '/icons/emotion-angry-s.svg', // 요구사항에 따라 설정하지만 실제 파일은 없음
    },
    color: colors.neutral[600], // gray60에 해당하는 색상 (neutral.600 = #52525b)
  },
  [EmotionType.SURPRISE]: {
    label: '놀랐어요',
    images: {
      medium: '/icons/emotion-surprise-m.svg',
      small: '/icons/emotion-surprise-s.svg', // 요구사항에 따라 설정하지만 실제 파일은 없음
    },
    color: colors.warning[600], // yellow60에 해당하는 색상 (warning.600 = #d97706)
  },
  [EmotionType.ETC]: {
    label: '기타',
    images: {
      medium: '/icons/emotion-etc-m.svg',
      small: '/icons/emotion-etc-s.svg', // 요구사항에 따라 설정하지만 실제 파일은 없음
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
  size: 'medium' | 'small' = 'medium'
): string => {
  return emotionConfig[emotionType].images[size];
};

export const getEmotionColor = (emotionType: EmotionType): string => {
  return emotionConfig[emotionType].color;
};

// 모든 감정 타입 배열 (순회용)
export const allEmotionTypes = Object.values(EmotionType);

// 감정 타입 검증 함수
export const isValidEmotionType = (value: string): value is EmotionType => {
  return Object.values(EmotionType).includes(value as EmotionType);
};
