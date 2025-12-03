'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/functions'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface PassengerJourney {
  date: Date
  count: number
}

interface PassengerCalendarProps {
  onDateSelect?: (date: Date) => void
  onFetchCalendar?: (bookingType: string, month: number, year: number) => void
  passengerJourneys?: PassengerJourney[]
}

const bookingTypes = ['Flight Bookings', 'Hotel Bookings', 'Package Bookings']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function PassengerCalendar({
  onDateSelect,
  onFetchCalendar,
  passengerJourneys = [],
}: PassengerCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookingType, setBookingType] = useState(bookingTypes[0])
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  )
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Generate years (current year ± 5 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)

  // Get passenger count for a specific date
  const getPassengerCount = (date: Date): number => {
    const dateStr = date.toDateString()
    const journey = passengerJourneys.find(
      (j) => j.date.toDateString() === dateStr
    )
    return journey?.count || 0
  }

  // Check if date has passengers
  const hasPassengers = (date: Date): boolean => {
    return getPassengerCount(date) > 0
  }

  // Handle month navigation
  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentMonth(newDate)
    setSelectedMonth(months[newDate.getMonth()])
    setSelectedYear(newDate.getFullYear())
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentMonth(newDate)
    setSelectedMonth(months[newDate.getMonth()])
    setSelectedYear(newDate.getFullYear())
  }

  // Handle month selection
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month)
    const monthIndex = months.indexOf(month)
    const newDate = new Date(currentMonth)
    newDate.setMonth(monthIndex)
    setCurrentMonth(newDate)
  }

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    const newDate = new Date(currentMonth)
    newDate.setFullYear(year)
    setCurrentMonth(newDate)
  }

  // Handle fetch calendar
  const handleFetchCalendar = () => {
    const monthIndex = months.indexOf(selectedMonth)
    onFetchCalendar?.(bookingType, monthIndex, selectedYear)
  }

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      onDateSelect?.(date)
    }
  }

  // Custom day component
  const CustomDay = ({
    day,
    modifiers,
    ...props
  }: {
    day: { date: Date }
    modifiers: { selected?: boolean; today?: boolean; outside?: boolean }
    [key: string]: any
  }) => {
    const count = getPassengerCount(day.date)
    const isSelected = modifiers.selected
    const hasData = count > 0
    const isOutside = modifiers.outside

    // Extract onClick and other handlers from props
    const { onClick, onKeyDown, className: propClassName, ...restProps } = props

    return (
      <button
        type="button"
        onClick={onClick as any}
        onKeyDown={onKeyDown as any}
        {...restProps}
        className={cn(
          'relative flex items-center justify-center w-full h-full rounded transition-all duration-200 aspect-square min-h-[2.5rem] cursor-pointer border-0 focus:outline-none',
          isSelected && 'bg-yellow-200',
          !isSelected && !isOutside && 'hover:bg-gray-50',
          isOutside && 'text-gray-400',
          propClassName
        )}
      >
        <span
          className={cn(
            'text-sm font-medium',
            isSelected && 'text-gray-900',
            !isSelected && !isOutside && 'text-gray-700',
            isOutside && 'text-gray-400'
          )}
        >
          {day.date.getDate()}
        </span>
      </button>
    )
  }

  // Check if current month has any passenger journeys
  const hasJourneysInMonth = passengerJourneys.some((journey) => {
    return (
      journey.date.getMonth() === currentMonth.getMonth() &&
      journey.date.getFullYear() === currentMonth.getFullYear()
    )
  })

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Booking Type Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700 min-w-[120px]">
              Booking Type:
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[180px] justify-between bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-400 focus:border-orange-500 transition-all"
                >
                  {bookingType}
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[180px]">
                {bookingTypes.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setBookingType(type)}
                    className="cursor-pointer"
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Month Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700 min-w-[80px]">
              Month:
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[140px] justify-between bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-400 focus:border-orange-500 transition-all"
                >
                  {selectedMonth}
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[140px] max-h-[300px] overflow-y-auto">
                {months.map((month) => (
                  <DropdownMenuItem
                    key={month}
                    onClick={() => handleMonthSelect(month)}
                    className="cursor-pointer"
                  >
                    {month}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Year Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700 min-w-[60px]">
              Year:
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[100px] justify-between bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-400 focus:border-orange-500 transition-all"
                >
                  {selectedYear}
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[100px] max-h-[300px] overflow-y-auto">
                {years.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className="cursor-pointer"
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleFetchCalendar}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all px-6"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Fetch Calendar
          </Button>
          <Button
            variant="outline"
            className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 px-6"
          >
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={handlePrevMonth}
              variant="outline"
              size="sm"
              className="border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev Month
            </Button>
            <Button
              onClick={handleNextMonth}
              variant="outline"
              size="sm"
              className="border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50"
            >
              Next Month
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* No Data Message */}
      {!hasJourneysInMonth && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <p className="text-red-700 font-medium">
            No Passenger Journeys in the Month of {selectedMonth}
          </p>
        </div>
      )}

      {/* Calendar */}
      <div className="w-full">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          showOutsideDays={true}
          className="w-full"
          formatters={{
            formatWeekdayName: (date) => {
              const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
              return days[date.getDay()]
            },
          }}
          classNames={{
            months: 'flex flex-col w-full',
            month: 'w-full',
            caption: 'flex justify-center pt-1 relative items-center mb-2',
            caption_label: 'text-lg font-semibold text-gray-900',
            nav: 'space-x-1 flex items-center',
            nav_button: cn(
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-gray-300 rounded hover:bg-gray-100 transition-all flex items-center justify-center'
            ),
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse',
            head_row: 'flex w-full',
            head_cell:
              'text-gray-700 font-normal text-sm flex-1 text-center py-2 w-[calc(100%/7)]',
            row: 'flex w-full',
            cell: 'flex-1 aspect-square p-0.5 text-center relative w-[calc(100%/7)]',
            day: cn(
              'w-full h-full p-0 font-normal'
            ),
            day_selected: '',
            day_today: '',
            day_outside: '',
            day_disabled: 'text-gray-300 opacity-50 cursor-not-allowed',
            day_range_middle: '',
            day_hidden: 'invisible',
          }}
          components={{
            Day: CustomDay,
          }}
        />
      </div>

    </div>
  )
}

