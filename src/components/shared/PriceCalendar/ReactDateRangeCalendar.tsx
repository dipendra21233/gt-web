"use client"

import { CalendarPriceData } from '@/types/module/calendar'
import { cn } from '@/utils/functions'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange, RangeKeyDict } from 'react-date-range'

interface ReactDateRangeCalendarProps {
  selected?: Date | { from: Date | undefined; to: Date | undefined }
  onSelect?: (date: Date | undefined) => void | ((range: { from: Date | undefined; to: Date | undefined }) => void)
  priceData?: CalendarPriceData[]
  showPrices?: boolean
  currency?: string
  className?: string
  disabled?: boolean
  fromDate?: Date
  toDate?: Date
  mode?: 'single' | 'range'
}

export function ReactDateRangeCalendar({
  selected,
  onSelect,
  priceData = [],
  showPrices = true,
  currency = '₹',
  className,
  fromDate,
  toDate,
  mode = 'single',
  ...props
}: ReactDateRangeCalendarProps) {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string;
  }>({
    startDate: mode === 'single' ? (selected as Date) : (selected as { from: Date | undefined; to: Date | undefined })?.from,
    endDate: mode === 'single' ? (selected as Date) : (selected as { from: Date | undefined; to: Date | undefined })?.to,
    key: 'selection'
  })

  // Update internal state when selected prop changes
  useEffect(() => {
    if (mode === 'single') {
      setDateRange({
        startDate: selected as Date,
        endDate: selected as Date,
        key: 'selection'
      })
    } else {
      const range = selected as { from: Date | undefined; to: Date | undefined }
      setDateRange({
        startDate: range?.from,
        endDate: range?.to,
        key: 'selection'
      })
    }
  }, [selected, mode])

  // Helper function to get price for a specific date
  const getPriceForDate = (date: Date): CalendarPriceData | undefined => {
    const dateString = format(date, 'yyyy-MM-dd')
    return priceData.find(item => item.date === dateString)
  }

  // Helper function to format price
  const formatPrice = (price: number): string => {
    return `${currency} ${price.toLocaleString()}`
  }

  // Custom day content renderer
  const renderCustomDayContent = (day: Date) => {
    const priceInfo = getPriceForDate(day)
    const isSelected = mode === 'single'
      ? dateRange.startDate && format(dateRange.startDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      : (dateRange.startDate && format(dateRange.startDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')) ||
      (dateRange.endDate && format(dateRange.endDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className={cn(
          "text-sm font-medium",
          isSelected && "text-white"
        )}>
          {day.getDate()}
        </span>
        {showPrices && priceInfo && (
          <span className={cn(
            "text-xs font-normal mt-0.5",
            isSelected ? "text-white" : "text-gray-600",
            priceInfo.isCheapest && !isSelected && "text-green-600 font-semibold",
            priceInfo.isHighest && !isSelected && "text-red-600 font-semibold",
            priceInfo.isAverage && !isSelected && "text-gray-500"
          )}>
            {formatPrice(priceInfo.price)}
          </span>
        )}
      </div>
    )
  }

  const handleDateChange = (ranges: RangeKeyDict) => {
    const range = ranges.selection
    setDateRange({
      startDate: range.startDate,
      endDate: range.endDate,
      key: range.key || 'selection'
    })

    if (mode === 'single') {
      if (typeof onSelect === 'function') {
        onSelect(range.startDate as Date | undefined)
      }
    } else {
      if (typeof onSelect === 'function') {
        (onSelect as any)({
          from: range.startDate,
          to: range.endDate
        })
      }
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <DateRange
        ranges={[dateRange]}
        onChange={handleDateChange}
        showDateDisplay={false}
        showMonthAndYearPickers={true}
        showPreview={false}
        minDate={fromDate}
        maxDate={toDate}
        rangeColors={['#f97316']} // Orange color for selection
        color="#f97316"
        dayContentRenderer={renderCustomDayContent}
        className="w-full"
        {...props}
      />
    </div>
  )
}

// Legend component for price indicators
interface CalendarLegendProps {
  className?: string
}

export function CalendarLegend({ className }: CalendarLegendProps) {
  const legendItems = [
    { label: 'Cheapest', color: 'bg-green-500', textColor: 'text-green-600' },
    { label: 'Highest', color: 'bg-red-500', textColor: 'text-red-600' },
    { label: 'Average', color: 'bg-gray-500', textColor: 'text-gray-500' },
  ]

  return (
    <div className={cn('flex items-center gap-4 mt-4', className)}>
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={cn('w-3 h-3 rounded-sm', item.color)} />
          <span className={cn('text-sm font-medium', item.textColor)}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// Export the main calendar component
export { ReactDateRangeCalendar as Calendar }
