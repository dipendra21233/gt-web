import { PaymentData } from '@/contexts/PaymentContext'

export interface PaymentResponseData {
  status?: string
  errorCode?: string
  uniqueRefNumber?: string
  serviceTaxAmount?: string
  processingFeeAmount?: string
  totalAmount?: string
  transactionAmount?: string
  transactionDate?: string
  interchangeValue?: string
  paymentMode?: string
  subMerchantId?: string
  referenceNo?: string
  id?: string
  rs?: string
  tps?: string
  mandatoryFields?: string
  optionalFields?: string
  rsv?: string
  message?: string
}

/**
 * Transform raw payment response data into PaymentData format
 */
export const transformPaymentData = (
  rawData: PaymentResponseData,
  status: 'success' | 'failure'
): PaymentData => {
  return {
    status,
    errorCode: rawData.errorCode,
    uniqueRefNumber: rawData.uniqueRefNumber || '',
    serviceTaxAmount: rawData.serviceTaxAmount || '0.00',
    processingFeeAmount: rawData.processingFeeAmount || '0.00',
    totalAmount: rawData.totalAmount || '0.00',
    transactionAmount: rawData.transactionAmount || '0',
    transactionDate: rawData.transactionDate || '',
    interchangeValue: rawData.interchangeValue,
    paymentMode: rawData.paymentMode || 'UNKNOWN',
    subMerchantId: rawData.subMerchantId || '',
    referenceNo: rawData.referenceNo || '',
    id: rawData.id || '',
    rs: rawData.rs,
    tps: rawData.tps,
    mandatoryFields: rawData.mandatoryFields,
    optionalFields: rawData.optionalFields,
    rsv: rawData.rsv,
    message: rawData.message,
  }
}

/**
 * Format amount with currency symbol
 */
export const formatCurrency = (amount: string | number): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return `₹${numericAmount.toFixed(2)}`
}

/**
 * Format date string from payment response
 */
export const formatPaymentDate = (dateString: string): string => {
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
      hour12: true,
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

/**
 * Format payment mode for display
 */
export const formatPaymentMode = (mode: string): string => {
  return mode.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

/**
 * Generate receipt data for download
 */
export const generateReceiptData = (paymentData: PaymentData): string => {
  const receiptLines = [
    '='.repeat(50),
    'GAYATRI TRAVELS - PAYMENT RECEIPT',
    '='.repeat(50),
    '',
    `Status: ${paymentData.status.toUpperCase()}`,
    `Reference Number: ${paymentData.referenceNo}`,
    `Transaction ID: ${paymentData.id}`,
    `Unique Ref Number: ${paymentData.uniqueRefNumber}`,
    '',
    'AMOUNT DETAILS:',
    '-'.repeat(30),
    `Transaction Amount: ${formatCurrency(paymentData.transactionAmount)}`,
    `Service Tax: ${formatCurrency(paymentData.serviceTaxAmount)}`,
    `Processing Fee: ${formatCurrency(paymentData.processingFeeAmount)}`,
    `Total Amount: ${formatCurrency(paymentData.totalAmount)}`,
    '',
    'TRANSACTION DETAILS:',
    '-'.repeat(30),
    `Date: ${formatPaymentDate(paymentData.transactionDate)}`,
    `Payment Mode: ${formatPaymentMode(paymentData.paymentMode)}`,
    `Merchant ID: ${paymentData.subMerchantId}`,
    '',
    paymentData.errorCode ? `Error Code: ${paymentData.errorCode}` : '',
    paymentData.interchangeValue
      ? `Interchange: ${paymentData.interchangeValue}`
      : '',
    '',
    '='.repeat(50),
    'Thank you for choosing Gayatri Travels!',
    '='.repeat(50),
  ].filter((line) => line !== undefined && line !== null)

  return receiptLines.join('\n')
}

/**
 * Download receipt as text file
 */
export const downloadReceipt = (paymentData: PaymentData): void => {
  const receiptData = generateReceiptData(paymentData)
  const blob = new Blob([receiptData], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `gayatri-travels-receipt-${paymentData.referenceNo}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * Copy text to clipboard with fallback
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
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

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch (error) {
    console.error('Failed to copy text:', error)
    return false
  }
}

/**
 * Validate payment data completeness
 */
export const validatePaymentData = (
  data: PaymentData
): {
  isValid: boolean
  missingFields: string[]
} => {
  const requiredFields: (keyof PaymentData)[] = [
    'status',
    'uniqueRefNumber',
    'totalAmount',
    'transactionAmount',
    'transactionDate',
    'paymentMode',
    'referenceNo',
    'id',
  ]

  const missingFields = requiredFields.filter((field) => {
    const value = data[field]
    return !value || (typeof value === 'string' && value.trim() === '')
  })

  return {
    isValid: missingFields.length === 0,
    missingFields,
  }
}

/**
 * Get payment status color based on status
 */
export const getStatusColor = (
  status: 'success' | 'failure'
): {
  background: string
  text: string
  border: string
} => {
  if (status === 'success') {
    return {
      background: '#F0F9FF',
      text: '#023E1A',
      border: '#DBEAFE',
    }
  } else {
    return {
      background: '#FEF2F2',
      text: '#CC0000',
      border: '#FECACA',
    }
  }
}

/**
 * Generate shareable payment link (for customer support)
 */
export const generateSupportLink = (paymentData: PaymentData): string => {
  const params = new URLSearchParams({
    ref: paymentData.referenceNo,
    id: paymentData.id,
    amount: paymentData.totalAmount,
    status: paymentData.status,
  })

  return `${window.location.origin}/payment-status?${params.toString()}`
}
