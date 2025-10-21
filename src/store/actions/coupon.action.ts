import {
  CouponDetails,
  FetchCouponDataProps,
} from '@/types/module/adminModules/couponModule'
import { Markup } from '@/types/module/adminModules/markupModule'
import {
  ADD_COUPON_DETAILS,
  ADD_MARKUP_DETAILS,
  ADD_MARKUP_DETAILS_SUCCESS,
  GET_COUPON_DETAILS,
  GET_COUPON_DETAILS_FAILURE,
  GET_COUPON_DETAILS_SUCCESS,
  GET_MARKUP_DETAILS,
  GET_MARKUP_DETAILS_FAILURE,
  GET_MARKUP_DETAILS_SUCCESS,
} from '@/utils/storeTypes'

export const addCouponDetails = (
  data: CouponDetails,
  callBack: (res: boolean) => void
) => {
  return {
    type: ADD_COUPON_DETAILS,
    payload: data,
    callBack,
  }
}

export const getCouponDetails = (data?: {
  page: number
  limit: number
  search: string
  sort: string
}) => {
  return {
    type: GET_COUPON_DETAILS,
    payload: data,
  }
}

export const getCouponDetailsSuccess = (data: FetchCouponDataProps[]) => ({
  type: GET_COUPON_DETAILS_SUCCESS,
  payload: data,
})

export const getCouponDetailsFailureAction = (error: any) => ({
  type: GET_COUPON_DETAILS_FAILURE,
  payload: error,
})

export const addMarkupDetails = (
  data: Markup,
  callBack: (res: boolean) => void
) => {
  return {
    type: ADD_MARKUP_DETAILS,
    payload: data,
    callBack,
  }
}

export const addMarkupDetailsSuccess = (data: Markup) => {
  return {
    type: ADD_MARKUP_DETAILS_SUCCESS,
    payload: data,
  }
}

export const getMarkupDetails = () => {
  return {
    type: GET_MARKUP_DETAILS,
  }
}

export const getMarkupDetailsSuccess = (data: Markup[]) => ({
  type: GET_MARKUP_DETAILS_SUCCESS,
  payload: data,
})

export const getMarkupDetailsFailureAction = (error: any) => ({
  type: GET_MARKUP_DETAILS_FAILURE,
  payload: error,
})
