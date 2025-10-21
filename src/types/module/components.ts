import { SvgFileName } from './airlinedata'

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
  | 'code-front'

export interface PaymentLogoProps {
  method: PaymentMethod
  width?: number
  height?: number
  className?: string
  alt?: string
}

export interface AirlinesLogosProps {
  names: SvgFileName // If not provided, show all
  width?: number
  height?: number
  className?: string
  imgClassName?: string
}
export interface CenterProps {
  children: React.ReactNode
  className?: string
}
