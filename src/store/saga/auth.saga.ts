import {
  showErrorToast,
  showSuccessToast,
} from '@/components/web/core/Toast/CustomToast'
import { ConvertAuthData } from '@/serializer/auth.serializer'
import {
  ForgotPasswordAction,
  Login,
  Logout,
  Signup,
  VerifyOtpAction,
} from '@/types/store/action/auth.action'
import { ACCESS_TOKEN, IS_ADMIN_USER } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import {
  FORGOT_PASSWORD,
  LOGOUT,
  REQUEST_LOGIN,
  REQUEST_SIGNUP,
  RESEND_OTP,
  VERIFY_OTP,
} from '@/utils/storeTypes'
import { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  forgotPasswordFailureAction,
  forgotPasswordSuccessAction,
  loginFailureAction,
  loginSuccessAction,
  logoutFailure,
  logoutSuccess,
  resendOtpActionSuccess,
  signupSuccess,
  verifyOtpActionSuccess,
  verifyOtpFailureAction,
} from '../actions/auth.action'
import {
  forgotPasswordApi,
  loginApi,
  logoutUser,
  registerUserApi,
  resendOtpApi,
  verifyOtpApi,
} from '../apis'

function* signupWorker(action: Signup) {
  try {
    const userData = ConvertAuthData(action?.payload)
    const response: AxiosResponse = yield call(registerUserApi, userData)
    if (response.status === 200) {
      action.callBack(true)
      yield put(signupSuccess(action?.payload))
      showSuccessToast(response?.data.message)
    } else {
      action.callBack(false)
      yield put(loginFailureAction(new Error(response.data.message)))
      showErrorToast(response?.data.message)
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
    }
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(loginFailureAction(error))
    }
  }
}

function* loginWorker(action: Login) {
  try {
    const response: AxiosResponse = yield call(loginApi, action?.payload)
    if (response.status === 200) {
      action.callBack(true)
      yield put(loginSuccessAction(action?.payload))
      showSuccessToast(response?.data.message)
    } else {
      action.callBack(false)
      yield put(loginFailureAction(new Error(response.data.message)))
      showErrorToast(response?.data.message)
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
    }
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(loginFailureAction(error))
    }
  }
}

function* verifyOtpWorker(action: VerifyOtpAction) {
  try {
    const response: AxiosResponse = yield call(verifyOtpApi, action?.payload)
    if (response.status === 200) {
      action.callBack(true)

      // Set cookies with proper security options
      Cookies.set(ACCESS_TOKEN, response.data?.data.accessToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })

      // Convert boolean to string to match middleware expectations
      Cookies.set(
        IS_ADMIN_USER,
        response.data.data.user?.isAdmin ? 'true' : 'false',
        {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
        }
      )

      yield put(verifyOtpActionSuccess())
      showSuccessToast(response?.data.message)
      if (response?.data?.data?.user?.isAdmin) {
        window.location.href = appRoutes.userRequests as string
      }
    } else {
      action.callBack(false)
      yield put(verifyOtpFailureAction(new Error(response.data.message)))
      showErrorToast(response?.data.message)
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
    }
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(verifyOtpFailureAction(error))
    }
  }
}

function* resnedOtpWorker(action: VerifyOtpAction) {
  try {
    const response: AxiosResponse = yield call(resendOtpApi, action?.payload)
    if (response.status === 200) {
      action.callBack(true)
      yield put(resendOtpActionSuccess())
      showSuccessToast(response?.data.message)
    } else {
      action.callBack(false)
      yield put(verifyOtpFailureAction(new Error(response.data.message)))
      showErrorToast(response?.data.message)
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
    }
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(verifyOtpFailureAction(error))
    }
  }
}

function* forgotPasswordWorker(action: ForgotPasswordAction) {
  try {
    const response: AxiosResponse = yield call(
      forgotPasswordApi,
      action?.payload
    )
    if (response.status === 200) {
      action.callBack(true)
      yield put(forgotPasswordSuccessAction())
      showSuccessToast(response?.data.message)
    } else {
      showErrorToast(response?.data.message)
      action.callBack(false)
      yield put(forgotPasswordFailureAction(new Error(response.data.message)))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      action.callBack(false)
      showErrorToast(error?.response?.data?.message)
    }
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(forgotPasswordFailureAction(error))
    }
  }
}

function* logoutWorker(action: Logout) {
  try {
    const response: AxiosResponse = yield call(logoutUser, action.payload)
    if (response.status === 200) {
      action.callBack(true)
      yield put(logoutSuccess())
    } else {
      action.callBack(false)
      yield put(logoutFailure(new Error(response.data)))
    }
  } catch (error) {
    action.callBack(false)
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(logoutFailure(error))
    }
  }
}

export function* authApiSaga() {
  yield takeLatest(REQUEST_SIGNUP, signupWorker)
  yield takeLatest(REQUEST_LOGIN, loginWorker)
  yield takeLatest(VERIFY_OTP, verifyOtpWorker)
  yield takeLatest(RESEND_OTP, resnedOtpWorker)
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordWorker)
  yield takeLatest(LOGOUT, logoutWorker)
}
