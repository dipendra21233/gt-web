import {
    LoginPrpops,
    VerifyOtpPrpops,
    UserRegistration,
    ForgotPasswordPrpops
} from "@/types/module/authModule"
import {
    LoginFailureAction,
    LoginSuccessAction,
    LogoutFailureAction,
    LogoutSuccessAction,
    SignupSuccessAction
} from "@/types/store/action/auth.action"
import { StringType } from "@/types/store/action/common.actions"
import {
    REQUEST_LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REQUEST_SIGNUP,
    SIGNUP_SUCCESS,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from "@/utils/storeTypes"

export const requestLogin = (
    data: LoginPrpops,
    callBack: (res: boolean) => void
) => {
    return {
        type: REQUEST_LOGIN,
        payload: data,
        callBack,
    }
}

export const loginSuccessAction = (
    data: LoginPrpops
): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: data,
})

export const loginFailureAction = (
    error: Error
): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    error,
})


export const requestSignup = (
    data: UserRegistration,
    callBack: (res: boolean) => void
) => {
    return {
        type: REQUEST_SIGNUP,
        payload: data,
        callBack,
    }
}

export const signupSuccess = (
    data: UserRegistration
): SignupSuccessAction => ({
    type: SIGNUP_SUCCESS,
    payload: data,
})


export const verifyOtpAction = (
    data: VerifyOtpPrpops,
    callBack: (res: boolean) => void
) => {
    return {
        type: VERIFY_OTP,
        payload: data,
        callBack,
    }
}

export const verifyOtpActionSuccess = (): StringType => ({
    type: VERIFY_OTP_SUCCESS,
})

export const resendOtpAction = (
    data: VerifyOtpPrpops,
    callBack: (res: boolean) => void
) => {
    return {
        type: RESEND_OTP,
        payload: data,
        callBack,
    }
}

export const resendOtpActionSuccess = (): StringType => ({
    type: RESEND_OTP_SUCCESS,
})

export const forgotPasswordAction = (
    data: ForgotPasswordPrpops,
    callBack: (res: boolean) => void
) => {
    return {
        type: FORGOT_PASSWORD,
        payload: data,
        callBack,
    }
}

export const forgotPasswordSuccessAction = () => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
    }
}


export const forgotPasswordFailureAction = (
    error: Error
): LoginFailureAction => ({
    type: FORGOT_PASSWORD_FAILURE,
    error,
})

export const verifyOtpFailureAction = (
    error: Error
): LoginFailureAction => ({
    type: VERIFY_OTP_FAILURE,
    error,
})


export const logout = (
    accessToken: string,
    callBack: (res: boolean) => void
) => {
    return {
        type: LOGOUT,
        payload: accessToken,
        callBack,
    }
}

export const logoutSuccess = (): LogoutSuccessAction => ({
    type: LOGOUT_SUCCESS,
})

export const logoutFailure = (error: Error): LogoutFailureAction => ({
    type: LOGOUT_FAILURE,
    error,
})
