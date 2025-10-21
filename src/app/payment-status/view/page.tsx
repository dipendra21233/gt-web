import PaymentStatusPageClient from '@/components/shared/PaymentStatus/PaymentStatusPageClient'
import { PaymentServerResponse } from '@/contexts/PaymentContext'
import { cookies } from 'next/headers'

export default async function PaymentStatusViewPage() {
  const cookieStore = await cookies()
  const paymentCookie = cookieStore.get('payment_response')
  let backendPayload: PaymentServerResponse = {} as PaymentServerResponse

  let rawData: { [key: string]: string } = {}
  let decryptedData: { [key: string]: string } = {}
  let error: string | null = null

  try {
    if (paymentCookie) {
      const decodedData = JSON.parse(
        Buffer.from(paymentCookie.value, 'base64').toString('utf-8')
      )
      rawData = decodedData.rawData || {}
      backendPayload = decodedData.backendPayload || {}
      decryptedData = decodedData.decryptedData || {}
    } else {
      error = 'No payment data found'
    }
  } catch (err) {
    console.error('Error processing payment data:', err)
    error = 'Failed to process payment data'
  }

  return (
    <PaymentStatusPageClient
      paymentData={backendPayload}
      rawData={rawData}
      decryptedData={decryptedData}
      error={error}
    />
  )
}
