"use client";

import { useCallback } from "react";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";

/**
 * 일기 작성 모달 닫기 기능을 제공하는 커스텀 훅
 * 
 * 닫기 버튼 클릭 시 등록취소 확인 모달을 표시하고,
 * 사용자의 선택에 따라 모달을 닫거나 계속 작성할 수 있도록 합니다.
 */
export const useDiaryModalClose = () => {
  const { openModal, closeModal, closeAllModals } = useModal();

  /**
   * 일기 작성 모달 닫기 처리
   * 등록취소 확인 모달을 표시합니다.
   */
  const handleClose = useCallback(() => {
    // 등록취소 확인 모달 열기
    const confirmModalId = openModal(
      <Modal
        variant="secondary"
        actions="dual"
        title="등록 취소"
        message="작성 중인 내용이 사라집니다. 정말로 취소하시겠습니까?"
        confirmText="등록취소"
        cancelText="계속작성"
        onConfirm={() => {
          // 등록취소: 모든 모달 닫기 (등록취소모달 + 일기쓰기모달)
          closeAllModals();
        }}
        onCancel={() => {
          // 계속작성: 등록취소모달만 닫기
          closeModal(confirmModalId);
        }}
        data-testid="diary-cancel-confirm-modal"
      />
    );
  }, [openModal, closeModal, closeAllModals]);

  return {
    handleClose,
  };
};

export default useDiaryModalClose;
