import { getUserListApi } from '@/store/apis'
import {
  PaginationProps,
  UserBEData,
} from '@/types/module/adminModules/userModule'
import { ACCESS_TOKEN } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export const useGetAllUserList = ({ data }: { data: PaginationProps }) => {
  const token = Cookies.get(ACCESS_TOKEN)
  const {
    data: userList,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['userList', data],
    queryFn: () => getUserListApi(data),
    enabled: !!token && token !== 'undefined' && token !== 'null',
    retry: false,
  })

  return {
    userList: userList?.data?.data as unknown as UserBEData,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  }
}
