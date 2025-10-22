import type { Meta, StoryObj } from '@storybook/react';
import { SelectBox } from './index';
import React from 'react';

// 아이콘 예시 컴포넌트들
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

// 예시 옵션 데이터
const basicOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
];

const countryOptions = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'gb', label: '영국' },
  { value: 'fr', label: '프랑스' },
  { value: 'de', label: '독일' },
  { value: 'ca', label: '캐나다' },
];

const categoryOptions = [
  { value: 'electronics', label: '전자제품', group: '상품' },
  { value: 'clothing', label: '의류', group: '상품' },
  { value: 'books', label: '도서', group: '상품' },
  { value: 'food', label: '식품', group: '상품' },
  { value: 'marketing', label: '마케팅', group: '서비스' },
  { value: 'support', label: '고객지원', group: '서비스' },
  { value: 'development', label: '개발', group: '서비스' },
];

const statusOptions = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'pending', label: '대기중' },
  { value: 'disabled', label: '비활성화됨', disabled: true },
];

const meta: Meta<typeof SelectBox> = {
  title: 'Commons/Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SelectBox 컴포넌트는 Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공합니다.

## 주요 기능
- **Variant**: primary, secondary, tertiary 스타일 지원
- **Size**: small, medium, large 크기 지원  
- **Theme**: light, dark 테마 지원
- **Options**: 옵션 그룹화, 비활성화 옵션 지원
- **States**: error, disabled, loading 상태 지원
- **Search**: 검색 가능한 셀렉트박스 지원
- **Multiple**: 다중 선택 지원
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
      description: '셀렉트박스의 시각적 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스의 크기',
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
      description: '필수 선택 표시',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    searchable: {
      control: { type: 'boolean' },
      description: '검색 가능 여부',
    },
    multiple: {
      control: { type: 'boolean' },
      description: '다중 선택 여부',
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
    loading: false,
    searchable: false,
    multiple: false,
    placeholder: '선택해주세요',
    options: basicOptions,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: '기본 셀렉트박스',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 설정의 SelectBox 컴포넌트입니다. Primary variant, Medium size, Light theme이 기본값입니다.',
      },
    },
  },
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    variant: 'primary',
    options: basicOptions,
    placeholder: 'Primary 셀렉트박스',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary variant의 셀렉트박스입니다. 가장 높은 시각적 중요도를 가지며, 주요 선택 옵션에 사용됩니다.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    options: basicOptions,
    placeholder: 'Secondary 셀렉트박스',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant의 셀렉트박스입니다. 보조 선택 옵션이나 필터링에 사용됩니다.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    options: basicOptions,
    placeholder: 'Tertiary 셀렉트박스',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant의 셀렉트박스입니다. 가장 낮은 시각적 중요도를 가지며, 미니멀한 선택 UI에 사용됩니다.',
      },
    },
  },
};

// Size 스토리들
export const Small: Story = {
  args: {
    size: 'small',
    options: basicOptions,
    placeholder: 'Small 크기',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    options: basicOptions,
    placeholder: 'Medium 크기',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    options: basicOptions,
    placeholder: 'Large 크기',
  },
};

// Theme 스토리들
export const LightTheme: Story = {
  args: {
    theme: 'light',
    options: basicOptions,
    placeholder: 'Light 테마',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    options: basicOptions,
    placeholder: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 라벨 및 헬퍼 텍스트 스토리들
export const WithLabel: Story = {
  args: {
    label: '국가 선택',
    options: countryOptions,
    placeholder: '국가를 선택하세요',
  },
};

export const WithRequiredLabel: Story = {
  args: {
    label: '카테고리',
    required: true,
    options: categoryOptions,
    placeholder: '카테고리를 선택하세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '상태',
    options: statusOptions,
    placeholder: '상태를 선택하세요',
    helperText: '현재 상태를 선택해주세요. 비활성화된 옵션은 선택할 수 없습니다.',
  },
};

// 상태 스토리들
export const ErrorState: Story = {
  args: {
    label: '필수 선택',
    options: basicOptions,
    placeholder: '옵션을 선택하세요',
    error: true,
    errorMessage: '이 필드는 필수 선택 항목입니다.',
    required: true,
  },
};

export const DisabledState: Story = {
  args: {
    label: '비활성화된 셀렉트박스',
    options: basicOptions,
    placeholder: '선택할 수 없습니다',
    disabled: true,
  },
};

export const LoadingState: Story = {
  args: {
    label: '로딩 중',
    options: basicOptions,
    placeholder: '데이터를 불러오는 중...',
    loading: true,
  },
};

export const SearchableSelect: Story = {
  args: {
    label: '검색 가능한 셀렉트박스',
    options: countryOptions,
    placeholder: '국가를 검색하거나 선택하세요',
    searchable: true,
    helperText: '국가명을 입력하여 검색할 수 있습니다.',
  },
};

export const MultipleSelect: Story = {
  args: {
    label: '다중 선택',
    options: categoryOptions,
    placeholder: '여러 카테고리를 선택하세요',
    multiple: true,
    helperText: '여러 항목을 선택할 수 있습니다.',
  },
};

export const WithCustomIcon: Story = {
  args: {
    label: '커스텀 아이콘',
    options: basicOptions,
    placeholder: '옵션을 선택하세요',
    dropdownIcon: <ChevronDownIcon />,
  },
};

export const FullWidth: Story = {
  args: {
    label: '전체 너비 셀렉트박스',
    options: countryOptions,
    placeholder: '전체 너비로 표시됩니다',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// 조합 스토리들
export const UserProfileForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <SelectBox
        label="국가"
        options={countryOptions}
        placeholder="국가를 선택하세요"
        required
        searchable
      />
      <SelectBox
        label="카테고리"
        options={categoryOptions}
        placeholder="관심 카테고리를 선택하세요"
        multiple
        helperText="여러 카테고리를 선택할 수 있습니다."
      />
      <SelectBox
        label="상태"
        options={statusOptions}
        placeholder="계정 상태"
        variant="secondary"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '사용자 프로필 폼에서 사용되는 셀렉트박스들의 조합 예시입니다.',
      },
    },
  },
};

export const FilterForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>상품 필터</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <SelectBox
            variant="secondary"
            size="small"
            options={categoryOptions}
            placeholder="카테고리"
            searchable
          />
          <SelectBox
            variant="secondary"
            size="small"
            options={countryOptions}
            placeholder="제조국"
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>정렬 옵션</h4>
        <SelectBox
          variant="tertiary"
          options={[
            { value: 'newest', label: '최신순' },
            { value: 'oldest', label: '오래된순' },
            { value: 'price_low', label: '가격 낮은순' },
            { value: 'price_high', label: '가격 높은순' },
            { value: 'popular', label: '인기순' },
          ]}
          placeholder="정렬 방식"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '상품 필터링 폼에서 사용되는 셀렉트박스들의 조합 예시입니다.',
      },
    },
  },
};

export const AdminPanel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>사용자 관리</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SelectBox
            label="사용자 역할"
            options={[
              { value: 'admin', label: '관리자' },
              { value: 'editor', label: '편집자' },
              { value: 'viewer', label: '뷰어' },
              { value: 'guest', label: '게스트' },
            ]}
            placeholder="역할을 선택하세요"
            required
          />
          <SelectBox
            label="부서"
            options={[
              { value: 'dev', label: '개발팀', group: '기술' },
              { value: 'design', label: '디자인팀', group: '기술' },
              { value: 'qa', label: 'QA팀', group: '기술' },
              { value: 'marketing', label: '마케팅팀', group: '비즈니스' },
              { value: 'sales', label: '영업팀', group: '비즈니스' },
              { value: 'hr', label: '인사팀', group: '운영' },
              { value: 'finance', label: '재무팀', group: '운영' },
            ]}
            placeholder="부서를 선택하세요"
            searchable
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>권한 설정</h4>
        <SelectBox
          label="접근 권한"
          options={[
            { value: 'read', label: '읽기 전용' },
            { value: 'write', label: '읽기/쓰기' },
            { value: 'admin', label: '관리자 권한' },
            { value: 'restricted', label: '제한됨', disabled: true },
          ]}
          placeholder="권한을 선택하세요"
          multiple
          helperText="여러 권한을 동시에 부여할 수 있습니다."
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>에러 상태 예시</h4>
        <SelectBox
          label="필수 선택 항목"
          options={basicOptions}
          placeholder="반드시 선택해야 합니다"
          error
          errorMessage="이 항목은 필수 선택사항입니다."
          required
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '관리자 패널에서 사용되는 다양한 셀렉트박스 조합들의 예시입니다.',
      },
    },
  },
};

// 모든 Variant 비교 스토리
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <SelectBox variant="primary" options={basicOptions} placeholder="Primary variant" />
      <SelectBox variant="secondary" options={basicOptions} placeholder="Secondary variant" />
      <SelectBox variant="tertiary" options={basicOptions} placeholder="Tertiary variant" />
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
      <SelectBox size="small" options={basicOptions} placeholder="Small size" />
      <SelectBox size="medium" options={basicOptions} placeholder="Medium size" />
      <SelectBox size="large" options={basicOptions} placeholder="Large size" />
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
          <SelectBox theme="light" variant="primary" options={basicOptions} placeholder="Primary" />
          <SelectBox theme="light" variant="secondary" options={basicOptions} placeholder="Secondary" />
          <SelectBox theme="light" variant="tertiary" options={basicOptions} placeholder="Tertiary" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SelectBox theme="dark" variant="primary" options={basicOptions} placeholder="Primary" />
          <SelectBox theme="dark" variant="secondary" options={basicOptions} placeholder="Secondary" />
          <SelectBox theme="dark" variant="tertiary" options={basicOptions} placeholder="Tertiary" />
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
      <SelectBox options={basicOptions} placeholder="Normal state" />
      <SelectBox options={basicOptions} placeholder="With custom icon" dropdownIcon={<ChevronDownIcon />} />
      <SelectBox options={basicOptions} placeholder="Searchable" searchable />
      <SelectBox options={basicOptions} placeholder="Multiple selection" multiple />
      <SelectBox options={basicOptions} placeholder="Error state" error errorMessage="에러가 발생했습니다." />
      <SelectBox options={basicOptions} placeholder="Loading state" loading />
      <SelectBox options={basicOptions} placeholder="Disabled state" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 셀렉트박스를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 실제 사용 예시 스토리
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>회원가입 폼</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SelectBox
            label="국가"
            options={countryOptions}
            placeholder="거주 국가를 선택하세요"
            searchable
            required
          />
          <SelectBox
            label="관심 분야"
            options={categoryOptions}
            placeholder="관심 있는 분야를 선택하세요"
            multiple
            helperText="여러 분야를 선택할 수 있습니다."
          />
          <SelectBox
            label="언어 설정"
            options={[
              { value: 'ko', label: '한국어' },
              { value: 'en', label: 'English' },
              { value: 'ja', label: '日本語' },
              { value: 'zh', label: '中文' },
            ]}
            placeholder="기본 언어"
            variant="secondary"
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>상품 주문 폼</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <SelectBox
              label="수량"
              options={[
                { value: '1', label: '1개' },
                { value: '2', label: '2개' },
                { value: '3', label: '3개' },
                { value: '5', label: '5개' },
                { value: '10', label: '10개' },
              ]}
              placeholder="수량"
              size="small"
              variant="tertiary"
            />
            <SelectBox
              label="색상"
              options={[
                { value: 'red', label: '빨간색' },
                { value: 'blue', label: '파란색' },
                { value: 'green', label: '초록색' },
                { value: 'black', label: '검은색' },
                { value: 'white', label: '흰색' },
              ]}
              placeholder="색상"
              size="small"
              variant="tertiary"
            />
          </div>
          <SelectBox
            label="배송지"
            options={countryOptions}
            placeholder="배송 받을 국가를 선택하세요"
            searchable
            required
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>에러 상태 예시</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SelectBox
            label="필수 카테고리"
            options={categoryOptions}
            placeholder="카테고리를 선택하세요"
            error
            errorMessage="카테고리는 필수 선택 항목입니다."
            required
          />
          <SelectBox
            label="옵션 선택"
            options={statusOptions}
            placeholder="상태를 선택하세요"
            error
            errorMessage="유효하지 않은 선택입니다."
          />
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>전체 너비 예시</h4>
        <SelectBox
          label="전체 너비 셀렉트박스"
          options={countryOptions}
          placeholder="전체 너비로 표시되는 셀렉트박스"
          helperText="이 셀렉트박스는 부모 컨테이너의 전체 너비를 사용합니다."
          fullWidth
          searchable
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 셀렉트박스 조합들의 예시입니다.',
      },
    },
  },
};
