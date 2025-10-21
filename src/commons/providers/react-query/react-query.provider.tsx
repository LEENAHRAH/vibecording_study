'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 stale time: 5분
            staleTime: 1000 * 60 * 5,
            // 기본 cache time: 10분
            gcTime: 1000 * 60 * 10,
            // 윈도우 포커스 시 자동 refetch 비활성화
            refetchOnWindowFocus: false,
            // 네트워크 재연결 시 자동 refetch 활성화
            refetchOnReconnect: true,
            // 컴포넌트 마운트 시 자동 refetch 비활성화
            refetchOnMount: false,
            // 에러 시 재시도 횟수
            retry: 1,
          },
          mutations: {
            // 에러 시 재시도 횟수
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
