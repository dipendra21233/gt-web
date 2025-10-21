import { AuthReducerData } from '@/types/store/reducers/auth.reducer'
import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, LOGOUT_FAILURE, LOGOUT_SUCCESS, REQUEST_LOGIN, REQUEST_SIGNUP, RESEND_OTP, RESEND_OTP_SUCCESS, SIGNUP_SUCCESS, VERIFY_OTP, VERIFY_OTP_FAILURE, VERIFY_OTP_SUCCESS } from '../../utils/storeTypes'
import { AuthActionTypes } from '@/types/store/action/auth.action'
import { LoginPrpops, UserRegistration, VerifyOtpPrpops } from '@/types/module/authModule'

const initialState: AuthReducerData = {
    loading: false,
    data: null,
    loginData: null,
    error: null,
}

export const authReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthReducerData => {
    switch (action.type) {
        case REQUEST_SIGNUP:
            return { ...state, loading: true, error: null }
        case SIGNUP_SUCCESS:
            if ('payload' in action && action.payload as UserRegistration) {
                return { ...state, loading: false, data: action.payload, error: null }
            }
            return state
        case REQUEST_LOGIN:
            return { ...state, loading: true, error: null }
        case LOGIN_SUCCESS:
            if ('payload' in action && action.payload as LoginPrpops) {
                return { ...state, loading: false, loginData: action.payload, error: null }
            }
            return state
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
            }
        case VERIFY_OTP:
            return { ...state, loading: true, error: null }
        case FORGOT_PASSWORD:
            return { ...state, loading: true, error: null }
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, loading: false, error: null }
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
            }
        case VERIFY_OTP_SUCCESS:
            if ('payload' in action && action.payload as VerifyOtpPrpops) {
                return { ...state, loading: false, loginData: action.payload, error: null }
            }
            return state
        case RESEND_OTP:
            return { ...state, loading: true, error: null }
        case RESEND_OTP_SUCCESS:
            return { ...state, loading: false, error: null }
        case VERIFY_OTP_FAILURE:
            return {
                ...state,
                loading: false,
            }
        case LOGOUT:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

