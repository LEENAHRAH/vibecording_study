/** @type {import('next').NextConfig} */
const nextConfig = {
  // 실험적 기능 활성화로 파일 시스템 문제 해결
  experimental: {
    // 빌드 캐시 최적화
    turbotrace: {
      logLevel: "error",
    },
    // 메모리 사용량 최적화
    memoryBasedWorkersCount: 1,
  },
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

    // 파일 시스템 캐시 비활성화
    config.cache = false;

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
  // 출력 설정 최적화
  output: "standalone",
};

export default nextConfig;
