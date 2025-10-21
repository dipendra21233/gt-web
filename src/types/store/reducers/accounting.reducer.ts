import { BookingDetailsDataProps } from '@/types/module/adminModules/bookingDetailsModule'
import { BookingDetailsData } from '@/types/module/adminModules/myBookingModule'

export interface AccountingReducerData {
  loading: boolean
  bookingDetailsData?: BookingDetailsData[] | null
  myBookingDetailsData?: BookingDetailsDataProps | null
  myssBookingDetailsData?: BookingDetailsDataProps | null
  error: Error | null
}
