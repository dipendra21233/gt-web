'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const UserListing = dynamic(
    () => import("@/components/admin/components/UserList/userListing"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
                <div className="text-gray-500">Loading users...</div>
            </div>
        )
    }
)

export default function ApprovedUser() {
    return (
        <div>
            <Suspense fallback={
                <div className="w-full h-96 bg-white rounded-lg animate-pulse flex items-center justify-center">
                    <div className="text-gray-500">Loading users...</div>
                </div>
            }>
                <UserListing />
            </Suspense>
        </div>
    )
}
