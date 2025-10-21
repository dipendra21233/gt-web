import { DateRange } from 'react-day-picker'

export interface CalendarPriceData {
  date: string // ISO date string (YYYY-MM-DD)
  price: number
  currency?: string
  isCheapest?: boolean
  isHighest?: boolean
  isAverage?: boolean
}

export interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  priceData?: CalendarPriceData[]
  showPrices?: boolean
  currency?: string
  className?: string
  disabled?: boolean
  fromDate?: Date
  toDate?: Date
  mode?: 'single' | 'range'
  range?: DateRange
  onRangeSelect?: (range: DateRange | undefined) => void
}

export interface CalendarLegendItem {
  label: string
  color: string
  description?: string
}

export interface CalendarLegendProps {
  items: CalendarLegendItem[]
  className?: string
}
