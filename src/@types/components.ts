declare module 'components' {
    import { Fare, FlightListingDataProps } from "@/types/module/flightSearch";
    import { SvgFileName } from "airlinedata";
    export type PaymentMethod =
        | 'visa'
        | 'mastercard'
        | 'amex'
        | 'discover'
        | 'paypal'
        | 'unionpay'
        | 'maestro'
        | 'mir'
        | 'hiper'
        | 'hipercard'
        | 'jcb'
        | 'elo'
        | 'diners'
        | 'alipay'
        | 'generic'
        | 'code'
        | 'code-front';

    export interface PaymentLogoProps {
        method: PaymentMethod;
        width?: number;
        height?: number;
        className?: string;
        alt?: string;
    }

    export type Varients = 'single' | 'dual'
    interface AirlinesLogosProps {
        names: SvgFileName; // If not provided, show all
        width?: number;
        height?: number;
        className?: string;
        imgClassName?: string;
    }
    interface CenterProps {
        children: React.ReactNode;
        className?: string;
    }
    export interface FlightDetailDrawerProps {
        open : boolean;
        onClose : () => void;
        flightData : FlightListingDataProps[]
        selectedFlightFare : Fare | null
    }

    export interface FlightBookingBarProps {
        varient: Varients ,
        flightData : FlightListingDataProps ,
        showDetails : (data: Fare) => void ,
        selectedFare : Fare ;
        index : number;
    }

    export interface FareCheckboxContainerProps{
        fares : Fare[];
        varient : Varients;
        isOverflow : boolean,
        scrollRef: React.RefObject<HTMLDivElement>
    }
}
