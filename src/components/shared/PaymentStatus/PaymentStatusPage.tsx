'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { usePayment } from '@/contexts/PaymentContext'
import '@/styles/payment-status.css'
import { appRoutes } from '@/utils/routes'
import { CheckCircle2, Copy, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Box, Text } from 'theme-ui'

const PaymentStatusPage: React.FC = () => {
  const router = useRouter()
  const { paymentData, isLoading, error } = usePayment()

  // Show loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F9F4ED 0%, #FFE5A0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="payment-loading"></div>
        <Text variant="Maison16Medium125" color="#303030" sx={{ ml: 3 }}>
          Processing payment status...
        </Text>
      </Box>
    )
  }

  // Show error state
  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F9F4ED 0%, #FFE5A0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <Text variant="Maison18Demi111" color="#CC0000" sx={{ mb: 2 }}>
          Error Loading Payment Status
        </Text>
        <Text variant="Maison14Regular125" color="#666666" sx={{ mb: 4 }}>
          {error}
        </Text>
        <ThemeButton
          text="Back to Home"
          variant="darkSlate"
          onClick={() => router.push(appRoutes.home)}
        />
      </Box>
    )
  }

  // Show no data state
  if (!paymentData) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F9F4ED 0%, #FFE5A0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <XCircle className="h-16 w-16 text-gray-400 mb-4" />
        <Text variant="Maison18Demi111" color="#666666" sx={{ mb: 2 }}>
          No Payment Data Found
        </Text>
        <Text variant="Maison14Regular125" color="#666666" sx={{ mb: 4 }}>
          Please complete a payment to view the status
        </Text>
        <ThemeButton
          text="Back to Home"
          variant="darkSlate"
          onClick={() => router.push(appRoutes.home)}
        />
      </Box>
    )
  }

  const isSuccess = paymentData.status === 'success'

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        // You can add a toast notification here for success
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const formatAmount = (amount: string | number) => {
    return `₹${Number(amount).toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    try {
      const [datePart, timePart] = dateString.split(' ')
      const [day, month, year] = datePart.split('-')
      const date = new Date(`${year}-${month}-${day}T${timePart}`)
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <Box
      className="payment-status-container"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F9F4ED 0%, #FFE5A0 100%)',
        py: [4, 5, 6],
        px: [3, 4, 5],
      }}
    >
      <div className="max-w-4xl mx-auto">
        <Box
          className="status-card"
          sx={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <Box
            sx={{
              background: isSuccess
                ? 'linear-gradient(135deg, #023E1A 0%, #043F12 100%)'
                : 'linear-gradient(135deg, #CC0000 0%, #FF0000 100%)',
              p: '40px',
              textAlign: 'center',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              {isSuccess ? (
                <CheckCircle2 className="h-16 w-16 text-white status-icon" />
              ) : (
                <XCircle className="h-16 w-16 text-white status-icon" />
              )}
              <Text variant="Maison28Medium20" color="white">
                {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
              </Text>
              <Text variant="Maison16Regular125" color="rgba(255,255,255,0.9)">
                {isSuccess
                  ? 'Your payment has been processed successfully'
                  : paymentData.message ||
                    'Your payment could not be processed'}
              </Text>
            </div>
          </Box>

          {/* Payment Details */}
          <Box className="p-[60px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
              <div className="space-y-4">
                <Text
                  variant="Maison18Demi111"
                  color="#303030"
                  className="mb-4"
                >
                  Transaction Details
                </Text>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 payment-detail-row">
                    <Text variant="Maison14Regular125" color="#666666">
                      Reference Number
                    </Text>
                    <div className="flex items-center gap-2">
                      <Text variant="Maison14Medium125" color="#303030">
                        {paymentData.referenceNo}
                      </Text>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(paymentData.referenceNo)}
                        className="h-6 w-6 copy-button"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>


                  <div className="flex justify-between items-center py-2 border-b border-gray-100 payment-detail-row">
                    <Text variant="Maison14Regular125" color="#666666">
                      Payment Mode
                    </Text>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {paymentData.paymentMode.replace('_', ' ')}
                    </Badge>
                  </div>

                  {!isSuccess && paymentData.errorCode && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 payment-detail-row">
                      <Text variant="Maison14Regular125" color="#666666">
                        Error Code
                      </Text>
                      <Badge variant="destructive">
                        {paymentData.errorCode}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Text
                  variant="Maison18Demi111"
                  color="#303030"
                  className="mb-4"
                >
                  Amount Details
                </Text>

                <Box
                  className="amount-card"
                  sx={{
                    background: isSuccess ? '#F0F9FF' : '#FEF2F2',
                    borderRadius: '12px',
                    p: 4,
                    border: isSuccess
                      ? '1px solid #DBEAFE'
                      : '1px solid #FECACA',
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text variant="Maison14Regular125" color="#666666">
                        Transaction Amount
                      </Text>
                      <Text variant="Maison14Medium125" color="#303030">
                        {formatAmount(paymentData.transactionAmount)}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <Text variant="Maison14Regular125" color="#666666">
                        Service Tax
                      </Text>
                      <Text variant="Maison14Medium125" color="#303030">
                        {formatAmount(paymentData.serviceTaxAmount)}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <Text variant="Maison14Regular125" color="#666666">
                        Processing Fee
                      </Text>
                      <Text variant="Maison14Medium125" color="#303030">
                        {formatAmount(paymentData.processingFeeAmount)}
                      </Text>
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <Text variant="Maison16Demi125" color="#303030">
                          Total Amount
                        </Text>
                        <Text
                          variant="Maison18Demi111"
                          color={isSuccess ? '#023E1A' : '#CC0000'}
                        >
                          {formatAmount(paymentData.totalAmount)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Box>

                {/* Merchant Details */}
                {paymentData.subMerchantId && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <Text
                      variant="Maison12Regular125"
                      color="#666666"
                      className="mb-1"
                    >
                      Merchant ID: {paymentData.subMerchantId}
                    </Text>
                    {paymentData.interchangeValue && (
                      <Text variant="Maison12Regular125" color="#666666">
                        Interchange: {paymentData.interchangeValue}
                      </Text>
                    )}
                  </div>
                )}
              </div>
              <>
                <ThemeButton
                  text="Back to Home"
                  variant="darkSlate"
                  onClick={() => router.push(appRoutes.home)}
                />
              </>
            </div>
          </Box>
        </Box>
      </div>
    </Box>
  )
}

export default PaymentStatusPage
