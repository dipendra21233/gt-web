'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const MyBookings = dynamic(
  () => import('@/components/admin/components/Accounting/MyBookings'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading bookings...</div>
      </div>
    )
  }
)

const MyBookingsPage = () => {
  return (
    <Suspense fallback={
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading bookings...</div>
      </div>
    }>
      <MyBookings />
    </Suspense>
  )
}

export default MyBookingsPage
