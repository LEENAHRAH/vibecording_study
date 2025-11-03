import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';
import React from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Commons/Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal 컴포넌트는 사용자에게 중요한 정보를 표시하거나 확인을 요청하는 모달 다이얼로그 컴포넌트입니다.

## 주요 기능
- **Variant**: primary, secondary, tertiary 스타일 지원
- **Actions**: single, dual 액션 버튼 지원  
- **Theme**: light, dark 테마 지원
- **Modal Provider**: modal.provider와 함께 사용되며, 자체 backdrop을 생성하지 않습니다
- **Accessibility**: 접근성 및 키보드 네비게이션 지원

## 사용법
Modal 컴포넌트는 modal.provider와 함께 사용해야 합니다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '모달의 시각적 스타일 변형',
    },
    actions: {
      control: { type: 'select' },
      options: ['single', 'dual'],
      description: '액션 버튼의 개수',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    title: {
      control: { type: 'text' },
      description: '모달 제목',
    },
    message: {
      control: { type: 'text' },
      description: '모달 메시지',
    },
    confirmText: {
      control: { type: 'text' },
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: { type: 'text' },
      description: '취소 버튼 텍스트',
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 핸들러',
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 핸들러',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 핸들러',
    },
  },
  args: {
    title: '알림',
    message: '작업이 완료되었습니다.',
    variant: 'primary',
    actions: 'single',
    theme: 'light',
    confirmText: '확인',
    cancelText: '취소',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  name: '기본',
  args: {
    title: '알림',
    message: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 설정으로 렌더링되는 모달입니다. Primary variant, Single action, Light theme이 기본값입니다.',
      },
    },
  },
};

// Primary Variant Stories
export const PrimarySingle: Story = {
  name: 'Primary - 단일 액션',
  args: {
    variant: 'primary',
    actions: 'single',
    theme: 'light',
    title: '알림',
    message: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary variant의 단일 액션 모달입니다. 가장 높은 시각적 중요도를 가지며, 주요 알림에 사용됩니다.',
      },
    },
  },
};

export const PrimaryDual: Story = {
  name: 'Primary - 이중 액션',
  args: {
    variant: 'primary',
    actions: 'dual',
    theme: 'light',
    title: '삭제 확인',
    message: '정말로 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary variant의 이중 액션 모달입니다. 중요한 확인이 필요한 액션에 사용됩니다.',
      },
    },
  },
};

// Secondary Variant Stories
export const SecondarySingle: Story = {
  name: 'Secondary - 단일 액션',
  args: {
    variant: 'secondary',
    actions: 'single',
    theme: 'light',
    title: '정보',
    message: '새로운 업데이트가 있습니다.',
    confirmText: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant의 단일 액션 모달입니다. 보조 정보나 덜 중요한 알림에 사용됩니다.',
      },
    },
  },
};

export const SecondaryDual: Story = {
  name: 'Secondary - 이중 액션',
  args: {
    variant: 'secondary',
    actions: 'dual',
    theme: 'light',
    title: '저장 확인',
    message: '변경사항을 저장하시겠습니까?',
    confirmText: '저장',
    cancelText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant의 이중 액션 모달입니다. 보조적인 확인이 필요한 액션에 사용됩니다.',
      },
    },
  },
};

// Tertiary Variant Stories
export const TertiarySingle: Story = {
  name: 'Tertiary - 단일 액션',
  args: {
    variant: 'tertiary',
    actions: 'single',
    theme: 'light',
    title: '안내',
    message: '이 기능은 곧 제공될 예정입니다.',
    confirmText: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant의 단일 액션 모달입니다. 가장 낮은 시각적 중요도를 가지며, 일반적인 안내에 사용됩니다.',
      },
    },
  },
};

export const TertiaryDual: Story = {
  name: 'Tertiary - 이중 액션',
  args: {
    variant: 'tertiary',
    actions: 'dual',
    theme: 'light',
    title: '로그아웃',
    message: '정말로 로그아웃하시겠습니까?',
    confirmText: '로그아웃',
    cancelText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant의 이중 액션 모달입니다. 일반적인 확인이 필요한 액션에 사용됩니다.',
      },
    },
  },
};

// Dark Theme Stories
export const PrimaryDark: Story = {
  name: 'Primary - 다크 테마',
  args: {
    variant: 'primary',
    actions: 'dual',
    theme: 'dark',
    title: '다크 모달',
    message: '다크 테마로 표시되는 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Primary variant의 다크 테마 모달입니다. 어두운 배경에서 사용하기 적합합니다.',
      },
    },
  },
};

export const SecondaryDark: Story = {
  name: 'Secondary - 다크 테마',
  args: {
    variant: 'secondary',
    actions: 'dual',
    theme: 'dark',
    title: '다크 모달',
    message: '다크 테마로 표시되는 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Secondary variant의 다크 테마 모달입니다. 어두운 배경에서 사용하기 적합합니다.',
      },
    },
  },
};

export const TertiaryDark: Story = {
  name: 'Tertiary - 다크 테마',
  args: {
    variant: 'tertiary',
    actions: 'dual',
    theme: 'dark',
    title: '다크 모달',
    message: '다크 테마로 표시되는 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Tertiary variant의 다크 테마 모달입니다. 어두운 배경에서 사용하기 적합합니다.',
      },
    },
  },
};

// Interactive Stories
export const Interactive: Story = {
  name: '상호작용 모달',
  args: {
    variant: 'primary',
    actions: 'dual',
    theme: 'light',
    title: '상호작용 모달',
    message: '버튼을 클릭해보세요. Actions 패널에서 이벤트를 확인할 수 있습니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: '상호작용 테스트용 모달입니다. 버튼 클릭 시 Actions 패널에서 이벤트를 확인할 수 있습니다.',
      },
    },
  },
};

// Long Content Stories
export const LongContent: Story = {
  name: '긴 콘텐츠',
  args: {
    variant: 'primary',
    actions: 'dual',
    theme: 'light',
    title: '긴 제목이 있는 모달입니다',
    message: '이것은 긴 메시지가 있는 모달입니다. 텍스트가 길어질 때 모달이 어떻게 표시되는지 확인할 수 있습니다. 모달의 레이아웃이 적절히 조정되는지 테스트해보세요.',
    confirmText: '긴 확인 버튼',
    cancelText: '긴 취소 버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 콘텐츠가 있는 모달의 레이아웃 테스트용 스토리입니다. 텍스트가 길어질 때의 반응형 디자인을 확인할 수 있습니다.',
      },
    },
  },
};

// Accessibility Test
export const AccessibilityTest: Story = {
  name: '접근성 테스트',
  args: {
    variant: 'primary',
    actions: 'dual',
    theme: 'light',
    title: '접근성 테스트',
    message: '이 모달은 접근성 속성이 적용되어 있습니다.',
    confirmText: '확인',
    cancelText: '취소',
    'aria-label': '접근성 테스트 모달',
    'aria-describedby': 'modal-description',
    'data-testid': 'accessibility-modal',
  },
  parameters: {
    docs: {
      description: {
        story: '접근성 속성이 적용된 모달입니다. ARIA 라벨, 설명, 테스트 ID 등이 설정되어 있습니다.',
      },
    },
  },
};

// 모든 Variant 비교 스토리
export const AllVariants: Story = {
  name: '모든 변형 비교',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <Modal variant="primary" actions="single" title="Primary" message="Primary variant 모달입니다." confirmText="확인" />
      <Modal variant="secondary" actions="single" title="Secondary" message="Secondary variant 모달입니다." confirmText="확인" />
      <Modal variant="tertiary" actions="single" title="Tertiary" message="Tertiary variant 모달입니다." confirmText="확인" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 variant를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 모든 Actions 비교 스토리
export const AllActions: Story = {
  name: '모든 액션 비교',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <Modal actions="single" title="단일 액션" message="확인 버튼만 있는 모달입니다." confirmText="확인" />
      <Modal actions="dual" title="이중 액션" message="확인과 취소 버튼이 있는 모달입니다." confirmText="확인" cancelText="취소" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 actions 타입을 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 테마 비교 스토리
export const ThemeComparison: Story = {
  name: '테마 비교',
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Modal theme="light" variant="primary" title="Light Primary" message="라이트 테마 Primary" confirmText="확인" />
          <Modal theme="light" variant="secondary" title="Light Secondary" message="라이트 테마 Secondary" confirmText="확인" />
          <Modal theme="light" variant="tertiary" title="Light Tertiary" message="라이트 테마 Tertiary" confirmText="확인" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#ffffff' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Modal theme="dark" variant="primary" title="Dark Primary" message="다크 테마 Primary" confirmText="확인" />
          <Modal theme="dark" variant="secondary" title="Dark Secondary" message="다크 테마 Secondary" confirmText="확인" />
          <Modal theme="dark" variant="tertiary" title="Dark Tertiary" message="다크 테마 Tertiary" confirmText="확인" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Light와 Dark 테마를 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 실제 사용 예시 스토리
export const RealWorldExamples: Story = {
  name: '실제 사용 예시',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>알림 모달</h4>
        <Modal
          variant="primary"
          actions="single"
          title="저장 완료"
          message="변경사항이 성공적으로 저장되었습니다."
          confirmText="확인"
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>확인 모달</h4>
        <Modal
          variant="secondary"
          actions="dual"
          title="삭제 확인"
          message="정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
          confirmText="삭제"
          cancelText="취소"
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>경고 모달</h4>
        <Modal
          variant="tertiary"
          actions="dual"
          title="로그아웃"
          message="정말로 로그아웃하시겠습니까?"
          confirmText="로그아웃"
          cancelText="취소"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 모달 조합들의 예시입니다.',
      },
    },
  },
};
