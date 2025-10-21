import { ManageUserPermissions, PaginationProps, UserBEData, UserData } from "@/types/module/adminModules/userModule"
import { UserRegistration } from "@/types/module/authModule"
import { StringType } from "@/types/store/action/common.actions"
import { GetSelectedUserListDataSuccessAction, UserListDataSuccessAction, UserListFailureAction } from "@/types/store/action/user.action"
import { GET_CURRENT_USER_DATA, GET_CURRENT_USER_DATA_SUCCESS, GET_SELECTED_USER_DATA, GET_USER_REQUESTS, GET_USER_REQUESTS_FAILURE, GET_USER_REQUESTS_SUCCESS, MANAGE_USER_ACCESS, MANAGE_USER_ACCESS_SUCCESS, SET_CURRENT_USER_STATUS, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS } from "@/utils/storeTypes"

export const getUsersData = (userData?: PaginationProps) => ({
    type: GET_USER_REQUESTS,
    payload: userData,
})

export const getUsersDataSuccess = (data: UserBEData): UserListDataSuccessAction => ({
    type: GET_USER_REQUESTS_SUCCESS,
    payload: data,
})

export const getCurrentUsersData = () => ({ type: GET_CURRENT_USER_DATA })

export const getCurrentUsersDataSuccess = (data: UserData) => ({
    type: GET_CURRENT_USER_DATA_SUCCESS,
    payload: data,
})

export const manageUserAccess = (
    data: ManageUserPermissions,
    callBack: (res: boolean) => void
) => {
    return {
        type: MANAGE_USER_ACCESS,
        payload: data,
        callBack,
    }
}

export const manageUserAccessSuccess = (): StringType => ({
    type: MANAGE_USER_ACCESS_SUCCESS,
})


export const getSelectedUsersDataSuccess = (data: UserData): GetSelectedUserListDataSuccessAction => ({
    type: GET_SELECTED_USER_DATA,
    payload: data,
})

export const getUsersFailureAction = (
    error: Error
): UserListFailureAction => ({
    type: GET_USER_REQUESTS_FAILURE,
    error,
})

export const setCurrentUserStatus = (
    data: string
) => {
    return {
        type: SET_CURRENT_USER_STATUS,
        payload: data,
    }
}


export const updateUserData = (
    userId: string,
    data: Partial<UserRegistration>,
    callBack: (res: boolean) => void
) => {
    return {
        type: UPDATE_USER_DATA,
        userId,
        payload: data,
        callBack,
    }
}

export const updateUserDataSuccess = (): StringType => ({
    type: UPDATE_USER_DATA_SUCCESS,
})
