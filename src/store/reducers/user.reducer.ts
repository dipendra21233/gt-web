import { GET_CURRENT_USER_DATA, GET_CURRENT_USER_DATA_SUCCESS, GET_SELECTED_USER_DATA, GET_USER_REQUESTS, GET_USER_REQUESTS_FAILURE, GET_USER_REQUESTS_SUCCESS, MANAGE_USER_ACCESS, MANAGE_USER_ACCESS_SUCCESS, SET_CURRENT_USER_STATUS, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS } from '../../utils/storeTypes'
import { UserReducerData } from '@/types/store/reducers/user.reducer'
import { UserActionTypes } from '@/types/store/action/user.action'
import { UserBEData, UserData } from '@/types/module/adminModules/userModule'

const initialState: UserReducerData = {
    loading: false,
    data: null,
    currentUserData: null,
    currentUserStatus: 'all',
    error: null,
}

export const userReducer = (
    state = initialState,
    action: UserActionTypes
): UserReducerData => {
    switch (action.type) {
        case GET_USER_REQUESTS:
            return { ...state, loading: true, error: null }
        case GET_USER_REQUESTS_SUCCESS:
            if ('payload' in action && action.payload !== null) {
                return {
                    ...state,
                    loading: false,
                    data: action.payload as UserBEData,
                    error: null,
                };
            }
            return state
        case SET_CURRENT_USER_STATUS:
            if ('payload' in action && action?.payload) {
                const currentUserStatus = action.payload as string
                return { ...state, loading: false, error: null, currentUserStatus }
            }
            return state
        case GET_CURRENT_USER_DATA:
            return { ...state, loading: true, error: null }
        case GET_CURRENT_USER_DATA_SUCCESS:
            if ('payload' in action && action?.payload) {
                return { ...state, loading: false, currentUserData: action.payload as UserData, error: null }
            }
            return state
        case MANAGE_USER_ACCESS:
            return { ...state, loading: true, error: null }
        case MANAGE_USER_ACCESS_SUCCESS:
            return { ...state, loading: false, error: null }
        case GET_SELECTED_USER_DATA:
            if ('payload' in action && action?.payload) {
                return { ...state, loading: false, selectedUserData: action.payload as UserData, error: null }
            }
            return state
        case UPDATE_USER_DATA:
            return { ...state, loading: true, error: null }
        case UPDATE_USER_DATA_SUCCESS:
            return { ...state, loading: false, error: null }
        case GET_USER_REQUESTS_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

