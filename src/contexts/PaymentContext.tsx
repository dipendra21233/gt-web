'use client'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

// Server response interface matching the API structure
export interface PaymentServerResponse {
  ResponseCode: string
  UniqueRefNumber: string
  ServiceTaxAmount: number
  ProcessingFeeAmount: number
  TotalAmount: number
  TransactionAmount: number
  TransactionDate: string
  InterchangeValue?: string
  PaymentMode: string
  SubMerchantId: string
  ReferenceNo: string
  ID: string
  RS?: string
  TPS?: string
  MandatoryFields?: string
  OptionalFields?: string
  RSV?: string
  Message?: string
}

// Transformed payment data for the UI component
export interface PaymentData {
  status: 'success' | 'failure'
  errorCode?: string
  uniqueRefNumber: string
  serviceTaxAmount: string
  processingFeeAmount: string
  totalAmount: string
  transactionAmount: string
  transactionDate: string
  interchangeValue?: string
  paymentMode: string
  subMerchantId: string
  referenceNo: string
  id: string
  rs?: string
  tps?: string
  mandatoryFields?: string
  optionalFields?: string
  rsv?: string
  message?: string
}

interface PaymentContextType {
  paymentData: PaymentData | null
  isLoading: boolean
  error: string | null
  setPaymentResponse: (response: PaymentServerResponse) => void
  clearPaymentData: () => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

// Transform server response to UI format
const transformServerResponse = (
  serverResponse: PaymentServerResponse
): PaymentData => {
  // Success condition: ResponseCode === "E000"
  const isSuccess = serverResponse.ResponseCode === 'E000'

  return {
    status: isSuccess ? 'success' : 'failure',
    errorCode: isSuccess ? undefined : serverResponse.ResponseCode,
    uniqueRefNumber: serverResponse.UniqueRefNumber,
    serviceTaxAmount: serverResponse.ServiceTaxAmount.toFixed(2),
    processingFeeAmount: serverResponse.ProcessingFeeAmount.toFixed(2),
    totalAmount: serverResponse.TotalAmount.toFixed(2),
    transactionAmount: serverResponse.TransactionAmount.toFixed(2),
    transactionDate: serverResponse.TransactionDate,
    interchangeValue: serverResponse.InterchangeValue,
    paymentMode: serverResponse.PaymentMode,
    subMerchantId: serverResponse.SubMerchantId,
    referenceNo: serverResponse.ReferenceNo,
    id: serverResponse.ID,
    rs: serverResponse.RS,
    tps: serverResponse.TPS,
    mandatoryFields: serverResponse.MandatoryFields,
    optionalFields: serverResponse.OptionalFields,
    rsv: serverResponse.RSV,
    message:
      serverResponse.Message ||
      (isSuccess ? 'Payment completed successfully' : 'Payment failed'),
  }
}

interface PaymentProviderProps {
  children: ReactNode
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setPaymentResponse = (response: PaymentServerResponse) => {
    try {
      setIsLoading(true)
      setError(null)

      // Transform server response to UI format
      const transformedData = transformServerResponse(response)
      setPaymentData(transformedData)

      // Store in sessionStorage for persistence across page reloads
      sessionStorage.setItem(
        'gayatri_payment_data',
        JSON.stringify(transformedData)
      )
    } catch (err) {
      console.error('Error processing payment response:', err)
      setError('Failed to process payment response')
    } finally {
      setIsLoading(false)
    }
  }

  const clearPaymentData = () => {
    setPaymentData(null)
    setError(null)
    sessionStorage.removeItem('gayatri_payment_data')
  }

  // Load payment data from sessionStorage on mount (for page refreshes)
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('gayatri_payment_data')
      if (storedData) {
        const parsedData = JSON.parse(storedData) as PaymentData
        setPaymentData(parsedData)
      }
    } catch (err) {
      console.error('Error loading stored payment data:', err)
      sessionStorage.removeItem('gayatri_payment_data')
    }
  }, [])

  // Listen for payment response from third-party API
  useEffect(() => {
    const handlePaymentResponse = (event: MessageEvent) => {
      // Security check - verify origin if needed
      // if (event.origin !== 'https://test.gayatritravels.in') return

      if (event.data && event.data.type === 'PAYMENT_RESPONSE') {
        const response = event.data.payload as PaymentServerResponse
        setPaymentResponse(response)
      }
    }

    // Listen for postMessage from payment gateway
    window.addEventListener('message', handlePaymentResponse)

    // Also check for URL parameters (fallback method)
    const urlParams = new URLSearchParams(window.location.search)
    const responseData = urlParams.get('response')

    if (responseData) {
      try {
        const decodedResponse = JSON.parse(
          decodeURIComponent(responseData)
        ) as PaymentServerResponse
        setPaymentResponse(decodedResponse)
      } catch (err) {
        console.error('Error parsing URL response:', err)
      }
    }

    return () => {
      window.removeEventListener('message', handlePaymentResponse)
    }
  }, [])

  const contextValue: PaymentContextType = {
    paymentData,
    isLoading,
    error,
    setPaymentResponse,
    clearPaymentData,
  }

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  )
}

// Custom hook to use payment context
export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}

// Utility function to manually set payment response (for testing or direct API calls)
export const setGlobalPaymentResponse = (response: PaymentServerResponse) => {
  // Dispatch custom event for components to listen
  window.dispatchEvent(new CustomEvent('paymentResponse', { detail: response }))

  // Also use postMessage for consistency
  window.postMessage(
    {
      type: 'PAYMENT_RESPONSE',
      payload: response,
    },
    window.location.origin
  )
}
