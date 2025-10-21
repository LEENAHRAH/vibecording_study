// Color Foundation - Design System Colors
// 라이트/다크 모드를 지원하는 컬러 토큰 시스템

export const colors = {
  // Primary Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },

  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Neutral/Gray Colors
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Info Colors
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Base Colors (for light/dark mode)
  base: {
    white: '#ffffff',
    black: '#000000',
  },
} as const;

// Semantic Color Tokens (컨텍스트별 컬러 매핑)
export const semanticColors = {
  // Background Colors
  background: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    tertiary: 'var(--color-bg-tertiary)',
    inverse: 'var(--color-bg-inverse)',
  },

  // Text Colors
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    inverse: 'var(--color-text-inverse)',
    link: 'var(--color-text-link)',
    linkHover: 'var(--color-text-link-hover)',
  },

  // Border Colors
  border: {
    primary: 'var(--color-border-primary)',
    secondary: 'var(--color-border-secondary)',
    focus: 'var(--color-border-focus)',
    error: 'var(--color-border-error)',
  },

  // Interactive Colors
  interactive: {
    primary: 'var(--color-interactive-primary)',
    primaryHover: 'var(--color-interactive-primary-hover)',
    secondary: 'var(--color-interactive-secondary)',
    secondaryHover: 'var(--color-interactive-secondary-hover)',
    disabled: 'var(--color-interactive-disabled)',
  },

  // Status Colors
  status: {
    success: 'var(--color-status-success)',
    warning: 'var(--color-status-warning)',
    error: 'var(--color-status-error)',
    info: 'var(--color-status-info)',
  },
} as const;

// Color Utility Types
export type ColorScale = keyof typeof colors.primary;
export type ColorFamily = keyof typeof colors;
export type SemanticColorCategory = keyof typeof semanticColors;

// Helper Functions
export const getColor = (family: ColorFamily, scale: ColorScale): string => {
  const colorFamily = colors[family];
  if (colorFamily && typeof colorFamily === 'object' && scale in colorFamily) {
    return (colorFamily as Record<string, string>)[scale];
  }
  return '#000000'; // fallback color
};

export const getSemanticColor = (
  category: SemanticColorCategory,
  variant: string
) => {
  return semanticColors[category][
    variant as keyof (typeof semanticColors)[typeof category]
  ];
};
