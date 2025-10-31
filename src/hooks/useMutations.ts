import { showErrorToast } from '@/components/web/core/Toast/CustomToast'
import {
  addCouponDetailsApi,
  addMarkupDetailsApi,
  forgotPasswordApi,
  getBookingsDataApi,
  getPassengerFareSummaryNexusApi,
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
import { attachSupplierToLocalResults, transformNexusResponseToLocalFormat } from '@/serializer/flightSearch.serializer'
import { AxiosError } from 'axios'
import { FlightPriceRequest } from '@/types/module/fareSummarModule'

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
      
      // Transform Nexus response to match the localStorage FlightSearchResult format
      const transformNexusResponse = (nexusData: any) => {
        const normalizeIsoMinute = (iso: string | null | undefined) => {
          if (!iso || typeof iso !== 'string') return ''
          // Ensure format YYYY-MM-DDTHH:mm (strip seconds if present)
          const [datePart, timePart] = iso.split('T')
          if (!timePart) return iso
          const [hh = '', mm = ''] = timePart.split(':')
          return `${datePart}T${hh}:${mm}`
        }

        const fromSegmentsShape = (items: any[]) => {
          return items.map((item: any) => {
            const seg = Array.isArray(item?.segments) && item.segments.length > 0 ? item.segments[0] : {}
            const fares = Array.isArray(item?.fares) ? item.fares : []

            const mappedSegment = {
              flightCode: seg?.flightCode || seg?.flightNumber || '',
              airlineName: seg?.airlineName || seg?.carrierName || '',
              airlineCode: seg?.airlineCode || (seg?.flightCode ? String(seg.flightCode).slice(0, 2) : ''),
              from: seg?.from || seg?.src || '',
              fromCity: seg?.fromCity || seg?.srcCity || seg?.from || '',
              fromTerminal: seg?.fromTerminal ?? '',
              to: seg?.to || seg?.dst || '',
              toCity: seg?.toCity || seg?.dstCity || seg?.to || '',
              toTerminal: seg?.toTerminal ?? '',
              departureTime: normalizeIsoMinute(seg?.departureTime || seg?.depTime || ''),
              arrivalTime: normalizeIsoMinute(seg?.arrivalTime || seg?.arrTime || ''),
              duration: typeof seg?.duration === 'number'
                ? seg.duration
                : (typeof seg?.duration === 'string' ? parseInt(String(seg.duration).replace(/[^\d]/g, '')) || 0 : 0),
              stops: typeof seg?.stops === 'number' ? seg.stops : 0,
            }

            const mappedFares = fares.map((f: any) => ({
              fareIdentifier: f?.fareIdentifier || f?.brand || f?.brandName || '',
              totalFare: typeof f?.totalFare === 'number' ? f.totalFare : Number(f?.totalFare) || 0,
              baseFare: typeof f?.baseFare === 'number' ? f.baseFare : Number(f?.baseFare) || 0,
              taxes: typeof f?.taxes === 'number' ? f.taxes : Number(f?.taxes) || 0,
              baggage: {
                checkIn: f?.baggage?.checkIn || f?.checkInBaggage || '15 KG',
                cabin: f?.baggage?.cabin || f?.cabinBaggage || '7 KG',
              },
              cabinClass: (f?.cabinClass || f?.cabin || 'ECONOMY').toString().toUpperCase(),
              fareBasis: f?.fareBasis || f?.fareClass || '',
              meal: f?.meal || 'Paid',
              benefit: f?.benefit ?? null,
              consentMsg: f?.consentMsg ?? null,
              refundType: f?.refundType || 'Non-Refundable',
              bookingCode: f?.bookingCode || '',
              priceID: f?.priceID || f?.priceId || '',
            }))

            return {
              segments: [mappedSegment],
              fares: mappedFares,
            }
          })
        }

        try {
          // Case 1: Nexus returns an array of items with segments/fares
          if (Array.isArray(nexusData?.data)) {
            return fromSegmentsShape(nexusData.data)
          }

          // Case 2: Nexus wraps results inside data.results
          if (Array.isArray(nexusData?.data?.results)) {
            return fromSegmentsShape(nexusData.data.results)
          }

          // Case 3: Fallback to legacy searchResult.tripInfos shape
          if (Array.isArray(nexusData?.data?.searchResult?.tripInfos)) {
            return nexusData.data.searchResult.tripInfos.map((trip: any) => ({
              segments: [{
                flightCode: trip?.flightCode || '',
                airlineName: trip?.airlineName || '',
                airlineCode: trip?.airlineCode || (trip?.flightCode ? String(trip.flightCode).slice(0, 2) : ''),
                from: trip?.from || '',
                fromCity: trip?.fromCity || trip?.from || '',
                fromTerminal: trip?.fromTerminal ?? '',
                to: trip?.to || '',
                toCity: trip?.toCity || trip?.to || '',
                toTerminal: trip?.toTerminal ?? '',
                departureTime: normalizeIsoMinute(trip?.departureTime || ''),
                arrivalTime: normalizeIsoMinute(trip?.arrivalTime || ''),
                duration: typeof trip?.duration === 'number'
                  ? trip.duration
                  : (typeof trip?.duration === 'string' ? parseInt(String(trip.duration).replace(/[^\d]/g, '')) || 0 : 0),
                stops: typeof trip?.stops === 'number' ? trip.stops : 0,
              }],
              fares: [{
                fareIdentifier: `${trip?.flightCode || ''}_${trip?.from || ''}_${trip?.to || ''}`,
                totalFare: Number(trip?.price) || 0,
                baseFare: Math.round((Number(trip?.price) || 0) * 0.8),
                taxes: Math.round((Number(trip?.price) || 0) * 0.2),
                baggage: { checkIn: '15 KG', cabin: '7 KG' },
                cabinClass: 'ECONOMY',
                fareBasis: 'Y',
                meal: 'Paid',
                benefit: null,
                consentMsg: null,
                refundType: 'Non-Refundable',
                bookingCode: 'Y',
                priceID: `${trip?.flightCode || 'NEX'}_${Date.now()}`,
              }],
            }))
          }
        } catch (e) {
          console.error('Failed to transform Nexus response', e)
        }

        return []
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
      const tripjacResults = attachSupplierToLocalResults(firstResponse?.data, 'TRIPJAC')
      const transformedNexusResults = transformNexusResponseToLocalFormat(secondResponse)
      const combinedResults = [
        ...tripjacResults,
        ...transformedNexusResults
      ]

      // Store combined results in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('flightSearchResults', JSON.stringify(combinedResults))
        localStorage.setItem('supplier', transformedNexusResults.length > 0 ? 'NEXUS' : 'TRIPJAC')
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