import { CommonFillterData, NavItemsProps } from '@/types/module/commonModule'
import { toLocaleLowerCase } from './functions'
import { appRoutes } from './routes'
import { translation } from './translation'

export const TOAST_COMMON_POSITION = 'top-right'
export const TOAST_COMMON_THEME = 'colored'
export const TOAST_CLOSE_ICON_ALT = 'toast-close-icon'
export const TOAST_ERROR_ICON_ALT = 'toast-error-icon'
export const COMMON_TOAST_TIMEOUT = 3000
export const COMMON_API_TIMEOUT = 60000
export const ACCESS_TOKEN = 'accessToken'
export const IS_ADMIN_USER = 'is-admin'
export const ADMIN_ROUTE = '/admin'
export const FALSE = 'false'
export const TRUE = 'true'
export const ARROW_SIZE = 16
export const ITEMS_PER_PAGE = 10
export const EDIT_FORM_MAX_HEIGHT = '550px'
export const SEARCH_DEBOUNCE_MS = 300
export const MAX_SEARCH_RESULTS = 50
export const POPULAR_AIRPORTS_COUNT = 10

export const UserListFillterData: CommonFillterData[] = [
  {
    key: toLocaleLowerCase(translation?.ALL),
    label: translation?.ALL,
  },
  {
    key: toLocaleLowerCase(translation?.APPROVED),
    label: translation?.APPROVED,
  },
  {
    key: toLocaleLowerCase(translation?.PENDING),
    label: translation?.PENDING,
  },
  {
    key: toLocaleLowerCase(translation?.REJECTED),
    label: translation?.REJECTED,
  },
]

export const navItems: NavItemsProps[] = [
  { name: translation?.HOME, href: appRoutes?.home },
  { name: translation?.ABOUT, href: appRoutes?.about },
  { name: translation?.CONTACT, href: appRoutes?.contact },
  { name: translation?.SUPPORT, href: appRoutes.support },
]

export const refundData = [
  {
    label: translation?.REFUNDABLE,
    value: translation?.REFUNDABLE,
    id: translation?.REFUNDABLE,
  },
  {
    label: translation?.NON_REFUNDABLE,
    value: translation?.NON_REFUNDABLE,
    id: translation?.NON_REFUNDABLE,
  },
]

interface StopData {
  label: string
  value: string
  checked: boolean
  id: string
}

export const stopsData: StopData[] = [
  { label: 'Non-stop', value: 'non_stop', checked: false, id: 'non_stop' },
  { label: '1 Stop', value: 'one_stop', checked: false, id: 'one_stop' },
]

export const travelClassesData = [
  { label: 'Economy', value: 'ECONOMY' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'First', value: 'FIRST' },
]

export const BookingTypeOptions = [
  { label: ' Flight Bookings', value: 'flight_bookings' },
  { label: 'Flight Cancelation', value: 'flight_cancelation' },
]

export const carrierOptions = [
  { value: '6E', label: '6E - IndiGo' },
  { value: 'G8', label: 'G8 - Go First' },
  { value: 'SG', label: 'SG - SpiceJet' },
  { value: 'I5', label: 'I5 - AirAsia India' },
  { value: 'AI', label: 'AI - Air India' },
  { value: 'UK', label: 'UK - Vistara' },
  { value: 'S9', label: 'S9 - Star Air' },
  { value: 'QP', label: 'QP - Akasa Air' },
  { value: '9I', label: '9I - Alliance Air' },
  { value: 'FD', label: 'FD - Thai AirAsia' },
  { value: 'IX', label: 'IX - Air India Express' },
]

export const airLineTerminalOptions = ['T1', 'T2', 'T3']

export const queueStatusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Rejected', value: 'rejected' },
]

export const myBookingTypeOptions = [
  { label: 'Flight Bookings', value: 'flight_bookings' },
  { label: 'Flight Cancelation', value: 'flight_cancelation' },
  { label: 'Flight Reschedule', value: 'flight_reschedule' },
]
export const selectCategoryOptions = [
  { label: 'Flights Domestic', value: 'Flights Domestic' },
  { label: 'Flights International', value: 'Flights International' },
]

export const airlineTypeOptions = [
  { label: 'Percentage', value: 'Percentage' },
  { label: 'Flat', value: 'Fixed' },
]

export const paymentModeOptions = [
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'Debit Card', value: 'Debit Card' },
  { label: 'Amex', value: 'Amex' },
  { label: 'NetBanking', value: 'NetBanking' },
  { label: 'UPI', value: 'UPI' },
]

export const passengerConfig = [
  {
    key: 'adults',
    label: 'Adults',
    ageRange: '12+ Years',
    min: 1,
    max: 9,
  },
  {
    key: 'children',
    label: 'Children',
    ageRange: '2 - 12 yrs',
    min: 0,
    max: 9,
  },
  {
    key: 'infants',
    label: 'Infants',
    ageRange: 'Below 2 yrs',
    min: 0,
    max: 9,
  },
]

export const travelClasses = [
  { value: 'ECONOMY', label: 'Economy' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'FIRST', label: 'First class' },
]
