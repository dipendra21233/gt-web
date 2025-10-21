'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { useCouponData } from '@/queries/useCouponModule'
import { FetchCouponDetailsDataProps } from '@/types/module/adminModules/couponModule'
import { formatValue } from '@/utils/functions'
import { appRoutes } from '@/utils/routes'
import { IoMdAdd } from 'react-icons/io'
import { ActionDropdown, ActionMenuItem } from '../../core/Table/ActionDropDown'
import PremiumDataTable, {
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'


const getActionItems = (): ActionMenuItem[] => [
  {
    key: 'details',
    label: 'Edit',
  },
  {
    key: 'showTicket',
    label: 'Delete',
  },
]
export default function CouponList() {
  const {
    couponData: getCouponDetailsData,
    isLoading,
    isFetching,
  } = useCouponData()
  const couponColumns: PremiumTableColumn<FetchCouponDetailsDataProps>[] = [
    {
      header: 'CouponId',
      accessorKey: '_id',
      cell: (info) => (
        <div className="text-decoration-unset user-link-primary cursor-pointer hover:text-blue-500">
          {String(info.getValue() ?? '')}
        </div>
      ),
      width: 220,
    },
    { header: 'JDate', accessorKey: 'startJourneyDate', width: 160 },
    { header: 'Carrier', accessorKey: 'carrier', width: 140 },
    { header: 'FlightNo', accessorKey: 'flightNumber', width: 140 },
    { header: 'Deptime', accessorKey: 'depTime', width: 140 },
    { header: 'Arrtime', accessorKey: 'arrTime', width: 140 },
    {
      header: 'From - To',
      id: 'route',
      cell: ({ row }) => `${row.original.origin} - ${row.original.destination}`,
      width: 200,
    },
    {
      header: 'TotalSeats',
      accessorKey: 'availableSeats',
      id: 'totalSeats',
      cell: ({ row }) => (
        <div>{row.original.availableSeats || 'N/A'}</div>
      ),
      width: 140,
    },
    {
      header: 'AvailSeats',
      accessorKey: 'availableSeats',
      id: 'availSeats',
      cell: ({ row }) => (
        <div>{row.original.availableSeats || 'N/A'}</div>
      ),
      width: 140,
    },
    { header: 'A Tax', accessorKey: 'adultTax', width: 140 },
    { header: 'C Tax', accessorKey: 'childTax', width: 140 },
    { header: 'I Tax', accessorKey: 'infantTax', width: 140 },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
      cell: ({ row }) => (
        <div>{formatValue(row.original.totalAmount as number)}</div>
      ),
      width: 160,
    },
    { header: 'Type', accessorKey: 'classType', width: 140 },
    {
      header: 'EndDate',
      id: 'endDate',
      cell: ({ row }) => <div>{row.original?.couponSectors?.[0]?.arrTime}</div>,
      width: 160,
    },
    { header: 'Status', accessorKey: 'status', width: 120 },
    {
      header: 'DayWise Avail',
      id: 'dayWiseAvailability',
      cell: () => null,
      width: 160,
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

  return (
    <AdminCard
      heading="Coupons"
      actionButtonConfig={{
        variant: 'darkSlate',
        text: 'Add coupon',
        icon: <IoMdAdd color="white" size={24} />,
        href: appRoutes?.addCoupon,
      }}
    >
      <PremiumDataTable
        data={getCouponDetailsData || []}
        columns={couponColumns}
        loading={isLoading || isFetching}
        enablePagination
      />
    </AdminCard>
  )
}
