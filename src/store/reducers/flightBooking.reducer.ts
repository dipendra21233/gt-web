import { FlightListingDataProps } from '@/types/module/flightSearch'
import { FlightBookingActionTypes } from '@/types/store/action/flightBooking.action'
import { FlightBookingReducerReducerData } from '@/types/store/reducers/flightBooking.reducer'
import {
  FLIGHT_SEARCH_REQUEST,
  FLIGHT_SEARCH_SUCCESS,
  GET_ALL_FLIGHT_LISTING_DATA,
  SAVE_FLIGHT_SEARCH_DATA
} from '../../utils/storeTypes'

const initialState: FlightBookingReducerReducerData = {
  loading: false,
  error: null,
  flightFiltersData: {
    journeyType: 'One way',
    passengers: {
      adults: '0',
      children: '0',
      infants: '0',
    },
  },
}

export const flightBookingReducer = (
  state = initialState,
  action: FlightBookingActionTypes
): FlightBookingReducerReducerData => {
  switch (action.type) {
    case FLIGHT_SEARCH_REQUEST:
      return { ...state, loading: true, error: null }
    case FLIGHT_SEARCH_SUCCESS:
      if ('payload' in action && action.payload !== null) {
        return {
          ...state,
          loading: false,
          error: null,
        }
      }
      return state
    case SAVE_FLIGHT_SEARCH_DATA:
      if ('payload' in action && action.payload !== null) {
        return {
          ...state,
          flightFiltersData: {
            ...state.flightFiltersData,
            ...action.payload,
          },
        }
      }
      return state
    case GET_ALL_FLIGHT_LISTING_DATA:
      if ('payload' in action && action.payload !== null) {
        return {
          ...state,
          getFlightListingData: action.payload as FlightListingDataProps[],
          loading: false,
        }
      }
      return state


    default:
      return state
  }
}
