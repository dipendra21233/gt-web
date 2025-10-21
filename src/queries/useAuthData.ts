import { getCurrentUserDataApi } from '@/store/apis'
import { UserData } from '@/types/module/adminModules/userModule'
import { ACCESS_TOKEN } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export const useAuthData = () => {
  const token = Cookies.get(ACCESS_TOKEN)
  const {
    data: authUser,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => getCurrentUserDataApi(),
    enabled: !!token && token !== 'undefined' && token !== 'null',
    retry: false,
  })

  return {
    authUser: authUser?.data?.data as unknown as UserData,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  }
}
