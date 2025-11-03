import React from 'react';
import { Button } from '../button';
import styles from './styles.module.css';

// Modal Props 타입 정의
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 모달 변형 타입 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 액션 버튼 타입 */
  actions?: 'single' | 'dual';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 모달 제목 */
  title: string;
  /** 모달 메시지 */
  message: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 핸들러 */
  onCancel?: () => void;
  /** 모달 닫기 핸들러 */
  onClose?: () => void;
  /** 접근성을 위한 라벨 */
  'aria-label'?: string;
  /** 접근성을 위한 설명 */
  'aria-describedby'?: string;
  /** 테스트를 위한 data-testid */
  'data-testid'?: string;
}

/**
 * Modal 컴포넌트
 * 
 * 사용자에게 중요한 정보를 표시하거나 확인을 요청하는 모달 다이얼로그 컴포넌트입니다.
 * modal.provider와 함께 사용되며, 자체 backdrop을 생성하지 않습니다.
 * 
 * @example
 * ```tsx
 * // 기본 사용법 (단일 액션)
 * <Modal 
 *   title="알림" 
 *   message="작업이 완료되었습니다." 
 *   onConfirm={() => console.log('확인')}
 * />
 * 
 * // 이중 액션 모달
 * <Modal 
 *   variant="secondary" 
 *   actions="dual"
 *   title="삭제 확인" 
 *   message="정말로 삭제하시겠습니까?"
 *   confirmText="삭제"
 *   cancelText="취소"
 *   onConfirm={() => handleDelete()}
 *   onCancel={() => handleCancel()}
 * />
 * 
 * // 다크 테마
 * <Modal 
 *   variant="tertiary" 
 *   theme="dark"
 *   title="다크 모달" 
 *   message="다크 테마로 표시되는 모달입니다."
 * />
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  variant = 'primary',
  actions = 'single',
  theme = 'light',
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId,
  ...props
}) => {
  // CSS 클래스 조합
  const modalClasses = [
    styles.modal,
    styles[`modal--${variant}`],
    styles[`modal--${theme}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClasses = [
    styles.content,
    styles[`content--${theme}`],
  ]
    .filter(Boolean)
    .join(' ');

  const actionsClasses = [
    styles.actions,
    styles[`actions--${actions}`],
  ]
    .filter(Boolean)
    .join(' ');

  // 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <div 
      className={modalClasses}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
      aria-describedby={ariaDescribedby}
      data-testid={dataTestId}
      {...props}
    >
      {/* 모달 콘텐츠 */}
      <div className={contentClasses}>
        {/* 제목 */}
        <h2 className={styles.title} id="modal-title">{title}</h2>
        
        {/* 메시지 */}
        <p className={styles.message} id="modal-description">{message}</p>
      </div>

      {/* 액션 버튼 영역 */}
      <div className={actionsClasses}>
        {actions === 'dual' && (
          <Button
            variant="secondary"
            theme="light"
            size="medium"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            {cancelText}
          </Button>
        )}
        
        <Button
          variant="primary"
          theme="light"
          size="medium"
          onClick={handleConfirm}
          className={actions === 'single' ? styles.singleButton : styles.confirmButton}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

// 기본 내보내기
export default Modal;

// 추가 유틸리티 타입들
export type ModalVariant = ModalProps['variant'];
export type ModalActions = ModalProps['actions'];
export type ModalTheme = ModalProps['theme'];

// 하위 호환성을 위한 레거시 타입들 (deprecated)
/** @deprecated Use ModalVariant with 'primary' instead */
export type LegacyModalInfo = 'info';
/** @deprecated Use ModalVariant with 'secondary' instead */  
export type LegacyModalDanger = 'danger';
