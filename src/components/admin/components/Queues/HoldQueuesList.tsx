'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { RootState } from '@/store/store'
import { BookingDetailsData } from '@/types/module/adminModules/myBookingModule'
import { queueStatusOptions } from '@/utils/constant'
import { formatDate, formatValue } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'

export default function HoldQueuesList() {
  const { bookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  const couponColumns: PremiumTableColumn<BookingDetailsData>[] = [
    { header: 'Request Date', accessorKey: 'requestDate' },
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
      accessorKey: 'dept',
      cell: ({ row }) => {
        return (
          <div>
            {row?.original?.jDate !== null
              ? formatDate(row?.original?.jDate)
              : '-'}
          </div>
        )
      },
    },
    {
      header: 'Return JDate',
      accessorKey: 'jDate',
      cell: ({ row }) => {
        return (
          <div>
            {row?.original?.jDate !== null
              ? formatDate(row?.original?.jDate)
              : '-'}
          </div>
        )
      },
    },
    { header: 'Pax Names', accessorKey: 'paxNames' },
    { header: 'Airline pnr', accessorKey: 'airlinePnr' },
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
  return (
    <AdminCard heading={translation?.HOLD_QUEUES}>
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
                value={''}
                firstInputBox
                options={queueStatusOptions}
                onChange={() => {}}
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
