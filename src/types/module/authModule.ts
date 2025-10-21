import { TabType } from '@/hooks/useLoginForm'
import { FormikErrors, FormikTouched } from 'formik'
import { ApprovalStatus } from './adminModules/userModule'

export interface Field {
  name: string
  label: string
  value: string
  placeholder: string
  wrapperClass?: string
  autoFocus?: boolean
  firstInputBox?: boolean
  ref?: React.RefObject<HTMLInputElement>
  onFocus?: () => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: string) => void
  isShowRequired?: boolean
  isSearchable?: boolean
  type?: FieldType
  inputType?: string
  options?: string[] | Array<{ value: string; label: string }>
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[]
  isShow?: boolean
}

export enum FieldType {
  TEXT_INPUT_FIELD = 'TEXT_INPUT_FIELD',
  SELECT_INPUT_FIELD = 'SELECT_INPUT_FIELD',
  TIME_INPUT_FIELD = 'TIME_INPUT_FIELD',
  DATE_INPUT_FIELD = 'DATE_INPUT_FIELD',
}
export interface LoginPrpops {
  userName: string
  password?: string
}

export interface VerifyOtpPrpops {
  email: string
  otp?: string
}
export interface ForgotPasswordPrpops {
  emailOrMobile?: string
}
export interface Address {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pinCode: string
  country: string
}

export interface BackendUserRegistration {
  title: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  userName: string
  companyName: string
  registerAs: string
  panNumber: string
  nameOnPan: string
  address: Address
  landline: string
  faxNo: string
  gstNumber: string
  userTNC: boolean
}

export interface UserRegistration {
  title: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  userName: string
  companyName: string
  registerAs: string
  panNumber: string
  nameOnPan: string
  landline: string
  faxNo: string
  userTNC: boolean
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pinCode: string
  country: string
  gstNumber: string
  userId?: string
  approvalStatus?: ApprovalStatus
}

export interface VerifyOtp {
  userName: string
  otp: string
}

export enum AuthUserScreenType {
  OTP = 'OTP',
  LOGIN = 'LOGIN',
  RESET_PASSWORD = 'RESET_PASSWORD',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export interface LogoutProps {
  accessToken: string
}

export interface LoginFormData {
  userName: string
  password: string
  isShowOtp?: boolean
  isForgotPassword?: boolean
  email?: string
  mobileNumber?: string
  activeTab: TabType
  consentAccepted?: boolean
}
