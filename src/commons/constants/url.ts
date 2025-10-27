/**
 * URL 경로 관리 상수
 * 다이나믹 라우팅 및 링크 이동에 사용
 */

// 기본 URL 경로 상수
export const URLS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },

  // 일기 관련
  DIARIES: {
    LIST: '/diaries',
    DETAIL: '/diaries/[id]', // 다이나믹 라우팅
    NEW: '/diaries/new', // 일기쓰기
  },

  // 사진 관련
  PICTURES: {
    LIST: '/pictures',
  },
} as const;

// 다이나믹 URL 생성 함수
export const createDynamicUrl = {
  /**
   * 일기 상세 페이지 URL 생성
   * @param id 일기 ID
   * @returns 일기 상세 페이지 URL
   */
  diaryDetail: (id: string | number): string => `/diaries/${id}`,
} as const;

// 접근 권한 타입
export type AccessLevel = 'public' | 'member-only';

// UI 컴포넌트 노출 설정 타입
export interface UIVisibility {
  header: {
    show: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// URL별 메타데이터
export const URL_METADATA: Record<
  string,
  {
    path: string;
    accessLevel: AccessLevel;
    uiVisibility: UIVisibility;
  }
> = {
  // 로그인
  LOGIN: {
    path: URLS.AUTH.LOGIN,
    accessLevel: 'public',
    uiVisibility: {
      header: { show: false, logo: false, darkModeToggle: false },
      banner: false,
      navigation: false,
      footer: false,
    },
  },

  // 회원가입
  SIGNUP: {
    path: URLS.AUTH.SIGNUP,
    accessLevel: 'public',
    uiVisibility: {
      header: { show: false, logo: false, darkModeToggle: false },
      banner: false,
      navigation: false,
      footer: false,
    },
  },

  // 일기목록
  DIARIES_LIST: {
    path: URLS.DIARIES.LIST,
    accessLevel: 'public',
    uiVisibility: {
      header: { show: true, logo: true, darkModeToggle: false },
      banner: true,
      navigation: true,
      footer: true,
    },
  },

  // 일기상세
  DIARIES_DETAIL: {
    path: URLS.DIARIES.DETAIL,
    accessLevel: 'member-only',
    uiVisibility: {
      header: { show: true, logo: true, darkModeToggle: false },
      banner: false,
      navigation: false,
      footer: true,
    },
  },

  // 사진목록
  PICTURES_LIST: {
    path: URLS.PICTURES.LIST,
    accessLevel: 'public',
    uiVisibility: {
      header: { show: true, logo: true, darkModeToggle: false },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
} as const;

// URL 유틸리티 함수들
export const urlUtils = {
  /**
   * 현재 경로가 특정 URL과 일치하는지 확인
   * @param currentPath 현재 경로
   * @param targetUrl 대상 URL
   * @returns 일치 여부
   */
  isCurrentPath: (currentPath: string, targetUrl: string): boolean => {
    return currentPath === targetUrl;
  },

  /**
   * 다이나믹 라우팅 경로인지 확인
   * @param path 경로
   * @returns 다이나믹 라우팅 여부
   */
  isDynamicRoute: (path: string): boolean => {
    return path.includes('[') && path.includes(']');
  },

  /**
   * 다이나믹 라우팅 패턴과 실제 경로가 일치하는지 확인
   * @param pattern 패턴 (예: /diaries/[id])
   * @param actualPath 실제 경로 (예: /diaries/123)
   * @returns 일치 여부
   */
  matchesDynamicRoute: (pattern: string, actualPath: string): boolean => {
    const patternParts = pattern.split('/');
    const actualParts = actualPath.split('/');

    if (patternParts.length !== actualParts.length) {
      return false;
    }

    return patternParts.every((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return true; // 다이나믹 세그먼트는 모든 값과 매치
      }
      return part === actualParts[index];
    });
  },

  /**
   * URL 메타데이터 조회
   * @param path 경로
   * @returns URL 메타데이터 또는 null
   */
  getMetadata: (path: string) => {
    // 정확한 경로 매치 먼저 시도
    const exactMatch = Object.values(URL_METADATA).find(
      (meta) => meta.path === path
    );
    if (exactMatch) return exactMatch;

    // 다이나믹 라우팅 매치 시도
    const dynamicMatch = Object.values(URL_METADATA).find(
      (meta) =>
        urlUtils.isDynamicRoute(meta.path) &&
        urlUtils.matchesDynamicRoute(meta.path, path)
    );
    return dynamicMatch || null;
  },
} as const;

// 타입 내보내기
export type UrlKeys = keyof typeof URLS;
export type AuthUrlKeys = keyof typeof URLS.AUTH;
export type DiariesUrlKeys = keyof typeof URLS.DIARIES;
export type PicturesUrlKeys = keyof typeof URLS.PICTURES;
