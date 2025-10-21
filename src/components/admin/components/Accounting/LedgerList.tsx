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
  const [validationErrors, setValidationErrors] = useState<{
    fromDate?: string
  }>({})



  const handleSearch = () => {
    // Clear previous validation errors
    setValidationErrors({})
    
    // Validate From Date
    if (!filterValues.fromDate || filterValues.fromDate.trim() === '') {
      setValidationErrors({
        fromDate: 'From Date is required'
      })
      return
    }

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
                onChange={(value) => { 
                  setFilterValues({ ...filterValues, fromDate: value })
                  // Clear validation error when user selects a date
                  if (validationErrors.fromDate) {
                    setValidationErrors({ fromDate: undefined })
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
                value={filterValues?.toDate || ''}
                onChange={(value) => setFilterValues({ ...filterValues, toDate: value })}
                label="To Date"
                format="DD/MM/YYYY"
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gridColumn: 'auto',
                  justifyContent: 'center',
                  gap: '20px',
                  height: '100%',
                }}
              >
                <ThemeButton onClick={handleSearch} text="Search" isLoading={isPending} />
                <ThemeButton
                  wrapperClassName="flex item-center"
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
