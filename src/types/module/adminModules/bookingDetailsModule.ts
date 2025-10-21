interface FlightInfo {
  id: string
  fD: {
    aI: {
      code: string
      name: string
      isLcc: boolean
    }
    fN: string
    eT: string
  }
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
}

interface TravellerInfo {
  checkinStatusMap: {
    [key: string]: boolean
  }
  fd: {
    fC: {
      AT: number
      BF: number
      OC: number
      TF: number
      YQ: number
      UDF: number
      AGST: number
    }
    sfc: {
      BF: number
      UDF: number
      AGST: number
      YQ: number
      AT: number
      OC: number
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
  ti: string
  pt: string
  fN: string
  lN: string
  ipct: boolean
}

interface TotalFareDetail {
  fC: {
    BF: number
    TAF: number
    TF: number
    NF: number
  }
  afC: {
    TAF: {
      AGST: number
      OT: number
      YQ: number
    }
  }
}

interface ItemInfos {
  AIR: {
    tripInfos: Array<{
      sI: FlightInfo[]
    }>
    travellerInfos: TravellerInfo[]
    totalPriceInfo: {
      totalFareDetail: TotalFareDetail
    }
  }
}

interface Order {
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

interface GstInfo {
  gstNumber: string
  email: string
  mobile: string
  address: string
  registeredName: string
  bookingId: string
  bookingUserId: string
  id: number
  info: object
}

interface Status {
  success: boolean
  httpStatus: number
}

export interface BookingDetailsDataProps {
  order: Order
  itemInfos: ItemInfos
  gstInfo: GstInfo
  isSotoBooking: boolean
  status: Status
}
