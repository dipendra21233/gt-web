import { ManageUserPermissions, PaginationProps, UserBEData, UserData } from '@/types/module/adminModules/userModule'
import { StringType } from './common.actions'
import { UserRegistration } from '@/types/module/authModule'


export interface UserListDataSuccessAction {
    type: string
    payload: UserBEData
}

export interface ManageUserAccessAction {
    type: string
    payload: ManageUserPermissions
    callBack: (res: boolean) => void
}

export interface GetSelectedUserListDataSuccessAction {
    type: string
    payload: UserData
}

export interface UserListData {
    type: string
    userId?: string
    pageNo?: number,
}

export interface UserListPaginationData {
    type: string
    payload: PaginationProps
}

export interface UserListFailureAction {
    type: string
    error: Error
}

export interface UpdateUserDataAction {
    type: string
    userId?: string
    payload: Partial<UserRegistration>
    callBack: (res: boolean) => void
}

export interface UpdateUserDataActionSuccess {
    type: string
    payload: UserRegistration
}

export type UserActionTypes =
    | StringType
    | UserListDataSuccessAction
    | UserListFailureAction
    | UserListData
    | GetSelectedUserListDataSuccessAction
    | ManageUserAccessAction
    | UserListPaginationData
    | UpdateUserDataAction
    | UpdateUserDataActionSuccess
