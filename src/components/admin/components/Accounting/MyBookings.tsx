'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import DateInputField from '@/components/shared/TextInputField/DateInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { useGetBookingsMutation } from '@/hooks/useMutations'
import { GetMyBookingsFlightBookingDetails, MyBookingsFilterValues } from '@/types/module/adminModules/myBookingModule'
import { myBookingTypeOptions } from '@/utils/constant'
import { formatDate, formatValue, formatDateDDMMYYYY } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useState } from 'react'
import { Box } from 'theme-ui'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'


const MyBookings = () => {
  const { mutate: getMyBookingsMutation, isPending, data: getMyBookingsData } = useGetBookingsMutation({ url: 'my-bookings' })
  const [filterValues, setFilterValues] = useState<MyBookingsFilterValues>({
    selectType: null,
    fromDate: '',
    toDate: '',
    pageNumber: 1,
    numberOfRows: 100,
  })
  const [validationErrors, setValidationErrors] = useState<{
    selectType?: string
    fromDate?: string
  }>({})

  const ledgerColumns: PremiumTableColumn<GetMyBookingsFlightBookingDetails>[] = [
    {
      header: 'Sr',
      accessorKey: 'sr',
      cell: ({ row }) => row.index + 1,
    },
    { header: 'TxID', accessorKey: 'TxID' },
    // { title: 'Select', dataIndex: 'select', key: 'select' }, // ADD To LAST
    {
      header: 'Booking Date ',
      accessorKey: 'BookingDate',
      cell: ({ row }) => <div>{formatDateDDMMYYYY(row.original?.BookingDate)}</div>,
    },
    {
      header: 'Dept',
      accessorKey: 'Dept',
      cell: ({ row }) => <div>{formatDateDDMMYYYY(row.original?.JDate)}</div>,
    },

    {
      header: 'JDate',
      accessorKey: 'JDate',
      cell: ({ row }) => <div>{formatDateDDMMYYYY(row.original?.JDate)}</div>,
    },
    {
      header: 'InvAmt',
      accessorKey: 'InvAmt',
      cell: ({ row }) => {
        return <div>{formatValue(row.original?.InvAmt)}</div>
      },
    },
    {
      header: 'FQ',
      accessorKey: 'FQ',
      cell: ({ row }) => {
        return <div>{formatValue(row.original?.FQ)}</div>
      },
    },
    {
      header: 'Comm',
      id: 'commission',
      accessorKey: 'company',
      cell: ({ row }) => {
        return <div>{row.original?.Comm}</div>
      },
    },
    { header: 'Booked By Id', accessorKey: 'BookedById' },
    { header: 'Booked By Name', accessorKey: 'BookedByName' },
    // { title: 'Booked By Name', dataIndex: 'bookedByName', key: 'bookedByName' },
    {
      header: 'Lead Pax Name',
      accessorKey: 'LeadPaxName',
      cell: ({ row }) => {
        return <div>{row.original?.LeadPaxName}</div>
      },
    },
    {
      header: 'Carrier',
      accessorKey: 'Carrier',
    },
    {
      header: 'Origin - Dstn',
      accessorKey: 'Origin - Dstn'
    },
    { header: 'PNR', accessorKey: 'PNR' },
    { header: 'Status', accessorKey: 'Status' },
    { header: 'Agent', accessorKey: 'Agent' },
  ]

  const handleSearch = () => {
    // Clear previous validation errors
    setValidationErrors({})
    
    // Validate Select Type
    if (!filterValues.selectType || !filterValues.selectType[0]) {
      setValidationErrors(prev => ({
        ...prev,
        selectType: 'Select Type is required'
      }))
    }
    
    // Validate From Date
    if (!filterValues.fromDate || filterValues.fromDate.trim() === '') {
      setValidationErrors(prev => ({
        ...prev,
        fromDate: 'From Date is required'
      }))
    }
    
    // If there are validation errors, don't proceed
    if ((!filterValues.selectType || !filterValues.selectType[0]) || 
        (!filterValues.fromDate || filterValues.fromDate.trim() === '')) {
      return
    }

    getMyBookingsMutation({
      selectType: filterValues?.selectType?.[0]?.value,
      fromDate: filterValues.fromDate,
      toDate: filterValues.toDate,
      pageNumber: filterValues.pageNumber,
      numberOfRows: filterValues.numberOfRows,
    })
  }


  return (
    <AdminCard heading={translation.MY_BOOKINGS}>
      <PremiumDataTable
        data={getMyBookingsData?.data?.data?.flightBookings || []}
        columns={ledgerColumns}
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
              <SelectInputField
                placeholder="Select Type"
                value={filterValues.selectType?.[0]?.label || ''}
                onChange={(selectedOption) => {
                  setFilterValues({
                    ...filterValues, selectType: [{
                      value: selectedOption?.value as 'flightBookings' | 'flightCancellations' | 'flightReschedules',
                      label: selectedOption?.label as string
                    }]
                  })
                  // Clear validation error when user selects an option
                  if (validationErrors.selectType) {
                    setValidationErrors(prev => ({ ...prev, selectType: undefined }))
                  }
                }}
                label="Select Type"
                firstInputBox
                options={myBookingTypeOptions}
                errors={validationErrors.selectType}
                isShowRequired
              />

              <DateInputField
                placeholder="From Date"
                value={filterValues.fromDate as string}
                onChange={(value) => { 
                  setFilterValues({ ...filterValues, fromDate: value })
                  // Clear validation error when user selects a date
                  if (validationErrors.fromDate) {
                    setValidationErrors(prev => ({ ...prev, fromDate: undefined }))
                  }
                }}
                label="From Date"
                format="DD/MM/YYYY"
                errors={validationErrors.fromDate}
                required
                isShowRequired
              />

              <DateInputField
                placeholder="To Date"
                value={filterValues.toDate as string}
                onChange={(value) => { setFilterValues({ ...filterValues, toDate: value }) }}
                label="To Date"
                format="DD/MM/YYYY"
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '100%',
                  gridColumn: 'auto',
                  gap: '20px',
                }}
              >
                <ThemeButton
                  wrapperClassName="flex item-center"
                  onClick={handleSearch}
                  sx={{ width: '200px' }}
                  text="Get Report"
                  isLoading={isPending}
                />
              </Box>
            </Box>
          </>
        }
      />
    </AdminCard>
  )
}

export default MyBookings
