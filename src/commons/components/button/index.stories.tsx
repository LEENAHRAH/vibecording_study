import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import React from 'react';

// 아이콘 예시 컴포넌트들
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="m13 13 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1V11M4 7L8 11L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Button 컴포넌트는 Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공합니다.

## 주요 기능
- **Variant**: primary, secondary, tertiary 스타일 지원
- **Size**: small, medium, large 크기 지원  
- **Theme**: light, dark 테마 지원
- **Icon**: 아이콘 및 위치 설정 지원
- **Loading**: 로딩 상태 지원
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
      description: '버튼의 시각적 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '아이콘 위치',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
    },
    children: {
      control: { type: 'text' },
      description: '버튼 텍스트',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    iconPosition: 'left',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

// Size 스토리들
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

// Theme 스토리들
export const LightTheme: Story = {
  args: {
    theme: 'light',
    children: 'Light Theme',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    children: 'Dark Theme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 아이콘 스토리들
export const WithLeftIcon: Story = {
  args: {
    icon: <PlusIcon />,
    iconPosition: 'left',
    children: 'Add Item',
  },
};

export const WithRightIcon: Story = {
  args: {
    icon: <DownloadIcon />,
    iconPosition: 'right',
    children: 'Download',
  },
};

// 상태 스토리들
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// 조합 스토리들
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    icon: <SearchIcon />,
    children: 'Search',
  },
};

export const SecondaryLoading: Story = {
  args: {
    variant: 'secondary',
    loading: true,
    children: 'Processing...',
  },
};

export const LargeWithRightIcon: Story = {
  args: {
    size: 'large',
    icon: <DownloadIcon />,
    iconPosition: 'right',
    children: 'Download File',
  },
};

// 모든 Variant 비교 스토리
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
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
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
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
      <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button theme="light" variant="primary">Primary</Button>
          <Button theme="light" variant="secondary">Secondary</Button>
          <Button theme="light" variant="tertiary">Tertiary</Button>
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button theme="dark" variant="primary">Primary</Button>
          <Button theme="dark" variant="secondary">Secondary</Button>
          <Button theme="dark" variant="tertiary">Tertiary</Button>
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
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button icon={<PlusIcon />}>With Icon</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 버튼을 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 실제 사용 예시 스토리
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>폼 버튼들</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary">저장</Button>
          <Button variant="secondary">취소</Button>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>액션 버튼들</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" icon={<PlusIcon />}>새로 만들기</Button>
          <Button variant="secondary" icon={<SearchIcon />}>검색</Button>
          <Button variant="tertiary" icon={<DownloadIcon />} iconPosition="right">다운로드</Button>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>전체 너비 버튼</h4>
        <Button variant="primary" fullWidth>전체 너비 버튼</Button>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>로딩 상태</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary" loading>처리 중...</Button>
          <Button variant="secondary" loading>업로드 중...</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 버튼 조합들의 예시입니다.',
      },
    },
  },
};
