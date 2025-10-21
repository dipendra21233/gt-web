'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CouponList = dynamic(
  () => import('@/components/admin/components/CouponsView/CouponList'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading coupons...</div>
      </div>
    )
  }
)

export default function ApprovedUser() {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Suspense fallback={
            <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-500">Loading coupons...</div>
            </div>
          }>
            <CouponList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
