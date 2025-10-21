'use client'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { useGetAllUserList } from '@/queries/useCommonAdminData'
import { UserData } from '@/types/module/adminModules/userModule'
import { UserListFillterData } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Box } from 'theme-ui'
import type {
  PremiumDataTableProps,
  PremiumTableColumn,
} from '../../core/Table/PremiumDataTable'
const PremiumDataTable = dynamic(
  () => import('../../core/Table/PremiumDataTable').then((m) => m.default),
  { ssr: false }
) as <TData extends object>(props: PremiumDataTableProps<TData>) => JSX.Element

export default function UserListing() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initialize state from URL parameters
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('currentpage') || '1'))
  const [currentUserStatus, setCurrentUserStatus] = useState<string>(searchParams.get('userstatus') || 'all')
  const [queryValue, setQueryValue] = useState<string>(searchParams.get('search') || '')
  const [debouncedQueryValue, setDebouncedQueryValue] = useState<string>(searchParams.get('search') || '')

  const itemsPerPage = 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQueryValue(queryValue)
    }, 500) // 500ms debounce delay

    return () => clearTimeout(timer)
  }, [queryValue])

  const queryParams = useMemo(() => ({
    pageNo: currentPage,
    userStatus: currentUserStatus === 'all' ? undefined : currentUserStatus,
    queryParameter: debouncedQueryValue || undefined
  }), [currentPage, currentUserStatus, debouncedQueryValue])

  const { userList, isFetching } = useGetAllUserList({ data: queryParams })

  // Optimize URL updates - debounce to prevent excessive router calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams()

      if (currentPage > 1) params.set('currentpage', currentPage.toString())
      if (currentUserStatus !== 'all') params.set('userstatus', currentUserStatus)
      if (debouncedQueryValue) params.set('search', debouncedQueryValue)

      const queryString = params.toString()
      const newUrl = queryString ? `?${queryString}` : window.location.pathname

      router.replace(newUrl, { scroll: false })
    }, 300) // Debounce URL updates

    return () => clearTimeout(timeoutId)
  }, [currentPage, currentUserStatus, debouncedQueryValue, router])


  const userListColumns: PremiumTableColumn<UserData>[] = [
    {
      header: 'Sr',
      accessorKey: 'sr',
      cell: ({ row }) => (currentPage - 1) * itemsPerPage + row.index + 1,
    },
    {
      header: 'Name',
      accessorKey: 'firstName',
      cell: ({ row }) => (
        <div
          className="text-decoration-unset user-link-primary cursor-pointer hover:text-blue-500"
          onClick={() => router.replace(`${appRoutes?.userRequests}/${row.original._id}`)}
        >
          {`${row.original.firstName} ${row.original.lastName}`}
        </div>
      ),
    },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Phone Number', accessorKey: 'mobileNumber' },
    {
      header: 'City',
      accessorKey: 'address.city',
    },
    { header: 'Register As', accessorKey: 'registerAs' },
  ]

  const handleFilterChange = (value: string) => {
    setQueryValue(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (status: string) => {
    setCurrentPage(1)
    setCurrentUserStatus(status)
  }


  return (
    <AdminCard heading="Users">
      <PremiumDataTable
        data={userList?.users || []}
        columns={userListColumns}
        loading={isFetching}
        enablePagination
        footer={
          <>
            <Box
              className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
              sx={{
                position: 'relative',
                zIndex: 1,
                px: ['16px', '20px', '24px'],
                pb: '14px',
              }}
            >
              <Box className="flex-1">
                <Box className="flex items-center flex-wrap gap-2">
                  {UserListFillterData?.map((itm, idx) => (
                    <ThemeButton
                      key={`table-filter-${idx}`}
                      className="status-filter-btn"
                      text={itm?.label}
                      sx={{
                        backgroundColor:
                          currentUserStatus === itm?.key ? '#1e293b' : 'white',
                        border:
                          currentUserStatus === itm?.key
                            ? '1px solid #1e293b'
                            : '1px solid #e2e8f0',
                        height: '38px',
                        borderRadius: '20px',
                        px: '16px',
                        fontSize: '13px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        minWidth: '80px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease-in-out',
                        boxShadow:
                          currentUserStatus === itm?.key
                            ? '0 2px 8px rgba(30, 41, 59, 0.15), 0 1px 3px rgba(30, 41, 59, 0.1)'
                            : '0 1px 3px rgba(0, 0, 0, 0.05)',
                        '&:hover': {
                          backgroundColor:
                            currentUserStatus === itm?.key
                              ? '#334155'
                              : '#f8fafc',
                          borderColor:
                            currentUserStatus === itm?.key
                              ? '#334155'
                              : '#cbd5e1',
                          transform: 'translateY(-1px)',
                          boxShadow:
                            currentUserStatus === itm?.key
                              ? '0 4px 12px rgba(30, 41, 59, 0.2), 0 2px 6px rgba(30, 41, 59, 0.15)'
                              : '0 3px 8px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.06)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background:
                            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                      }}
                      textSx={{
                        fontSize: '13px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        color:
                          currentUserStatus === itm?.key ? 'white' : '#475569',
                      }}
                      onClick={() => handleStatusFilterChange(itm?.key)}
                      variant="secondary"
                    />
                  ))}
                </Box>
              </Box>

              <TextInputField
                firstInputBox
                value={queryValue}
                onChange={handleFilterChange}
                placeholder="Search users..."
                inputWidth="100%"
              />
            </Box>
          </>
        }
      />
    </AdminCard>
  )
}
