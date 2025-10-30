import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { URLS } from '../../constants/url';

// 탭 타입 정의
export type TabType = 'diaries' | 'pictures';

// 링크 라우팅 훅 반환 타입 정의
export interface UseLinkRoutingReturn {
  /** 현재 활성 탭 */
  activeTab: TabType;
  /** 현재 경로 */
  currentPath: string;
  /** 로고 클릭 핸들러 */
  handleLogoClick: () => void;
  /** 일기보관함 탭 클릭 핸들러 */
  handleDiariesTabClick: () => void;
  /** 사진보관함 탭 클릭 핸들러 */
  handlePicturesTabClick: () => void;
  /** 특정 탭의 활성 상태 확인 함수 */
  isTabActive: (tab: TabType) => boolean;
}

/**
 * 링크 라우팅 및 네비게이션 활성 상태 관리 훅
 *
 * 레이아웃 컴포넌트에서 사용되는 링크 라우팅 기능을 제공합니다.
 * - 현재 경로에 따른 활성 탭 자동 설정
 * - 로고 및 네비게이션 탭 클릭 핸들러 제공
 * - 활성 상태 확인 함수 제공
 * - Next.js 라우터를 사용한 페이지 이동
 */
export const useLinkRouting = (): UseLinkRoutingReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<TabType>('diaries');

  // 현재 경로에 따라 활성 탭 설정
  useEffect(() => {
    if (pathname === URLS.DIARIES.LIST || pathname.startsWith('/diaries')) {
      setActiveTab('diaries');
    } else if (pathname === URLS.PICTURES.LIST || pathname.startsWith('/pictures')) {
      setActiveTab('pictures');
    }
  }, [pathname]);

  /**
   * 로고 클릭 핸들러 - 일기목록 페이지로 이동
   */
  const handleLogoClick = () => {
    router.push(URLS.DIARIES.LIST);
  };

  /**
   * 일기보관함 탭 클릭 핸들러
   */
  const handleDiariesTabClick = () => {
    router.push(URLS.DIARIES.LIST);
  };

  /**
   * 사진보관함 탭 클릭 핸들러
   */
  const handlePicturesTabClick = () => {
    router.push(URLS.PICTURES.LIST);
  };

  /**
   * 특정 탭이 활성 상태인지 확인
   * @param tab 확인할 탭 타입
   * @returns 활성 상태 여부
   */
  const isTabActive = (tab: TabType): boolean => {
    return activeTab === tab;
  };

  return {
    activeTab,
    currentPath: pathname,
    handleLogoClick,
    handleDiariesTabClick,
    handlePicturesTabClick,
    isTabActive,
  };
};
