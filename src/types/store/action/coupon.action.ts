import {
  CouponDetails,
  FetchCouponDataProps,
} from '@/types/module/adminModules/couponModule'
import { Markup } from '@/types/module/adminModules/markupModule'
import { StringType } from './common.actions'

export interface AddCouponDetails {
  type: string
  payload: CouponDetails
  callBack: (res: boolean) => void
}

export interface GetCouponDetails {
  type: string
  payload: {
    page: number
    limit: number
    search: string
    sort: string
  }
}

export interface GetCouponDetailsSuccess {
  type: string
  payload: FetchCouponDataProps[]
}

export interface GetMarkupDetails {
  type: string
}

export interface GetMarkupDetailsSuccess {
  type: string
  payload: Markup[]
}

export interface AddMarkupDetails {
  type: string
  payload: Markup
  callBack: (res: boolean) => void
}

export type CouponActionTypes =
  | StringType
  | AddCouponDetails
  | AddMarkupDetails
  | GetCouponDetailsSuccess
  | GetMarkupDetailsSuccess
