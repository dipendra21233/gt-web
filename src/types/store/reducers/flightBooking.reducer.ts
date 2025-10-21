import {
  Fare,
  FlightListingDataProps,
  FlightSearchResultData,
  FlightSegment,
} from '@/types/module/flightSearch';

export interface FlightBookingReducerReducerData {
  loading: boolean
  flightFiltersData?: Partial<FlightSearchResultData> | null
  getFlightListingData?: FlightListingDataProps[] | null
  error: Error | null,
}


export interface AirportInfo {
  id: string;
  ident: string;
  type: string;
  name: string;
  latitude_deg: string;
  longitude_deg: string;
  elevation_ft: string;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  scheduled_service: string;
  gps_code: string;
  iata_code: string;
  local_code: string;
  home_link: string;
  wikipedia_link: string;
  keywords: string;
}
export interface CountryInfo {
  code: string;
  continent: string;
  id: string;
  keywords: string;
  name: string;
  wikipedia_link: string;
}
export interface RegionInfo {
  code: string;
  continent: string;
  id: string;
  iso_country: string;
  keywords: string;
  local_code: string;
  name: string;
  wikipedia_link: string;
}

export type sorting = "Price" | "Fastest" | "Departure" | "Smart" | null
export interface FilterState {
  timeCategories: string[]
  stopsCategories: string[]
  fareTypes: string[]
  airlines: string[]
  priceRange: { min: number; max: number } | null
  durationCategories: string[]
  hasSeats: boolean | null
  hasBaggage: boolean | null
  hasMeal: boolean | null
}

export interface filterFlightSLice {
  loading : boolean;
  flightData : FlightListingDataProps[] | [];
  returnFlightData : FlightListingDataProps[] | [];
  filterFlightData : FlightListingDataProps[] | [];
  airlines : string[] | [];
  fromDestination : string | null;
  toDestination : string | null;
  depature : Date | null;
  returnFlight : Date | null,
  flightclass : string | null;
  airports : AirportInfo[] | null ;
  regions : CountryInfo[] | null ;
  countries : RegionInfo[] | null ;
  adult : number | null;
  child : number | null;
  infants : number | null;
  sorting : sorting;
  selectedFare : Fare | null;
  selectedFlight : FlightSegment | null;
  activeFilters: FilterState;
}
