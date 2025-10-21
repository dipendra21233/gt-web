'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import DateInputField from '@/components/shared/TextInputField/DateInputField'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { getMysBookingDetailsData } from '@/store/actions/accounting.action'
import { RootState } from '@/store/store'
import { BookingDetailsDataProps } from '@/types/module/adminModules/bookingDetailsModule'
import { BookingTypeOptions, ITEMS_PER_PAGE } from '@/utils/constant'
import { formatDate } from '@/utils/functions'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import { ActionDropdown, ActionMenuItem } from '../../core/Table/ActionDropDown'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'

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
  const dispatch = useDispatch()
  const [currentPage] = useState<number>(1)
  const [filterValues, setFilterValues] = useState({
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
  })

  const { myssBookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  const myBookingDetailsDataArray = myssBookingDetailsData
    ? [myssBookingDetailsData]
    : []

  const columns: PremiumTableColumn<BookingDetailsDataProps>[] = [
    {
      header: 'Sr',
      accessorKey: 'sr',
      cell: ({ row }) => (currentPage - 1) * ITEMS_PER_PAGE + row.index + 1,
    },
    {
      header: 'Tx.ID',
      accessorKey: 'txId',
      cell: ({ row }) => <div>{row.original?.order?.bookingId}</div>,
    },
    {
      header: 'Sector',
      accessorKey: 'sector',
      cell: ({ row }) => (
        <div>
          {row.original?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.da?.code} -{' '}
          {row.original?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.aa?.code}
        </div>
      ),
    },
    {
      header: 'Booking Date',
      accessorKey: 'bookingDate',
      cell: ({ row }) => (
        <div>{formatDate(row.original?.order?.createdOn)}</div>
      ),
    },
    {
      header: 'Passenger Name',
      accessorKey: 'leadPaxName',
      cell: ({ row }) => {
        const traveller = row.original?.itemInfos?.AIR?.travellerInfos[0]
        const passengerName = `${traveller?.ti} ${traveller?.fN} ${traveller?.lN}`
        return <div>{passengerName}</div>
      },
    },
    {
      header: 'GDSPNR',
      accessorKey: 'gdsPnr',
      cell: ({ row }) => (
        <div>{row.original?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.fD?.fN}</div>
      ),
    },
    {
      header: 'AirlinePnr',
      accessorKey: 'aPnr',
      cell: ({ row }) => (
        <div>{row.original?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.fD?.fN}</div>
      ),
    },
    {
      header: 'BookingStatus',
      accessorKey: 'bookingStatus',
      cell: ({ row }) => <div>{row.original?.order?.status}</div>,
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
  }

  const handleSearch = () => {
    dispatch(
      getMysBookingDetailsData({
        bookingId: filterValues?.transactionId,
      })
    )
  }

  return (
    <AdminCard heading="Booking Management">
      <PremiumDataTable
        data={myBookingDetailsDataArray || []}
        columns={columns}
        loading={loading}
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
                firstInputBox
                name="transactionId"
                value={filterValues?.transactionId}
                onChange={(value) => handleInputChange('transactionId', value)}
                label="Transaction ID"
              />

              <SelectInputField
                placeholder="Booking Type"
                firstInputBox
                label="Booking Type"
                value={filterValues?.bookingStatus}
                classNames={{
                  container: () => 'w-full',
                  control: () => 'w-full',
                }}
                onChange={(value) =>
                  handleInputChange('bookingStatus', value?.value as string)
                }
                options={BookingTypeOptions}
                labelSx={{ display: 'block', textAlign: 'start' }}
              />

              <DateInputField
                placeholder="Booking Date"
                value={filterValues?.bookingDate}
                onChange={(value) => handleInputChange('bookingDate', value)}
                label="Booking Date"
              />

              <DateInputField
                placeholder="Journey Date"
                value={filterValues?.journeyDate}
                onChange={(value) => handleInputChange('journeyDate', value)}
                label="Journey Date"
              />

              <TextInputField
                firstInputBox
                placeholder="Ticket Numbers"
                name="ticketNumbers"
                value={filterValues?.ticketNumbers}
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
                  // justifyContent: 'flex-end',
                  height: '100%',
                  gridColumn: 'auto',
                }}
              >
                <ThemeButton onClick={handleSearch} text="Search" />
              </Box>
            </Box>
          </>
        }
      />
    </AdminCard>
  )
}

export default BookingManageMentList
