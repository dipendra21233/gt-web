import { ForgotPasswordPrpops, LoginPrpops, UserRegistration, VerifyOtpPrpops } from '@/types/module/authModule'
import { StringType } from './common.actions'

export interface Login {
    type: string
    payload: LoginPrpops
    callBack: (res: boolean) => void
}

export interface VerifyOtpAction {
    type: string
    payload: VerifyOtpPrpops
    callBack: (res: boolean) => void
}
export interface ForgotPasswordAction {
    type: string
    payload: ForgotPasswordPrpops
    callBack: (res: boolean) => void
}
export interface VerifyOtpSuccessAction {
    type: string
    payload: VerifyOtpPrpops
}

export interface LoginSuccessAction {
    type: string
    payload: LoginPrpops
}


export interface Signup {
    type: string
    payload: UserRegistration
    callBack: (res: boolean) => void
}

export interface SignupSuccessAction {
    type: string
    payload: any
}
export interface LoginFailureAction {
    type: string
    error: Error
}

export interface Logout {
    type: string
    payload: string
    callBack: (res: boolean) => void
}

export interface LogoutSuccessAction {
    type: string
}

export interface LogoutFailureAction {
    type: string
    error: Error
}

export type AuthActionTypes =
    | StringType
    | LoginSuccessAction
    | LoginFailureAction
    | Signup
    | SignupSuccessAction
    | VerifyOtpAction
    | VerifyOtpSuccessAction
    | ForgotPasswordAction
    | LogoutSuccessAction
    | LogoutFailureAction
    | Logout
