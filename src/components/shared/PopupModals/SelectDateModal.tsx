import { ReactDateRangeLegend } from "@/components/shared/PriceCalendar"
import { CalendarPriceData } from "@/types/module/calendar"
import { useEffect, useState } from "react"
import { DatePicker } from "../DatePicker/DatePicker"
import CommonModal from "./CommonModal"

interface SelectDateModalProps {
  isOpen: boolean
  onClose: () => void
  wrapperClass: string
  onDateSelect?: (date: Date) => void
  priceData?: CalendarPriceData[]
  showPrices?: boolean
  currency?: string
  fromDate?: Date
  toDate?: Date
  mode?: "single" | "range"
  selectedDate?: Date
  dateType?: 'departure' | 'return'
}

export const SelectDateModal = ({
  isOpen,
  onClose,
  wrapperClass,
  onDateSelect,
  priceData = [],
  showPrices = true,
  selectedDate: propSelectedDate,
  dateType = 'departure',
}: SelectDateModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(propSelectedDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to start of day

  useEffect(() => {
    setSelectedDate(propSelectedDate)
  }, [propSelectedDate])

  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect?.(date || new Date())
    onClose()
  }

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon
      wrapperClass={wrapperClass}
      heading={`Select ${dateType === 'departure' ? 'Departure' : 'Return'} Date`}
    // width="450px"

    >
      <div className="space-y-3 px-2">

        <div className="flex justify-center">
          <DatePicker
            selected={selectedDate}
            onSelect={handleDateSelect}
            minDate={today}
          />
        </div>

        {showPrices && priceData.length > 0 && (
          <ReactDateRangeLegend className="justify-center" />
        )}
      </div>
    </CommonModal>
  )
}
