'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { getBookingDetailsData } from '@/store/actions/accounting.action'
import { RootState } from '@/store/store'
import { queueStatusOptions } from '@/utils/constant'
import { formatDate, formatValue } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'

// Import the BookingDetailsData type
type BookingDetailsData = {
  _id: string
  txId: string
  sector: string
  jType: string
  paxNames: string[]
  numberOfPax: number
  amount: number
  ssrAmount: number | null
  insuranceAmount: number | null
  pgCharges: number | null
  carrier: string
  company: string
  department: string | null
  gdsPnr: string
  aPnr: string
  jDate: string
  bookStatus: string
  erpReference: string | null
  bookedById: string
  bookingType: string | null
  supplier: string
  supplierName: string
  bookingChannel: string | null
  domint: string | null
  isPassThrough: boolean
  originalRequest: {
    bookingId: string
    paymentInfos: { amount: number }[]
    travellerInfo: {
      ti: string
      fN: string
      lN: string
      pt: string
    }[]
    gstInfo: any
    deliveryInfo: {
      emails: string[]
      contacts: string[]
    }
  }
  response: {
    bookingId: string
    status: {
      success: boolean
      httpStatus: number
    }
  }
  txDateTime: string
  createdAt: string
  updatedAt: string
  __v: number
  bookingDetails: any
}

export default function CancellationQueuesList() {
  const dispatch = useDispatch()
  const [selectedQueueStatus, setSelectedQueueStatus] = useState<string>('')
  const { bookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  const couponColumns: PremiumTableColumn<BookingDetailsData>[] = [
    {
      header: 'Request Date',
      accessorKey: 'bookingDetails',
      cell: ({ row }) => {
        return (
          <div>
            {formatDate(row?.original?.bookingDetails?.order?.createdOn)}
          </div>
        )
      },
    },
    { header: 'Tx.ID', accessorKey: 'txId' },
    { header: 'Reference Id', accessorKey: 'referenceId' },
    {
      header: 'Inv Amount',
      accessorKey: 'invAmount',
      cell: ({ row }) => {
        return <div>{formatValue(row?.original?.amount)}</div>
      },
    },
    { header: 'Sector', accessorKey: 'sector' },
    {
      header: 'Onward JDate',
      accessorKey: 'onwardDate',
      cell: ({ row }) => {
        return (
          <div>
            {formatDate(
              row?.original?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]
                ?.dt
            )}
          </div>
        )
      },
    },
    {
      header: 'Return JDate',
      accessorKey: 'returnDate',
      cell: ({ row }) => {
        return (
          <div>
            {formatDate(
              row?.original?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]
                ?.at
            )}
          </div>
        )
      },
    },
    { header: 'Pax Names', accessorKey: 'paxNames' },
    {
      header: 'Airline pnr',
      accessorKey: 'airlinePnr',
      cell: ({ row }) => {
        return (
          <div>
            {
              row?.original?.bookingDetails?.itemInfos?.AIR?.travellerInfos?.[0]
                ?.pnrDetails?.[row?.original?.sector]
            }
          </div>
        )
      },
    },
    { header: 'Gds pnr', accessorKey: 'gdsPnr' },
    { header: 'Ticket Number', accessorKey: 'ticketNumber' },
    { header: 'Status', accessorKey: 'bookStatus' },
    { header: 'Is Void', accessorKey: 'isVoid' },
    { header: 'Supplier Name', accessorKey: 'supplier' },
    { header: 'Raised By', accessorKey: 'raisedBy' },
    { header: 'Is Recall', accessorKey: 'isRecall' },
    { header: 'Customer', accessorKey: 'customer' },
    { header: 'Blocked By', accessorKey: 'bookedById' },
    { header: 'Branch Name', accessorKey: 'branchName' },
  ]

  useEffect(() => {
    // Only call API if a queue status is selected
    if (selectedQueueStatus) {
      // Get current date for API parameters
      const currentDate = new Date().toISOString().split('T')[0]

      // Pass the selected queue status as type parameter and current date as fromDate and toDate
      dispatch(
        getBookingDetailsData({
          fromDate: currentDate,
          toDate: currentDate,
          type: selectedQueueStatus,
        })
      )
    }
  }, [selectedQueueStatus, dispatch])

  // Track when data has been loaded
  useEffect(() => {
    if (bookingDetailsData && !loading) {
    }
  }, [bookingDetailsData, loading])

  // Reset data when queue status is cleared
  useEffect(() => {
    if (!selectedQueueStatus) {
    }
  }, [selectedQueueStatus])

  const handleQueueStatusChange = (e: {
    value?: string | boolean
    label?: string
  }) => {
    if (e.value) {
      setSelectedQueueStatus(e.value as string)
    } else {
      // Clear selection and data
      setSelectedQueueStatus('')
    }
  }

  return (
    <AdminCard heading={translation?.CANCELLATION_QUEUES}>
      <PremiumDataTable
        data={bookingDetailsData || []}
        columns={couponColumns}
        loading={loading}
        enablePagination
        footer={
          <>
            <Box className="flex justify-content-between items-center mb-3">
              <Box className="flex items-center gap-2 m-0">
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button"
                  text="PDF"
                />
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button"
                  text="Excel"
                />
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button"
                  text="Copy"
                />
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button !important"
                  text="Print"
                />
              </Box>
              <SelectInputField
                placeholder="Select Queue"
                label="Select Queue Status"
                wrapperClass="w-80"
                value={selectedQueueStatus}
                firstInputBox
                options={queueStatusOptions}
                onChange={handleQueueStatusChange}
              />
            </Box>

            {/* <Box className="flex justify-content-between">
            <Box className="flex items-center flex-wrap gap-2">
              <ThemeButton
                className="cta-button tertiary-button-focused justify-end"
                text="PDF"
                key={`table-fillter`}
                variant="secondary"
              />
            </Box>

            <div className="gp-8 table-fillter-container flex items-center">
              <ThemeButton
                variant="primary"
                className="cta-button"
                text={translation?.SEARCH}
              />
              <SelectInputField
                placeholder="Select Queue"
                label="Select Queue Status"
                value={''}
                options={queueStatusOptions}
                onChange={function (e: {
                  value?: string | boolean
                  label?: string
                }): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </div>
          </Box> */}
          </>
        }
      />
    </AdminCard>
  )
}
