import { BookingDetailsDataProps } from '@/types/module/adminModules/bookingDetailsModule'
import { BookingDetailsData } from '@/types/module/adminModules/myBookingModule'
import {
  GET_BOOKING_DETAILS_DATA,
  GET_BOOKING_DETAILS_DATA_SUCCESS,
  GET_MY_BOOKING_DETAILS_DATA,
  GET_MY_BOOKING_DETAILS_DATA_SUCCESS,
  GET_MYS_BOOKING_DETAILS_DATA,
  GET_MYS_BOOKING_DETAILS_DATA_SUCCESS,
} from '@/utils/storeTypes'

export const getBookingDetailsData = (data?: {
  fromDate: string
  toDate: string
  type: string
}) => {
  return {
    type: GET_BOOKING_DETAILS_DATA,
    payload: data,
  }
}

export const getBookingDetailsDataSuccess = (data: BookingDetailsData[]) => ({
  type: GET_BOOKING_DETAILS_DATA_SUCCESS,
  payload: data,
})

export const getMyBookingDetailsData = (data?: { bookingId: string }) => {
  return {
    type: GET_MY_BOOKING_DETAILS_DATA,
    payload: data,
  }
}

export const getMyBookingDetailsDataSuccess = (
  data: BookingDetailsDataProps
) => ({
  type: GET_MY_BOOKING_DETAILS_DATA_SUCCESS,
  payload: data,
})

export const getMysBookingDetailsData = (data?: { bookingId: string }) => {
  return {
    type: GET_MYS_BOOKING_DETAILS_DATA,
    payload: data,
  }
}

export const getMysBookingDetailsDataSuccess = (
  data: BookingDetailsDataProps
) => ({
  type: GET_MYS_BOOKING_DETAILS_DATA_SUCCESS,
  payload: data,
})
