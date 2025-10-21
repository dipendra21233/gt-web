'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const AddMarkup = dynamic(
  () => import('@/components/admin/components/MarkupManagement/AddMarkup').then(mod => ({ default: mod.AddMarkup })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading markup form...</div>
      </div>
    )
  }
)

const AddNewMarkup = () => {
  return (
    <Suspense fallback={
      <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading markup form...</div>
      </div>
    }>
      <AddMarkup />
    </Suspense>
  )
}

export default AddNewMarkup
