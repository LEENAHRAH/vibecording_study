// Typography Foundation - Design System Typography
// 한글/영문 폰트를 지원하는 타이포그래피 토큰 시스템

// Font Families
export const fontFamilies = {
  korean:
    'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  english:
    'SUIT Variable, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  fallback:
    '-apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", sans-serif',
} as const;

// Font Weights
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// Base Typography Tokens
export const typography = {
  // Web Headlines (웹 헤드라인)
  webHeadline: {
    headline01: {
      fontSize: 48,
      lineHeight: 60,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
    headline02: {
      fontSize: 36,
      lineHeight: 48,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
    headline03: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
  },

  // Headlines (헤드라인)
  headline: {
    headline01: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: fontWeights.bold,
      letterSpacing: 0,
    },
    headline02: {
      fontSize: 22,
      lineHeight: 30,
      fontWeight: fontWeights.extrabold,
      letterSpacing: 0,
    },
    headline03: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: fontWeights.bold,
      letterSpacing: 0,
    },
  },

  // Titles (타이틀)
  title: {
    title01: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: fontWeights.bold,
      letterSpacing: 0,
    },
    title02: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: fontWeights.bold,
      letterSpacing: 0,
    },
    title03: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: fontWeights.bold,
      letterSpacing: 0,
    },
    subtitle01: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
    subtitle02: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
  },

  // Body Text (본문)
  body: {
    body01: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: fontWeights.medium,
      letterSpacing: 0,
    },
    body01Regular: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: fontWeights.regular,
      letterSpacing: 0,
    },
    body02Medium: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: fontWeights.medium,
      letterSpacing: 0,
    },
    body02Small: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: fontWeights.regular,
      letterSpacing: 0,
    },
    body03: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: fontWeights.medium,
      letterSpacing: 0,
    },
    body03Regular: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: fontWeights.regular,
      letterSpacing: 0,
    },
  },

  // Caption (캡션)
  caption: {
    caption01: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
    caption02Medium: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
    caption02Small: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: fontWeights.medium,
      letterSpacing: 0,
    },
    caption03: {
      fontSize: 8,
      lineHeight: 10,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0,
    },
  },
} as const;

// Responsive Typography (모바일/데스크톱 대응)
export const responsiveTypography = {
  mobile: {
    // Mobile에서는 기본 사이즈보다 작게 조정
    webHeadline: {
      headline01: {
        ...typography.webHeadline.headline01,
        fontSize: 32,
        lineHeight: 40,
      },
      headline02: {
        ...typography.webHeadline.headline02,
        fontSize: 28,
        lineHeight: 36,
      },
      headline03: {
        ...typography.webHeadline.headline03,
        fontSize: 24,
        lineHeight: 32,
      },
    },
    headline: {
      headline01: {
        ...typography.headline.headline01,
        fontSize: 20,
        lineHeight: 28,
      },
      headline02: {
        ...typography.headline.headline02,
        fontSize: 18,
        lineHeight: 24,
      },
      headline03: {
        ...typography.headline.headline03,
        fontSize: 16,
        lineHeight: 22,
      },
    },
    title: {
      title01: { ...typography.title.title01, fontSize: 16, lineHeight: 22 },
      title02: { ...typography.title.title02, fontSize: 14, lineHeight: 20 },
      title03: { ...typography.title.title03, fontSize: 12, lineHeight: 18 },
      subtitle01: {
        ...typography.title.subtitle01,
        fontSize: 12,
        lineHeight: 18,
      },
      subtitle02: {
        ...typography.title.subtitle02,
        fontSize: 10,
        lineHeight: 14,
      },
    },
    body: typography.body, // Body는 동일하게 유지
    caption: typography.caption, // Caption은 동일하게 유지
  },
  desktop: typography, // Desktop은 기본 사이즈 사용
} as const;

// Semantic Typography Tokens (의미적 타이포그래피 토큰)
export const semanticTypography = {
  // Page Headers
  pageTitle: 'var(--typography-web-headline-01)',
  pageSubtitle: 'var(--typography-web-headline-02)',

  // Section Headers
  sectionTitle: 'var(--typography-headline-01)',
  sectionSubtitle: 'var(--typography-headline-02)',

  // Content Headers
  contentTitle: 'var(--typography-title-01)',
  contentSubtitle: 'var(--typography-title-02)',

  // Body Content
  bodyLarge: 'var(--typography-body-01)',
  bodyMedium: 'var(--typography-body-02-medium)',
  bodySmall: 'var(--typography-body-03)',

  // UI Elements
  buttonLarge: 'var(--typography-title-01)',
  buttonMedium: 'var(--typography-title-02)',
  buttonSmall: 'var(--typography-title-03)',

  // Form Elements
  inputLabel: 'var(--typography-title-03)',
  inputText: 'var(--typography-body-01)',
  helperText: 'var(--typography-caption-01)',

  // Navigation
  navItem: 'var(--typography-title-02)',
  breadcrumb: 'var(--typography-caption-01)',

  // Cards & Lists
  cardTitle: 'var(--typography-title-01)',
  cardSubtitle: 'var(--typography-body-02-medium)',
  listItem: 'var(--typography-body-01)',

  // Status & Feedback
  errorText: 'var(--typography-caption-01)',
  successText: 'var(--typography-caption-01)',
  warningText: 'var(--typography-caption-01)',
} as const;

// Typography Utility Types
export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof fontWeights;
export type TypographyCategory = keyof typeof typography;
export type TypographyVariant<T extends TypographyCategory> =
  keyof (typeof typography)[T];
export type ResponsiveBreakpoint = keyof typeof responsiveTypography;
export type SemanticTypographyToken = keyof typeof semanticTypography;

// Helper Functions
export const getTypographyStyle = (
  category: TypographyCategory,
  variant: string,
  options?: {
    fontFamily?: FontFamily;
    responsive?: ResponsiveBreakpoint;
  }
) => {
  const baseTypography =
    options?.responsive === 'mobile'
      ? responsiveTypography.mobile
      : responsiveTypography.desktop;

  const categoryStyles = baseTypography[category] as Record<
    string,
    {
      fontSize: number;
      lineHeight: number;
      fontWeight: number;
      letterSpacing: number;
    }
  >;
  const baseStyle = categoryStyles[variant];

  if (!baseStyle) {
    throw new Error(
      `Typography variant "${variant}" not found in category "${category}"`
    );
  }

  const fontFamily = options?.fontFamily
    ? fontFamilies[options.fontFamily]
    : fontFamilies.korean;

  return {
    fontFamily,
    fontSize: `${baseStyle.fontSize}px`,
    lineHeight: `${baseStyle.lineHeight}px`,
    fontWeight: baseStyle.fontWeight,
    letterSpacing: `${baseStyle.letterSpacing}px`,
  };
};

export const getResponsiveTypographyStyle = (
  category: TypographyCategory,
  variant: string,
  fontFamily: FontFamily = 'korean'
) => {
  return {
    mobile: getTypographyStyle(category, variant, {
      fontFamily,
      responsive: 'mobile',
    }),
    desktop: getTypographyStyle(category, variant, {
      fontFamily,
      responsive: 'desktop',
    }),
  };
};

// CSS-in-JS Helper
export const createTypographyCSS = (
  category: TypographyCategory,
  variant: string,
  options?: {
    fontFamily?: FontFamily;
    responsive?: ResponsiveBreakpoint;
  }
) => {
  const style = getTypographyStyle(category, variant, options);
  return `
    font-family: ${style.fontFamily};
    font-size: ${style.fontSize};
    line-height: ${style.lineHeight};
    font-weight: ${style.fontWeight};
    letter-spacing: ${style.letterSpacing};
  `;
};

// Tailwind CSS Class Generator
export const getTypographyTailwindClass = (
  category: TypographyCategory,
  variant: string
) => {
  const key = `${category}-${variant.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  return `typography-${key}`;
};
