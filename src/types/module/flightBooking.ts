export interface FlightBookingPayload {
  bookingId: string
  travellerInfo: Traveller[]
  gstInfo?: GSTInfo
  deliveryInfo?: DeliveryInfo
  payment: Payment
  paymode: string
  flight: Flight

  // ✅ Newly added optional fields
  query?: FlightQuery
  flight_keys?: string[]
  total_price?: number
  currency?: string
  agent_reference?: string
}

// ---- Supporting Types ----

interface FlightQuery {
  nAdt: number
  nInf: number
  nChd: number
  legs: FlightLeg[]
}

interface FlightLeg {
  dst: string
  src: string
  dep: string // format: DD/MM/YYYY
}

interface Traveller {
  ti: string
  fN: string
  lN: string
  pt: 'ADULT' | 'CHILD' | 'INFANT'
  dob: string
  pNum: string
  eD?: string // passport expiry date (optional for Nexus)
  nationality?: string // nationality code (required for Nexus)
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
