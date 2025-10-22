import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';
import React from 'react';

// 아이콘 예시 컴포넌트들
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="m13 13 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
    <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 3H14C14.5523 3 15 3.44772 15 4V12C15 12.5523 14.5523 13 14 13H2C1.44772 13 1 12.5523 1 12V4C1 3.44772 1.44772 3 2 3Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 4L8 9L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input 컴포넌트는 Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공합니다.

## 주요 기능
- **Variant**: primary, secondary, tertiary 스타일 지원
- **Size**: small, medium, large 크기 지원  
- **Theme**: light, dark 테마 지원
- **Icon**: 좌측/우측 아이콘 지원
- **States**: error, disabled 상태 지원
- **Label & Helper**: 라벨, 헬퍼 텍스트, 에러 메시지 지원
- **Full Width**: 전체 너비 사용 옵션
- **Accessibility**: 접근성 및 키보드 네비게이션 지원
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '입력 필드의 시각적 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 필드의 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    error: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 표시',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    helperText: {
      control: { type: 'text' },
      description: '헬퍼 텍스트',
    },
    errorMessage: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    error: false,
    disabled: false,
    required: false,
    fullWidth: false,
    placeholder: '회고를 남겨보세요.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: '기본 입력 필드',
  },
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary 입력 필드',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 입력 필드',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 입력 필드',
  },
};

// Size 스토리들
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small 크기',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium 크기',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large 크기',
  },
};

// Theme 스토리들
export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: 'Light 테마',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 라벨 및 헬퍼 텍스트 스토리들
export const WithLabel: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
  },
};

export const WithRequiredLabel: Story = {
  args: {
    label: '비밀번호',
    required: true,
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '사용자명',
    placeholder: '사용자명을 입력하세요',
    helperText: '3-20자의 영문, 숫자, 언더스코어만 사용 가능합니다.',
  },
};

// 아이콘 스토리들
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <SearchIcon />,
    placeholder: '검색어를 입력하세요',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <CheckIcon />,
    placeholder: '입력 완료',
    value: '검증된 입력값',
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <UserIcon />,
    rightIcon: <CheckIcon />,
    placeholder: '사용자명',
  },
};

// 상태 스토리들
export const ErrorState: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    error: true,
    errorMessage: '올바른 이메일 형식을 입력해주세요.',
    value: 'invalid-email',
  },
};

export const DisabledState: Story = {
  args: {
    label: '비활성화된 필드',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: '전체 너비 입력 필드',
    placeholder: '전체 너비로 표시됩니다',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// 조합 스토리들
export const LoginForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        leftIcon={<EmailIcon />}
        required
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        rightIcon={<EyeIcon />}
        required
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '로그인 폼에서 사용되는 입력 필드들의 조합 예시입니다.',
      },
    },
  },
};

export const SearchWithIcon: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    leftIcon: <SearchIcon />,
    placeholder: '검색어를 입력하세요',
  },
};

export const ProfileForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input
        label="이름"
        placeholder="홍길동"
        leftIcon={<UserIcon />}
        required
      />
      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        leftIcon={<EmailIcon />}
        helperText="변경 시 인증 메일이 발송됩니다."
        required
      />
      <Input
        label="소개"
        placeholder="자기소개를 입력하세요"
        helperText="최대 200자까지 입력 가능합니다."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '프로필 편집 폼에서 사용되는 입력 필드들의 조합 예시입니다.',
      },
    },
  },
};

// 모든 Variant 비교 스토리
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input variant="primary" placeholder="Primary variant" />
      <Input variant="secondary" placeholder="Secondary variant" />
      <Input variant="tertiary" placeholder="Tertiary variant" />
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

// 모든 Size 비교 스토리
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="small" placeholder="Small size" />
      <Input size="medium" placeholder="Medium size" />
      <Input size="large" placeholder="Large size" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 size를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 테마 비교 스토리
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input theme="light" variant="primary" placeholder="Primary" />
          <Input theme="light" variant="secondary" placeholder="Secondary" />
          <Input theme="light" variant="tertiary" placeholder="Tertiary" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input theme="dark" variant="primary" placeholder="Primary" />
          <Input theme="dark" variant="secondary" placeholder="Secondary" />
          <Input theme="dark" variant="tertiary" placeholder="Tertiary" />
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

// 상태별 비교 스토리
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input placeholder="Normal state" />
      <Input placeholder="With left icon" leftIcon={<SearchIcon />} />
      <Input placeholder="With right icon" rightIcon={<CheckIcon />} />
      <Input placeholder="Error state" error errorMessage="에러가 발생했습니다." />
      <Input placeholder="Disabled state" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 입력 필드를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 실제 사용 예시 스토리
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>회원가입 폼</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="이메일"
            type="email"
            placeholder="example@email.com"
            leftIcon={<EmailIcon />}
            required
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력하세요"
            rightIcon={<EyeIcon />}
            helperText="영문, 숫자, 특수문자를 포함하여 8자 이상"
            required
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>검색 및 필터</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            variant="secondary"
            size="large"
            leftIcon={<SearchIcon />}
            placeholder="상품명, 브랜드명으로 검색"
          />
          <div style={{ display: 'flex', gap: '12px' }}>
            <Input
              variant="tertiary"
              size="small"
              placeholder="최소 가격"
            />
            <Input
              variant="tertiary"
              size="small"
              placeholder="최대 가격"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>에러 상태 예시</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="이메일"
            placeholder="example@email.com"
            value="invalid-email"
            error
            errorMessage="올바른 이메일 형식을 입력해주세요."
          />
          <Input
            label="전화번호"
            placeholder="010-0000-0000"
            value="010-123"
            error
            errorMessage="전화번호 형식이 올바르지 않습니다."
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>전체 너비 입력</h4>
        <Input
          label="메모"
          placeholder="메모를 입력하세요"
          helperText="최대 500자까지 입력 가능합니다."
          fullWidth
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 입력 필드 조합들의 예시입니다.',
      },
    },
  },
};
