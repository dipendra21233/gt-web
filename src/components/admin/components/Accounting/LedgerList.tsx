'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import DateInputField from '@/components/shared/TextInputField/DateInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { useGetBookingsMutation } from '@/hooks/useMutations'
import { MyBookingsFilterValues, TransactionData } from '@/types/module/adminModules/myBookingModule'
import { useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { Box } from 'theme-ui'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'

const ledgerColumns: PremiumTableColumn<TransactionData>[] = [
  { header: 'Date', accessorKey: 'Date' },
  { header: 'Type', accessorKey: 'Type' },
  { header: 'TxReference', accessorKey: 'txReference' },
  { header: 'Debit', accessorKey: 'debit' },
  { header: 'Credit', accessorKey: 'credit' },
  {
    header: 'Balance',
    accessorKey: 'balance',
    cell: ({ row }) => <div>{row.original?.balance?.toLocaleString()}</div>,
  },
  { header: 'PaxName', accessorKey: 'paxName' },
  { header: 'Invoice Number', accessorKey: 'invoiceNumber' },
  {
    header: 'Reference Number',
    accessorKey: 'referenceNumber',
  },
]

const LedgerList = () => {
  const { mutate: getLedgerMutation, isPending, data: getLedgerData } = useGetBookingsMutation({ url: 'ledger' })
  const [filterValues, setFilterValues] = useState<MyBookingsFilterValues>({
    pageNumber: 1,
    numberOfRows: 10,

  })



  const handleSearch = () => {
    getLedgerMutation({
      pageNumber: filterValues.pageNumber,
      numberOfRows: filterValues.numberOfRows,
      fromDate: filterValues.fromDate,
      toDate: filterValues.toDate,
    })
  }

  return (
    <AdminCard heading="Ledger">
      <PremiumDataTable
        data={getLedgerData?.data?.data || []}
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
              <DateInputField
                placeholder="From Date"
                value={filterValues?.fromDate || ''}
                onChange={(value) => setFilterValues({ ...filterValues, fromDate: value })}
                label="From Date"
              />

              <DateInputField
                placeholder="To Date"
                value={filterValues?.toDate || ''}
                onChange={(value) => setFilterValues({ ...filterValues, toDate: value })}
                label="To Date"
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
                <ThemeButton onClick={handleSearch} text="Search" isLoading={isPending} />
                <ThemeButton
                  wrapperClassName="flex item-center"
                  sx={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #1e293b',
                  }}
                  onClick={handleSearch}
                  text="Export to CSV"
                  icon={<LuDownload size={20} color="white" />}
                />
              </Box>
            </Box>
          </>
        }
      />
    </AdminCard>
  )
}

export default LedgerList
