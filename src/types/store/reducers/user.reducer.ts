import { UserBEData, UserData } from "@/types/module/adminModules/userModule"

export interface UserReducerData {
    loading: boolean
    data: UserBEData | null
    selectedUserData?: UserData | null
    currentUserStatus?: string | null
    currentUserData?: UserData | null
    error: Error | null
}
