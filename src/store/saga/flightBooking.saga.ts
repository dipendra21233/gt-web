import { BookingDetails } from '@/types/module/flightDetails'
import { FlightBookingSagaType } from '@/types/store/action/flightBooking.action'
import { FLIGHT_SEARCH_REQUEST } from '@/utils/storeTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getUsersFailureAction } from '../actions/user.action'
import {
  flightBookingApi,
  getFlightFareDetailsApi,
  getReviewFlightDetailsApi,
  setFlightSearchRequestApi,
} from '../apis'
import { setFlightData } from '../slice/flight.slice'

// export const flightSearchRequest = createAction('FLIGHT_SEARCH_REQUEST');
export const START_FLARE_DETAILS = 'tempFlight/startFlareDetails'
export const START_REVIEW_FLIGHT_DETAILS = 'tempFlight/startReviewFlightDetails'
export const FLIGHT_BOOKING_REQUEST = 'tempFlight/flightBookingRequest'

function* setFlightSearchRequestWorker(action: FlightBookingSagaType) {
  try {
    const response: AxiosResponse = yield call(
      setFlightSearchRequestApi,
      action?.payload
    )
    if (response.status === 200) {
      yield put(setFlightData(response.data))
      action.callBack(response.data)
      // localStorage.setItem('flightListingData', JSON.stringify(response?.data))
    }
  } catch (error) {
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(getUsersFailureAction(error))
      action.callBack([])
    }
  }
}

function* getFlightFareDetailsWorker(action: {
  payload: { id: string; flowType: string }
  callBack: (status: boolean) => void
}) {
  try {
    const response: AxiosResponse = yield call(
      getFlightFareDetailsApi,
      action?.payload
    )
    if (response.status === 200) {
      console.log('response', response.data)
      action.callBack(response.status === 200)
      // yield put(setFlightFareDetails(response.data))
    }
  } catch (error) {
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(getUsersFailureAction(error))
    }
  }
}

function* getReviewFLightDetails(action: {
  payload: { priceIds: string[] }
  callBack: (status: boolean) => void
}) {
  try {
    const response: AxiosResponse = yield call(
      getReviewFlightDetailsApi,
      action?.payload
    )
    console.log('response', response.data)
    action.callBack(response.data)
  } catch (error) {
    if (error instanceof Error || error instanceof AxiosError) {
      console.error(error)
    }
  }
}

function* flightBookingApiWorker(action: {
  payload: BookingDetails
  callBack: (status: boolean) => void
}) {
  try {
    const response: AxiosResponse = yield call(
      flightBookingApi,
      action?.payload
    )
    if (response.status === 200) {
      action.callBack(response.status === 200)
    }
  } catch (error) {
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(getUsersFailureAction(error))
    }
  }
}
export function* flightBookingApiSaga() {
  yield takeLatest(FLIGHT_SEARCH_REQUEST as any, setFlightSearchRequestWorker)
  yield takeLatest(START_FLARE_DETAILS as any, getFlightFareDetailsWorker)
  yield takeLatest(START_REVIEW_FLIGHT_DETAILS as any, getReviewFLightDetails)
  yield takeLatest(FLIGHT_BOOKING_REQUEST as any, flightBookingApiWorker)
}
