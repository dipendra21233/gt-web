// src/app/layout.tsx
import '@/app/(user)/globals.css'
import DefaultPage from '@/components/web/components/DefaultPage/defaultPage'
import Toast from '@/components/web/core/Toast/CustomToast'
import { PaymentProvider } from '@/contexts/PaymentContext'
import { QueryProvider } from '@/providers/QueryProvider'
import ThemeProvider from '@/providers/theme-provider'
import { getQueryClient } from '@/services/getQueryClient'
import { getCurrentUserDataApi } from '@/store/apis'
import '@/styles/common.css'
import '@/styles/commonMarginPadding.css'
import '@/styles/error-page.css'
import '@/styles/flex-class.css'
import '@/styles/home.css'
import '@/styles/navbar.css'
import '@/styles/payment-status.css'
import '@/styles/radio-btn.css'
import '@/styles/tabs.css'
import { ACCESS_TOKEN } from '@/utils/constant'
import Cookies from 'js-cookie'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import 'react-responsive-modal/styles.css'
// import 'react-tabs/style/react-tabs.css'
import 'react-day-picker/dist/style.css'
import 'react-toastify/dist/ReactToastify.css'
// ✅ Load Maison font at module scope
const Maison = localFont({
  src: [
    {
      path: '../../public/fonts/Maison-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Demi.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-maison',
})

export const metadata: Metadata = {
  title: 'Gayatri Travels Web',
  description: 'Gayatri Travels customer portal',
  viewport: 'width=device-width, initial-scale=1',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const queryClient = getQueryClient()
  const token = Cookies.get(ACCESS_TOKEN)
  const queries = []

  if (token && token !== 'undefined' && token !== 'null') {
    queries.push(
      queryClient.prefetchQuery({
        queryKey: ['authUser'],
        queryFn: () => getCurrentUserDataApi(),
      })
    )
  }

  await Promise.all(queries)

  return (
    <html lang="en" className={Maison.className}>
      <ThemeProvider>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&display=swap"
            rel="stylesheet"
          />

        </head >
        <body>
          <QueryProvider>
            <PaymentProvider>
              <DefaultPage>{children}</DefaultPage>
            </PaymentProvider>
          </QueryProvider>
          <Toast limit={1} />
        </body>
      </ThemeProvider >
    </html >
  )
}
