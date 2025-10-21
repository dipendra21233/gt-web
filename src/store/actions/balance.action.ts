import { Balance } from '@/types/module/adminModules/balanceModule'
import {
  ADD_BALANCE,
  GET_BALANCE,
  GET_BALANCE_FAILURE,
  GET_BALANCE_SUCCESS,
} from '@/utils/storeTypes'

export const addBalance = (data: Balance, callBack: (res: boolean) => void) => {
  return {
    type: ADD_BALANCE,
    payload: data,
    callBack,
  }
}

export const getBalance = (data?: { userId: string }) => {
  return {
    type: GET_BALANCE,
    payload: data,
  }
}

export const getBalanceSuccess = (data: Balance) => ({
  type: GET_BALANCE_SUCCESS,
  payload: data,
})

export const getBalanceFailureAction = (error: any) => ({
  type: GET_BALANCE_FAILURE,
  payload: error,
})
