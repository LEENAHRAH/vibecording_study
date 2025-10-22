/** @type {import('next').NextConfig} */
const nextConfig = {
  // Storybook 파일들을 Next.js 빌드에서 제외
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
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
};

export default nextConfig;
