import { showErrorToast } from '@/components/web/core/Toast/CustomToast'
import {
  addCouponDetailsApi,
  addMarkupDetailsApi,
  forgotPasswordApi,
  getBookingsDataApi,
  getReviewFlightDetailsApi,
  initiateDepositApi,
  loginApi,
  resendOtpApi,
  setFlightSearchRequestApi,
  updateFlightBookingApi,
  updatePaymentStatusApi,
  verifyOtpApi,
} from '@/store/apis'
import { MyBookingsRequestData } from '@/types/module/adminModules/myBookingModule'
import { CouponDetails } from '@/types/module/adminModules/couponModule'
import { Markup } from '@/types/module/adminModules/markupModule'
import {
  ForgotPasswordPrpops,
  LoginPrpops,
  VerifyOtpPrpops,
} from '@/types/module/authModule'
import {
  AxiosErrorResponse,
  TransactionResponse,
} from '@/types/module/commonModule'
import { FlightBookingPayload } from '@/types/module/flightBooking'
import { SearchQueryPayload } from '@/types/module/flightSearch'
import { UploadBalanceDataProps } from '@/types/module/paymentMethods'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useInitiateDepositMutation() {
  return useMutation({
    mutationKey: ['InitiateDeposit'],
    mutationFn: async (payload: UploadBalanceDataProps) => {
      return initiateDepositApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: ['Login'],
    mutationFn: async (payload: LoginPrpops) => {
      return loginApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}
export function useVerifyOtpMutation() {
  return useMutation({
    mutationKey: ['VerifyOtp'],
    mutationFn: async (payload: VerifyOtpPrpops) => {
      return verifyOtpApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}
export function useResendOtpMutation() {
  return useMutation({
    mutationKey: ['ResendOtp'],
    mutationFn: async (payload: VerifyOtpPrpops) => {
      return resendOtpApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}
export function useUpdatePaymentStatusMutation() {
  return useMutation({
    mutationKey: ['UpdatePaymentStatus'],
    mutationFn: async (payload: TransactionResponse) => {
      return updatePaymentStatusApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}
export function useFlightSearchRequestMutation() {
  return useMutation({
    mutationKey: ['FlightSearchRequest'],
    mutationFn: async (payload: SearchQueryPayload) => {
      return setFlightSearchRequestApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}
export function useGetBookingsMutation<T = MyBookingsRequestData>({ url }: { url: string }) {
  return useMutation({
    mutationKey: ['GetBookings', url],
    mutationFn: async (payload: T) => {
      return getBookingsDataApi(payload as any, url)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: ['ForgotPassword'],
    mutationFn: async (payload: ForgotPasswordPrpops) => {
      return forgotPasswordApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}

export function useFlightBookingApiMutation() {
  return useMutation({
    mutationKey: ['UpdateFlightBooking'],
    mutationFn: async (payload: FlightBookingPayload) => {
      return updateFlightBookingApi(payload)
    },
    onSuccess: (data) => {
      if (data?.data?.bookingId) {
        window.location.href = data?.data?.redirectUrl
      }
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}

export function useGetReviewFlightDetailsMutation() {
  return useMutation({
    mutationKey: ['GetReviewFlightDetails'],
    mutationFn: async (payload: string[]) => {
      return getReviewFlightDetailsApi({
        priceIds: payload,
      })
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}

export function useAddCouponDetailsMutation() {
  return useMutation({
    mutationKey: ['AddCouponDetails'],
    mutationFn: async (payload: CouponDetails) => {
      return addCouponDetailsApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}

export function useAddMarkupDetailsMutation() {
  return useMutation({
    mutationKey: ['AddMarkupDetails'],
    mutationFn: async (payload: Markup) => {
      return addMarkupDetailsApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}
