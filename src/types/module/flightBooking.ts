export interface FlightBookingPayload {
  bookingId: string
  travellerInfo: Traveller[]
  gstInfo?: GSTInfo
  deliveryInfo?: DeliveryInfo
  payment: Payment
  paymode: string
  flight: Flight
}

interface Traveller {
  ti: string
  fN: string
  lN: string
  pt: 'ADULT' | 'CHILD' | 'INFANT'
  dob: string
  pNum: string
  eD: string
}

interface GSTInfo {
  gstNumber: string
  registeredName: string
  email: string
  mobile: string
  address: string
}

interface DeliveryInfo {
  emails: string[]
  contacts: string[]
}

interface Payment {
  transactionAmount: number
}

interface Flight {
  origin: string
  destination: string
  departureDate: string
  arrivalDate: string
  airlineCode: string
  flightNumber: string
  tripType: 'ONE_WAY' | 'ROUND_TRIP' | 'MULTI_CITY'
}
