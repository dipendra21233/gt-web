/**
 * Utility functions for managing flight data in localStorage
 *
 * Usage Example:
 * ```typescript
 * import { storeFlightSearchResults, getFlightSearchResults } from '@/utils/flightStorageUtils'
 *
 * // Store flight search results
 * const flightData = [
 *   {
 *     segments: [...],
 *     fares: [...]
 *   }
 * ]
 * storeFlightSearchResults(flightData)
 *
 * // Retrieve flight search results
 * const storedResults = getFlightSearchResults()
 * if (storedResults) {
 *   console.log('Retrieved flight results:', storedResults)
 * }
 * ```
 */

export interface FlightSearchResult {
  segments: Array<{
    flightCode: string
    airlineName: string
    airlineCode: string
    from: string
    fromCity: string
    fromTerminal: string
    to: string
    toCity: string
    departureTime: string
    arrivalTime: string
    duration: number
    stops: number
  }>
  fares: Array<{
    fareIdentifier: string
    totalFare: number
    baseFare: number
    taxes: number
    baggage: {
      checkIn: string
      cabin: string
    }
    cabinClass: string
    fareBasis: string
    meal: string
    benefit: string | null
    consentMsg: string | null
    refundType: string
    bookingCode: string
    priceID: string
  }>
}

const FLIGHT_SEARCH_RESULTS_KEY = 'flightSearchResults'
const FLIGHT_LISTING_DATA_KEY = 'flightListingData'

/**
 * Store flight search results in localStorage
 * @param data - Flight search results data
 */
export const storeFlightSearchResults = (data: FlightSearchResult[]): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FLIGHT_SEARCH_RESULTS_KEY, JSON.stringify(data))
      console.log('Flight search results stored successfully')
    }
  } catch (error) {
    console.error('Error storing flight search results:', error)
    throw error
  }
}

/**
 * Retrieve flight search results from localStorage
 * @returns Flight search results or null if not found
 */
export const getFlightSearchResults = (): FlightSearchResult[] | null => {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(FLIGHT_SEARCH_RESULTS_KEY)
      return data ? JSON.parse(data) : null
    }
    return null
  } catch (error) {
    console.error('Error retrieving flight search results:', error)
    return null
  }
}

/**
 * Clear flight search results from localStorage
 */
export const clearFlightSearchResults = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FLIGHT_SEARCH_RESULTS_KEY)
      console.log('Flight search results cleared')
    }
  } catch (error) {
    console.error('Error clearing flight search results:', error)
  }
}

/**
 * Store flight listing data in localStorage (for backward compatibility)
 * @param data - Flight listing data
 */
export const storeFlightListingData = (data: any[]): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FLIGHT_LISTING_DATA_KEY, JSON.stringify(data))
      console.log('Flight listing data stored successfully')
    }
  } catch (error) {
    console.error('Error storing flight listing data:', error)
    throw error
  }
}

/**
 * Retrieve flight listing data from localStorage
 * @returns Flight listing data or null if not found
 */
export const getFlightListingData = (): any[] | null => {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(FLIGHT_LISTING_DATA_KEY)
      return data ? JSON.parse(data) : null
    }
    return null
  } catch (error) {
    console.error('Error retrieving flight listing data:', error)
    return null
  }
}

/**
 * Clear all flight-related data from localStorage
 */
export const clearAllFlightData = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FLIGHT_SEARCH_RESULTS_KEY)
      localStorage.removeItem(FLIGHT_LISTING_DATA_KEY)
      console.log('All flight data cleared from localStorage')
    }
  } catch (error) {
    console.error('Error clearing flight data:', error)
  }
}

/**
 * Check if flight search results exist in localStorage
 * @returns boolean indicating if data exists
 */
export const hasFlightSearchResults = (): boolean => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(FLIGHT_SEARCH_RESULTS_KEY) !== null
    }
    return false
  } catch (error) {
    console.error('Error checking flight search results:', error)
    return false
  }
}
