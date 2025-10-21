'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const BookingManageMentList = dynamic(
  () => import('@/components/admin/components/Accounting/BookingManageMentList'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading bookings...</div>
      </div>
    )
  }
)

const BookingList = () => {
  return (
    <Suspense fallback={
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading bookings...</div>
      </div>
    }>
      <BookingManageMentList />
    </Suspense>
  )
}

export default BookingList
