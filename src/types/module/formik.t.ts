import { CabinClass } from "@/types/module/flightSearch";

export interface flightSearchFormikValuesProps {
  cabinClass: CabinClass | null;
  child: number | null;
  adults: number | null;
  infants: number | null;
  fromCityAirport: string | null;
  toCityAirport: string | null;
  travelDate: Date | null;
  connectingFLightType : 'One way' | 'Round Trip'
}
