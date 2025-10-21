'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const TransactionList = dynamic(
  () => import('@/components/admin/components/Transaction/TransactionList'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading transactions...</div>
      </div>
    )
  }
)

export default function TransactionListPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading transactions...</div>
      </div>
    }>
      <TransactionList />
    </Suspense>
  )
}
