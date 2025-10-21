'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

// SearchBar 컴포넌트 Props 타입 정의
export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** SearchBar 변형 스타일 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** SearchBar 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 검색 아이콘 표시 여부 */
  showSearchIcon?: boolean;
  /** 커스텀 검색 아이콘 */
  searchIcon?: React.ReactNode;
  /** 검색 버튼 클릭 핸들러 */
  onSearch?: (value: string) => void;
  /** 클리어 버튼 표시 여부 */
  showClearButton?: boolean;
  /** 클리어 버튼 클릭 핸들러 */
  onClear?: () => void;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 컨테이너 클래스명 */
  containerClassName?: string;
  /** 로딩 상태 */
  loading?: boolean;
}

/**
 * SearchBar 컴포넌트
 *
 * Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공하는 검색바 컴포넌트입니다.
 * - variant: primary, secondary, tertiary 스타일 지원
 * - size: small, medium, large 크기 지원
 * - theme: light, dark 테마 지원
 * - 검색 아이콘, 클리어 버튼, 로딩 상태 등 다양한 옵션 제공
 * - 접근성(a11y) 완전 지원
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      showSearchIcon = true,
      searchIcon,
      onSearch,
      showClearButton = false,
      onClear,
      fullWidth = false,
      containerClassName = '',
      className = '',
      disabled = false,
      loading = false,
      placeholder = '검색어를 입력해 주세요.',
      value,
      onChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    // 내부 상태 관리
    const [internalValue, setInternalValue] = React.useState(value || '');

    // value prop이 변경될 때 내부 상태 업데이트
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // CSS 클래스 조합
    const containerClasses = [
      styles.container,
      styles[`container--${variant}`],
      styles[`container--${size}`],
      styles[`container--${theme}`],
      disabled && styles['container--disabled'],
      loading && styles['container--loading'],
      fullWidth && styles['container--full-width'],
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      disabled && styles['input--disabled'],
      showSearchIcon && styles['input--with-search-icon'],
      showClearButton && internalValue && styles['input--with-clear-button'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 기본 검색 아이콘
    const DefaultSearchIcon = () => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.searchIconSvg}
      >
        <path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          fill="currentColor"
        />
      </svg>
    );

    // 클리어 버튼 아이콘
    const ClearIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.clearIconSvg}
      >
        <path
          d="M10 8.586L14.95 3.636a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 11-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05a1 1 0 011.414-1.414L10 8.586z"
          fill="currentColor"
        />
      </svg>
    );

    // 로딩 스피너
    const LoadingSpinner = () => (
      <div className={styles.spinner}>
        <div className={styles.spinnerCircle}></div>
      </div>
    );

    // 입력값 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    // 키보드 이벤트 핸들러
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(internalValue.toString());
      }
      onKeyDown?.(e);
    };

    // 검색 버튼 클릭 핸들러
    const handleSearchClick = () => {
      if (onSearch && !disabled && !loading) {
        onSearch(internalValue.toString());
      }
    };

    // 클리어 버튼 클릭 핸들러
    const handleClearClick = () => {
      setInternalValue('');
      onClear?.();

      // input에 focus 유지
      if (ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    };

    return (
      <div className={containerClasses}>
        {/* 검색 아이콘 */}
        {showSearchIcon && (
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleSearchClick}
            disabled={disabled || loading}
            aria-label="검색"
          >
            {loading ? <LoadingSpinner /> : searchIcon || <DefaultSearchIcon />}
          </button>
        )}

        {/* 입력 필드 */}
        <input
          ref={ref}
          type="text"
          className={inputClasses}
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="검색어 입력"
          {...props}
        />

        {/* 클리어 버튼 */}
        {showClearButton && internalValue && !loading && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearClick}
            disabled={disabled}
            aria-label="검색어 지우기"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

// 기본 내보내기
export default SearchBar;

// 추가 유틸리티 타입들
export type SearchBarVariant = SearchBarProps['variant'];
export type SearchBarSize = SearchBarProps['size'];
export type SearchBarTheme = SearchBarProps['theme'];
