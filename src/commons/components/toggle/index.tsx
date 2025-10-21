'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';

// Toggle 컴포넌트 Props 인터페이스
export interface ToggleProps {
  /** Toggle 상태 (제어 컴포넌트) */
  checked?: boolean;
  /** 기본 Toggle 상태 (비제어 컴포넌트) */
  defaultChecked?: boolean;
  /** Toggle 상태 변경 핸들러 */
  onChange?: (checked: boolean) => void;
  /** Toggle 비활성화 여부 */
  disabled?: boolean;
  /** Toggle 변형 스타일 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Toggle 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 접근성을 위한 라벨 */
  'aria-label'?: string;
  /** 접근성을 위한 설명 */
  'aria-describedby'?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
  /** 테스트를 위한 data-testid */
  'data-testid'?: string;
}

/**
 * Toggle 컴포넌트
 * 
 * 사용자가 두 가지 상태(켜짐/꺼짐) 사이를 전환할 수 있는 인터랙티브 컴포넌트입니다.
 * 
 * @example
 * ```tsx
 * // 기본 사용법
 * <Toggle onChange={(checked) => console.log(checked)} />
 * 
 * // 제어 컴포넌트
 * <Toggle checked={isEnabled} onChange={setIsEnabled} />
 * 
 * // 다양한 변형
 * <Toggle variant="primary" size="large" theme="dark" />
 * ```
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className,
  style,
  'data-testid': dataTestId,
}) => {
  // 내부 상태 관리 (비제어 컴포넌트용)
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  // 제어/비제어 컴포넌트 처리
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  // Toggle 상태 변경 핸들러
  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  // CSS 클래스 조합
  const toggleClasses = [
    styles.toggle,
    styles[`toggle--${variant}`],
    styles[`toggle--${size}`],
    styles[`toggle--${theme}`],
    isChecked && styles['toggle--checked'],
    disabled && styles['toggle--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const thumbClasses = [
    styles.thumb,
    styles[`thumb--${variant}`],
    styles[`thumb--${size}`],
    styles[`thumb--${theme}`],
    isChecked && styles['thumb--checked'],
    disabled && styles['thumb--disabled'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      className={toggleClasses}
      style={style}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      data-testid={dataTestId}
    >
      <span className={thumbClasses} />
    </button>
  );
};

export default Toggle;

