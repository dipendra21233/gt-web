'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import DateInputField from '@/components/shared/TextInputField/DateInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { useGetBookingsMutation } from '@/hooks/useMutations'
import { MyBookingsFilterValues } from '@/types/module/adminModules/myBookingModule'
import { FlightTransactionData } from '@/types/module/adminModules/transactionModule'
import { myBookingTypeOptions } from '@/utils/constant'
import { formatDate, formatValue, renderWithFallback } from '@/utils/functions'
import { translation } from '@/utils/translation'
import {
  BarChart3,
  Calendar,
  ClipboardList,
  DollarSign,
  Edit,
  FileCheck,
  FileText,
  Link,
  Receipt,
  Send,
  Settings,
  ShoppingCart,
  Upload,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { Box } from 'theme-ui'
import { ActionDropdown, ActionMenuItem } from '../../core/Table/ActionDropDown'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'

const TransactionList = () => {
  const { mutate: getTransactionsMutation, isPending, data: getTransactionsData } = useGetBookingsMutation({ url: 'transactions' })
  const [filterValues, setFilterValues] = useState<MyBookingsFilterValues>({
    selectType: null,
    fromDate: '',
    toDate: '',
    pageNumber: 1,
    numberOfRows: 10,
  })

  const getActionItems = (): ActionMenuItem[] => [
    {
      key: 'ticket',
      label: 'Ticket',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      key: 'orderDetails',
      label: 'Order Details',
      icon: <ClipboardList className="h-4 w-4" />,
    },
    {
      key: 'invoice',
      label: 'Invoice',
      icon: <Receipt className="h-4 w-4" />,
      separator: true,
    },
    {
      key: 'getIndent',
      label: 'Get Indent',
      icon: <FileCheck className="h-4 w-4" />,
    },
    {
      key: 'cancel',
      label: 'Cancel',
      icon: <XCircle className="h-4 w-4" />,
      variant: 'danger',
      separator: true,
    },
    {
      key: 'update',
      label: 'Update',
      icon: <Edit className="h-4 w-4" />,
    },
    {
      key: 'log',
      label: 'Log',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      key: 'updatePurchase',
      label: 'Update Purchase',
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      key: 'reschedule',
      label: 'Reschedule',
      icon: <Calendar className="h-4 w-4" />,
      separator: true,
    },
    {
      key: 'supplierPaymentStatus',
      label: 'Supplier Payment Status',
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      key: 'uploadDocs',
      label: 'Upload Docs',
      icon: <Upload className="h-4 w-4" />,
    },
    {
      key: 'updateErpRef',
      label: 'Update Erp.Ref',
      icon: <Link className="h-4 w-4" />,
    },
    {
      key: 'updateMiscDetails',
      label: 'Update Misc Details',
      icon: <Settings className="h-4 w-4" />,
      separator: true,
    },
    {
      key: 'billingModule',
      label: 'Billing Module',
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      key: 'pushToAccountingSystem',
      label: 'Push to Accounting System',
      icon: <Send className="h-4 w-4" />,
    },
  ]

  const handleAction = (key: string, row: FlightTransactionData) => {
    console.log(`Action ${key} triggered for transaction:`, row)
    switch (key) {
      case 'ticket':
        break
      case 'cancel':
        break
      default:
        console.log(`Unhandled action: ${key}`)
    }
  }

  const columns: PremiumTableColumn<FlightTransactionData>[] = [
    {
      header: 'TxDate',
      accessorKey: 'Transaction Date',
      cell: ({ row }) => renderWithFallback(row.original['Transaction Date']),
    },
    {
      id: 'txId',
      accessorKey: 'Tx Id',
    },
    {
      id: 'sector',
      header: 'Sector',
      accessorKey: 'Sector',
      cell: ({ row }) => renderWithFallback(row.original.Sector),
    },
    {
      id: 'jType',
      header: 'JType',
      accessorKey: 'JType',
      cell: ({ row }) => renderWithFallback(row.original.JType),
    },
    {
      id: 'paxNames',
      header: 'PaxName',
      accessorKey: 'Pax Name',
      cell: ({ row }) => renderWithFallback(row.original['Pax Name']),
    },
    {
      id: 'numberOfPax',
      header: 'No. Pax',
      accessorKey: 'Numbers of passengers',
      cell: ({ row }) => renderWithFallback(row.original['Numbers of passengers'], 'number'),
    },
    {
      id: 'ssrAmount',
      header: 'SSR Amount',
      accessorKey: 'SSR Amount',
      cell: ({ row }) =>
        renderWithFallback(
          formatValue(row.original['SSR Amount'] as number),
          'number'
        ),
    },
    {
      id: 'insuranceAmount',
      header: 'Insurance Amount',
      accessorKey: 'Insurance Amount',
      cell: ({ row }) =>
        renderWithFallback(
          formatValue(row.original['Insurance Amount'] as number),
          'number'
        ),
    },
    {
      id: 'pgCharges',
      header: 'Pg Charges',
      accessorKey: 'PG Charges',
      cell: ({ row }) =>
        renderWithFallback(
          formatValue(row.original['PG Charges'] as number),
          'number'
        ),
    },
    {
      id: 'carrier',
      header: 'Carrier',
      accessorKey: 'Carrier',
      cell: ({ row }) => renderWithFallback(row.original.Carrier),
    },
    {
      id: 'company',
      header: 'Company',
      accessorKey: 'Company',
      cell: ({ row }) => renderWithFallback(row.original.Company),
    },
    {
      id: 'gdsPnr',
      header: 'GdsPnr',
      accessorKey: 'GDS PNR',
      cell: ({ row }) => {
        const pnrValue = row.original['GDS PNR']
        return <div>{renderWithFallback(pnrValue)}</div>
      },
    },
    {
      id: 'aPnr',
      header: 'APnr',
      accessorKey: 'aPnr',
      cell: ({ row }) => {
        const pnrValue = row.original['APNR']
        return <div>{renderWithFallback(pnrValue)}</div>
      },
    },
    {
      id: 'bookedById',
      header: 'BookedById',
      accessorKey: 'BookedById',
      cell: ({ row }) => renderWithFallback(row.original.BookedById),
    },
    {
      id: 'jDate',
      header: 'JDate',
      accessorKey: 'JDate',
      cell: ({ row }) => <div>{formatDate(row.original.JDate)}</div>,
    },
    {
      id: 'bookStatus',
      header: 'Book.Status',
      accessorKey: 'Book.Status',
      cell: ({ row }) => renderWithFallback(row.original['Book.Status']),
    },
    {
      id: 'erpReference',
      header: 'Erp.Ref',
      accessorKey: 'Erp.Ref',
      cell: ({ row }) => renderWithFallback(row.original['Erp.Ref']),
    },
    {
      id: 'supplier',
      header: 'Supplier',
      accessorKey: 'Supplier',
      cell: ({ row }) => renderWithFallback(row.original.Supplier),
    },
    {
      id: 'supplierName',
      header: 'Supplier Name',
      accessorKey: 'Supplier Name',
      cell: ({ row }) => renderWithFallback(row.original['Supplier Name']),
    },
    {
      id: 'bookingChannel',
      header: 'Booking Channel',
      accessorKey: 'Booking Channel',
      cell: ({ row }) => renderWithFallback(row.original['Booking Channel']),
    },
    {
      id: 'domint',
      header: 'Domint',
      accessorKey: 'domint',
      cell: ({ row }) => {
        const isDomestic =
          row.original.Domint === 'Domestic' ||
          row.original.Domint === 'International'
        return <div>{isDomestic ? 'Domestic' : 'International'}</div>
      },
    },
    {
      id: 'isPassthrough',
      header: 'IsPassthrough',
      accessorKey: 'IsPassThrough',
      cell: ({ row }) => <div>{row.original.IsPassThrough ? 'Yes' : 'No'}</div>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ActionDropdown
          items={getActionItems()}
          onAction={(key) => handleAction(key, row.original)}
        />
      ),
    },
  ]

  const handleSearch = () => {
    getTransactionsMutation({
      selectType: filterValues?.selectType?.[0]?.value,
      fromDate: filterValues.fromDate,
      toDate: filterValues.toDate,
      pageNumber: filterValues.pageNumber,
      numberOfRows: filterValues.numberOfRows,
    })
  }

  return (
    <AdminCard heading={translation.TRANSACTION_LIST}>
      <PremiumDataTable
        data={getTransactionsData?.data?.data || []}
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
              <SelectInputField
                placeholder="Select Type"
                value={filterValues.selectType?.[0]?.label || ''}
                onChange={(selectedOption) =>
                  setFilterValues({
                    ...filterValues,
                    selectType: [
                      {
                        value: selectedOption?.value as
                          | 'flightBookings'
                          | 'flightCancellations',
                        label: selectedOption?.label as string,
                      },
                    ],
                  })
                }
                label="Select Type"
                firstInputBox
                options={myBookingTypeOptions}
              />

              <DateInputField
                placeholder="From Date"
                value={filterValues?.fromDate as string}
                onChange={(value) => {
                  setFilterValues({ ...filterValues, fromDate: value })
                }}
                label="From Date"
              />

              <DateInputField
                placeholder="To Date"
                value={filterValues?.toDate as string}
                onChange={(value) => {
                  setFilterValues({ ...filterValues, toDate: value })
                }}
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

export default TransactionList
