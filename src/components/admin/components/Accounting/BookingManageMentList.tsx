'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import DateInputField from '@/components/shared/TextInputField/DateInputField'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { BookingDetailsDataProps } from '@/types/module/adminModules/bookingDetailsModule'
import { BookingManagementRequestData, MyBookingsFilterValues } from '@/types/module/adminModules/myBookingModule'
import { BookingTypeOptions, ITEMS_PER_PAGE, myBookingTypeOptions } from '@/utils/constant'
import { formatDate } from '@/utils/functions'
import { useState } from 'react'
import { Box } from 'theme-ui'
import { ActionDropdown, ActionMenuItem } from '../../core/Table/ActionDropDown'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'
import { useGetBookingsMutation } from '@/hooks/useMutations'

const getActionItems = (): ActionMenuItem[] => [
  {
    key: 'details',
    label: 'Details',
  },
  {
    key: 'showTicket',
    label: 'Show Tickets',
  },
  {
    key: 'cancel',
    label: 'Cancel',
    separator: true,
  },
  {
    key: 'reschedule',
    label: 'Reschedule',
  },
]


const BookingManageMentList = () => {
  const { mutate: getBookingManagementMutation, isPending, data: getBookingManagementData } = useGetBookingsMutation<BookingManagementRequestData>({ url: 'manage' })
  const [filterValues, setFilterValues] = useState<MyBookingsFilterValues>({
    pageNumber: 1,
    numberOfRows: 10,
    transactionId: '',
    sector: '',
    bookingDate: '',
    passengerName: '',
    gdsPnr: '',
    airlinePnr: '',
    bookingStatus: '',
    paxInfo: '',
    journeyDate: '',
    ticketNumbers: '',
    selectType: null,
  })
  const [validationErrors, setValidationErrors] = useState<{
    transactionId?: string
  }>({})
 console.log('check57',[getBookingManagementData?.data?.data]);
 
  const columns: PremiumTableColumn<any>[] = [
    {
      header: 'Booking ID',
      accessorKey: 'Booking ID',
      cell: ({ row }) => <div>{row.original?.['Booking ID']}</div>,
    },
    {
      header: 'Tx.ID',
      accessorKey: 'Tx.ID',
      cell: ({ row }) => <div>{row.original?.['Tx.ID']}</div>,
    },
    {
      header: 'Sector',
      accessorKey: 'Sector',
      cell: ({ row }) => <div>{row.original?.Sector}</div>,
    },
    {
      header: 'Booking Date',
      accessorKey: 'Booking Date',
      cell: ({ row }) => <div>{row.original?.['Booking Date']}</div>,
    },
    {
      header: 'Passenger Name',
      accessorKey: 'Passenger Name',
      cell: ({ row }) => <div>{row.original?.['Passenger Name']}</div>,
    },
    {
      header: 'Total Amount',
      accessorKey: 'Total Amount',
      cell: ({ row }) => <div>{row.original?.['Total Amount']?.toLocaleString()}</div>,
    },
    {
      header: 'GDSPNR',
      accessorKey: 'GDSPNR',
      cell: ({ row }) => <div>{row.original?.GDSPNR}</div>,
    },
    {
      header: 'AirlinePnr',
      accessorKey: 'AirlinePnr',
      cell: ({ row }) => <div>{row.original?.AirlinePnr}</div>,
    },
    {
      header: 'BookingStatus',
      accessorKey: 'BookingStatus',
      cell: ({ row }) => <div>{row.original?.BookingStatus}</div>,
    },
    {
      header: 'Select',
      accessorKey: 'Select',
      cell: ({ row }) => <div>{row.original?.Select}</div>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <ActionDropdown
          items={getActionItems()}
        />
      ),
    },
  ]

  const handleInputChange = (name: string, value: string) => {
    setFilterValues({ ...filterValues, [name]: value })
    
    // Clear validation error when user starts typing
    if (name === 'transactionId' && validationErrors.transactionId) {
      setValidationErrors({ ...validationErrors, transactionId: undefined })
    }
  }

  const handleSearch = () => {
    // Clear previous validation errors
    setValidationErrors({})
    
    // Validate Transaction ID
    if (!filterValues.transactionId || filterValues.transactionId.trim() === '') {
      setValidationErrors({
        transactionId: 'Transaction ID is required'
      })
      return
    }

    getBookingManagementMutation({
      pageNumber: filterValues.pageNumber,
      numberOfRows: filterValues.numberOfRows,
      transactionId: filterValues.transactionId,
      sector: filterValues.sector,
      bookingDate: filterValues.bookingDate,
      journeyDate: filterValues.journeyDate,
      passengerName: filterValues.passengerName,
      gdsPnr: filterValues.gdsPnr,
      airlinePnr: filterValues.airlinePnr,
      bookingStatus: filterValues.bookingStatus,
      paxInfo: filterValues.paxInfo,
      ticketNumbers: filterValues.ticketNumbers,
    })
  }

  return (
    <AdminCard heading="Booking Management">
      <PremiumDataTable
        data={(() => {
          const responseData = getBookingManagementData?.data?.data;
          if (!responseData) return [];
          return Array.isArray(responseData) ? responseData : [responseData];
        })()}
        columns={columns}
        loading={isPending}
        enablePagination
        footer={
          <>  
            <Box
              className="grid gap-4 pb-4"
              sx={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                display: 'grid',
              }}
            >
              <TextInputField
                placeholder="Enter Txid"
                errors={validationErrors.transactionId}
                firstInputBox
                name="transactionId"
                value={filterValues?.transactionId}
                onChange={(value) => handleInputChange('transactionId', value)}
                label="Transaction ID"
                required
                isShowRequired
              />


              <DateInputField
                placeholder="Booking Date"
                value={filterValues?.bookingDate || ''}
                onChange={(value) => handleInputChange('bookingDate', value)}
                label="Booking Date"
              />

              <DateInputField
                placeholder="Journey Date"
                value={filterValues?.journeyDate || ''}
                onChange={(value) => handleInputChange('journeyDate', value)}
                label="Journey Date"
              />

              <TextInputField
                firstInputBox
                placeholder="Ticket Numbers"
                name="ticketNumbers"
                value={filterValues?.ticketNumbers || ''}
                onChange={(value) => handleInputChange('ticketNumbers', value)}
                label="Ticket Numbers"
              />

              <TextInputField
                placeholder="GdsPnr"
                firstInputBox
                name="gdsPnr"
                value={filterValues?.gdsPnr}
                onChange={(value) => handleInputChange('gdsPnr', value)}
                label="GdsPnr"
              />

              <TextInputField
                placeholder="Airline Pnr"
                name="airlinePnr"
                firstInputBox
                value={filterValues?.airlinePnr}
                onChange={(value) => handleInputChange('airlinePnr', value)}
                label="Airline Pnr"
              />

              <TextInputField
                placeholder="Pax Info"
                name="paxInfo"
                firstInputBox
                value={filterValues?.paxInfo}
                onChange={(value) => handleInputChange('paxInfo', value)}
                label="Pax Info"
              />

              <TextInputField
                placeholder="Passenger Name"
                name="passengerName"
                firstInputBox
                value={filterValues?.passengerName}
                onChange={(value) => handleInputChange('passengerName', value)}
                label="Passenger Name"
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '100%',
                  gridColumn: 'auto',
                }}
              >
                <ThemeButton onClick={handleSearch} text="Search" isLoading={isPending} />
              </Box>
            </Box>
          </>
        }
      />
    </AdminCard>
  )
}

export default BookingManageMentList
