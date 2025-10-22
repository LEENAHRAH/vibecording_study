'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

// Pagination 컴포넌트의 Props 타입 정의
export interface PaginationProps {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (page: number) => void;
  /** 컴포넌트 variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 컴포넌트 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 */
  theme?: 'light' | 'dark';
  /** 표시할 페이지 번호의 최대 개수 */
  maxVisiblePages?: number;
  /** 이전/다음 버튼 표시 여부 */
  showNavigationButtons?: boolean;
  /** 첫 페이지/마지막 페이지로 이동 버튼 표시 여부 */
  showFirstLastButtons?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

/**
 * Pagination 컴포넌트
 *
 * 페이지네이션 UI를 제공하는 컴포넌트입니다.
 * 피그마 디자인을 기반으로 한 페이지네이션 컴포넌트입니다.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  maxVisiblePages = 5,
  showNavigationButtons = true,
  showFirstLastButtons = false,
  disabled = false,
  className = '',
  ariaLabel = '페이지네이션',
}) => {
  // 페이지 번호 배열 생성 로직
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 최대 표시 개수보다 적으면 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 페이지 범위 계산
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // 끝 페이지가 조정되면 시작 페이지도 다시 조정
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (disabled || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  // 이전 페이지로 이동
  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  // 첫 페이지로 이동
  const handleFirst = () => {
    handlePageChange(1);
  };

  // 마지막 페이지로 이동
  const handleLast = () => {
    handlePageChange(totalPages);
  };

  // CSS 클래스 조합 (완전한 variant 시스템)
  const containerClasses = [
    styles.pagination,
    styles[`pagination--${variant}`],
    styles[`pagination--${size}`],
    styles[`pagination--${theme}`],
    disabled && styles['pagination--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonClasses = (isActive: boolean, isDisabled: boolean = false) =>
    [
      styles.paginationButton,
      styles[`paginationButton--${variant}`],
      styles[`paginationButton--${size}`],
      styles[`paginationButton--${theme}`],
      isActive && styles['paginationButton--active'],
      isDisabled && styles['paginationButton--disabled'],
    ]
      .filter(Boolean)
      .join(' ');

  const navigationClasses = (isDisabled: boolean = false) =>
    [
      styles.navigationButton,
      styles[`navigationButton--${variant}`],
      styles[`navigationButton--${size}`],
      styles[`navigationButton--${theme}`],
      isDisabled && styles['navigationButton--disabled'],
    ]
      .filter(Boolean)
      .join(' ');

  // Single page 처리 (Figma 디자인에 맞춤)
  if (totalPages === 1) {
    return (
      <nav className={containerClasses} aria-label={ariaLabel} role="navigation">
        <div className={styles.pageNumbers}>
          <button
            type="button"
            className={buttonClasses(true, disabled)}
            onClick={() => handlePageChange(1)}
            disabled={disabled}
            aria-label="1페이지"
            aria-current="page"
          >
            1
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className={containerClasses} aria-label={ariaLabel} role="navigation">
      {/* 첫 페이지 버튼 */}
      {showFirstLastButtons && (
        <button
          type="button"
          className={navigationClasses(currentPage === 1 || disabled)}
          onClick={handleFirst}
          disabled={currentPage === 1 || disabled}
          aria-label="첫 페이지로 이동"
        >
          <Image
            src={currentPage === 1 || disabled ? "/icons/leftdisabled_outline_light_m.svg" : "/icons/leftenable_outline_light_m.svg"}
            alt="첫 페이지"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* 이전 페이지 버튼 */}
      {showNavigationButtons && (
        <button
          type="button"
          className={navigationClasses(currentPage === 1 || disabled)}
          onClick={handlePrevious}
          disabled={currentPage === 1 || disabled}
          aria-label="이전 페이지로 이동"
        >
          <Image
            src={currentPage === 1 || disabled ? "/icons/leftdisabled_outline_light_m.svg" : "/icons/leftenable_outline_light_m.svg"}
            alt="이전 페이지"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* 페이지 번호 버튼들 */}
      <div className={styles.pageNumbers}>
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            className={buttonClasses(page === currentPage, disabled)}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
            aria-label={`${page}페이지로 이동`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}
      {showNavigationButtons && (
        <button
          type="button"
          className={navigationClasses(currentPage === totalPages || disabled)}
          onClick={handleNext}
          disabled={currentPage === totalPages || disabled}
          aria-label="다음 페이지로 이동"
        >
          <Image
            src={currentPage === totalPages || disabled ? "/icons/rightdisabled_outline_light_m.svg" : "/icons/rightenable_outline_light_m.svg"}
            alt="다음 페이지"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* 마지막 페이지 버튼 */}
      {showFirstLastButtons && (
        <button
          type="button"
          className={navigationClasses(currentPage === totalPages || disabled)}
          onClick={handleLast}
          disabled={currentPage === totalPages || disabled}
          aria-label="마지막 페이지로 이동"
        >
          <Image
            src={currentPage === totalPages || disabled ? "/icons/rightdisabled_outline_light_m.svg" : "/icons/rightenable_outline_light_m.svg"}
            alt="마지막 페이지"
            width={24}
            height={24}
          />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
