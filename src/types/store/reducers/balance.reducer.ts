import { Balance } from '@/types/module/adminModules/balanceModule'

export interface BalanceReducerData {
  loading: boolean
  balanceData?: Balance | null
  error: Error | null
}
