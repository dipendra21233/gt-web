import { AxiosRequestConfig } from 'axios'
import { Placement } from 'rc-drawer/lib/DrawerPopup'
import { ReactNode } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'

export interface TermsCheckboxProps {
  wrapperSx?: ThemeUIStyleObject
  wrapperClass?: string
  textClass?: string
  text: string
  textVariant?: string
  termsLabel: string
  privacyLabel: string
  checked: boolean
  textSx?: ThemeUIStyleObject
  onChange: (value: boolean) => void
}

export enum RegisterAs {
  AGENT = 'Agent',
  ADMIN = 'Admin',
  DISTRIBUTOR = 'Distributor',
  NORMAL_USER = 'NormalUser',
  NORMAL_ADMIN = 'NormalAdmin',
}

export interface SpinnerProps {
  visible: boolean
  size?: number
  sx?: ThemeUIStyleObject
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  DEFAULT = 'default',
}

export interface ApiResponse<T> {
  statusCode: number
  data: T
  message: string
  success: boolean
}

export interface ErrorApiResponse {
  error: boolean
  message: string
  success: boolean
  status: number
}

export type PropsParam = {
  params: { [key: string]: string }
}

export interface CommonFillterData {
  label: string
  key: string
}

export interface NavItemsProps {
  name: string
  href: string
}

export interface Country {
  name: string
  isoCode: string
  flag: string
  phonecode: string
  currency: string
  latitude: string
  longitude: string
  timezones: Timezone[]
}

export interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

export interface QueryValue {
  name?: string
  [key: string]: string | undefined
}

export interface QueryParameter {
  key: string
  value: string
}
export interface AdminHeaderProps {
  icon: string | ReactNode
  label: string
  className?: string
  onClick?: () => void
  href?: string
}

export interface CommonConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onClickSubmit: () => void
  closeIcon?: string
  modalContainer?: string
  wrapperClass?: string
  submitButtonText?: string
  title: string
  description: string
  isLoading: boolean
  showCloseIcon?: boolean
  modal?: React.CSSProperties
}

export type CaseType =
  | 'toUpperCase'
  | 'toLowerCase'
  | 'capitalize'
  | 'camelCase'
  | 'kebabCase'
  | 'snakeCase'
  | 'titleCase'

export interface TransformCaseOptions {
  value: string
  caseType: CaseType
}

export interface CityOption {
  value: string
  label: string
  code: string
  customLabel?: string
  customLabelVariant?: string
}

export interface CommonDrawerModalProps {
  open: boolean
  loading?: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  width?: number | string
  height?: number 
  footer?: ReactNode
  placement?: Placement
  className?: string
  // styles?: DrawerStyles
}

interface AxiosErrorResponseData {
  message: string
  data: string
  status: boolean
}

export interface AxiosErrorResponse {
  message: string
  name: string
  code: string
  config: AxiosRequestConfig
  request: Record<string, unknown>
  response: AxiosErrorResponseData
  status: number
  statusText: string
  userMessage: string
  timestamp: string
}

export interface PassengerDetails {
  title: string
  firstName: string
  lastName: string
  frequentFlierNumber?: string
  email?: string
  mobile?: string
  dateOfBirth: string
}

export interface PassengerFormValues {
  adults: PassengerDetails[]
  children: PassengerDetails[]
  infants: PassengerDetails[]
  contactDetails: {
    email: string
    mobile: string
  }
  payment: {
    method: 'Deposit' | 'DebitCard' | 'CreditCard' | 'NetBanking' | 'UPI'
    termsAccepted: boolean
  }
  gst: {
    corporate: string
    number: string
    email: string
    phone: string
    address: string
    company: string
    search: string
  }
}

export interface TransactionResponse {
  ResponseCode: 'E000' | string
  UniqueRefNumber: string
  ServiceTaxAmount: number
  ProcessingFeeAmount: number
  TotalAmount: number
  TransactionAmount: number
  TransactionDate: string // should be parsed from string
  InterchangeValue?: string
  TDR?: string
  PaymentMode: 'NET_BANKING' | string
  SubMerchantId: string
  ReferenceNo: string
  ID: string
  RS: string
  TPS: 'Y' | 'N' | string
}
