import { AccountingReducerData } from './accounting.reducer'
import { AuthReducerData } from './auth.reducer'
import { BalanceReducerData } from './balance.reducer'
import { CouponReducerData } from './coupon.reducer'
import {
  filterFlightSLice,
  FlightBookingReducerReducerData,
} from './flightBooking.reducer'
import { UserReducerData } from './user.reducer'

export interface MainStoreType {
  authUserData: AuthReducerData
  userData: UserReducerData
  flightBookingData: FlightBookingReducerReducerData
  couponData: CouponReducerData
  accountingData: AccountingReducerData
  balanceData: BalanceReducerData
  filterFlightData: filterFlightSLice
}
