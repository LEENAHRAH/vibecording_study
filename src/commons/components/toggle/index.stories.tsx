import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './index';
import React, { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Toggle 컴포넌트는 Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공합니다.

## 주요 기능
- **3가지 변형**: Primary, Secondary, Tertiary
- **3가지 크기**: Small, Medium, Large  
- **2가지 테마**: Light, Dark
- **접근성**: ARIA 속성, 키보드 네비게이션, 스크린 리더 지원
- **제어/비제어**: 두 가지 사용 방식 모두 지원
- **반응형**: 모바일 터치 최적화
- **애니메이션**: 부드러운 전환 효과

## 사용법
\`\`\`tsx
// 기본 사용법 (비제어 컴포넌트)
<Toggle defaultChecked={false} onChange={(checked) => console.log(checked)} />

// 제어 컴포넌트
<Toggle checked={isEnabled} onChange={setIsEnabled} />

// 다양한 옵션
<Toggle 
  variant="primary" 
  size="large" 
  theme="dark"
  disabled={false}
  aria-label="알림 설정"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Toggle 상태 (제어 컴포넌트용)',
    },
    defaultChecked: {
      control: 'boolean',
      description: '기본 Toggle 상태 (비제어 컴포넌트용)',
    },
    disabled: {
      control: 'boolean',
      description: 'Toggle 비활성화 여부',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Toggle 변형 스타일',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Toggle 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    'aria-label': {
      control: 'text',
      description: '접근성을 위한 라벨',
    },
    'aria-describedby': {
      control: 'text',
      description: '접근성을 위한 설명 ID',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    'data-testid': {
      control: 'text',
      description: '테스트를 위한 data-testid',
    },
    onChange: {
      action: 'changed',
      description: 'Toggle 상태 변경 핸들러',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Stories
export const Default: Story = {
  name: '기본',
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 설정의 Toggle 컴포넌트입니다. Primary variant, Medium size, Light theme이 기본값입니다.',
      },
    },
  },
};

export const Checked: Story = {
  name: '체크됨',
  args: {
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '초기에 활성화된 상태의 Toggle입니다. defaultChecked prop을 사용하여 비제어 컴포넌트로 동작합니다.',
      },
    },
  },
};

export const Disabled: Story = {
  name: '비활성화',
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 Toggle입니다. 사용자가 상태를 변경할 수 없으며, 시각적으로 비활성 상태를 나타냅니다.',
      },
    },
  },
};

export const DisabledChecked: Story = {
  name: '비활성화 + 체크됨',
  args: {
    disabled: true,
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '활성화된 상태이지만 비활성화된 Toggle입니다. 사용자가 상태를 변경할 수 없습니다.',
      },
    },
  },
};

// Variant Stories
export const VariantPrimary: Story = {
  name: 'Primary 변형',
  args: {
    variant: 'primary',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary variant의 Toggle입니다. 가장 높은 시각적 중요도를 가지며, 주요 설정에 사용됩니다.',
      },
    },
  },
};

export const VariantSecondary: Story = {
  name: 'Secondary 변형',
  args: {
    variant: 'secondary',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant의 Toggle입니다. 보조 설정이나 덮은 중요도의 옵션에 사용됩니다.',
      },
    },
  },
};

export const VariantTertiary: Story = {
  name: 'Tertiary 변형',
  args: {
    variant: 'tertiary',
    defaultChecked: true,
  },
};

// Size Stories
export const SizeSmall: Story = {
  name: '작은 크기',
  args: {
    size: 'small',
    defaultChecked: true,
  },
};

export const SizeMedium: Story = {
  name: '중간 크기',
  args: {
    size: 'medium',
    defaultChecked: true,
  },
};

export const SizeLarge: Story = {
  name: '큰 크기',
  args: {
    size: 'large',
    defaultChecked: true,
  },
};

// Theme Stories
export const ThemeLight: Story = {
  name: '라이트 테마',
  args: {
    theme: 'light',
    defaultChecked: true,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const ThemeDark: Story = {
  name: '다크 테마',
  args: {
    theme: 'dark',
    defaultChecked: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Interactive Stories
export const Controlled: Story = {
  name: '제어 컴포넌트',
  render: (args) => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Toggle 
          {...args}
          checked={checked} 
          onChange={setChecked}
        />
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          현재 상태: {checked ? '켜짐' : '꺼짐'}
        </p>
      </div>
    );
  },
  args: {
    'aria-label': '제어 토글',
  },
};

export const Uncontrolled: Story = {
  name: '비제어 컴포넌트',
  render: (args) => {
    const [lastChanged, setLastChanged] = useState<string>('없음');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Toggle 
          {...args}
          onChange={(checked) => {
            setLastChanged(checked ? '켜짐' : '꺼짐');
          }}
        />
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          마지막 변경: {lastChanged}
        </p>
      </div>
    );
  },
  args: {
    defaultChecked: false,
    'aria-label': '비제어 토글',
  },
};

// Accessibility Stories
export const WithAriaLabel: Story = {
  name: 'ARIA 라벨 포함',
  args: {
    'aria-label': '알림 설정 토글',
    defaultChecked: true,
  },
};

export const WithAriaDescribedBy: Story = {
  name: 'ARIA 설명 포함',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
      <Toggle 
        {...args}
        aria-describedby="toggle-description"
      />
      <p id="toggle-description" style={{ margin: 0, fontSize: '12px', color: '#666', textAlign: 'center' }}>
        이 토글을 사용하여 푸시 알림을 활성화하거나 비활성화할 수 있습니다.
      </p>
    </div>
  ),
  args: {
    'aria-label': '푸시 알림',
    defaultChecked: false,
  },
};

// Combination Stories
export const AllVariants: Story = {
  name: '모든 변형 비교',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '24px',
      padding: '20px',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Primary</h4>
        <Toggle variant="primary" defaultChecked={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Secondary</h4>
        <Toggle variant="secondary" defaultChecked={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Tertiary</h4>
        <Toggle variant="tertiary" defaultChecked={true} />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  name: '모든 크기 비교',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '24px',
      padding: '20px',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Small</h4>
        <Toggle size="small" defaultChecked={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Medium</h4>
        <Toggle size="medium" defaultChecked={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Large</h4>
        <Toggle size="large" defaultChecked={true} />
      </div>
    </div>
  ),
};

export const AllThemes: Story = {
  name: '모든 테마 비교',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '24px',
      padding: '20px',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <div style={{ 
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Light Theme</h4>
        <Toggle theme="light" defaultChecked={true} />
      </div>
      <div style={{ 
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        color: '#ffffff'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Dark Theme</h4>
        <Toggle theme="dark" defaultChecked={true} />
      </div>
    </div>
  ),
};

export const StateComparison: Story = {
  name: '상태 비교',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '24px',
      padding: '20px',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>꺼짐</h4>
        <Toggle defaultChecked={false} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>켜짐</h4>
        <Toggle defaultChecked={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>비활성화 (꺼짐)</h4>
        <Toggle disabled={true} defaultChecked={false} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>비활성화 (켜짐)</h4>
        <Toggle disabled={true} defaultChecked={true} />
      </div>
    </div>
  ),
};

// Complex Example
export const ComplexExample: Story = {
  name: '복합 예제',
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      soundEffects: false,
    });

    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        padding: '24px',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        minWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
          설정
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>알림</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>푸시 알림을 받습니다</div>
          </div>
          <Toggle 
            checked={settings.notifications}
            onChange={updateSetting('notifications')}
            variant="primary"
            size="medium"
            aria-label="알림 설정"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>다크 모드</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>어두운 테마를 사용합니다</div>
          </div>
          <Toggle 
            checked={settings.darkMode}
            onChange={updateSetting('darkMode')}
            variant="secondary"
            size="medium"
            theme={settings.darkMode ? 'dark' : 'light'}
            aria-label="다크 모드 설정"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>자동 저장</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>변경사항을 자동으로 저장합니다</div>
          </div>
          <Toggle 
            checked={settings.autoSave}
            onChange={updateSetting('autoSave')}
            variant="tertiary"
            size="small"
            aria-label="자동 저장 설정"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>효과음</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>버튼 클릭 시 소리를 재생합니다</div>
          </div>
          <Toggle 
            checked={settings.soundEffects}
            onChange={updateSetting('soundEffects')}
            variant="primary"
            size="large"
            aria-label="효과음 설정"
          />
        </div>

        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: '#ffffff', 
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <strong>현재 설정:</strong><br />
          알림: {settings.notifications ? '켜짐' : '꺼짐'}<br />
          다크 모드: {settings.darkMode ? '켜짐' : '꺼짐'}<br />
          자동 저장: {settings.autoSave ? '켜짐' : '꺼짐'}<br />
          효과음: {settings.soundEffects ? '켜짐' : '꺼짐'}
        </div>
      </div>
    );
  },
};
