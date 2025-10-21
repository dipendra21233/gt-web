'use client'
import { getQueryClient } from '@/services/getQueryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { useMemo } from 'react'

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useMemo(() => getQueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
