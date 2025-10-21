import { LoginPrpops, UserRegistration } from "@/types/module/authModule"

export interface AuthReducerData {
    loading: boolean
    data?: UserRegistration | null
    loginData?: LoginPrpops | null
    error: Error | null
}
