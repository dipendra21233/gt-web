import { GET_CURRENT_USER_DATA, GET_USER_REQUESTS, MANAGE_USER_ACCESS, UPDATE_USER_DATA } from "@/utils/storeTypes";
import { AxiosError, AxiosResponse } from "axios";
import { call, takeLatest, put } from 'redux-saga/effects';
import { editUserDetailsApi, getCurrentUserDataApi, getUserListApi, manageUserPermissionApi } from "../apis";
import { getCurrentUsersDataSuccess, getSelectedUsersDataSuccess, getUsersDataSuccess, getUsersFailureAction, manageUserAccessSuccess, updateUserDataSuccess } from "../actions/user.action";
import { ManageUserAccessAction, UpdateUserDataAction, UserListPaginationData } from "@/types/store/action/user.action";
import { showErrorToast, showSuccessToast } from "@/components/web/core/Toast/CustomToast";
import { PaginationProps } from "@/types/module/adminModules/userModule";
import { ConvertUpdateUserDataBE } from "@/serializer/user.serializer";

function* getUserListWorker(action: UserListPaginationData) {
    try {
        const response: AxiosResponse = yield call(getUserListApi, action?.payload as PaginationProps)
        if (response.status === 200) {
            yield put(getUsersDataSuccess(response?.data?.data))
            yield put(getSelectedUsersDataSuccess(response?.data?.data))
        } else {
            yield put(getUsersFailureAction(new Error(response.data.message)))
        }
    } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
            yield put(getUsersFailureAction(error))
        }
    }
}

function* manageUserAccessWorker(action: ManageUserAccessAction) {
    try {
        const response: AxiosResponse = yield call(manageUserPermissionApi, action?.payload)
        if (response.status === 200) {
            action.callBack(true)
            yield put(manageUserAccessSuccess())
            showSuccessToast(response?.data.message)
        } else {
            action.callBack(false)
            yield put(getUsersFailureAction(new Error(response.data.message)))
        }
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            action.callBack(false);
            showErrorToast(error?.response?.data?.message);
        }
        if (error instanceof Error || error instanceof AxiosError) {
            yield put(getUsersFailureAction(error))
        }
    }
}

function* getCurrentUserDataWorker() {
    try {
        const response: AxiosResponse = yield call(getCurrentUserDataApi)
        if (response.status === 200) {
            yield put(getCurrentUsersDataSuccess(response?.data?.data))
        } else {
            yield put(getUsersFailureAction(new Error(response.data.message)))
        }
    } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
            yield put(getUsersFailureAction(error))
        }
    }
}

function* updateUserDataWorker(action: UpdateUserDataAction) {
    try {
        const userData = ConvertUpdateUserDataBE(action?.userId as string, action?.payload)
        const response: AxiosResponse = yield call(editUserDetailsApi, userData)
        if (response.status === 200 && response?.data) {
            action.callBack(true)
            yield put(updateUserDataSuccess())
            showSuccessToast(response?.data.message)
        } else {
            action.callBack(false)
            yield put(getUsersFailureAction(new Error(response.data.message)))
        }
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            action.callBack(false);
            showErrorToast(error?.response?.data?.message);
        }
        if (error instanceof Error || error instanceof AxiosError) {
            yield put(getUsersFailureAction(error))
        }
    }
}

export function* userApiSaga() {
    yield takeLatest(GET_USER_REQUESTS, getUserListWorker)
    yield takeLatest(MANAGE_USER_ACCESS, manageUserAccessWorker)
    yield takeLatest(GET_CURRENT_USER_DATA, getCurrentUserDataWorker)
    yield takeLatest(UPDATE_USER_DATA, updateUserDataWorker)
}