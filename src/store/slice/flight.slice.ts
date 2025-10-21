import {
  filterFlightSLice,
  sorting,
} from '@/types/store/reducers/flightBooking.reducer'
import { applyMultipleFilters, shortFilterData } from '@/utils/functions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: filterFlightSLice = {
  loading: false,
  flightData: [],
  filterFlightData: [],
  returnFlightData: [],
  airlines: [],
  fromDestination: null,
  toDestination: null,
  depature: null,
  returnFlight: null,
  flightclass: null,
  airports: null,
  regions: null,
  countries: null,
  adult: null,
  child: null,
  infants: null,
  sorting: 'Price',
  selectedFare: null,
  selectedFlight: null,
  // Filter state
  activeFilters: {
    timeCategories: [],
    stopsCategories: [],
    fareTypes: [],
    airlines: [],
    priceRange: null,
    durationCategories: [],
    hasSeats: null,
    hasBaggage: null,
    hasMeal: null,
  },
}

const filterFLightSlice = createSlice({
  name: 'tempFlight',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setFlightData: (
      state,
      action: PayloadAction<filterFlightSLice['filterFlightData']>
    ) => {
      // Handle null or undefined payload
      if (!action.payload || !Array.isArray(action.payload)) {
        state.flightData = []
        state.filterFlightData = []
        state.airlines = []
        return
      }

      // Enhance flight data with computed filter keys for easier filtering
      const enhancedFlightData = action.payload.map((flight) => {
        const segment = flight.segments[0]
        const fare = flight.fares[0]

        // Extract departure time hour for time-based filtering
        const departureHour = new Date(segment.departureTime).getHours()

        // Determine time category
        let timeCategory: 'early_morning' | 'morning' | 'mid_day' | 'night'
        if (departureHour < 6) timeCategory = 'early_morning'
        else if (departureHour < 12) timeCategory = 'morning'
        else if (departureHour < 18) timeCategory = 'mid_day'
        else timeCategory = 'night'

        // Determine stops category
        let stopsCategory: 'non_stop' | 'one_stop' | 'multiple_stops'
        if (segment.stops === 0) stopsCategory = 'non_stop'
        else if (segment.stops === 1) stopsCategory = 'one_stop'
        else stopsCategory = 'multiple_stops'

        // Determine fare type category - normalize refundType for consistent filtering
        let fareTypeCategory: string
        const refundType = fare.refundType?.toLowerCase() || ''

        if (
          refundType.includes('non') ||
          refundType.includes('non-refundable')
        ) {
          fareTypeCategory = 'Non-refundable'
        } else if (refundType.includes('refundable')) {
          fareTypeCategory = 'Refundable'
        } else {
          // Default to non-refundable if unclear
          fareTypeCategory = 'Non-refundable'
        }

        // Debug: Log fare type values
        if (action.payload.length <= 3) {
          // Only log for first few flights to avoid spam
          console.log('Fare type debug:', {
            originalRefundType: fare.refundType,
            normalizedFareTypeCategory: fareTypeCategory,
            airline: segment.airlineName,
            flightCode: segment.flightCode,
          })
        }

        // Calculate total duration in minutes for duration filtering
        const totalDurationMinutes = segment.duration

        // Create enhanced flight object with filter keys
        return {
          ...flight,
          // Filter keys for easy filtering
          filterKeys: {
            // Time-based filters
            timeCategory,
            departureHour,

            // Stops-based filters
            stopsCategory,
            stopsCount: segment.stops,

            // Fare-based filters
            fareTypeCategory,
            isRefundable: fareTypeCategory === 'Refundable',

            // Price-based filters
            totalFare: fare.totalFare,
            baseFare: fare.baseFare,
            taxes: fare.taxes,

            // Duration-based filters
            totalDurationMinutes,
            durationCategory: (totalDurationMinutes < 120
              ? 'short'
              : totalDurationMinutes < 300
                ? 'medium'
                : 'long') as 'short' | 'medium' | 'long',

            // Airline-based filters
            airlineName: segment.airlineName,
            airlineCode: segment.airlineCode,

            // Route-based filters
            fromAirport: segment.from,
            toAirport: segment.to,
            fromCity: segment.fromCity,
            toCity: segment.toCity,

            // Availability filters
            seatsAvailable: fare.seatsAvailable,
            hasAvailableSeats: fare.seatsAvailable > 0,

            // Cabin class filters
            cabinClass: fare.cabinClass,

            // Baggage filters
            hasBaggage:
              fare.baggage.checkIn !== '0' || fare.baggage.cabin !== '0',

            // Meal filters
            hasMeal: fare.meal !== 'No Meal',

            // Combined filters for complex queries
            isDirectFlight: segment.stops === 0,
            isConnectingFlight: segment.stops > 0,
            isLowCostCarrier: segment.airlineCode.length <= 3, // Simple heuristic
          },
        }
      })

      state.flightData = enhancedFlightData
      state.filterFlightData = enhancedFlightData
      state.airlines = Array.from(
        new Set(
          enhancedFlightData
            .map((data) => data.segments[0].airlineName)
            .filter(Boolean)
        )
      )

      // Debug: Show available refund types
      const refundTypes = Array.from(
        new Set(
          enhancedFlightData
            .map((data) => data.fares[0]?.refundType)
            .filter(Boolean)
        )
      )
      console.log('Available refund types in data:', refundTypes)
    },
    setUserInfo: (
      state,
      action: PayloadAction<
        Pick<
          filterFlightSLice,
          | 'fromDestination'
          | 'toDestination'
          | 'depature'
          | 'returnFlight'
          | 'flightclass'
          | 'adult'
          | 'child'
          | 'infants'
        >
      >
    ) => {
      Object.assign(state, action.payload)
      // Simply show all flight data without filtering
      state.filterFlightData = state.flightData
      state.airlines = Array.from(
        new Set(
          state.flightData
            .map((data) => data.segments[0].airlineName)
            .filter(Boolean)
        )
      )
      state.sorting = null
    },
    setGlobalData: (
      state,
      action: PayloadAction<
        Pick<filterFlightSLice, 'airports' | 'regions' | 'countries'>
      >
    ) => {
      // You can update any of the global fields except loading, flightData, filterFlightData, airlines
      Object.assign(state, action.payload)
    },
    setShorted: (state, action: PayloadAction<sorting>) => {
      state.sorting = action.payload
      state.filterFlightData = shortFilterData(
        state.filterFlightData || [],
        action.payload
      )
    },
    setSelectedFLight: (state, action) => {
      state.selectedFare = action.payload.fare
      state.selectedFlight = action.payload.flight
    },

    // Filter actions
    setTimeFilter: (state, action: PayloadAction<string[]>) => {
      state.activeFilters.timeCategories = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
      console.log(
        'Time filter applied:',
        action.payload,
        'Results:',
        state.filterFlightData.length
      )
    },

    setStopsFilter: (state, action: PayloadAction<string[]>) => {
      state.activeFilters.stopsCategories = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    setFareTypeFilter: (state, action: PayloadAction<string[]>) => {
      state.activeFilters.fareTypes = action.payload

      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    setAirlineFilter: (state, action: PayloadAction<string[]>) => {
      state.activeFilters.airlines = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    setPriceRangeFilter: (
      state,
      action: PayloadAction<{ min: number; max: number } | null>
    ) => {
      state.activeFilters.priceRange = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    setDurationFilter: (state, action: PayloadAction<string[]>) => {
      state.activeFilters.durationCategories = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    setAvailabilityFilter: (state, action: PayloadAction<boolean | null>) => {
      state.activeFilters.hasSeats = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    setBaggageFilter: (state, action: PayloadAction<boolean | null>) => {
      state.activeFilters.hasBaggage = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    setMealFilter: (state, action: PayloadAction<boolean | null>) => {
      state.activeFilters.hasMeal = action.payload
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    clearAllFilters: (state) => {
      state.activeFilters = {
        timeCategories: [],
        stopsCategories: [],
        fareTypes: [],
        airlines: [],
        priceRange: null,
        durationCategories: [],
        hasSeats: null,
        hasBaggage: null,
        hasMeal: null,
      }
      state.filterFlightData = state.flightData
    },

    applyFilters: (state) => {
      state.filterFlightData = applyMultipleFilters(
        state.flightData,
        state.activeFilters
      )
    },

    // startFlareDetails : (state, action) => {
    //   state.loading = true
    // }
  },
})

export const {
  setLoading,
  setFlightData,
  setGlobalData,
  setUserInfo,
  setShorted,
  setSelectedFLight,
  // Filter actions
  setTimeFilter,
  setStopsFilter,
  setFareTypeFilter,
  setAirlineFilter,
  setPriceRangeFilter,
  setDurationFilter,
  setAvailabilityFilter,
  setBaggageFilter,
  setMealFilter,
  clearAllFilters,
  applyFilters,
  // startFlareDetails
} = filterFLightSlice.actions

export default filterFLightSlice.reducer
