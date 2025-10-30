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
  setNexusFlightSearchRequestApi,
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

export function useSequentialFlightSearchMutation() {
  const flightSearchMutation = useFlightSearchRequestMutation()
  const nexusFlightSearchMutation = useNexusFlightSearchRequestMutation()

  const mutateSequentially = async (payload: SearchQueryPayload): Promise<any> => {
    try {
      // First API call with full payload (including searchModifiers)
      const firstResponse = await flightSearchMutation.mutateAsync(payload)
      
      // Transform Nexus response to match FlightSearchResult type
      const transformNexusResponse = (nexusData: any) => {
        if (!nexusData?.data?.searchResult?.tripInfos) return []
        
        return nexusData.data.searchResult.tripInfos.map((trip: any) => ({
          segments: [{
            flightCode: trip.flightCode,
            airlineName: trip.airlineName,
            airlineCode: trip.flightCode.substring(0, 2), // Extract airline code from flight code
            from: trip.from,
            fromCity: trip.from, // You might want to map this to actual city names
            fromTerminal: '',
            to: trip.to,
            toCity: trip.to, // You might want to map this to actual city names
            toTerminal: '',
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            duration: trip.duration ? parseInt(trip.duration.replace(/[^\d]/g, '')) : 0, // Convert duration to minutes
            stops: 0, // Default to 0 stops, you might want to calculate this
          }],
          fares: [{
            fareIdentifier: `${trip.flightCode}_${trip.from}_${trip.to}`,
            totalFare: trip.price,
            baseFare: Math.round(trip.price * 0.8), // Estimate base fare as 80% of total
            taxes: Math.round(trip.price * 0.2), // Estimate taxes as 20% of total
            baggage: {
              checkIn: '15kg',
              cabin: '7kg'
            },
            cabinClass: 'ECONOMY',
            fareBasis: 'Y',
            meal: 'Not Included',
            benefit: null,
            consentMsg: null,
            refundType: 'Non-Refundable',
            bookingCode: 'Y',
            priceID: `${trip.flightCode}_${Date.now()}`
          }]
        }))
      }

      // Create Nexus-specific payload without searchModifiers
      const nexusPayload: SearchQueryPayload = {
        searchQuery: {
          cabinClass: payload.searchQuery.cabinClass,
          paxInfo: payload.searchQuery.paxInfo,
          routeInfos: payload.searchQuery.routeInfos
          // Note: searchModifiers are excluded for Nexus API
        }
      }

      // Second API call with Nexus-specific payload
      const secondResponse = await nexusFlightSearchMutation.mutateAsync(nexusPayload)
      
      // Transform and combine results
      const transformedNexusResults = transformNexusResponse(secondResponse)
      const combinedResults = [
        ...(firstResponse?.data || []),
        ...transformedNexusResults
      ]

      // Store combined results in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('flightSearchResults', JSON.stringify(combinedResults))
      }

      return {
        ...firstResponse,
        data: combinedResults,
        nexusData: secondResponse
      }
    } catch (error) {
      // If first API fails, throw the error
      if (error === flightSearchMutation.error) {
        throw error
      }
      // If second API fails, still return first response but log the error
      console.error('Nexus API failed:', error)
      return flightSearchMutation.data
    }
  }

  return {
    mutate: mutateSequentially,
    isPending: flightSearchMutation.isPending || nexusFlightSearchMutation.isPending,
    error: flightSearchMutation.error || nexusFlightSearchMutation.error,
    data: flightSearchMutation.data
  }
}
export function useNexusFlightSearchRequestMutation() {
  return useMutation({
    mutationKey: ['NexusFlightSearchRequest'],
    mutationFn: async (payload: SearchQueryPayload) => {
      return setNexusFlightSearchRequestApi(payload)
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
