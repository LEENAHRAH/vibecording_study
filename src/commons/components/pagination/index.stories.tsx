import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';
import React, { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Pagination 컴포넌트는 Figma 디자인을 기반으로 한 페이지네이션 UI를 제공합니다.

## 주요 기능
- **Current Page**: 현재 페이지 번호 표시
- **Total Pages**: 전체 페이지 수 설정
- **Max Visible Pages**: 표시할 페이지 번호의 최대 개수
- **Navigation Buttons**: 이전/다음 버튼 표시 옵션
- **First/Last Buttons**: 첫 페이지/마지막 페이지 버튼 표시 옵션
- **Disabled State**: 비활성화 상태 지원
- **Accessibility**: 접근성 및 키보드 네비게이션 지원
        `,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호 (1부터 시작)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수',
    },
    onPageChange: {
      action: 'page-changed',
      description: '페이지 변경 시 호출되는 콜백 함수',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '컴포넌트 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '컴포넌트 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 10 },
      description: '표시할 페이지 번호의 최대 개수',
    },
    showNavigationButtons: {
      control: { type: 'boolean' },
      description: '이전/다음 버튼 표시 여부',
    },
    showFirstLastButtons: {
      control: { type: 'boolean' },
      description: '첫 페이지/마지막 페이지로 이동 버튼 표시 여부',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스명',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: '접근성을 위한 aria-label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
    ariaLabel: '페이지네이션',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 설정의 Pagination 컴포넌트입니다. 첫 번째 페이지에서 시작하며, 이전/다음 버튼이 포함되어 있습니다.',
      },
    },
  },
};

// 인터랙티브 스토리 (상태 관리 포함)
export const Interactive: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 20,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
    ariaLabel: '인터랙티브 페이지네이션',
  },
  parameters: {
    docs: {
      description: {
        story: '실제로 상태를 관리하는 인터랙티브 Pagination입니다. 클릭하면 페이지가 실제로 변경됩니다.',
      },
    },
  },
};

// 중간 페이지
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '중간 페이지에 위치한 Pagination입니다. 앞뒤 페이지 번호들이 모두 표시되는 상태를 보여줍니다.',
      },
    },
  },
};

// 마지막 페이지
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '마지막 페이지에 위치한 Pagination입니다. 다음 버튼이 비활성화되어 있는 상태를 보여줍니다.',
      },
    },
  },
};

// 페이지가 적은 경우
export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
};

// 많은 페이지
export const ManyPages: Story = {
  args: {
    currentPage: 25,
    totalPages: 100,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
};

// 첫 페이지/마지막 페이지 버튼 포함
export const WithFirstLastButtons: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    currentPage: 15,
    totalPages: 50,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: true,
    disabled: false,
    ariaLabel: '첫/마지막 버튼 포함 페이지네이션',
  },
};

// 네비게이션 버튼 없음
export const WithoutNavigationButtons: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: false,
    showFirstLastButtons: false,
    disabled: false,
  },
};

// 최대 표시 페이지 수 변경
export const MaxVisiblePages3: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 3,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
};

export const MaxVisiblePages7: Story = {
  args: {
    currentPage: 10,
    totalPages: 30,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 7,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: true,
  },
};

// 단일 페이지 (Figma 디자인 준수)
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인에 맞춰 단일 페이지일 때는 네비게이션 버튼 없이 페이지 번호만 표시됩니다.',
      },
    },
  },
};

// 모든 옵션 활성화
export const AllOptions: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Pretendard Variable' }}>
          모든 옵션이 활성화된 페이지네이션
        </h3>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          현재 페이지: {currentPage} / {args.totalPages}
        </p>
      </div>
    );
  },
  args: {
    currentPage: 25,
    totalPages: 100,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 7,
    showNavigationButtons: true,
    showFirstLastButtons: true,
    disabled: false,
    ariaLabel: '완전한 기능의 페이지네이션',
  },
};

// 커스텀 클래스명
export const WithCustomClass: Story = {
  args: {
    currentPage: 3,
    totalPages: 8,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
    className: 'custom-pagination',
  },
};

// 접근성 테스트
export const AccessibilityTest: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Pretendard Variable' }}>
          접근성 테스트용 페이지네이션
        </h3>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
          키보드 네비게이션 (Tab, Enter, Space)과 스크린 리더를 테스트해보세요.
        </p>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  args: {
    currentPage: 5,
    totalPages: 15,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: true,
    disabled: false,
    ariaLabel: '접근성 테스트용 페이지네이션',
  },
};

// 경계값 테스트
// Variant 시스템 테스트
export const VariantShowcase: Story = {
  render: () => {
    const [currentPages, setCurrentPages] = useState({
      primary: 3,
      secondary: 3,
      tertiary: 3,
    });
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable' }}>Primary Variant</h3>
          <Pagination
            currentPage={currentPages.primary}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, primary: page }))}
            variant="primary"
            size="medium"
            theme="light"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
        
        <div>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable' }}>Secondary Variant</h3>
          <Pagination
            currentPage={currentPages.secondary}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, secondary: page }))}
            variant="secondary"
            size="medium"
            theme="light"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
        
        <div>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable' }}>Tertiary Variant</h3>
          <Pagination
            currentPage={currentPages.tertiary}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, tertiary: page }))}
            variant="tertiary"
            size="medium"
            theme="light"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
      </div>
    );
  },
};

// Size 변형 테스트
export const SizeVariants: Story = {
  render: () => {
    const [currentPages, setCurrentPages] = useState({
      small: 3,
      medium: 3,
      large: 3,
    });
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable' }}>Small Size</h3>
          <Pagination
            currentPage={currentPages.small}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, small: page }))}
            variant="primary"
            size="small"
            theme="light"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
        
        <div>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable' }}>Medium Size (Default)</h3>
          <Pagination
            currentPage={currentPages.medium}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, medium: page }))}
            variant="primary"
            size="medium"
            theme="light"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
        
        <div>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable' }}>Large Size</h3>
          <Pagination
            currentPage={currentPages.large}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, large: page }))}
            variant="primary"
            size="large"
            theme="light"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
      </div>
    );
  },
};

// 테마 변형 테스트
export const ThemeVariants: Story = {
  render: () => {
    const [currentPages, setCurrentPages] = useState({
      light: 3,
      dark: 3,
    });
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable' }}>Light Theme</h3>
          <Pagination
            currentPage={currentPages.light}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, light: page }))}
            variant="primary"
            size="medium"
            theme="light"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
        
        <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '15px', fontFamily: 'Pretendard Variable', color: 'white' }}>Dark Theme</h3>
          <Pagination
            currentPage={currentPages.dark}
            totalPages={10}
            onPageChange={(page) => setCurrentPages(prev => ({ ...prev, dark: page }))}
            variant="primary"
            size="medium"
            theme="dark"
            maxVisiblePages={5}
            showNavigationButtons={true}
            showFirstLastButtons={false}
            disabled={false}
          />
        </div>
      </div>
    );
  },
};

export const EdgeCases: Story = {
  render: () => {
    const [scenario, setScenario] = useState(0);
    const scenarios = [
      { name: '페이지 1/1', currentPage: 1, totalPages: 1 },
      { name: '페이지 1/2', currentPage: 1, totalPages: 2 },
      { name: '페이지 2/2', currentPage: 2, totalPages: 2 },
      { name: '페이지 1/100', currentPage: 1, totalPages: 100 },
      { name: '페이지 100/100', currentPage: 100, totalPages: 100 },
    ];
    
    const currentScenario = scenarios[scenario];
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '20px', fontFamily: 'Pretendard Variable' }}>
          경계값 테스트
        </h3>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>시나리오:</label>
          <select 
            value={scenario} 
            onChange={(e) => setScenario(Number(e.target.value))}
            style={{ padding: '5px' }}
          >
            {scenarios.map((s, index) => (
              <option key={index} value={index}>{s.name}</option>
            ))}
          </select>
        </div>
        <Pagination
          currentPage={currentScenario.currentPage}
          totalPages={currentScenario.totalPages}
          onPageChange={(page) => console.log('Page changed to:', page)}
          variant="primary"
          size="medium"
          theme="light"
          maxVisiblePages={5}
          showNavigationButtons={true}
          showFirstLastButtons={true}
          disabled={false}
          ariaLabel="경계값 테스트용 페이지네이션"
        />
      </div>
    );
  },
};
