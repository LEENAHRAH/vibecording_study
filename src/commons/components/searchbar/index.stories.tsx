import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './index';
import React from 'react';

// 아이콘 예시 컴포넌트들
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="m13 13 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 3H15M4 8H12M6 13H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1C5.79086 1 4 2.79086 4 5C4 8.5 8 15 8 15C8 15 12 8.5 12 5C12 2.79086 10.2091 1 8 1Z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8" cy="5" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const meta: Meta<typeof SearchBar> = {
  title: 'Commons/Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SearchBar 컴포넌트는 Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공합니다.

## 주요 기능
- **Variant**: primary, secondary, tertiary 스타일 지원
- **Size**: small, medium, large 크기 지원  
- **Theme**: light, dark 테마 지원
- **Search Icon**: 검색 아이콘 표시 및 커스터마이징 지원
- **Clear Button**: 클리어 버튼 표시 및 기능 지원
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
      description: '검색바의 시각적 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '검색바의 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    showSearchIcon: {
      control: { type: 'boolean' },
      description: '검색 아이콘 표시 여부',
    },
    showClearButton: {
      control: { type: 'boolean' },
      description: '클리어 버튼 표시 여부',
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
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    showSearchIcon: true,
    showClearButton: false,
    loading: false,
    disabled: false,
    fullWidth: false,
    placeholder: '검색어를 입력해 주세요.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: '기본 검색바',
  },
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary 검색바',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 검색바',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 검색바',
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

// 아이콘 스토리들
export const WithSearchIcon: Story = {
  args: {
    showSearchIcon: true,
    placeholder: '검색 아이콘 포함',
  },
};

export const WithoutSearchIcon: Story = {
  args: {
    showSearchIcon: false,
    placeholder: '검색 아이콘 없음',
  },
};

export const WithCustomIcon: Story = {
  args: {
    showSearchIcon: true,
    searchIcon: <FilterIcon />,
    placeholder: '커스텀 아이콘 사용',
  },
};

export const WithClearButton: Story = {
  args: {
    showClearButton: true,
    placeholder: '클리어 버튼 포함',
    value: '입력된 텍스트',
  },
};

// 상태 스토리들
export const LoadingState: Story = {
  args: {
    loading: true,
    placeholder: '로딩 중...',
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 검색바',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: '전체 너비 검색바',
  },
  parameters: {
    layout: 'padded',
  },
};

// 조합 스토리들
export const PrimaryWithClear: Story = {
  args: {
    variant: 'primary',
    showClearButton: true,
    placeholder: '검색어 입력',
    value: '검색된 내용',
  },
};

export const SecondaryLoading: Story = {
  args: {
    variant: 'secondary',
    loading: true,
    placeholder: '검색 중...',
  },
};

export const LargeWithCustomIcon: Story = {
  args: {
    size: 'large',
    searchIcon: <LocationIcon />,
    placeholder: '위치 검색',
  },
};

export const DarkThemeWithFeatures: Story = {
  args: {
    theme: 'dark',
    variant: 'secondary',
    size: 'large',
    showClearButton: true,
    placeholder: '다크 테마 검색',
    value: '검색 내용',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 실제 사용 예시 스토리들
export const WebsiteSearch: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0' }}>웹사이트 검색</h4>
      <SearchBar
        variant="primary"
        size="large"
        placeholder="상품명, 브랜드명으로 검색"
        showClearButton={true}
        fullWidth
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '일반적인 웹사이트 검색 기능에서 사용되는 검색바 예시입니다.',
      },
    },
  },
};

export const FilterSearch: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '350px' }}>
      <h4 style={{ margin: '0 0 12px 0' }}>필터 검색</h4>
      <div style={{ display: 'flex', gap: '12px' }}>
        <SearchBar
          variant="secondary"
          size="medium"
          searchIcon={<FilterIcon />}
          placeholder="카테고리 필터"
        />
        <SearchBar
          variant="tertiary"
          size="medium"
          placeholder="가격대"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '필터링 기능에서 사용되는 다양한 검색바 조합 예시입니다.',
      },
    },
  },
};

export const LocationSearch: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <h4 style={{ margin: '0 0 12px 0' }}>위치 검색</h4>
      <SearchBar
        variant="primary"
        size="medium"
        searchIcon={<LocationIcon />}
        placeholder="주소 또는 장소명 입력"
        showClearButton={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '지도나 위치 기반 서비스에서 사용되는 검색바 예시입니다.',
      },
    },
  },
};

// 모든 Variant 비교 스토리
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <SearchBar variant="primary" placeholder="Primary variant" />
      <SearchBar variant="secondary" placeholder="Secondary variant" />
      <SearchBar variant="tertiary" placeholder="Tertiary variant" />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <SearchBar size="small" placeholder="Small size" />
      <SearchBar size="medium" placeholder="Medium size" />
      <SearchBar size="large" placeholder="Large size" />
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
          <SearchBar theme="light" variant="primary" placeholder="Primary" />
          <SearchBar theme="light" variant="secondary" placeholder="Secondary" />
          <SearchBar theme="light" variant="tertiary" placeholder="Tertiary" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SearchBar theme="dark" variant="primary" placeholder="Primary" />
          <SearchBar theme="dark" variant="secondary" placeholder="Secondary" />
          <SearchBar theme="dark" variant="tertiary" placeholder="Tertiary" />
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
      <SearchBar placeholder="Normal state" />
      <SearchBar placeholder="With search icon" showSearchIcon={true} />
      <SearchBar placeholder="With clear button" showClearButton={true} value="입력된 텍스트" />
      <SearchBar placeholder="Loading state" loading={true} />
      <SearchBar placeholder="Disabled state" disabled={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 검색바를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 실제 사용 예시 종합 스토리
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>E-commerce 검색</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SearchBar
            variant="primary"
            size="large"
            placeholder="상품명, 브랜드명으로 검색"
            showClearButton={true}
            fullWidth
          />
          <div style={{ display: 'flex', gap: '12px' }}>
            <SearchBar
              variant="secondary"
              size="medium"
              searchIcon={<FilterIcon />}
              placeholder="카테고리"
            />
            <SearchBar
              variant="tertiary"
              size="medium"
              placeholder="가격대"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>지도 및 위치 서비스</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SearchBar
            variant="primary"
            size="medium"
            searchIcon={<LocationIcon />}
            placeholder="주소, 건물명, 지역명 검색"
            showClearButton={true}
          />
          <SearchBar
            variant="secondary"
            size="small"
            placeholder="반경 설정"
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>다크 테마 애플리케이션</h4>
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#1a1a1a', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <SearchBar
            theme="dark"
            variant="primary"
            size="medium"
            placeholder="다크 테마 검색"
            showClearButton={true}
          />
          <SearchBar
            theme="dark"
            variant="secondary"
            size="small"
            loading={true}
            placeholder="검색 중..."
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>상태별 검색바</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SearchBar
            variant="primary"
            placeholder="일반 상태"
          />
          <SearchBar
            variant="primary"
            loading={true}
            placeholder="로딩 상태"
          />
          <SearchBar
            variant="primary"
            disabled={true}
            placeholder="비활성화 상태"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 검색바 조합들의 종합 예시입니다.',
      },
    },
  },
};
