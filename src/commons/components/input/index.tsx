'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

// Input 컴포넌트 Props 타입 정의
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input 변형 스타일 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Input 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 헬퍼 텍스트 */
  helperText?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 필수 입력 표시 */
  required?: boolean;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 좌측 아이콘 */
  leftIcon?: React.ReactNode;
  /** 우측 아이콘 */
  rightIcon?: React.ReactNode;
  /** 컨테이너 클래스명 */
  containerClassName?: string;
  /** 라벨 클래스명 */
  labelClassName?: string;
}

/**
 * Input 컴포넌트
 *
 * Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공하는 입력 컴포넌트입니다.
 * - variant: primary, secondary, tertiary 스타일 지원
 * - size: small, medium, large 크기 지원
 * - theme: light, dark 테마 지원
 * - 에러 상태, 헬퍼 텍스트, 라벨, 아이콘 등 다양한 옵션 제공
 * - 접근성(a11y) 완전 지원
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      containerClassName = '',
      labelClassName = '',
      className = '',
      disabled = false,
      placeholder = '회고를 남겨보세요.',
      ...props
    },
    ref
  ) => {
    // CSS 클래스 조합
    const inputClasses = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      error && styles['input--error'],
      disabled && styles['input--disabled'],
      leftIcon && styles['input--with-left-icon'],
      rightIcon && styles['input--with-right-icon'],
      fullWidth && styles['input--full-width'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      styles.container,
      fullWidth && styles['container--full-width'],
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      styles[`label--${theme}`],
      error && styles['label--error'],
      disabled && styles['label--disabled'],
      labelClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const helperClasses = [
      styles.helper,
      styles[`helper--${theme}`],
      error && styles['helper--error'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {/* 라벨 */}
        {label && (
          <label className={labelClasses} htmlFor={props.id}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        {/* Input 래퍼 */}
        <div className={styles.inputWrapper}>
          {/* 좌측 아이콘 */}
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

          {/* Input 필드 */}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? `${props.id}-error`
                : helperText
                ? `${props.id}-helper`
                : undefined
            }
            {...props}
          />

          {/* 우측 아이콘 */}
          {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        </div>

        {/* 헬퍼 텍스트 또는 에러 메시지 */}
        {(helperText || errorMessage) && (
          <div
            className={helperClasses}
            id={
              error && errorMessage ? `${props.id}-error` : `${props.id}-helper`
            }
          >
            {error && errorMessage ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// 기본 내보내기
export default Input;

// 추가 유틸리티 타입들
export type InputVariant = InputProps['variant'];
export type InputSize = InputProps['size'];
export type InputTheme = InputProps['theme'];
