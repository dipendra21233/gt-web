import { BookingDetailsDataProps } from '@/types/module/adminModules/bookingDetailsModule'
import { BookingDetailsData } from '@/types/module/adminModules/myBookingModule'
import { AccountingActionTypes } from '@/types/store/action/accounting.action'
import { AccountingReducerData } from '@/types/store/reducers/accounting.reducer'
import {
  GET_BOOKING_DETAILS_DATA,
  GET_BOOKING_DETAILS_DATA_SUCCESS,
  GET_MY_BOOKING_DETAILS_DATA,
  GET_MY_BOOKING_DETAILS_DATA_SUCCESS,
  GET_MYS_BOOKING_DETAILS_DATA,
  GET_MYS_BOOKING_DETAILS_DATA_SUCCESS,
} from '../../utils/storeTypes'

const initialState: AccountingReducerData = {
  loading: false,
  error: null,
  bookingDetailsData: null,
  myssBookingDetailsData: null,
  myBookingDetailsData: null,
}

export const accountingReducer = (
  state = initialState,
  action: AccountingActionTypes
): AccountingReducerData => {
  switch (action.type) {
    case GET_BOOKING_DETAILS_DATA:
      return { ...state, loading: true, error: null, bookingDetailsData: null }
    case GET_BOOKING_DETAILS_DATA_SUCCESS:
      if ('payload' in action && (action.payload as BookingDetailsData[])) {
        return {
          ...state,
          loading: false,
          bookingDetailsData: action?.payload as BookingDetailsData[],
          error: null,
        }
      }
      return state

    case GET_MYS_BOOKING_DETAILS_DATA:
      return { ...state, loading: true, error: null }
    case GET_MYS_BOOKING_DETAILS_DATA_SUCCESS:
      if ('payload' in action && (action.payload as BookingDetailsDataProps)) {
        return {
          ...state,
          loading: false,
          myssBookingDetailsData: action?.payload as BookingDetailsDataProps,
          error: null,
        }
      }
      return state

    case GET_MY_BOOKING_DETAILS_DATA:
      return { ...state, loading: true, error: null }
    case GET_MY_BOOKING_DETAILS_DATA_SUCCESS:
      if ('payload' in action && (action?.payload as BookingDetailsDataProps)) {
        return {
          ...state,
          loading: false,
          myBookingDetailsData: action?.payload as BookingDetailsDataProps,
          error: null,
        }
      }
      return state
    default:
      return state
  }
}
