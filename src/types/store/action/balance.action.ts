import { Balance } from '@/types/module/adminModules/balanceModule'
import { StringType } from './common.actions'

export interface AddBalance {
  type: string
  payload: Balance
  callBack: (res: boolean) => void
}

export interface GetBalance {
  type: string
  payload: { userId: string }
}

export interface GetBalanceSuccess {
  type: string
  payload: Balance
}

export type BalanceActionTypes = StringType | AddBalance | GetBalanceSuccess
