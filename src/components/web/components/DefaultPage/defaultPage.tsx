'use client'
import Providers from '@/store/provider'
import { usePathname } from 'next/navigation'
import React, { FC } from 'react'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'

const DefaultPage: FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const isAdmin = pathname.includes('/admin')
  return (
    <Providers>
      {/* <CommonActionInit /> */}
      {isAdmin ? null : <Navbar />}
      <main className="flex-1">{children}</main>
      {isAdmin ? null : <Footer />}
    </Providers>
  )
}

export default DefaultPage
