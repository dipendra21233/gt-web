import { FetchCouponDataProps } from '@/types/module/adminModules/couponModule'
import { Markup } from '@/types/module/adminModules/markupModule'

export interface CouponReducerData {
  loading: boolean
  error: Error | null
  getCouponDetailsData: FetchCouponDataProps[] | null
  getMarkupDetailsData: Markup[] | null
}
