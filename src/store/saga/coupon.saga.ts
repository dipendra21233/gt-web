import {
  showErrorToast,
  showSuccessToast,
} from '@/components/web/core/Toast/CustomToast'
import {
  AddCouponDetails,
  AddMarkupDetails,
  GetCouponDetails,
} from '@/types/store/action/coupon.action'
import {
  ADD_COUPON_DETAILS,
  ADD_MARKUP_DETAILS,
  GET_COUPON_DETAILS,
  GET_MARKUP_DETAILS,
} from '@/utils/storeTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  addMarkupDetailsSuccess,
  getCouponDetailsFailureAction,
  getCouponDetailsSuccess,
  getMarkupDetailsSuccess,
} from '../actions/coupon.action'
import {
  addCouponDetailsApi,
  addMarkupDetailsApi,
  getCouponDetailsDataApi,
  getMarkupDetailsDataApi,
} from '../apis'

function* addCouponDetailsWorker(action: AddCouponDetails) {
  try {
    const response: AxiosResponse = yield call(
      addCouponDetailsApi,
      action?.payload
    )

    if (response.status === 201) {
      action.callBack(true)
      showSuccessToast(response?.data.message)
    } else {
      action.callBack(false)
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
    }
  }
}

function* fetchCouponDetailsWorker(action: GetCouponDetails) {
  try {
    const response: AxiosResponse = yield call(
      getCouponDetailsDataApi as any,
      action?.payload
    )
    if (response.status === 200) {
      yield put(getCouponDetailsSuccess(response?.data?.data))
    } else {
      yield put(getCouponDetailsFailureAction(new Error(response.data.message)))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      showErrorToast(error?.response?.data?.message)
      yield put(getCouponDetailsFailureAction(error))
    }
  }
}

function* fetchMarkupDetailsWorker() {
  try {
    const response: AxiosResponse = yield call(getMarkupDetailsDataApi)
    if (response.status === 200) {
      yield put(getMarkupDetailsSuccess(response?.data?.data))
    } else {
      yield put(getCouponDetailsFailureAction(new Error(response.data.message)))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      showErrorToast(error?.response?.data?.message)
      yield put(getCouponDetailsFailureAction(error))
    }
  }
}

function* addMarkupDetailsWorker(action: AddMarkupDetails) {
  try {
    const response: AxiosResponse = yield call(
      addMarkupDetailsApi,
      action?.payload
    )

    if (response.status === 201) {
      action.callBack(true)
      showSuccessToast(response?.data.message)
      yield put(addMarkupDetailsSuccess(response?.data?.data))
    } else {
      action.callBack(false)
      yield put(getCouponDetailsFailureAction(new Error(response.data.message)))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
      yield put(getCouponDetailsFailureAction(error))
    }
  }
}
export function* couponSaga() {
  yield takeLatest(ADD_COUPON_DETAILS, addCouponDetailsWorker)
  yield takeLatest(GET_COUPON_DETAILS, fetchCouponDetailsWorker)
  yield takeLatest(GET_MARKUP_DETAILS, fetchMarkupDetailsWorker)
  yield takeLatest(ADD_MARKUP_DETAILS, addMarkupDetailsWorker)
}
