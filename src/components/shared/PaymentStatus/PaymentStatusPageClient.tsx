'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { PaymentServerResponse } from '@/contexts/PaymentContext'
import { useUpdatePaymentStatusMutation } from '@/hooks/useMutations'
import '@/styles/payment-status.css'
import { appRoutes } from '@/utils/routes'
import { CheckCircle2, Copy, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Box, Text } from 'theme-ui'

interface PaymentStatusPageClientProps {
  paymentData: PaymentServerResponse | null
  rawData: { [key: string]: string }
  decryptedData: { [key: string]: string }
  error: string | null
}

const PaymentStatusPageClient: React.FC<PaymentStatusPageClientProps> = ({
  paymentData,
  rawData,
  decryptedData,
  error,
}) => {
  const router = useRouter()

  const updatePaymentStatus = useUpdatePaymentStatusMutation()

  useEffect(() => {
    if (paymentData) {
      updatePaymentStatus.mutate({
        ResponseCode: paymentData.ResponseCode,
        UniqueRefNumber: paymentData.UniqueRefNumber,
        ServiceTaxAmount: paymentData.ServiceTaxAmount,
        ProcessingFeeAmount: paymentData.ProcessingFeeAmount,
        TotalAmount: paymentData.TotalAmount,
        TransactionAmount: paymentData.TransactionAmount,
        TransactionDate: paymentData.TransactionDate,
        PaymentMode: paymentData.PaymentMode,
        SubMerchantId: paymentData.SubMerchantId,
        ReferenceNo: paymentData.ReferenceNo,
        ID: paymentData.ID,
        RS: paymentData.RS || '',
        TPS: paymentData.TPS || '',
      })
    }
  }, [paymentData, updatePaymentStatus])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You can add a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }


  const formatAmount = (amount: number) => {
    return `₹${amount.toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    try {
      // Split into date and time by '+'
      const [datePart, timePart] = dateString.split('+')
      const [day, month, year] = datePart.split('-')

      // Construct ISO-like string
      const date = new Date(`${year}-${month}-${day}T${timePart}`)

      return date.toLocaleString('en-IN', {
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
          Payment Processing Error
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

  const isSuccess = paymentData.ResponseCode === 'E000'

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
      <div className="max-w-6xl mx-auto">
        {/* Main Status Card */}
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
          {/* Status Header */}
          <Box
            sx={{
              background: isSuccess
                ? 'linear-gradient(135deg, #023E1A 0%, #043F12 100%)'
                : 'linear-gradient(135deg, #CC0000 0%, #FF0000 100%)',
              px: [4, 5, 6],
              py: [4, 5],
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
                  : paymentData.Message ||
                  'Your payment could not be processed'}
              </Text>
            </div>
          </Box>

          {/* Payment Details */}
          <div className='p-30'>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
              {/* Left Column - Transaction Details */}
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
                        {paymentData.ReferenceNo}
                      </Text>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(paymentData.ReferenceNo)}
                        className="h-6 w-6 copy-button"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100 payment-detail-row">
                    <Text variant="Maison14Regular125" color="#666666">
                      Transaction Date
                    </Text>
                    <Text variant="Maison14Medium125" color="#303030">
                      {formatDate(paymentData.TransactionDate)}
                    </Text>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100 payment-detail-row">
                    <Text variant="Maison14Regular125" color="#666666">
                      Payment Mode
                    </Text>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {paymentData.PaymentMode.replace('_', ' ')}
                    </Badge>
                  </div>

                  {!isSuccess && paymentData.ResponseCode && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 payment-detail-row">
                      <Text variant="Maison14Regular125" color="#666666">
                        Error Code
                      </Text>
                      <Badge variant="destructive">
                        {paymentData.ResponseCode}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Amount Details */}
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
                        {formatAmount(paymentData.TransactionAmount)}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <Text variant="Maison14Regular125" color="#666666">
                        Service Tax
                      </Text>
                      <Text variant="Maison14Medium125" color="#303030">
                        {formatAmount(paymentData.ServiceTaxAmount)}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <Text variant="Maison14Regular125" color="#666666">
                        Processing Fee
                      </Text>
                      <Text variant="Maison14Medium125" color="#303030">
                        {formatAmount(paymentData.ProcessingFeeAmount)}
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
                          {formatAmount(paymentData.TotalAmount)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Box>

                {/* Merchant Details */}
                {paymentData.SubMerchantId && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <Text
                      variant="Maison12Regular125"
                      color="#666666"
                      className="mb-1"
                    >
                      Merchant ID: {paymentData.SubMerchantId}
                    </Text>
                    {paymentData.InterchangeValue && (
                      <Text variant="Maison12Regular125" color="#666666">
                        Interchange: {paymentData.InterchangeValue}
                      </Text>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="flex justify-center mt-6">
              <ThemeButton
                text="Back to Home"
                variant="darkSlate"
                onClick={() => router.push(appRoutes.home)}
              />
            </div>
          </div>
        </Box>

        {/* Debug Information (show raw and decrypted data for development) */}
        {(Object.keys(rawData).length > 0 ||
          Object.keys(decryptedData).length > 0) && (
            <Box
              sx={{
                background: 'white',
                borderRadius: '12px',
                p: 4,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Text variant="Maison16Demi125" color="#303030" className="mb-4">
                Debug Information
              </Text>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Raw Data */}
                {Object.keys(rawData).length > 0 && (
                  <div>
                    <Text
                      variant="Maison14Demi125"
                      color="#303030"
                      className="mb-2"
                    >
                      Raw Data
                    </Text>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                      {JSON.stringify(rawData, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Decrypted Data */}
                {Object.keys(decryptedData).length > 0 && (
                  <div>
                    <Text
                      variant="Maison14Demi125"
                      color="#303030"
                      className="mb-2"
                    >
                      Decrypted Data
                    </Text>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                      {JSON.stringify(decryptedData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </Box>
          )}
      </div>
    </Box>
  )
}

export default PaymentStatusPageClient
