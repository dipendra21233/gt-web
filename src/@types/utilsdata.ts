declare module 'utilsdata' {
    export interface AirlineTransformedPayload {
        bookingInfo: {
          bookingId: string;
          status: "SUCCESS" | "FAILED";
          isDomestic?: boolean;
          searchType?: string;
          cabinClass?: string;
        };
      
        flightDetails: {
          airline: {
            code?: string;
            name?: string;
            isLowCost?: boolean;
          };
          flightNumber?: string;
          aircraft?: string;
          duration?: string;
          durationMinutes?: number;
          stops?: number;
          isNonStop?: boolean;
        };
      
        route: {
          departure: {
            airportCode?: string;
            airportName?: string;
            city?: string;
            country?: string;
            terminal?: string;
            dateTime?: string;
            date?: string;
            time?: string;
          };
          arrival: {
            airportCode?: string;
            airportName?: string;
            city?: string;
            country?: string;
            terminal?: string;
            dateTime?: string;
            date?: string;
            time?: string;
          };
        };
      
        passengers: {
          adult: number;
          child: number;
          infant: number;
          total: number;
        };
      
        fareBreakdown: {
          adult?: FareDetails | null;
          child?: FareDetails | null;
          infant?: FareDetails | null;
        };
      
        totalPrice: {
          baseFare?: number;
          totalTaxes?: number;
          totalFare?: number;
          netPayable?: number;
          convenienceFee?: number;
          gst?: number;
        };
      
        taxBreakdown: {
          airportTax?: number;
          fuelTax?: number;
          serviceCharge?: number;
          otherTaxes?: number;
          facilityCharge?: number;
          medicalFacilityTax?: number;
        };
      
        addOnServices: {
          baggage: AddOnItem[];
          meals: AddOnItem[];
        };
      
        fareRules: {
          cancellation: {
            beforeDeparture24h: {
              fee: number;
              additionalFee: number;
            };
            after24h: {
              fee: number;
              additionalFee: number;
            };
          };
          dateChange: {
            beforeDeparture: {
              fee: number;
              additionalFee: number;
              policy: string;
            };
          };
        };
      
        additionalInfo: {
          fareType?: string;
          mealIncluded?: boolean;
          refundable?: boolean;
          bookingClass?: string;
          fareBase?: string;
        };
      
        saleSummary: {
          adult?: SaleSummaryDetails;
          child?: SaleSummaryDetails;
          infant?: SaleSummaryDetails;
          totalFare: { label: string; value: number }[];
          totalAmount: number;
        };
        
        supplier?: 'NEXUS' | 'TRIPJACK';
      }
      
      export interface FareDetails {
        publishedFare?: number;
        baseFare?: number;
        otTax?: number;
        k3AirlineGST?: number;
        fuelCharges?: number;
        airportTax?: number;
        facilityCharge?: number;
        medicalFacilityTax?: number;
        serviceCharge?: number;
        totalTaxes?: number;
        totalFare?: number;
        netFare?: number;
        convenienceFee?: number;
        convenienceGST?: number;
        markupFee?: number;
        markupGST?: number;
        airlineConvenienceFee?: number;
        baggage?: {
          checkedBaggage?: string;
          cabinBaggage?: string;
        };
        fareClass?: string;
        benefits?: string[] | null;
        perPassengerSummary?: {
          adult?: number;
          child?: number;
          infant?: number;
          otTax?: number;
          k3AirlineGST?: number;
          fuelCharges?: number;
          total?: number;
        };
      }
      
      export interface AddOnItem {
        code: string;
        description: string;
        price: number;
        currency: string;
      }
      
      export interface SaleSummaryDetails {
        baseFare?: number;
        otTax?: number;
        k3AirlineGST?: number;
        fuelCharges?: number;
        total?: number;
      }
      
}