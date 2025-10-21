import React from 'react';
import styles from './styles.module.css';

// Button Props 타입 정의
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 타입 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 아이콘 (선택사항) */
  icon?: React.ReactNode;
  /** 아이콘 위치 */
  iconPosition?: 'left' | 'right';
  /** 로딩 상태 */
  loading?: boolean;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 자식 요소 (버튼 텍스트) */
  children: React.ReactNode;
}

/**
 * Button 컴포넌트
 *
 * Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공하는 버튼 컴포넌트입니다.
 * - variant: primary, secondary, tertiary 스타일 지원
 * - size: small, medium, large 크기 지원
 * - theme: light, dark 테마 지원
 * - 아이콘, 로딩 상태, 전체 너비 등 다양한 옵션 제공
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  // CSS 클래스 조합
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    styles[`button--${theme}`],
    fullWidth && styles['button--fullWidth'],
    loading && styles['button--loading'],
    disabled && styles['button--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 로딩 스피너 컴포넌트
  const LoadingSpinner = () => (
    <div className={styles.spinner}>
      <div className={styles.spinnerCircle}></div>
    </div>
  );

  // 아이콘 렌더링
  const renderIcon = () => {
    if (loading) return <LoadingSpinner />;
    if (!icon) return null;
    return <span className={styles.buttonIcon}>{icon}</span>;
  };

  // 버튼 내용 렌더링
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          <span className={styles.buttonText}>{children}</span>
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          {renderIcon()}
          <span className={styles.buttonText}>{children}</span>
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          <span className={styles.buttonText}>{children}</span>
          {renderIcon()}
        </>
      );
    }

    return <span className={styles.buttonText}>{children}</span>;
  };

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {renderContent()}
    </button>
  );
};

// 기본 내보내기
export default Button;

// 추가 유틸리티 타입들
export type ButtonVariant = ButtonProps['variant'];
export type ButtonSize = ButtonProps['size'];
export type ButtonTheme = ButtonProps['theme'];
