"use client";

import React from "react";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";

const TempPage: React.FC = () => {
  const { openModal, closeModal, isOpen, stackCount } = useModal();

  const handleOpenSimpleModal = () => {
    openModal(
      <Modal
        title="간단한 알림"
        message="이것은 간단한 모달입니다."
        onConfirm={() => closeModal()}
        onClose={() => closeModal()}
      />
    );
  };

  const handleOpenDualModal = () => {
    openModal(
      <Modal
        variant="secondary"
        actions="dual"
        title="확인 모달"
        message="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          console.log("삭제 확인");
          closeModal();
        }}
        onCancel={() => {
          console.log("삭제 취소");
          closeModal();
        }}
        onClose={() => closeModal()}
      />
    );
  };

  const handleOpenNestedModal = () => {
    openModal(
      <Modal
        title="첫 번째 모달"
        message="이 모달에서 다른 모달을 열 수 있습니다."
        confirmText="다음 모달 열기"
        onConfirm={() => {
          // 중첩 모달 열기
          openModal(
            <Modal
              variant="tertiary"
              title="두 번째 모달"
              message="이것은 중첩된 모달입니다."
              confirmText="세 번째 모달 열기"
              onConfirm={() => {
                // 또 다른 중첩 모달
                openModal(
                  <Modal
                    variant="primary"
                    actions="dual"
                    title="세 번째 모달"
                    message="최대 중첩 모달입니다!"
                    confirmText="완료"
                    cancelText="닫기"
                    onConfirm={() => closeModal()}
                    onCancel={() => closeModal()}
                    onClose={() => closeModal()}
                  />
                );
              }}
              onClose={() => closeModal()}
            />
          );
        }}
        onClose={() => closeModal()}
      />
    );
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>모달 프로바이더 테스트</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <p>현재 모달 상태: {isOpen ? "열림" : "닫힘"}</p>
        <p>모달 스택 개수: {stackCount}</p>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <button
          onClick={handleOpenSimpleModal}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          간단한 모달 열기
        </button>

        <button
          onClick={handleOpenDualModal}
          style={{
            padding: "12px 24px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          확인/취소 모달 열기
        </button>

        <button
          onClick={handleOpenNestedModal}
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          중첩 모달 테스트
        </button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>모달 프로바이더 기능</h2>
        <ul>
          <li>✅ 중첩 모달 지원</li>
          <li>✅ 모달 스택 관리</li>
          <li>✅ Body 스크롤 제어</li>
          <li>✅ ESC 키로 모달 닫기</li>
          <li>✅ 백드롭 클릭으로 모달 닫기</li>
          <li>✅ 중첩된 백드롭 (점진적으로 어두워짐)</li>
          <li>✅ 접근성 지원 (ARIA 속성)</li>
        </ul>
      </div>
    </div>
  );
};

export default TempPage;
