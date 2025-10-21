'use client'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Text } from 'theme-ui'

interface CustomDatePickerProps {
  open: boolean
  onClose: () => void
  value: string | null
  onChange: (date: string) => void
  format?: string
  disabledDate?: (date: dayjs.Dayjs) => boolean
  disablePrevDays?: boolean
  position?: { top: number; left: number }
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  open,
  onClose,
  value,
  onChange,
  format = 'MM/DD/YYYY',
  disabledDate,
  disablePrevDays = false,
  position = { top: 0, left: 0 }
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    value ? dayjs(value, format) : null
  )
  const popoverRef = useRef<HTMLDivElement>(null)

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  // Update selected date when value prop changes
  useEffect(() => {
    setSelectedDate(value ? dayjs(value, format) : null)
  }, [value, format])

  const handleDateSelect = (date: dayjs.Dayjs) => {
    if (disabledDate && disabledDate(date)) return

    setSelectedDate(date)
    onChange(date.format(format))
    onClose()
  }

  const handleTodayClick = () => {
    const today = dayjs()
    setSelectedDate(today)
    onChange(today.format(format))
    onClose()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => prev.add(direction === 'next' ? 1 : -1, 'month'))
  }

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => prev.add(direction === 'next' ? 1 : -1, 'year'))
  }

  const getCalendarDays = () => {
    const startOfMonth = currentMonth.startOf('month')
    const endOfMonth = currentMonth.endOf('month')
    const startOfCalendar = startOfMonth.startOf('week')
    const endOfCalendar = endOfMonth.endOf('week')

    const days = []
    let day = startOfCalendar

    while (day.isBefore(endOfCalendar) || day.isSame(endOfCalendar, 'day')) {
      days.push(day)
      day = day.add(1, 'day')
    }

    return days
  }


  const isSelected = (date: dayjs.Dayjs) => {
    return selectedDate && date.isSame(selectedDate, 'day')
  }

  const isCurrentMonth = (date: dayjs.Dayjs) => {
    return date.isSame(currentMonth, 'month')
  }

  const isDisabled = (date: dayjs.Dayjs) => {
    // Check if disablePrevDays is enabled and date is before today
    if (disablePrevDays && date.isBefore(dayjs(), 'day')) {
      return true
    }

    // Check custom disabledDate function
    if (disabledDate && disabledDate(date)) {
      return true
    }

    return false
  }

  if (!open) return null

  const calendarDays = getCalendarDays()
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return (
    <Box
      ref={popoverRef}
      sx={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 9999,
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        padding: '16px',
        minWidth: '280px',
        maxWidth: '320px'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '16px'
        }}
      >
        {/* Year Navigation */}
        <Box
          onClick={() => navigateYear('prev')}
          sx={{
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#f3f4f6'
            }
          }}
        >
          <ChevronsLeft size={16} />
        </Box>

        {/* Month Navigation */}
        <Box
          onClick={() => navigateMonth('prev')}
          sx={{
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#f3f4f6'
            }
          }}
        >
          <ChevronLeft size={16} />
        </Box>

        {/* Month/Year Display */}
        <Text
          sx={{
            fontFamily: 'maison',
            fontWeight: 'medium',
            fontSize: '16px',
            color: '#374151'
          }}
        >
          {currentMonth.format('MMM YYYY')}
        </Text>

        {/* Month Navigation */}
        <Box
          onClick={() => navigateMonth('next')}
          sx={{
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#f3f4f6'
            }
          }}
        >
          <ChevronRight size={16} />
        </Box>

        {/* Year Navigation */}
        <Box
          onClick={() => navigateYear('next')}
          sx={{
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#f3f4f6'
            }
          }}
        >
          <ChevronsRight size={16} />
        </Box>
      </Box>

      {/* Week Days Header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          mb: '8px'
        }}
      >
        {weekDays.map((day) => (
          <Text
            key={day}
            sx={{
              fontFamily: 'maison',
              fontWeight: 'medium',
              fontSize: '12px',
              color: '#6b7280',
              textAlign: 'center',
              padding: '8px 4px'
            }}
          >
            {day}
          </Text>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          mb: '12px'
        }}
      >
        {calendarDays.map((date, index) => (
          <Box
            key={index}
            onClick={() => handleDateSelect(date)}
            sx={{
              cursor: isDisabled(date) ? 'not-allowed' : 'pointer',
              padding: '8px 4px',
              borderRadius: '4px',
              textAlign: 'center',
              fontSize: '14px',
              fontFamily: 'maison',
              fontWeight: 'regular',
              backgroundColor: isSelected(date) ? '#3b82f6' : 'transparent',
              color: isSelected(date) ? 'white' : (isCurrentMonth(date) ? '#374151' : '#9ca3af'),
              opacity: isDisabled(date) ? 0.5 : 1,
              '&:hover': {
                backgroundColor: isDisabled(date) ? 'transparent' : (isSelected(date) ? '#3b82f6' : '#f3f4f6'),
                color: isSelected(date) ? 'white' : (isCurrentMonth(date) ? '#374151' : '#9ca3af')
              }
            }}
          >
            {date.date()}
          </Box>
        ))}
      </Box>

      {/* Today Button */}
      <Box
        onClick={handleTodayClick}
        sx={{
          cursor: 'pointer',
          padding: '8px 16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          textAlign: 'center',
          fontFamily: 'maison',
          fontWeight: 'medium',
          fontSize: '14px',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#e5e7eb'
          }
        }}
      >
        Today
      </Box>
    </Box>
  )
}

export default CustomDatePicker
