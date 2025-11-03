# Modal Provider

중첩 모달을 지원하는 고급 모달 프로바이더입니다.

## 주요 기능

- ✅ **중첩 모달 지원**: 여러 모달을 동시에 열 수 있습니다
- ✅ **모달 스택 관리**: 모달들이 스택 형태로 관리됩니다
- ✅ **Body 스크롤 제어**: 모달이 열려있을 때 배경 스크롤을 방지합니다
- ✅ **ESC 키 지원**: ESC 키로 최상위 모달을 닫을 수 있습니다
- ✅ **백드롭 클릭**: 백드롭 클릭으로 해당 모달을 닫을 수 있습니다
- ✅ **중첩된 백드롭**: 모달이 중첩될수록 배경이 점진적으로 어두워집니다
- ✅ **접근성 지원**: ARIA 속성을 통한 접근성 지원

## 설치 및 설정

### 1. Layout에 프로바이더 추가

```tsx
// src/app/layout.tsx
import { ModalProvider } from '@/commons/providers/modal/modal.provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
```

## 사용법

### 1. 기본 사용법

```tsx
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

function MyComponent() {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <Modal
        title="알림"
        message="작업이 완료되었습니다."
        onConfirm={() => closeModal()}
        onClose={() => closeModal()}
      />
    );
  };

  return <button onClick={handleOpenModal}>모달 열기</button>;
}
```

### 2. 이중 액션 모달

```tsx
const handleOpenConfirmModal = () => {
  openModal(
    <Modal
      variant="secondary"
      actions="dual"
      title="삭제 확인"
      message="정말로 삭제하시겠습니까?"
      confirmText="삭제"
      cancelText="취소"
      onConfirm={() => {
        // 삭제 로직
        closeModal();
      }}
      onCancel={() => closeModal()}
      onClose={() => closeModal()}
    />
  );
};
```

### 3. 중첩 모달

```tsx
const handleOpenNestedModal = () => {
  openModal(
    <Modal
      title="첫 번째 모달"
      message="다음 단계로 진행하시겠습니까?"
      confirmText="다음"
      onConfirm={() => {
        // 두 번째 모달 열기
        openModal(
          <Modal
            title="두 번째 모달"
            message="최종 확인입니다."
            onConfirm={() => closeModal()}
            onClose={() => closeModal()}
          />
        );
      }}
      onClose={() => closeModal()}
    />
  );
};
```

## API 참조

### useModal Hook

```tsx
const {
  isOpen,          // boolean: 현재 열린 모달이 있는지 여부
  stackCount,      // number: 현재 모달 스택의 개수
  openModal,       // function: 모달 열기
  closeModal,      // function: 모달 닫기
  closeAllModals,  // function: 모든 모달 닫기
  closeTopModal,   // function: 최상위 모달만 닫기
} = useModal();
```

### openModal

```tsx
const modalId = openModal(content: ReactNode, onClose?: () => void): string
```

- `content`: 모달에 표시할 React 컴포넌트
- `onClose`: 모달이 닫힐 때 실행할 콜백 함수 (선택사항)
- 반환값: 생성된 모달의 고유 ID

### closeModal

```tsx
closeModal(id?: string): void
```

- `id`: 닫을 모달의 ID (선택사항, 없으면 최상위 모달 닫기)

### closeAllModals

```tsx
closeAllModals(): void
```

모든 열린 모달을 닫습니다.

### closeTopModal

```tsx
closeTopModal(): void
```

최상위 모달만 닫습니다.

## 스타일링

모달 프로바이더는 다음 CSS 클래스들을 사용합니다:

- `.modalBackdrop`: 모달 백드롭 컨테이너
- `.backdrop`: 백드롭 오버레이
- `.modalContent`: 모달 콘텐츠 컨테이너

커스텀 스타일링이 필요한 경우 `styles.module.css`를 수정하거나 CSS 변수를 사용하세요.

## 접근성

- 모달이 열리면 `role="dialog"`와 `aria-modal="true"` 속성이 자동으로 설정됩니다
- ESC 키로 모달을 닫을 수 있습니다
- 포커스 관리가 자동으로 처리됩니다

## 주의사항

1. **Body 스크롤**: 모달이 열려있는 동안 body 스크롤이 비활성화됩니다
2. **Z-Index**: 각 모달은 자동으로 증가하는 z-index를 가집니다 (9999부터 시작)
3. **메모리 관리**: 모달이 닫힐 때 관련 리소스가 자동으로 정리됩니다

## 테스트

테스트 페이지: `/temp`

이 페이지에서 다양한 모달 기능을 테스트해볼 수 있습니다.
