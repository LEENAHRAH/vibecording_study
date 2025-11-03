/** @type {import('next').NextConfig} */
const nextConfig = {
  // Windows 파일 시스템 문제 해결을 위한 설정
  experimental: {
    // 빌드 캐시 최적화
    turbotrace: {
      logLevel: "error",
    },
    // 메모리 사용량 최적화
    memoryBasedWorkersCount: true,
    // Windows에서 파일 시스템 문제 해결
    esmExternals: false,
  },
  // Windows 호환성을 위한 추가 설정
  swcMinify: false,
  // Storybook 파일들을 Next.js 빌드에서 제외
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // 개발 모드에서 파일 시스템 감시 최적화
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules", "**/.next"],
      };
    }

    // Windows에서 파일 시스템 캐시 완전 비활성화
    config.cache = false;
    
    // Windows 파일 경로 문제 해결
    config.resolve.symlinks = false;

    return config;
  },
  // TypeScript 설정에서 Stories 파일 제외
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    // Stories 파일에서 발생하는 ESLint 오류 무시
    ignoreDuringBuilds: false,
  },
  // 정적 생성 최적화
  trailingSlash: false,
  // 출력 설정 최적화 (Vercel에서는 주석 처리)
  // output: "standalone",
};

export default nextConfig;
