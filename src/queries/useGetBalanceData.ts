import { getBalanceDataApi } from '@/store/apis'
import { Balance } from '@/types/module/adminModules/balanceModule'
import { ACCESS_TOKEN } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useAuthData } from './useAuthData'

export const useGetBalanceData = () => {
  const { authUser } = useAuthData()
  const token = Cookies.get(ACCESS_TOKEN)
  const {
    data: balanceData,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['balanceData', authUser?._id],
    queryFn: () => getBalanceDataApi({ userId: authUser?._id }),
    enabled:
      !!token &&
      token !== 'undefined' &&
      token !== 'null' &&
      authUser?._id !== undefined,
    retry: false,
  })

  return {
    balanceData: balanceData?.data?.data as unknown as Balance,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  }
}
