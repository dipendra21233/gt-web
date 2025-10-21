import { getCouponDetailsDataApi } from '@/store/apis'
import {
  FetchCouponDetailsDataProps,
  GetAllCouponDetailsDataProps,
} from '@/types/module/adminModules/couponModule'
import { useQuery } from '@tanstack/react-query'

export const useCouponData = (data?: GetAllCouponDetailsDataProps) => {
  const {
    data: couponData,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['couponData'],
    queryFn: () => getCouponDetailsDataApi(data),
    retry: false,
  })

  return {
    couponData: couponData?.data?.data as FetchCouponDetailsDataProps[],
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  }
}
