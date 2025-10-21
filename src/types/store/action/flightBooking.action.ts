import {
  FlightListingDataProps,
  SearchQueryPayload,
} from '@/types/module/flightSearch'
import { filterFlightSLice } from '../reducers/flightBooking.reducer'

export interface FlightBookingSagaType {
  type: string
  payload: SearchQueryPayload
  callBack: (res: filterFlightSLice['filterFlightData']) => void
}

export interface GetAllFlightListingData {
  type: string
  payload: FlightListingDataProps[]
}

export type FlightBookingActionTypes =
  | FlightBookingSagaType
  | GetAllFlightListingData
