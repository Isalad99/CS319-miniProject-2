// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,     // 24 ชั่วโมง — cache นาน เพราะข้อมูลหนังไม่เปลี่ยน
      gcTime: 1000 * 60 * 60 * 48,         // 48 ชั่วโมง
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
