'use client'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { TextInputFieldProps } from '@/types/module/textInputField'
import dayjs from 'dayjs'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ThemeUIStyleObject } from 'theme-ui'
import CustomDatePicker from '../DatePicker/CustomDatePicker'

interface DateInputFieldProps {
  label: string
  value: string
  placeholder?: string
  format?: string
  validationVariant?: string
  manualErrorMessage?: string
  requiredIconSx?: ThemeUIStyleObject
  manualErrorSX?: ThemeUIStyleObject
  disabledDate?: (date: dayjs.Dayjs) => boolean
  disablePrevDays?: boolean
}

const DateInputField: FC<DateInputFieldProps & TextInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  format = 'MM/DD/YYYY',
  manualErrorMessage,
  requiredIconSx,
  disabledDate,
  disablePrevDays,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const inputRef = useRef<HTMLDivElement>(null)

  const handleDateChange = (date: string) => {
    onChange?.(date)
    setOpen(false)
  }

  const updatePosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      const calendarHeight = 400 // Approximate height of the calendar
      const calendarWidth = 320 // Approximate width of the calendar

      // Check if there's enough space below
      const spaceBelow = viewportHeight - rect.bottom
      const spaceAbove = rect.top

      // Position above if not enough space below
      const shouldPositionAbove = spaceBelow < calendarHeight && spaceAbove > calendarHeight

      // Calculate horizontal position to prevent overflow
      let leftPosition = rect.left
      if (leftPosition + calendarWidth > viewportWidth) {
        leftPosition = viewportWidth - calendarWidth - 16 // 16px margin from edge
      }
      if (leftPosition < 16) {
        leftPosition = 16 // 16px margin from edge
      }

      // Calculate final top position
      let topPosition = shouldPositionAbove ? rect.top - calendarHeight - 8 : rect.bottom + 8

      // Ensure calendar doesn't go below viewport
      if (topPosition + calendarHeight > viewportHeight) {
        topPosition = viewportHeight - calendarHeight - 16
      }

      // Ensure calendar doesn't go above viewport
      if (topPosition < 16) {
        topPosition = 16
      }

      setPosition({
        top: topPosition,
        left: leftPosition
      })
    }
  }

  useEffect(() => {
    if (open) {
      updatePosition()
      // Update position on scroll/resize
      const handleUpdate = () => updatePosition()
      window.addEventListener('scroll', handleUpdate, true)
      window.addEventListener('resize', handleUpdate)

      return () => {
        window.removeEventListener('scroll', handleUpdate, true)
        window.removeEventListener('resize', handleUpdate)
      }
    }
    return undefined
  }, [open])

  return (
    <div ref={inputRef} style={{ position: 'relative' }}>
      <TextInputField
        label={label}
        value={value}
        placeholder={placeholder}
        onClick={() => setOpen(true)}
        firstInputBox
        readOnly
        requiredIconSx={requiredIconSx}
        manualErrorMessage={manualErrorMessage}
        {...props}
      />
      {open && typeof window !== 'undefined' && createPortal(
        <CustomDatePicker
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={handleDateChange}
          format={format}
          disabledDate={disabledDate}
          disablePrevDays={disablePrevDays}
          position={position}
        />,
        document.body
      )}
    </div>
  )
}

export default DateInputField
