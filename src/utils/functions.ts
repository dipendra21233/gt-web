import { TransformCaseOptions } from '@/types/module/commonModule'
import { CabinClass, FlightListingDataProps } from '@/types/module/flightSearch'
import { sorting } from '@/types/store/reducers/flightBooking.reducer'
import { clsx, type ClassValue } from 'clsx'
import Cookies from 'js-cookie'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'
import { ACCESS_TOKEN, IS_ADMIN_USER } from './constant'
import {
  camelCaseRegex,
  hyphenRegex,
  kebabCaseRegex,
  removeUnderscoreOrHyphenRegex,
  snakeCaseRegex,
  titleCaseRegex,
  underscoreRegex,
} from './regexMatch'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toLocaleLowerCase(value: string): string {
  return value.toLocaleLowerCase()
}

export function toCamelCase(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')
}

export const removeDot = (input: string): string => {
  return input.replace(/\./g, '')?.toLocaleLowerCase()
}

export const setInitialStorageState = () => {
  Cookies.remove(ACCESS_TOKEN)
  Cookies.remove(IS_ADMIN_USER)
}

export function isNullOrUndef(value: unknown): boolean {
  return value === null || value === undefined || value === ''
}

export function capitalizeFirstLetter(text: string): string {
  return text
    ?.toLowerCase() // Ensure all text is in lowercase first
    ?.split(' ') // Split by spaces
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    ?.join(' ') // Join back into a single string
}

export default function transformCase({
  value,
  caseType,
}: TransformCaseOptions) {
  switch (caseType) {
    case 'toUpperCase':
      return value.toUpperCase()
    case 'toLowerCase':
      return value.toLowerCase()
    case 'capitalize':
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    case 'camelCase':
      return value
        .toLowerCase()
        .replace(camelCaseRegex, (group) =>
          group.toUpperCase().replace('-', '').replace('_', '')
        )
    case 'kebabCase':
      return value
        .replace(kebabCaseRegex, '$1-$2')
        .toLowerCase()
        .replace(underscoreRegex, '-')
    case 'snakeCase':
      return value
        .replace(snakeCaseRegex, '$1_$2')
        .toLowerCase()
        .replace(hyphenRegex, '_')
    case 'titleCase':
      return value
        .toLowerCase()
        .replace(titleCaseRegex, (char) => char.toUpperCase())
        .replace(removeUnderscoreOrHyphenRegex, ' ')
    default:
      return value
  }
}

export const formatCabinClass = (input: CabinClass): string => {
  return input?.charAt(0) + input?.slice(1)?.toLowerCase()
}

export function formatValue(value: number | string): string {
  const number = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('en-IN').format(number)
}

export function convertToTime(departureTime: string): string {
  const date = new Date(departureTime)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export function getNuumberOfStops(stop: number) {
  if (stop === 0) return 'Non Stop'
  else if (stop > 0 && stop < 3) return `One Stop`
  else if (stop >= 3) return `${stop} Stops`
  else return ''
}

export function CurrentYear() {
  return new Date().getFullYear()
}

export function formatDate(date: string, format: string = 'MM/DD/YYYY') {
  return moment(date).format(format)
}

export function formatDateDDMMYYYY(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  
  // If already in DD/MM/YYYY format, return as is
  if (typeof dateString === 'string' && dateString.includes('/') && dateString.length === 10) {
    return dateString;
  }
  
  // Try to parse with moment using DD/MM/YYYY format
  const momentDate = moment(dateString, 'DD/MM/YYYY', true);
  if (momentDate.isValid()) {
    return momentDate.format('DD/MM/YYYY');
  }
  
  // Fallback to regular formatDate
  return formatDate(dateString, 'DD/MM/YYYY');
}

export function renderWithFallback(
  value: any,
  dataType: 'string' | 'number' = 'string'
): string | number {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return dataType === 'number' ? 0 : '-'
  }
  return value
}

export function getPaymentMethodId(paymentMethod: string): number | null {
  const paymentMethods: { [key: string]: number } = {
    Cash: 0,
    Cheque: 1,
    'NEFT / RTGS': 2,
    'Net Banking': 3,
    'Debit Card': 4,
    'Credit Card': 9,
    UPI: 6,
    'Non-ICICI Debit Card (enabled only if configured)': 8,
    'All modes enabled (aggregate)': 9,
    Amex: 5,
  }

  return paymentMethods[paymentMethod] !== undefined
    ? paymentMethods[paymentMethod]
    : null
}

export function filterFlightsByTime(
  flights: FlightListingDataProps[],
  timeCategories: string[]
) {
  return flights.filter(
    (flight) =>
      flight.filterKeys &&
      timeCategories.includes(flight.filterKeys.timeCategory)
  )
}

export function filterFlightsByStops(
  flights: FlightListingDataProps[],
  stopsCategories: string[]
) {
  return flights.filter(
    (flight) =>
      flight.filterKeys &&
      stopsCategories.includes(flight.filterKeys.stopsCategory)
  )
}

export function filterFlightsByFareType(
  flights: FlightListingDataProps[],
  fareTypes: string[]
) {
  if (fareTypes.length === 0) {
    return flights
  }

  console.log('🎫 FILTER DEBUG - Fare types to filter:', fareTypes)

  const filtered = flights.filter((flight, index) => {
    // Check if flight has fares
    if (!flight.fares || flight.fares.length === 0) {
      return false
    }

    const firstFareRefundType = flight.fares[0]?.refundType
    console.log(`✈️ Flight ${index}: refundType = "${firstFareRefundType}"`)

    // Map actual refund types to filter categories
    let matches = false

    for (const filterType of fareTypes) {
      if (filterType === 'Refundable') {
        // Match any refundable type (Refundable, Partially Refundable, etc.)
        if (
          firstFareRefundType &&
          firstFareRefundType.toLowerCase().includes('refundable') &&
          !firstFareRefundType.toLowerCase().includes('non')
        ) {
          matches = true
          break
        }
      } else if (filterType === 'Non-refundable') {
        // Match non-refundable types
        if (
          firstFareRefundType &&
          (firstFareRefundType.toLowerCase().includes('non') ||
            firstFareRefundType.toLowerCase().includes('non-refundable'))
        ) {
          matches = true
          break
        }
      }
    }

    console.log(`✅ Flight ${index} matches: ${matches}`)
    return matches
  })

  console.log(
    `🎯 FILTER RESULT: ${filtered.length}/${flights.length} flights match fare type filters`
  )
  return filtered
}

export function filterFlightsByAirline(
  flights: FlightListingDataProps[],
  airlines: string[]
) {
  return flights.filter(
    (flight) =>
      flight.filterKeys && airlines.includes(flight.filterKeys.airlineName)
  )
}

export function filterFlightsByPriceRange(
  flights: FlightListingDataProps[],
  minPrice: number,
  maxPrice: number
) {
  return flights.filter(
    (flight) =>
      flight.filterKeys &&
      flight.filterKeys.totalFare >= minPrice &&
      flight.filterKeys.totalFare <= maxPrice
  )
}

export function filterFlightsByDuration(
  flights: FlightListingDataProps[],
  durationCategories: string[]
) {
  return flights.filter(
    (flight) =>
      flight.filterKeys &&
      durationCategories.includes(flight.filterKeys.durationCategory)
  )
}

export function filterFlightsByAvailability(
  flights: FlightListingDataProps[],
  hasSeats: boolean | null = true
) {
  if (hasSeats === null) return flights
  return flights.filter(
    (flight) =>
      flight.filterKeys && flight.filterKeys.hasAvailableSeats === hasSeats
  )
}

export function filterFlightsByBaggage(
  flights: FlightListingDataProps[],
  hasBaggage: boolean | null = true
) {
  if (hasBaggage === null) return flights
  return flights.filter(
    (flight) => flight.filterKeys && flight.filterKeys.hasBaggage === hasBaggage
  )
}

export function filterFlightsByMeal(
  flights: FlightListingDataProps[],
  hasMeal: boolean | null = true
) {
  if (hasMeal === null) return flights
  return flights.filter(
    (flight) => flight.filterKeys && flight.filterKeys.hasMeal === hasMeal
  )
}

// Combined filter function for complex queries
export function applyMultipleFilters(
  flights: FlightListingDataProps[],
  filters: {
    timeCategories?: string[]
    stopsCategories?: string[]
    fareTypes?: string[]
    airlines?: string[]
    priceRange?: { min: number; max: number } | null
    durationCategories?: string[]
    hasSeats?: boolean | null
    hasBaggage?: boolean | null
    hasMeal?: boolean | null
  }
) {
  let filteredFlights = flights

  if (filters.timeCategories?.length) {
    filteredFlights = filterFlightsByTime(
      filteredFlights,
      filters.timeCategories
    )
  }

  if (filters.stopsCategories?.length) {
    filteredFlights = filterFlightsByStops(
      filteredFlights,
      filters.stopsCategories
    )
  }

  if (filters.fareTypes?.length) {
    filteredFlights = filterFlightsByFareType(
      filteredFlights,
      filters.fareTypes
    )
  }

  if (filters.airlines?.length) {
    filteredFlights = filterFlightsByAirline(filteredFlights, filters.airlines)
  }

  if (filters.priceRange) {
    filteredFlights = filterFlightsByPriceRange(
      filteredFlights,
      filters.priceRange.min,
      filters.priceRange.max
    )
  }

  if (filters.durationCategories?.length) {
    filteredFlights = filterFlightsByDuration(
      filteredFlights,
      filters.durationCategories
    )
  }

  if (filters.hasSeats !== undefined) {
    filteredFlights = filterFlightsByAvailability(
      filteredFlights,
      filters.hasSeats
    )
  }

  if (filters.hasBaggage !== undefined) {
    filteredFlights = filterFlightsByBaggage(
      filteredFlights,
      filters.hasBaggage
    )
  }

  if (filters.hasMeal !== undefined) {
    filteredFlights = filterFlightsByMeal(filteredFlights, filters.hasMeal)
  }

  console.log('🎯 APPLY MULTIPLE FILTERS - Complete')
  console.log('📈 Final result:', {
    original: flights.length,
    filtered: filteredFlights.length,
    activeFilters: Object.keys(filters).filter((key) => {
      const value = filters[key as keyof typeof filters]
      return (
        value !== null &&
        value !== undefined &&
        (Array.isArray(value) ? value.length > 0 : true)
      )
    }),
  })

  return filteredFlights
}

/**
 * Converts a Date object to a string in the format "DD-MM-YYYY".
 *
 * @param date - A Date object to be converted.
 *
 * @returns A string representing the date in "DD-MM-YYYY" format.
 *
 * Usage:
 * const formattedDate = formatDateToDDMMYYYY(new Date());
 *
 * This will return "02-12-2025" for December 2, 2025.
 */
export function formatDateToDD_MM_YYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export function convertToDateObject(dateStr: string | null) {
  if (!dateStr) return null
  if (!/^\d{8}$/.test(dateStr)) {
    throw new Error('Date string must be in DDMMYYYY format (8 digits).')
  }

  const day = parseInt(dateStr.substring(0, 2), 10)
  const month = parseInt(dateStr.substring(2, 4), 10) - 1 // JS months are 0-indexed
  const year = parseInt(dateStr.substring(4, 8), 10)

  const date = new Date(year, month, day)

  if (
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    throw new Error('Invalid date components.')
  }

  return date
}

export function formatDateToDDMMYYYY(date: Date | null) {
  if (!date) return null
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // JS months are 0-based
  const year = date.getFullYear()

  return `${day}${month}${year}`
}

export function setQuery(queryObj: Record<string, unknown>) {
  const params = new URLSearchParams()
  Object.entries(queryObj).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (value instanceof Date) {
        params.set(key, value.toISOString())
      } else {
        params.set(key, String(value))
      }
    }
  })
}

export function formatDuration(duration: number) {
  const totalMinutes = duration
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split('T')[1].split(':')
  return `${hours}:${minutes}`
}

export function convertToTimeString(dateTimeString: string): string {
  const date = new Date(dateTimeString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
export function convertToShortDateString(dateTimeString: string): string {
  const date = new Date(dateTimeString)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }
  return date.toLocaleDateString('en-US', options)
}

export function getTravellerSummary(
  adult: number | null,
  child: number | null,
  infant: number | null,
  travelClass: string | null
) {
  const TotalTraveller = (adult ?? 0) + (child ?? 0) + (infant ?? 0)
  return `${TotalTraveller} Traveller, ${travelClass ?? 'Economy'}`
}

export function formatDateToShortString(date: Date | null) {
  if (!date) return null
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }
  return date.toLocaleDateString('en-US', options)
}

export function shortFilterData(
  data: FlightListingDataProps[],
  filter: sorting
) {
  if (!filter || data.length === 0) return data

  const sortedData = [...data]

  switch (filter) {
    case 'Price':
      sortedData.sort((a, b) => {
        const priceA = a.fares?.[0]?.totalFare || 0
        const priceB = b.fares?.[0]?.totalFare || 0
        return priceA - priceB
      })
      break
    case 'Fastest':
      sortedData.sort((a, b) => {
        const durA = a.segments?.[0]?.duration || 0
        const durB = b.segments?.[0]?.duration || 0
        return durA - durB
      })
      break
    case 'Departure':
      sortedData.sort((a, b) => {
        const depA = new Date(a.segments?.[0]?.departureTime || '').getTime()
        const depB = new Date(b.segments?.[0]?.departureTime || '').getTime()
        return depA - depB
      })
      break
    case 'Smart':
      // "Smart" can be a custom logic, for now sort by price then duration
      sortedData.sort((a, b) => {
        const priceA = a.fares?.[0]?.totalFare || 0
        const priceB = b.fares?.[0]?.totalFare || 0
        if (priceA !== priceB) return priceA - priceB
        const durA = a.segments?.[0]?.duration || 0
        const durB = b.segments?.[0]?.duration || 0
        return durA - durB
      })
      break
    default:
      break
  }

  return sortedData
}


export function generateAgentReference(): string {

  const min = 2000000;
  const max = 2999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return `GT${randomNumber}`;
}
