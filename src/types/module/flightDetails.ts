
export interface FlightDetails {
  tripInfos: TripInfo[];
  searchQuery: SearchQuery;
  bookingId: string;
  totalPriceInfo: TotalPriceInfo;
  status: Status;
  conditions: Conditions;
}

interface TripInfo {
  sI: SegmentInfo[];
  totalPriceList: TotalPrice[];
}

interface SegmentInfo {
  id: string;
  fD: FlightData;
  stops: number;
  so: any[];
  duration: number;
  da: AirportInfo;
  aa: AirportInfo;
  dt: string;
  at: string;
  iand: boolean;
  isRs: boolean;
  sN: number;
  ssrInfo: SSRInfo;
  ac: any[];
}

interface FlightData {
  aI: AirlineInfo;
  fN: string;
  eT: string;
}

interface AirlineInfo {
  code: string;
  name: string;
  isLcc: boolean;
}

interface AirportInfo {
  code: string;
  name: string;
  cityCode: string;
  city: string;
  country: string;
  countryCode: string;
  terminal?: string;
}

interface SSRInfo {
  BAGGAGE: Baggage[];
}

interface Baggage {
  code: string;
  amount: number;
  desc: string;
  iswca: boolean;
}

interface TotalPrice {
  fd: FareDetails;
  fareIdentifier: string;
  id: string;
  messages: any[];
  pc: AirlineInfo;
  fareRuleInformation: FareRuleInformation;
}

interface FareDetails {
  ADULT: FareCategory;
  INFANT: FareCategory;
  CHILD: FareCategory;
}

interface FareCategory {
  fC: FareCost;
  afC?: AdditionalFareCost;
  bI: BaggageInfo;
  rT: number;
  cc?: string;
  cB?: string;
  fB?: string;
  mI: boolean;
}

interface FareCost {
  BF: number;
  TAF?: number;
  TF: number;
  NF: number;
}

interface AdditionalFareCost {
  TAF: TaxAndFees;
}

interface TaxAndFees {
  AGST: number;
  OT: number;
  YQ: number;
}

interface BaggageInfo {
  iB?: string;
  cB: string;
}

interface FareRuleInformation {
  fr: any;
  tfr: TravelFareRules;
}

interface TravelFareRules {
  NO_SHOW: Policy[];
  DATECHANGE: ChangePolicy[];
  CANCELLATION: ChangePolicy[];
  SEAT_CHARGEABLE: Policy[];
}

interface Policy {
  policyInfo: string;
  st: string;
  et: string;
}

interface ChangePolicy extends Policy {
  amount: number;
  fcs: FareChangeStructure;
}

interface FareChangeStructure {
  ARF?: number;
  ARFT?: number;
  ACF?: number;
  ACFT?: number;
}

interface SearchQuery {
  routeInfos: RouteInfo[];
  cabinClass: string;
  paxInfo: PassengerInfo;
  requestId: string;
  searchType: string;
  searchModifiers: SearchModifiers;
  isDomestic: boolean;
}

interface RouteInfo {
  fromCityOrAirport: CityOrAirport;
  toCityOrAirport: CityOrAirport;
  travelDate: string;
}

interface CityOrAirport {
  code: string;
  name: string;
  cityCode: string;
  city: string;
  country: string;
  countryCode: string;
}

interface PassengerInfo {
  ADULT: number;
  CHILD: number;
  INFANT: number;
}

interface SearchModifiers {
  pft: string;
  pfts: string[];
}

interface TotalPriceInfo {
  totalFareDetail: TotalFareDetail;
}

interface TotalFareDetail {
  fC: FareCost;
  afC: AdditionalFareCost;
}

interface Status {
  success: boolean;
  httpStatus: number;
}

interface Conditions {
  ffas: any[];
  isa: boolean;
  dob: DateOfBirth;
  iecr: boolean;
  dc: DocumentConditions;
  ipa: boolean;
  addOns: AddOns;
  iss: boolean;
  fsc: FareStructureConditions;
  isBA: boolean;
  st: number;
  sct: string;
  gst: GSTConditions;
}

interface DateOfBirth {
  adobr: boolean;
  cdobr: boolean;
  idobr: boolean;
}

interface DocumentConditions {
  ida: boolean;
  idm: boolean;
  iqpe: boolean;
}

interface AddOns {
  isbpa: boolean;
}

interface FareStructureConditions {
  ismi: boolean;
  issi: boolean;
  isbi: boolean;
}

interface GSTConditions {
  gstappl: boolean;
  igm: boolean;
}


export interface BookingDetails {
  bookingId: string;
  travellerInfo: TravellerInfo[];
  gstInfo: GSTInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfos: PaymentInfo[];
}

interface TravellerInfo {
  ti: string; // Title
  fN: string; // First Name
  lN: string; // Last Name
  pt: string; // Passenger Type
}

interface GSTInfo {
  gstNumber: string;
  email: string;
  registeredName: string;
  mobile: string;
  address: string;
}

interface DeliveryInfo {
  emails: string[];
  contacts: string[];
}

interface PaymentInfo {
  amount: number;
}
