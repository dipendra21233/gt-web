interface GstInfo {
  gstNumber: string
  email: string
  registeredName: string
  mobile: string
  address: string
  bookingId: string
  bookingUserId: string
  id: number
}

interface FlightDetails {
  aI: {
    code: string
    name: string
    isLcc: boolean
  }
  fN: string
  eT: string
}

interface TripInfo {
  sI: Array<{
    id: string
    fD: FlightDetails
    stops: number
    duration: number
    da: {
      code: string
      name: string
      cityCode: string
      city: string
      country: string
      countryCode: string
      terminal: string
    }
    aa: {
      code: string
      name: string
      cityCode: string
      city: string
      country: string
      countryCode: string
      terminal: string
    }
    dt: string
    at: string
    iand: boolean
    isRs: boolean
    sN: number
    ifo: boolean
    isbpo: boolean
    israa: boolean
    sid: number
  }>
}

export interface TravellerInfoExtended {
  ti: string
  fN: string
  lN: string
  pt: string
  ipct: boolean
  pnrDetails: Record<string, string>
  checkinStatusMap: Record<string, boolean>
  fd: {
    fC: {
      AT: number
      BF: number
      MF: number
      TF: number
      YQ: number
      MFT: number
      PSF: number
      RCF: number
      UDF: number
      AGST: number
      IGST: number
    }
    sfc: {
      BF: number
      UDF: number
      AGST: number
      RCF: number
      PSF: number
      YQ: number
      AT: number
    }
    bI: {
      iB: string
      cB: string
    }
    rT: number
    cc: string
    cB: string
    fB: string
    mI: boolean
  }
}

export interface BookingDetails {
  order: {
    bookingId: string
    amount: number
    markup: number
    deliveryInfo: {
      emails: string[]
      contacts: string[]
    }
    status: string
    createdOn: string
    isPassportConsentTaken: boolean
  }

  itemInfos: {
    AIR: {
      tripInfos: TripInfo[]
      travellerInfos: TravellerInfoExtended[] // ✅ Updated
      totalPriceInfo: {
        totalFareDetail: {
          fC: {
            BF: number
            IGST: number
            TAF: number
            TF: number
            NF: number
          }
          afC: {
            TAF: {
              MFT: number
              AGST: number
              MF: number
              OT: number
              YQ: number
            }
          }
        }
      }
    }
  }
  gstInfo: GstInfo
  isSotoBooking: boolean
  status: {
    success: boolean
    httpStatus: number
  }
}

export interface BookingDetailsData {
  _id: string
  txId: string
  sector: string
  jType: string
  paxNames: string[]
  numberOfPax: number
  amount: number
  ssrAmount: number | null
  insuranceAmount: number | null
  pgCharges: number | null
  carrier: string
  company: string
  department: string | null
  gdsPnr: string
  aPnr: string
  jDate: string
  bookStatus: string
  erpReference: string | null
  bookedById: string
  bookingType: string | null
  supplier: string
  supplierName: string
  bookingChannel: string | null
  domint: string | null
  isPassThrough: boolean
  originalRequest: {
    bookingId: string
    paymentInfos: { amount: number }[]
    travellerInfo: {
      ti: string
      fN: string
      lN: string
      pt: string
    }[]
    gstInfo: GstInfo
    deliveryInfo: {
      emails: string[]
      contacts: string[]
    }
  }
  response: {
    bookingId: string
    status: {
      success: boolean
      httpStatus: number
    }
  }
  txDateTime: string
  createdAt: string
  updatedAt: string
  __v: number
  bookingDetails: BookingDetails
}

export interface MyBookingsRequestData {
  selectType?: 'flightBookings' | 'flightCancellations'
  From?: string
  TO?: string
  pageNumber: number
  numberOfRows: number
  fromDate?: string
  toDate?: string
}

export interface GetMyBookingsFlightBookingDetails {
  TxID: string
  BookingDate: string
  Dept: string
  JDate: string // You can use Date if you'd prefer to work with Date objects.
  InvAmt: number
  FQ: number
  Comm: number
  BookedById: string
  BookedByName: string
  LeadPaxName: string
  Carrier: string
  'Origin - Dstn': string // This can be renamed to `originDstn` for better readability
  PNR: string
  Status: 'CONFIRMED' | 'CANCELLED' | 'PENDING' // You can define more status values if needed
  Agent: string
}

export interface MyBookingsFilterValues {
  selectType?:
    | [{ value: 'flightBookings' | 'flightCancellations'; label: string }]
    | null
  fromDate?: string
  toDate?: string
  pageNumber: number
  numberOfRows: number
}

export interface TransactionData {
  Date: string // e.g., "22/10/2024"
  Type: 'Deposit' | 'Withdrawal' | 'Transfer' // Adjust if there are other types
  txReference: string // e.g., "DEP1729616025889"
  debit: number
  credit: number
  balance: number
  paxName: string // e.g., "Account Credit"
}
