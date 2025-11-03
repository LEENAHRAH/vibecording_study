'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

// 모달 스택 아이템 인터페이스
interface ModalStackItem {
  id: string;
  content: ReactNode;
  onClose?: () => void;
}

// 모달 컨텍스트 타입
interface ModalContextType {
  /** 현재 열린 모달이 있는지 여부 */
  isOpen: boolean;
  /** 모달 스택 개수 */
  stackCount: number;
  /** 모달 열기 */
  openModal: (content: ReactNode, onClose?: () => void) => string;
  /** 특정 모달 닫기 */
  closeModal: (id?: string) => void;
  /** 모든 모달 닫기 */
  closeAllModals: () => void;
  /** 최상위 모달 닫기 */
  closeTopModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * 모달 컨텍스트를 사용하기 위한 커스텀 훅
 * 
 * @returns 모달 관련 상태와 함수들
 * @throws ModalProvider 외부에서 사용 시 에러 발생
 */
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

/**
 * 모달 프로바이더 컴포넌트
 * 
 * 중첩 모달을 지원하는 고급 모달 관리 시스템을 제공합니다.
 * - 중첩 모달 지원 (스택 관리)
 * - 각 모달마다 독립적인 백드롭
 * - Body 스크롤 제어
 * - ESC 키 및 백드롭 클릭 지원
 * - 접근성 지원 (ARIA 속성)
 * 
 * @param children - 자식 컴포넌트들
 */
export function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<ModalStackItem[]>([]);

  // 모달 ID 생성
  const generateModalId = useCallback(() => {
    return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Body 스크롤 제어
  useEffect(() => {
    if (modalStack.length > 0) {
      // 모달이 열려있으면 body 스크롤 제거
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // 스크롤바 공간 보정
    } else {
      // 모든 모달이 닫히면 body 스크롤 복원
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [modalStack.length]);

  // 최상위 모달 닫기
  const closeTopModal = useCallback(() => {
    setModalStack(prev => {
      if (prev.length === 0) return prev;
      
      const topModal = prev[prev.length - 1];
      topModal.onClose?.();
      
      return prev.slice(0, -1);
    });
  }, []);

  // 모달 열기
  const openModal = useCallback((content: ReactNode, onClose?: () => void): string => {
    const id = generateModalId();
    const newModal: ModalStackItem = { id, content, onClose };
    
    setModalStack(prev => [...prev, newModal]);
    return id;
  }, [generateModalId]);

  // 특정 모달 닫기
  const closeModal = useCallback((id?: string) => {
    if (!id) {
      // ID가 없으면 최상위 모달 닫기
      closeTopModal();
      return;
    }

    setModalStack(prev => {
      const modalIndex = prev.findIndex(modal => modal.id === id);
      if (modalIndex === -1) return prev;

      const modal = prev[modalIndex];
      modal.onClose?.();

      // 해당 모달과 그 위의 모든 모달들을 닫기
      return prev.slice(0, modalIndex);
    });
  }, [closeTopModal]);

  // ESC 키 처리
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalStack.length > 0) {
        closeTopModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [modalStack.length, closeTopModal]);

  // 모든 모달 닫기
  const closeAllModals = useCallback(() => {
    setModalStack(prev => {
      prev.forEach(modal => modal.onClose?.());
      return [];
    });
  }, []);

  // 백드롭 클릭 핸들러
  const handleBackdropClick = useCallback((event: React.MouseEvent, modalId: string) => {
    if (event.target === event.currentTarget) {
      closeModal(modalId);
    }
  }, [closeModal]);

  const modalValue: ModalContextType = {
    isOpen: modalStack.length > 0,
    stackCount: modalStack.length,
    openModal,
    closeModal,
    closeAllModals,
    closeTopModal,
  };

  return (
    <ModalContext.Provider value={modalValue}>
      {children}
      {modalStack.length > 0 &&
        typeof window !== 'undefined' &&
        modalStack.map((modal, index) =>
          createPortal(
            <div
              key={modal.id}
              className={styles.modalBackdrop}
              style={{
                zIndex: 9999 + index, // 각 모달마다 z-index 증가
              }}
              onClick={(e) => handleBackdropClick(e, modal.id)}
              role="dialog"
              aria-modal="true"
            >
              {/* 백드롭 */}
              <div 
                className={styles.backdrop}
                style={{
                  backgroundColor: `rgba(0, 0, 0, ${0.3 + (index * 0.1)})`, // 중첩될수록 어두워짐
                }}
              />
              
              {/* 모달 콘텐츠 */}
              <div className={styles.modalContent}>
                {modal.content}
              </div>
            </div>,
            document.body
          )
        )}
    </ModalContext.Provider>
  );
}
