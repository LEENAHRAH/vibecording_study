"use client";

import { useModal } from "@/commons/providers/modal/modal.provider";
import DiariesNew from "@/components/diaries-new";
import { EmotionType } from "@/commons/constants/enum";

/**
 * 일기 목록 모달 링크 커스텀 훅
 *
 * 일기 목록 페이지에서 모달을 통한 일기 작성 기능을 제공하는 커스텀 훅입니다.
 * - 일기쓰기 버튼 클릭 시 모달 열기 기능
 * - 모달 내에서 DiariesNew 컴포넌트 렌더링
 * - 모달 닫기 및 일기 저장 핸들러 제공
 * - 기존 modal.provider와 완전 호환
 */
export const useLinkModal = () => {
  const { openModal, closeModal } = useModal();

  // 일기쓰기 모달 열기 함수
  const openWriteDiaryModal = () => {
    // 모달 닫기 핸들러
    const handleClose = () => {
      closeModal();
    };

    // 일기 저장 핸들러
    const handleSubmit = (data: {
      emotion: EmotionType;
      title: string;
      content: string;
    }) => {
      // TODO: 실제 일기 저장 API 호출 로직 구현 예정
      console.log("일기 저장:", data);
      closeModal();
    };

    openModal(
      <DiariesNew
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    );
  };

  return {
    openWriteDiaryModal,
    closeModal,
  };
};

export default useLinkModal;
