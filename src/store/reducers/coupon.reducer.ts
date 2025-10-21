import { FetchCouponDataProps } from '@/types/module/adminModules/couponModule'
import { Markup } from '@/types/module/adminModules/markupModule'
import { CouponActionTypes } from '@/types/store/action/coupon.action'
import { CouponReducerData } from '@/types/store/reducers/coupon.reducer'
import {
  ADD_COUPON_DETAILS,
  ADD_MARKUP_DETAILS,
  GET_COUPON_DETAILS,
  GET_COUPON_DETAILS_FAILURE,
  GET_COUPON_DETAILS_SUCCESS,
  GET_MARKUP_DETAILS,
  GET_MARKUP_DETAILS_SUCCESS,
} from '../../utils/storeTypes'

const initialState: CouponReducerData = {
  loading: false,
  error: null,
  getCouponDetailsData: null,
  getMarkupDetailsData: null,
}

export const couponReducer = (
  state = initialState,
  action: CouponActionTypes
): CouponReducerData => {
  switch (action.type) {
    case ADD_COUPON_DETAILS:
      return { ...state, loading: true, error: null }
    case GET_COUPON_DETAILS:
      return { ...state, loading: true, error: null }
    case GET_COUPON_DETAILS_SUCCESS:
      if ('payload' in action && (action?.payload as FetchCouponDataProps[])) {
        return {
          ...state,
          loading: false,
          getCouponDetailsData: action?.payload as FetchCouponDataProps[],
          error: null,
        }
      }
      return state
    case ADD_MARKUP_DETAILS:
      return { ...state, loading: true, error: null }
    case GET_MARKUP_DETAILS:
      return { ...state, loading: true, error: null }
    case GET_MARKUP_DETAILS_SUCCESS:
      if ('payload' in action && (action?.payload as Markup[])) {
        return {
          ...state,
          loading: false,
          getMarkupDetailsData: action?.payload as Markup[],
          error: null,
        }
      }
      return state
    case GET_COUPON_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
