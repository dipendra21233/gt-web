import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  // Log the GET request for debugging
  console.log('🔹 GET request to /payment-status:', {
    url: req.url,
    headers: Object.fromEntries(req.headers.entries()),
    searchParams: Object.fromEntries(new URL(req.url).searchParams.entries()),
  })

  // Handle GET requests - redirect to home or show error page
  return new Response(
    `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Status - Gayatri Travels</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div class="text-center">
            <div class="text-6xl mb-4">⚠️</div>
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Invalid Access</h1>
            <p class="text-gray-600 mb-6">
                This page can only be accessed through payment processing.
                Please complete a payment to view the status.
            </p>
            <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Go to Home
            </a>
        </div>
    </div>
</body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  )
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  // Parse x-www-form-urlencoded
  const body: Record<string, string> = {}
  rawBody.split('&').forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key) {
      const decodedKey = decodeURIComponent(key)
      const decodedValue = decodeURIComponent(value || '')
      body[decodedKey] = decodedValue

      // Also store the original key with + signs for debugging
      if (key.includes('+')) {
        body[key] = decodedValue
      }
    }
  })

  console.log('🔹 Parsed Body Keys:', Object.keys(body))

  console.log('🔹 Raw POST from ICICI:', body)
  console.log('🔹 Raw Data Field Check:', {
    'Response+Code': body['Response+Code'],
    'Total+Amount': body['Total+Amount'],
    'Transaction+Amount': body['Transaction+Amount'],
    'Payment+Mode': body['Payment+Mode'],
    'Transaction+Date': body['Transaction+Date'],
  })

  // Convert raw ICICI data to backend API format (NO DECRYPTION)
  // Handle both regular field names and URL-encoded field names with + signs
  const backendPayload = {
    ResponseCode:
      body.ResponseCode || body['Response+Code'] || body['Response Code'] || '',
    UniqueRefNumber:
      body.UniqueRefNumber ||
      body['Unique+Ref+Number'] ||
      body['Unique Ref Number'] ||
      '',
    ServiceTaxAmount:
      body.ServiceTaxAmount ||
      body['Service+Tax+Amount'] ||
      body['Service Tax Amount'] ||
      '0',
    ProcessingFeeAmount:
      body.ProcessingFeeAmount ||
      body['Processing+Fee+Amount'] ||
      body['Processing Fee Amount'] ||
      '0',
    TotalAmount:
      body.TotalAmount || body['Total+Amount'] || body['Total Amount'] || '0',
    TransactionAmount:
      body.TransactionAmount ||
      body['Transaction+Amount'] ||
      body['Transaction Amount'] ||
      '0',
    TransactionDate:
      body.TransactionDate ||
      body['Transaction+Date'] ||
      body['Transaction+Date'] ||
      '',
    InterchangeValue:
      body.InterchangeValue ||
      body['Interchange+Value'] ||
      body['Interchange Value'] ||
      '',
    TDR: body.TDR || '',
    PaymentMode:
      body.PaymentMode || body['Payment+Mode'] || body['Payment Mode'] || '',
    SubMerchantId: body.SubMerchantId || '',
    ReferenceNo: body.ReferenceNo || '',
    ID: body.ID || '',
    RS: body.RS || '',
    TPS: body.TPS || '',
  }

  console.log('🔹 Backend Format JSON:', backendPayload)

  // Send to backend API only once with all string values
  await sendToBackendAPI(backendPayload)

  // Create decryptedData directly from raw data (since we're not actually decrypting)
  const decryptedData = {
    ResponseCode:
      body.ResponseCode || body['Response+Code'] || body['Response Code'] || '',
    UniqueRefNumber:
      body.UniqueRefNumber ||
      body['Unique+Ref+Number'] ||
      body['Unique Ref Number'] ||
      '',
    ServiceTaxAmount:
      body.ServiceTaxAmount ||
      body['Service+Tax+Amount'] ||
      body['Service Tax Amount'] ||
      '0',
    ProcessingFeeAmount:
      body.ProcessingFeeAmount ||
      body['Processing+Fee+Amount'] ||
      body['Processing Fee Amount'] ||
      '0',
    TotalAmount:
      body.TotalAmount || body['Total+Amount'] || body['Total Amount'] || '0',
    TransactionAmount:
      body.TransactionAmount ||
      body['Transaction+Amount'] ||
      body['Transaction Amount'] ||
      '0',
    TransactionDate:
      body.TransactionDate ||
      body['Transaction+Date'] ||
      body['Transaction Date'] ||
      '',
    InterchangeValue:
      body.InterchangeValue ||
      body['Interchange+Value'] ||
      body['Interchange Value'] ||
      '',
    TDR: body.TDR || '',
    PaymentMode:
      body.PaymentMode || body['Payment+Mode'] || body['Payment Mode'] || '',
    SubMerchantId: body.SubMerchantId || '',
    ReferenceNo: body.ReferenceNo || '',
    ID: body.ID || '',
    RS: body.RS || '',
    TPS: body.TPS || '',
  }

  console.log('🔹 DecryptedData Check:', {
    ResponseCode: decryptedData.ResponseCode,
    TotalAmount: decryptedData.TotalAmount,
    TransactionAmount: decryptedData.TransactionAmount,
    PaymentMode: decryptedData.PaymentMode,
    TransactionDate: decryptedData.TransactionDate,
  })

  // Determine payment status
  console.log('🔹 Payment Status Check:', {
    ResponseCode: backendPayload.ResponseCode,
    isE000: backendPayload.ResponseCode === 'E000',
    rawResponseCode: body['Response+Code'] || body.ResponseCode,
  })
  const isSuccess = backendPayload.ResponseCode === 'E000'

  // Generate HTML that replicates the PaymentStatusPageClient component
  const html = generatePaymentStatusHTML(
    body,
    backendPayload,
    decryptedData,
    isSuccess
  )

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

function generatePaymentStatusHTML(
  rawData: Record<string, string>,
  backendPayload: any,
  decryptedData: Record<string, string>,
  isSuccess: boolean
) {
  console.log('🔹 HTML Generation Debug:', {
    isSuccess,
    ResponseCode: backendPayload.ResponseCode,
    TransactionAmount: backendPayload.TransactionAmount,
    TotalAmount: backendPayload.TotalAmount,
    PaymentMode: backendPayload.PaymentMode,
    TransactionDate: backendPayload.TransactionDate,
  })
  const formatAmount = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    return `₹${numAmount.toFixed(2)}`
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

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Status - Gayatri Travels</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .payment-status-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #F9F4ED 0%, #FFE5A0 100%);
            padding: 2rem 1.5rem;
        }
        .status-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin-bottom: 2rem;
        }
        .status-header {
            background: ${
              isSuccess
                ? 'linear-gradient(135deg, #023E1A 0%, #043F12 100%)'
                : 'linear-gradient(135deg, #CC0000 0%, #FF0000 100%)'
            };
            padding: 2rem 3rem;
            text-align: center;
        }
        .amount-card {
            background: ${isSuccess ? '#F0F9FF' : '#FEF2F2'};
            border-radius: 12px;
            padding: 1.5rem;
            border: ${isSuccess ? '1px solid #DBEAFE' : '1px solid #FECACA'};
        }
        .payment-detail-row {
            border-bottom: 1px solid #f3f4f6;
        }
    </style>
</head>
<body>
    <div class="payment-status-container">
        <div class="max-w-6xl mx-auto">
            <!-- Main Status Card -->
            <div class="status-card">
                <!-- Status Header -->
                <div class="status-header">
                    <div class="flex flex-col items-center gap-3">
                        <div class="h-16 w-16 text-white">
                            ${isSuccess ? '✅' : '❌'}
                        </div>
                        <h1 class="text-3xl font-medium text-white">
                            ${isSuccess ? 'Payment Successful!' : 'Payment Failed'}
                        </h1>
                        <p class="text-white opacity-90">
                            ${
                              isSuccess
                                ? 'Your payment has been processed successfully'
                                : backendPayload.Message ||
                                  'Your payment could not be processed'
                            }
                        </p>
                    </div>
                </div>

                <!-- Payment Details -->
                <div class="p-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Left Column - Transaction Details -->
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                                Transaction Details
                            </h2>

                            <div class="space-y-3">
                                <div class="flex justify-between items-center py-2 payment-detail-row">
                                    <span class="text-gray-600">Reference Number</span>
                                    <span class="font-medium">${backendPayload.ReferenceNo || 'N/A'}</span>
                                </div>

                                <div class="flex justify-between items-center py-2 payment-detail-row">
                                    <span class="text-gray-600">Transaction Date</span>
                                    <span class="font-medium">${formatDate(backendPayload.TransactionDate)}</span>
                                </div>

                                <div class="flex justify-between items-center py-2 payment-detail-row">
                                    <span class="text-gray-600">Payment Mode</span>
                                    <span class="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                                        ${backendPayload.PaymentMode?.replace('_', ' ') || 'N/A'}
                                    </span>
                                </div>

                                ${
                                  !isSuccess && backendPayload.ResponseCode
                                    ? `
                                <div class="flex justify-between items-center py-2 payment-detail-row">
                                    <span class="text-gray-600">Error Code</span>
                                    <span class="px-2 py-1 bg-red-100 text-red-700 border border-red-200 rounded">
                                        ${backendPayload.ResponseCode}
                                    </span>
                                </div>`
                                    : ''
                                }
                            </div>
                        </div>

                        <!-- Right Column - Amount Details -->
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                                Amount Details
                            </h2>

                            <div class="amount-card">
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-600">Transaction Amount</span>
                                        <span class="font-medium">${formatAmount(backendPayload.TransactionAmount)}</span>
                                    </div>

                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-600">Service Tax</span>
                                        <span class="font-medium">${formatAmount(backendPayload.ServiceTaxAmount)}</span>
                                    </div>

                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-600">Processing Fee</span>
                                        <span class="font-medium">${formatAmount(backendPayload.ProcessingFeeAmount)}</span>
                                    </div>

                                    <div class="border-t pt-3 mt-3">
                                        <div class="flex justify-between items-center">
                                            <span class="font-semibold text-gray-800">Total Amount</span>
                                            <span class="text-xl font-semibold ${isSuccess ? 'text-green-800' : 'text-red-600'}">
                                                ${formatAmount(backendPayload.TotalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            ${
                              backendPayload.SubMerchantId
                                ? `
                            <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p class="text-sm text-gray-600 mb-1">
                                    Merchant ID: ${backendPayload.SubMerchantId}
                                </p>
                                ${
                                  backendPayload.InterchangeValue
                                    ? `
                                <p class="text-sm text-gray-600">
                                    Interchange: ${backendPayload.InterchangeValue}
                                </p>`
                                    : ''
                                }
                            </div>`
                                : ''
                            }
                        </div>
                    </div>

                    <!-- Back to Home Button -->
                    <div class="flex justify-center mt-6">
                        <a href="/" class="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>

            <!-- Debug Information -->
            ${
              Object.keys(rawData).length > 0 ||
              Object.keys(decryptedData).length > 0
                ? `
            <div class="bg-white rounded-xl p-6 shadow-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Debug Information</h3>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${
                      Object.keys(rawData).length > 0
                        ? `
                    <div>
                        <h4 class="text-sm font-semibold text-gray-800 mb-2">Raw Data</h4>
                        <pre class="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">${JSON.stringify(rawData, null, 2)}</pre>
                    </div>`
                        : ''
                    }

                    ${
                      Object.keys(decryptedData).length > 0
                        ? `
                    <div>
                        <h4 class="text-sm font-semibold text-gray-800 mb-2">Decrypted Data</h4>
                        <pre class="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">${JSON.stringify(decryptedData, null, 2)}</pre>
                    </div>`
                        : ''
                    }
                </div>
            </div>`
                : ''
            }
        </div>
    </div>
</body>
</html>`
}

async function sendToBackendAPI(backendPayload: any) {
  try {
    console.log('🔹 Sending to Backend API:', backendPayload)

    const response = await fetch(
      'https://gayatri-travels.cortax.in/api/v1/payment/payment-status',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload),
      }
    )

    if (response.ok) {
      const result = await response.json()
      console.log('🔹 Backend API Success:', result)
    } else {
      console.error(
        '🔹 Backend API Error:',
        response.status,
        response.statusText
      )
    }
  } catch (error) {
    console.error('🔹 Backend API Call Failed:', error)
  }
}
