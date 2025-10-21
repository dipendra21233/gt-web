import { Balance } from '@/types/module/adminModules/balanceModule'
import {
  CouponDetails,
  GetAllCouponDetailsDataProps,
} from '@/types/module/adminModules/couponModule'
import { Markup } from '@/types/module/adminModules/markupModule'
import { MyBookingsRequestData } from '@/types/module/adminModules/myBookingModule'
import {
  EditUserDetailsBE,
  ManageUserPermissions,
  PaginationProps,
} from '@/types/module/adminModules/userModule'
import {
  BackendUserRegistration,
  ForgotPasswordPrpops,
  LoginPrpops,
  VerifyOtpPrpops,
} from '@/types/module/authModule'
import { TransactionResponse } from '@/types/module/commonModule'
import { FlightBookingPayload } from '@/types/module/flightBooking'
import { BookingDetails } from '@/types/module/flightDetails'
import { SearchQueryPayload } from '@/types/module/flightSearch'
import { UploadBalanceDataProps } from '@/types/module/paymentMethods'
import { AxiosResponse } from 'axios'
import NetworkClient from './NetworkClient'

const generateApiUrl = (path: string, params?: Record<string, string>) => {
  const url = new URL(path, process.env.NEXT_PUBLIC_API_URL)

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params)
    return `${url}?${searchParams.toString()}`
  }

  return url.toString()
}

const generateApiUrl2 = (path: string, params?: Record<string, string>) => {
  const url = new URL(path, process.env.NEXT_PUBLIC_API_URL)

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params)
    return `${url}?${searchParams.toString()}`
  }

  return url.toString()
}

export const registerUserApi = (
  data: BackendUserRegistration
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/register`,
    data
  )
}

export const loginApi = (data: LoginPrpops): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/login`,
    data
  )
}

export const verifyOtpApi = (data: VerifyOtpPrpops): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/verifyotp`,
    data
  )
}

export const resendOtpApi = (data: VerifyOtpPrpops): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/resendotp`,
    data
  )
}

export const forgotPasswordApi = (
  data: ForgotPasswordPrpops
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/forget-password`,
    data
  )
}

export const logoutUser = (accessToken: string): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/logout`,
    {
      accessToken,
    }
  )
}

export const manageUserPermissionApi = (
  data: ManageUserPermissions
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/handle-registration`,
    data
  )
}

export const editUserDetailsApi = (
  data: EditUserDetailsBE
): Promise<AxiosResponse> => {
  return NetworkClient.patch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/update-user-information`,
    data
  )
}

export const getUserListApi = (
  userData: PaginationProps
): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(userData?.userId ? { userId: userData?.userId } : {}),
    ...(userData?.queryParameter
      ? { searchQuery: userData?.queryParameter }
      : {}),
    userState: userData?.userStatus || 'all',
    pageNo: userData?.pageNo?.toString() || '1',
  }
  const apiUrl = generateApiUrl2(`/api/v1/users/requests`, queryParameters)
  return NetworkClient.get(apiUrl)
}

export const getCurrentUserDataApi = (): Promise<AxiosResponse> => {
  return NetworkClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/get-current-loggedin-user`
  )
}

export const setFlightSearchRequestApi = (
  data: SearchQueryPayload
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/flights/search`,
    data
  )
}

export const getBookingsDataApi = (
  data: MyBookingsRequestData,
  url: string
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/bookings/${url}`,
    data
  )
}
export const getTransactionsDataApi = (
  data: MyBookingsRequestData
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/bookings/transactions`,
    data
  )
}
export const getLedgerDataApi = (
  data: MyBookingsRequestData
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/bookings/ledger`,
    data
  )
}

export const addCouponDetailsApi = (
  data: CouponDetails
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/coupons/add-coupon`,
    data
  )
}

export const addMarkupDetailsApi = (data: Markup): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/markups/add`,
    data
  )
}

export const getMarkupDetailsDataApi = (): Promise<AxiosResponse> => {
  return NetworkClient.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/markups`)
}

export const getBookingDetailsDataApi = (data: {
  fromDate: string
  toDate: string
  type: string
}): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(data?.fromDate ? { fromDate: data?.fromDate } : {}),
    ...(data?.toDate ? { toDate: data?.toDate } : {}),
    ...(data?.type ? { type: data?.type } : {}),
  }
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/flights/bookings`,
    queryParameters
  )
  return NetworkClient.get(apiUrl)
}

export const getMysBookingDetailsDataApi = (data: {
  fromDate: string
  toDate: string
  type: string
}): Promise<AxiosResponse> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/user/booking-details`
  return NetworkClient.post(apiUrl, data)
}

export const getCouponDetailsDataApi = (
  data?: GetAllCouponDetailsDataProps
): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(data?.origin ? { origin: data?.origin } : {}),
    ...(data?.destination ? { destination: data?.destination } : {}),
    ...(data?.carrier ? { carrier: data?.carrier } : {}),
    ...(data?.flightNumber ? { flightNumber: data?.flightNumber } : {}),
    ...(data?.classType ? { classType: data?.classType } : {}),
  }
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/coupons/get-coupons`,
    queryParameters
  )
  return NetworkClient.get(apiUrl)
}

export const getMyBookingDetailsDataApi = (data: {
  bookingId: string
}): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(data?.bookingId ? { bookingId: data?.bookingId } : {}),
  }
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/user/booking-details`,
    queryParameters
  )
  return NetworkClient.post(apiUrl, data)
}

export const addBalanceApi = (data: Balance): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/balance/add`,
    data
  )
}

export const initiateDepositApi = (
  data: UploadBalanceDataProps
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/payment/initiate-deposit`,
    data
  )
}

export const getBalanceDataApi = (data?: {
  userId: string
}): Promise<AxiosResponse> => {
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/balance`,
    data
  )
  return NetworkClient.get(apiUrl)
}

export const getFlightFareDetailsApi = (data: {
  id: string
  flowType: string
}): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}flights/farerule`,
    data
  )
}

export const getReviewFlightDetailsApi = (data: {
  priceIds: string[]
}): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/flights/review`,
    data
  )
}

export const flightBookingApi = (
  data: BookingDetails
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}flights/booking`,
    data
  )
}

export const getPassengerFareSummaryApi = (
  data: string[]
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/flights/passenger-fare-summary`,
    { priceId: data }
  )
}

export const updatePaymentStatusApi = (
  data: TransactionResponse
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}payment/payment-statu`,
    { priceId: data }
  )
}

export const updateFlightBookingApi = (
  data: FlightBookingPayload
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/flights/confirm-flight-booking`,
    data
  )
}
