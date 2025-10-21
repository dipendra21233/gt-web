import { all } from 'redux-saga/effects'
import { accountingSaga } from './accounting.saga'
import { authApiSaga } from './auth.saga'
import { balanceSaga } from './balance.saga'
import { couponSaga } from './coupon.saga'
import { flightBookingApiSaga } from './flightBooking.saga'
import passangerFareSummarySaga from './passangerFareSummary.saga'
import { userApiSaga } from './user.saga'

export function* rootSaga() {
  try {
    yield all([
      authApiSaga(),
      userApiSaga(),
      flightBookingApiSaga(),
      couponSaga(),
      accountingSaga(),
      balanceSaga(),
      passangerFareSummarySaga(),
    ])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {}
}
