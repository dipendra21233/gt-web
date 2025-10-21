export interface CouponSector {
  carrier: string
  flightNumber: string
  classType: string
  flightType: string
  depTime: string
  arrTime: string
  origin: string
  destination: string
  startTerminal: string
  endTerminal: string
  refundable: boolean
  depDate: string
  arrDate: string
  dayChange: boolean
  _id?: string
}

export interface CouponDetails {
  seriesName: string
  origin: string
  destination: string
  journeyType: string
  carrier: string
  flightNumber: string
  classType: string
  depTime: string
  arrTime: string
  totalDuration: string
  availableSeats: number
  startJourneyDate: string
  endJourneyDate: string
  adultTax: number
  childTax: number
  infantTax: number
  totalAmount: number
  couponSectors: CouponSector[]
  credentials: string
}

export interface SectorDetailsFormValues {
  carrier: string
  flightNumber: string
  flightClass: string
  flightType: 'Onward' | 'Return'
  depTime: string
  arrTime: string
  origin: string
  destination: string
  startTerminal: string
  endTerminal: string
  refundable: 'Refundable' | 'Non-Refundable'
  depDate: string
  dayChange: 'yes' | 'no'
}

export interface AddCouponFormValues {
  origin: string
  destination: string
  journeyType: 'Domestic' | 'International'
  carrier: string
  flightNumber: string
  flightClass: string
  depTime: string
  arrTime: string
  totalDuration: string
  availableSeats: string // keeping it as string because initial value is ''
  startJourneyDate: string
  endJourneyDate: string
  adultTax: string
  childTax: string
  infantTax: string
  totalAmount: string
  sectorDetails: SectorDetailsFormValues
}

export interface FetchCouponDataProps {
  _id: string
  seriesName: string
  origin: string
  destination: string
  journeyType: 'Domestic' | 'International'
  carrier: string
  flightNumber: string
  classType: string
  depTime: string
  arrTime: string
  totalDuration: string
  availableSeats: number
  startJourneyDate: string
  endJourneyDate: string
  adultTax: number
  childTax: number
  infantTax: number
  totalAmount: number
  couponSectors: CouponSector[]
  createdAt: string
  __v: number
}

export interface GetAllCouponDetailsDataProps {
  origin: string
  destination: string
  carrier: string
  flightNumber: string
  classType: string
}

export interface CouponSectorDataProps {
  carrier: string
  flightNumber: string
  classType: string
  flightType: string
  depTime: string
  arrTime: string
  origin: string
  destination: string
  startTerminal: string // e.g., "T1"
  endTerminal: string // e.g., "T2"
  refundable: boolean
  depDate: string
  arrDate: string
  dayChange: boolean
  _id: string
}

export interface FetchCouponDetailsDataProps {
  _id: string
  seriesName: string
  origin: string
  destination: string
  journeyType: string
  carrier: string
  flightNumber: string
  classType: string
  depTime: string
  arrTime: string
  totalDuration: string // e.g., "2h"
  availableSeats: number
  startJourneyDate: string
  endJourneyDate: string
  adultTax: number
  childTax: number
  infantTax: number
  totalAmount: number
  couponSectors: CouponSector[]
  createdAt: string // e.g., "2025-07-14T12:10:38.642Z"
  __v: number
}
