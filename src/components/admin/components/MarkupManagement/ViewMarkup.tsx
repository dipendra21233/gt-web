'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { getMarkupDetails } from '@/store/actions/coupon.action'
import { RootState } from '@/store/store'
import { Markup } from '@/types/module/adminModules/markupModule'
import { translation } from '@/utils/translation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

const ViewMarkup = () => {
  const dispatch = useDispatch()
  const { getMarkupDetailsData, loading } = useSelector(
    (state: RootState) => state.couponData
  )

  const columns: PremiumTableColumn<Markup>[] = [
    {
      header: 'Sr',
      accessorKey: 'sr',
      cell: ({ row }) => row.index + 1,
    },
    { header: 'Markup ID', accessorKey: 'markupId' },
    { header: 'Added By', accessorKey: 'createdBy' },
    {
      header: 'Carrier',
      accessorKey: 'carrier',
    },
    {
      header: 'Service Type',
      accessorKey: 'category',
    },
    { header: 'Flat', accessorKey: 'flat' },
    {
      header: 'Markup',
      accessorKey: 'markup',
    },
    {
      id: 'yq',
      header: 'YQ',
      accessorKey: 'yq',
      cell: ({ row }) => {
        return (
          <div>
            {row.original?.airlineType === 'Percentage'
              ? `${row.original?.markup}%`
              : `${row.original?.flat}`}
          </div>
        )
      },
    },
    {
      id: 'tax',
      header: 'Tax',
      accessorKey: 'tax',
      cell: ({ row }) => {
        return (
          <div>
            {row.original?.airlineType === 'Percentage'
              ? `${row.original?.markup}%`
              : `${row.original?.flat}`}
          </div>
        )
      },
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

  useEffect(() => {
    dispatch(getMarkupDetails())
  }, [dispatch])

  return (
    <AdminCard heading={translation?.MARKUP_LIST}>
      {/* <TablePageComponent
          heading={translation?.MARKUP_LIST}
          columns={columns}
          dataSource={getMarkupDetailsData || []}
          actionButtonConfig={{
            text: translation?.ADD_MARKUP,
            sx: { background: '#0047AB' },
            icon: <IoMdAdd color="white" size={24} />,
            href: appRoutes?.addMarkup,
          }}
          loading={loading}
          pageSize={10}
          hasPagination={true}
          onChange={(page) => {
            setCurrentPage(page)
          }}
        /> */}
      <PremiumDataTable
        data={getMarkupDetailsData || []}
        columns={columns}
        loading={loading}
        enablePagination
      />
    </AdminCard>
  )
}

export default ViewMarkup
