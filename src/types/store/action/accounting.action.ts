import { BookingDetailsDataProps } from '@/types/module/adminModules/bookingDetailsModule'
import { BookingDetailsData } from '@/types/module/adminModules/myBookingModule'
import { StringType } from './common.actions'

export interface GetBookingDetailsDataAction {
  type: string
  payload: {
    fromDate: string
    toDate: string
    type: string
  }
}

export interface GetBookingDetailsDataSuccessAction {
  type: string
  payload: BookingDetailsData[]
  callBack: (res: boolean) => void
}

export interface GetMyBookingDetailsDataAction {
  type: string
  payload: {
    bookingId: string
  }
}

export interface GetMyBookingDetailsDataSuccessAction {
  type: string
  payload: BookingDetailsDataProps
  callBack: (res: boolean) => void
}

export type AccountingActionTypes =
  | StringType
  | GetBookingDetailsDataSuccessAction
  | GetMyBookingDetailsDataSuccessAction
