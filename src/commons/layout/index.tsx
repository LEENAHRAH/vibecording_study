'use client';

import React from 'react';
import styles from './styles.module.css';
import { useLinkRouting } from './hooks/index.link.routing.hook';

// Layout Props 타입 정의
export interface LayoutProps {
  /** 레이아웃 내부에 렌더링될 자식 요소들 */
  children: React.ReactNode;
}

/**
 * Layout 컴포넌트
 *
 * 애플리케이션의 전체 레이아웃을 담당하는 컴포넌트입니다.
 * - 헤더: 로고 및 네비게이션
 * - 배너: 메인 배너 이미지
 * - 네비게이션: 일기보관함/사진보관함 탭
 * - 메인 콘텐츠 영역
 * - 푸터: 저작권 정보
 * - 링크 라우팅 및 활성 상태 관리 기능 포함
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    handleLogoClick,
    handleDiariesTabClick,
    handlePicturesTabClick,
    isTabActive,
  } = useLinkRouting();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div 
          className={styles.logo}
          onClick={handleLogoClick}
          data-testid="logo"
        >
          <span className={styles.logoText}>민지의 다이어리</span>
        </div>
      </header>
      
      <div className={styles.gap}></div>
      
      <div className={styles.banner}>
        <div className={styles.bannerImage}></div>
      </div>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div 
            className={`${styles.tab} ${isTabActive('diaries') ? styles.tabActive : ''}`}
            onClick={handleDiariesTabClick}
            data-testid="diaries-tab"
          >
            <span className={isTabActive('diaries') ? styles.tabTextActive : styles.tabTextInactive}>
              일기보관함
            </span>
          </div>
          <div 
            className={`${styles.tab} ${isTabActive('pictures') ? styles.tabActive : ''}`}
            onClick={handlePicturesTabClick}
            data-testid="pictures-tab"
          >
            <span className={isTabActive('pictures') ? styles.tabTextActive : styles.tabTextInactive}>
              사진보관함
            </span>
          </div>
        </div>
      </nav>
      
      <main className={styles.children}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerTitle}>민지의 다이어리</div>
          <div className={styles.footerRepresentative}>대표 : {'{name}'}</div>
          <div className={styles.footerCopyright}>Copyright © 2024. {'{name}'} Co., Ltd.</div>
        </div>
      </footer>
    </div>
  );
};

// 기본 내보내기
export default Layout;

// 추가 유틸리티 타입들
export type LayoutPropsType = LayoutProps;
export type { TabType } from './hooks/index.link.routing.hook';
