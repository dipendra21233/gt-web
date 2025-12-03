// app/admin/layout.tsx
'use client'
import { useAuthData } from '@/queries/useAuthData';
import { getQueryClient } from '@/services/getQueryClient';
import { getBalanceDataApi, getUserListApi } from '@/store/apis';
import '@/styles/admin/global.css';
import '@/styles/admin/index.css';
import '@/styles/commonMarginPadding.css';
import '@/styles/flex-class.css';
import '@/styles/pax.css';
import { ACCESS_TOKEN } from '@/utils/constant';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useMemo } from 'react';

// Lazy load admin components for better performance
const ModernHeader = dynamic(
  () => import('@/components/admin/components/layout/ModernHeader'),
  {
    ssr: false,
    loading: () => <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />
  }
)

const ModernSidebar = dynamic(
  () => import('@/components/admin/components/layout/ModernSidebar'),
  {
    ssr: false,
    loading: () => <div className="w-80 h-screen bg-white border-r border-gray-200 animate-pulse" />
  }
)

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = getQueryClient()
  const { authUser } = useAuthData()
  // Memoize token check to prevent unnecessary re-renders
  const token = useMemo(() => {
    return Cookies.get(ACCESS_TOKEN)
  }, [])

  // Optimize data prefetching - only run once on mount
  useEffect(() => {
    if (token && token !== 'undefined' && token !== 'null') {
      // Use a timeout to prevent blocking the initial render
      const timeoutId = setTimeout(() => {
        queryClient.prefetchQuery({
          queryKey: ['userList', { pageNo: 1, userStatus: 'all' }],
          queryFn: () => getUserListApi({ pageNo: 1, userStatus: 'all' }),
          staleTime: 5 * 60 * 1000, // 5 minutes
        })
        queryClient.prefetchQuery({
          queryKey: ['balanceData', authUser?._id],
          queryFn: () => getBalanceDataApi({ userId: authUser?._id }),
        })
      }, 100)

      return () => clearTimeout(timeoutId)
    }
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Remove token and queryClient dependencies to prevent re-runs

  return (
    <div
      className="modern-admin-layout"
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        background: '#f9fafb',
      }}
    >
      <Suspense fallback={<div className="w-80 h-screen bg-white border-r border-gray-200 animate-pulse" />}>
        <ModernSidebar />
      </Suspense>
      <div
        className="modern-main-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          width: '100%',
          marginLeft: '0',
          paddingLeft: '0',
        }}
      >
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200 animate-pulse" />}>
          <ModernHeader />
        </Suspense>
        <main
          className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-5 sm:px-[20px] sm:py-[20px] lg:px-[24px] lg:py-[24px]"
          style={{
            flex: 1,
            overflowY: 'auto',
            width: '100%',
            marginLeft: '0',
          }}
        >
          <Suspense fallback={<div className="w-full h-96 bg-white rounded-lg animate-pulse" />}>
            <div style={{ width: '100%', maxWidth: 'none' }}>{children}</div>
          </Suspense>
        </main>
      </div>
    </div>
  )
}
