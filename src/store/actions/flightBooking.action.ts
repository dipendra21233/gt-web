import { BookingDetails, FlightDetails } from '@/types/module/flightDetails'
import {
  FlightListingDataProps,
  FlightSearchResultData,
  SearchQueryPayload,
} from '@/types/module/flightSearch'
import {
  FLIGHT_SEARCH_REQUEST,
  GET_ALL_FLIGHT_LISTING_DATA,
  SAVE_FLIGHT_SEARCH_DATA,
} from '@/utils/storeTypes'
import { FLIGHT_BOOKING_REQUEST, START_FLARE_DETAILS, START_REVIEW_FLIGHT_DETAILS } from '../saga/flightBooking.saga'
import { filterFlightSLice } from '@/types/store/reducers/flightBooking.reducer'

export const setFlightSearchRequest = (
  flightSearchData?: SearchQueryPayload,
  callBack?: (res: filterFlightSLice['filterFlightData']) => void
) => ({
  type: FLIGHT_SEARCH_REQUEST,
  payload: flightSearchData,
  callBack,
})

export const saveFlightSearchData = (
  data: Partial<FlightSearchResultData>
) => ({
  type: SAVE_FLIGHT_SEARCH_DATA,
  payload: data,
})

export const getAllFlightListingData = (data: FlightListingDataProps[]) => ({
  type: GET_ALL_FLIGHT_LISTING_DATA,
  payload: data,
})


// In your actions file
export const startFlareDetails = (
  payload: { id: string; flowType: string },
  callBack: (status: boolean) => void
) => ({
  type: START_FLARE_DETAILS,
  payload,
  callBack
});

export const startReviewFlightDetails = (
  payload: { priceIds: string[] },
  callBack: (status: FlightDetails) => void
) => ({
  type: START_REVIEW_FLIGHT_DETAILS,
  payload,
  callBack
})

export const flightBookingRequest = (
  payload: BookingDetails,
  callBack: (status: boolean) => void
) => ({
  type: FLIGHT_BOOKING_REQUEST,
  payload,
  callBack
})
