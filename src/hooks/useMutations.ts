import { showErrorToast } from '@/components/web/core/Toast/CustomToast'
import {
  addCouponDetailsApi,
  addMarkupDetailsApi,
  forgotPasswordApi,
  getBookingsDataApi,
  getPassengerFareSummaryNexusApi,
  getPaxCalendarDataApi,
  getItineraryDataApi,
  getReviewFlightDetailsApi,
  initiateDepositApi,
  loginApi,
  resendOtpApi,
  setAiriqFlightSearchRequestApi,
  setFlightSearchRequestApi,
  setNexusFlightSearchRequestApi,
  updateFlightBookingAiriqApi,
  updateFlightBookingApi,
  updateFlightBookingNexusApi,
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
import { attachSupplierToLocalResults, transformNexusResponseToLocalFormat, transformAiriqResponseToLocalFormat } from '@/serializer/flightSearch.serializer'
import { AxiosError } from 'axios'
import { FlightPriceRequest } from '@/types/module/fareSummarModule'
import { clearFlightSearchResults } from '@/utils/functions'

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
    const allResults: any[] = []
    const supplierResults: Record<string, any> = {}
    
    try {
      // Step 1: First API call with full payload (including searchModifiers)
      const firstResponse = await flightSearchMutation.mutateAsync(payload)
      
      // Extract supplier from the first API response
      const extractSupplierFromResponse = (responseData: any): 'TRIPJACK' | 'NEXUS' => {
        try {
          // Handle array of flight items
          if (Array.isArray(responseData)) {
            for (const item of responseData) {
              if (item?.segments && Array.isArray(item.segments) && item.segments.length > 0) {
                const supplier = item.segments[0]?.supplier
                if (supplier === 'TRIPJACK' || supplier === 'NEXUS') {
                  return supplier
                }
              }
            }
          }
          // Handle single object with segments array
          else if (responseData?.segments && Array.isArray(responseData.segments) && responseData.segments.length > 0) {
            const supplier = responseData.segments[0]?.supplier
            if (supplier === 'TRIPJACK' || supplier === 'NEXUS') {
              return supplier
            }
          }
          // Handle nested data structure (e.g., responseData.data)
          else if (responseData?.data) {
            if (Array.isArray(responseData.data) && responseData.data.length > 0) {
              const firstItem = responseData.data[0]
              if (firstItem?.segments && Array.isArray(firstItem.segments) && firstItem.segments.length > 0) {
                const supplier = firstItem.segments[0]?.supplier
                if (supplier === 'TRIPJACK' || supplier === 'NEXUS') {
                  return supplier
                }
              }
            } else if (responseData.data?.segments && Array.isArray(responseData.data.segments) && responseData.data.segments.length > 0) {
              const supplier = responseData.data.segments[0]?.supplier
              if (supplier === 'TRIPJACK' || supplier === 'NEXUS') {
                return supplier
              }
            }
          }
        } catch (e) {
          console.error('Error extracting supplier from response:', e)
        }
        return 'TRIPJACK' // Default fallback
      }
      
      const tripjackSupplier = extractSupplierFromResponse(firstResponse?.data)
      const tripjackResults = attachSupplierToLocalResults(firstResponse?.data, tripjackSupplier)
      allResults.push(...tripjackResults)
      supplierResults.tripjack = firstResponse

      // Step 2: Nexus API call (without searchModifiers)
      try {
        const nexusPayload: SearchQueryPayload = {
          searchQuery: {
            cabinClass: payload.searchQuery.cabinClass,
            paxInfo: payload.searchQuery.paxInfo,
            routeInfos: payload.searchQuery.routeInfos
            // Note: searchModifiers are excluded for Nexus API
          }
        }

        const nexusResponse = await nexusFlightSearchMutation.mutateAsync(nexusPayload)
        const transformedNexusResults = transformNexusResponseToLocalFormat(nexusResponse)
        allResults.push(...transformedNexusResults)
        supplierResults.nexus = nexusResponse
      } catch (nexusError) {
        console.error('Nexus API failed:', nexusError)
        // Continue with other APIs even if Nexus fails
      }

      // Step 3: AirIQ API call (with full payload including searchModifiers)
      try {
        // Call AirIQ API directly using the API function to avoid mutation's onSuccess redirect callback
        const airiqResponse = await setAiriqFlightSearchRequestApi(payload)
        console.log('AirIQ API Response:', airiqResponse?.data)
        const transformedAiriqResults = transformAiriqResponseToLocalFormat(airiqResponse)
        console.log('Transformed AirIQ Results:', transformedAiriqResults)
        allResults.push(...transformedAiriqResults)
        supplierResults.airiq = airiqResponse
      } catch (airiqError) {
        console.error('AirIQ API failed:', airiqError)
        // Continue even if AirIQ fails
      }

      // Determine primary supplier to store (prefer supplier with results)
      const supplierToStore = 
        supplierResults.airiq && allResults.some((r: any) => r?.supplier === 'AIRIQ') ? 'AIRIQ' :
        supplierResults.nexus && allResults.some((r: any) => r?.supplier === 'NEXUS') ? 'NEXUS' :
        tripjackSupplier

      // Store all combined results in localStorage
      if (typeof window !== 'undefined') {
        // Verify priceID is present in AirIQ results before storing
        const airiqResults = allResults.filter((r: any) => r?.supplier === 'AIRIQ')
        if (airiqResults.length > 0) {
          console.log('AirIQ Results to be stored:', airiqResults)
          airiqResults.forEach((result: any, index: number) => {
            if (result?.fares && Array.isArray(result.fares)) {
              result.fares.forEach((fare: any, fareIndex: number) => {
                if (!fare?.priceID) {
                  console.warn(`AirIQ Result ${index}, Fare ${fareIndex} missing priceID:`, fare)
                } else {
                  console.log(`AirIQ Result ${index}, Fare ${fareIndex} priceID:`, fare.priceID)
                }
              })
            }
          })
        }
        
        localStorage.setItem('flightSearchResults', JSON.stringify(allResults))
        localStorage.setItem('supplier', supplierToStore)
        
        // Verify storage was successful
        const stored = localStorage.getItem('flightSearchResults')
        if (stored) {
          const parsed = JSON.parse(stored)
          const storedAiriq = parsed.filter((r: any) => r?.supplier === 'AIRIQ')
          console.log('Stored AirIQ Results:', storedAiriq)
        }
      }

      return {
        ...firstResponse,
        data: allResults,
        status: firstResponse?.status || 200,
        nexusData: supplierResults.nexus,
        airiqData: supplierResults.airiq,
      }
    } catch (error) {
      // If first API fails, throw the error
      console.error('Sequential flight search error:', error)
      throw error
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
        clearFlightSearchResults();
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
export function useNexusFlightBookingApiMutation() {
  return useMutation({
    mutationKey: ['updateFlightBookingNexus'],
    mutationFn: async (payload: FlightBookingPayload) => {
      return updateFlightBookingNexusApi(payload)
    },
    onSuccess: (data) => {
      clearFlightSearchResults();
      const redirectUrl = data?.data?.data?.redirectUrl || data?.data?.redirectUrl || (data as any)?.redirectUrl;
      if (redirectUrl && typeof window !== 'undefined') {
        window.location.assign(redirectUrl);
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

export function useAiriqFlightSearchRequestMutation() {
  return useMutation({
    mutationKey: ['AiriqFlightSearchRequest'],
    mutationFn: async (payload: SearchQueryPayload) => {
      return setAiriqFlightSearchRequestApi(payload)
    },
    onSuccess: (data) => {
      clearFlightSearchResults();
      if (data?.data?.data?.redirectUrl || data?.data?.redirectUrl || (data as any)?.redirectUrl) {
        window.location.assign(data?.data?.data?.redirectUrl || data?.data?.redirectUrl || (data as any)?.redirectUrl);
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

export function useGetPassengerFareSummaryNexusMutation() {
  return useMutation({
    mutationKey: ['GetPassengerFareSummaryNexus'],
    mutationFn: async (payload: FlightPriceRequest) => {
      return getPassengerFareSummaryNexusApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}   

  export function useGetPaxCalendarDataMutation() {
  return useMutation({
    mutationKey: ['GetPaxCalendarData'],
    mutationFn: async (payload: { startDate: string, endDate: string }) => {
      return getPaxCalendarDataApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}

export function useGetItineraryDataMutation() {
  return useMutation({
    mutationKey: ['GetItineraryData'],
    mutationFn: async (payload: { bookingId: string }) => {
      return getItineraryDataApi(payload)
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response) {
        const errorMessage = error.response?.data?.message
        showErrorToast(errorMessage)
      }
    },
  })
}   