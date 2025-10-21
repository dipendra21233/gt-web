import {
  showErrorToast,
  showSuccessToast,
} from '@/components/web/core/Toast/CustomToast'
import { AddBalance, GetBalance } from '@/types/store/action/balance.action'
import { ADD_BALANCE, GET_BALANCE } from '@/utils/storeTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getBalanceFailureAction,
  getBalanceSuccess,
} from '../actions/balance.action'
import { addBalanceApi, getBalanceDataApi } from '../apis'

function* addBalanceWorker(action: AddBalance) {
  try {
    const response: AxiosResponse = yield call(addBalanceApi, action?.payload)

    if (response.status === 200) {
      action.callBack(true)
      showSuccessToast(response?.data.message)
    } else {
      action.callBack(false)
      yield put(getBalanceFailureAction(new Error(response.data.message)))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
      yield put(getBalanceFailureAction(error))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* fetchBalanceWorker(_action: GetBalance) {
  try {
    const response: AxiosResponse = yield call(getBalanceDataApi, {
      userId: '677f899d9028bf0e457b319e',
    })

    if (response.status === 200) {
      yield put(getBalanceSuccess(response?.data?.data))
    } else {
      yield put(getBalanceFailureAction(new Error(response.data.message)))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      showErrorToast(error?.response?.data?.message)
      yield put(getBalanceFailureAction(error))
    }
  }
}

export function* balanceSaga() {
  yield takeLatest(ADD_BALANCE, addBalanceWorker)
  yield takeLatest(GET_BALANCE, fetchBalanceWorker)
}
