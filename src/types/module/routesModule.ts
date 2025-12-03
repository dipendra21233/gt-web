import { StaticImageData } from 'next/image'
import { ThemeUIStyleObject } from 'theme-ui'
import { Fare, FlightSegment } from './flightSearch'

export interface Routes {
  home: string
  login: string
  userRegistration: string
  dashboard: string
  userRequests: string
  addCoupon: string
  surfCoupons: string
  about: string
  contact: string
  support: string
  flightResult: string
  flightResultTest: string
  bookingManagement: string
  markupManagement: string
  myBookings: string
  addMarkup: string
  ledgerManagement: string
  cancellationQueuesManagement: string
  rescheduleQueuesManagement: string
  holdQueuesManagement: string
  transactionManagement: string
  uploadBalance: string
  paxCalendar: string
}

export interface FlightInfoProps {
  src: StaticImageData
  title: string
  airCode: string
  time1: string
  dep1: string
  duration: string
  stopType: string
  time2: string
  dep2: string
  price: string
}

export interface FlightBookingCardProps {
  item?: FlightInfoProps
  isSelected?: boolean
  selectedCard?: string
  buttonSX?: ThemeUIStyleObject
  translation: {
    BOOK: string
    FLIGHT_DETAILS: string
  }
  isRoundTrip?: boolean
  onClickBook?: () => void
  onDetailsClick?: () => void

  segMentData: FlightSegment[]
  FareData: Fare[]
}
