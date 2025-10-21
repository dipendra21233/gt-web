import { Balance } from '@/types/module/adminModules/balanceModule'
import { BalanceActionTypes } from '@/types/store/action/balance.action'
import { BalanceReducerData } from '@/types/store/reducers/balance.reducer'
import {
  ADD_BALANCE,
  GET_BALANCE,
  GET_BALANCE_FAILURE,
  GET_BALANCE_SUCCESS,
} from '../../utils/storeTypes'

const initialState: BalanceReducerData = {
  loading: false,
  error: null,
  balanceData: null,
}

export const balanceReducer = (
  state = initialState,
  action: BalanceActionTypes
): BalanceReducerData => {
  switch (action.type) {
    case ADD_BALANCE:
      return { ...state, loading: true, error: null }
    case GET_BALANCE:
      return { ...state, loading: true, error: null }
    case GET_BALANCE_SUCCESS:
      if ('payload' in action && (action?.payload as Balance)) {
        return {
          ...state,
          loading: false,
          balanceData: action?.payload as Balance,
          error: null,
        }
      }
      return state
    case GET_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
