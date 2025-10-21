import { ReactNode } from 'react'

export interface MultiOption {
  title: string
  path: string
  icon: ReactNode | null
}

export interface SubOption {
  title: string
  path: string
  icon: ReactNode | null
  isMultiOption: boolean
  multiOption?: MultiOption[]
}

export interface MenuItemProps {
  title: string
  path: string
  icon: ReactNode | null
  isSubOption: boolean
  id: string
  subOption?: SubOption[]
}
