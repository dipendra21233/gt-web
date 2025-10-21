"use client"

import { Calendar as ShadcnCalendar } from "@/components/ui/calendar"
import { CalendarPriceData } from "@/types/module/calendar"
import { cn } from "@/utils/functions"
import { format } from "date-fns"
import { DayButton } from "react-day-picker"

interface PriceCalendarProps {
  selected?: Date | { from: Date | undefined; to: Date | undefined }
  onSelect?: (date: Date | undefined) => void
  priceData?: CalendarPriceData[]
  showPrices?: boolean
  currency?: string
  className?: string
  disabled?: boolean
  fromDate?: Date
  toDate?: Date
  mode?: "single" | "range"
}

export function PriceCalendar({
  selected,
  onSelect,
  priceData = [],
  showPrices = true,
  currency = "₹",
  className,
  disabled,
  fromDate,
  toDate,
  mode = "single",
  ...props
}: PriceCalendarProps) {
  // Helper function to get price for a specific date
  const getPriceForDate = (date: Date): CalendarPriceData | undefined => {
    const dateString = format(date, "yyyy-MM-dd")
    return priceData.find(item => item.date === dateString)
  }

  // Helper function to format price
  const formatPrice = (price: number): string => {
    return `${currency} ${price.toLocaleString()}`
  }

  // Custom DayButton component with price display
  const CustomDayButton = (dayProps: any) => {
    const { day, modifiers, ...rest } = dayProps
    const priceInfo = getPriceForDate(day.date)

    return (
      <div className="relative w-full h-full">
        <DayButton
          {...dayProps}
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-full min-h-[2.5rem] p-0.5",
            modifiers.selected && "bg-orange-500 text-white rounded-full",
            modifiers.today && "bg-gray-100 text-gray-900",
            disabled && "opacity-50 cursor-not-allowed",
            dayProps.className
          )}
          {...rest}
        >
          <span className="text-sm font-medium">{day.date.getDate()}</span>
          {showPrices && priceInfo && (
            <span className={cn(
              "text-xs font-normal mt-0.5",
              modifiers.selected ? "text-white" : "text-gray-600",
              priceInfo.isCheapest && "text-green-600 font-semibold",
              priceInfo.isHighest && "text-red-600 font-semibold",
              priceInfo.isAverage && "text-gray-500"
            )}>
              {formatPrice(priceInfo.price)}
            </span>
          )}
        </DayButton>
      </div>
    )
  }

  return (
    <div className={cn("w-full max-h-[400px] overflow-hidden", className)}>
      {mode === 'single' ? (
        <ShadcnCalendar
          mode="single"
          selected={selected as Date}
          onSelect={onSelect}
          disabled={disabled}
          fromDate={fromDate}
          toDate={toDate}
          components={{
            DayButton: CustomDayButton,
          }}
          className="w-full h-full [--cell-size:2.5rem]"
          {...props}
        />
      ) : (
        <ShadcnCalendar
          mode="range"
          selected={selected as { from: Date | undefined; to: Date | undefined }}
          onSelect={onSelect as any}
          disabled={disabled}
          fromDate={fromDate}
          toDate={toDate}
          components={{
            DayButton: CustomDayButton,
          }}
          className="w-full h-full [--cell-size:2.5rem]"
          required={true}
          {...props}
        />
      )}
    </div>
  )
}

// Legend component for price indicators
interface CalendarLegendProps {
  className?: string
}

export function CalendarLegend({ className }: CalendarLegendProps) {
  const legendItems = [
    { label: "Cheapest", color: "bg-green-500", textColor: "text-green-600" },
    { label: "Highest", color: "bg-red-500", textColor: "text-red-600" },
    { label: "Average", color: "bg-gray-500", textColor: "text-gray-500" },
  ]

  return (
    <div className={cn("flex items-center gap-4 mt-4", className)}>
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-sm", item.color)} />
          <span className={cn("text-sm font-medium", item.textColor)}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// Export the main calendar component
export { PriceCalendar as Calendar }
