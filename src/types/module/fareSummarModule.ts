export interface FlightPriceRequest {
    priceIds: string[];
    query: {
      nAdt: number; // Number of adults
      nInf: number; // Number of infants
      nChd: number; // Number of children
      legs: {
        src: string; // Source airport code
        dst: string; // Destination airport code
        dep: string; // Departure date (DD/MM/YYYY)
      }[];
    };
    total_price: number;
    currency: string; // e.g., "INR", "USD"
  }
  