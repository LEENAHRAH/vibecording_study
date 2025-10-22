import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';
import React, { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
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
    size: {
      control: { type: 'select' },
      options: ['medium'],
      description: '컴포넌트 크기 (피그마 디자인은 medium만 지원)',
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
    size: 'medium',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
    ariaLabel: '페이지네이션',
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
    size: 'medium',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
    ariaLabel: '인터랙티브 페이지네이션',
  },
};

// 중간 페이지
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    size: 'medium',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
};

// 마지막 페이지
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    size: 'medium',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
  },
};

// 페이지가 적은 경우
export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    size: 'medium',
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
    size: 'medium',
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
    size: 'medium',
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
    size: 'medium',
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
    size: 'medium',
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
    size: 'medium',
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
    size: 'medium',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: true,
  },
};

// 단일 페이지
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    size: 'medium',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: false,
    disabled: false,
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
    size: 'medium',
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
    size: 'medium',
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
    size: 'medium',
    maxVisiblePages: 5,
    showNavigationButtons: true,
    showFirstLastButtons: true,
    disabled: false,
    ariaLabel: '접근성 테스트용 페이지네이션',
  },
};

// 경계값 테스트
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
          size="medium"
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
