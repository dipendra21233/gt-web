'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { getBookingDetailsData } from '@/store/actions/accounting.action'
import { RootState } from '@/store/store'
import { BookingDetailsData } from '@/types/module/adminModules/myBookingModule'
import { formatDate } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionDropdown, ActionMenuItem } from '../../core/Table/ActionDropDown'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'


const getActionItems = (): ActionMenuItem[] => [
  {
    key: 'reject',
    label: 'Reject',
  },
  {
    key: 'reschedule_queue',
    label: 'Reschedule',
  },
]
export default function RescheduleQueuesList() {
  const dispatch = useDispatch()
  const { bookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  useEffect(() => {
    dispatch(getBookingDetailsData())
  }, [dispatch])

  const couponColumns: PremiumTableColumn<BookingDetailsData>[] = [
    { header: 'Txid', accessorKey: 'txId' },
    {
      header: 'TxDate',
      accessorKey: 'txDateTime',
      cell: ({ row }) => {
        return <div>{formatDate(row?.original?.txDateTime)}</div>
      },
    },
    {
      header: 'Resc OW Date',
      accessorKey: 'bookingDetails.order.rescRtDate',
      cell: ({ row }) => {
        return (
          <div>
            {formatDate(row?.original?.bookingDetails?.order?.createdOn)}
          </div>
        )
      },
    },
    {
      header: 'Resc RT Date',
      accessorKey: 'bookingDetails.order.rescRtDate',
      cell: ({ row }) => {
        return (
          <div>
            {formatDate(row?.original?.bookingDetails?.order?.createdOn)}
          </div>
        )
      },
    },
    { header: 'Agentid', accessorKey: 'bookedById' },
    {
      header: 'Referencetxid',
      accessorKey: 'bookingDetails.order.referenceTxId',
      cell: ({ row }) => {
        return <div>{row?.original?.bookingDetails?.order?.bookingId}</div>
      },
    },
    {
      header: 'Ticket No.',
      accessorKey: 'bookingDetails.order.ticketNumber',
      cell: ({ row }) => {
        return <div>{row?.original?.bookingDetails?.order?.bookingId}</div>
      },
    },
    {
      header: 'Pax Name',
      accessorKey: 'bookingDetails.order.paxNames',
      cell: ({ row }) => {
        return <div>{row?.original?.paxNames?.join(', ')}</div>
      },
    },
    { header: 'PNR', accessorKey: 'bookingDetails.order.gdsPnr' },
    {
      header: 'Onward Date',
      accessorKey: 'bookingDetails.order.onwardDate',
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
      header: 'Return Date',
      accessorKey: 'bookingDetails.order.returnDate',
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
    {
      header: 'Remarks',
      accessorKey: 'bookingDetails.order.remarks',
      cell: ({ row }) => {
        return <div>{row?.original?.bookingDetails?.order?.status}</div>
      },
    },
    {
      header: 'Contact Name',
      accessorKey: 'bookingDetails.order.paxNames',
      cell: ({ row }) => {
        return (
          <div>
            {row?.original?.bookingDetails?.order?.deliveryInfo
              ?.contacts?.[0] ?? '-'}
          </div>
        )
      },
    },
    {
      header: 'Contact Number',
      accessorKey: 'bookingDetails.order.contactNumber',
      cell: ({ row }) => {
        return (
          <div>
            {row?.original?.bookingDetails?.order?.deliveryInfo
              ?.contacts?.[0] ?? '-'}
          </div>
        )
      },
    },
    { header: 'Status', accessorKey: 'bookingDetails.order.bookStatus' },
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
  return (
    <AdminCard heading={translation?.RESCHEDULE_QUEUES}>
      <PremiumDataTable
        data={bookingDetailsData || []}
        columns={couponColumns}
        loading={loading}
        enablePagination
      />
    </AdminCard>
  )
}
