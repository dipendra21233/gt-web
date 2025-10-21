'use client'
import { passengerConfig, travelClasses } from '@/utils/constant'
import { ChevronDown, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Paragraph, Text } from 'theme-ui'
import './PassengerClassSelector.css'

export interface PassengerCounts {
  adults: number
  children: number
  infants: number
}

export interface PassengerClassSelectorProps {
  passengers: PassengerCounts
  travelClass: string
  onPassengersChange: (passengers: PassengerCounts) => void
  onClassChange: (travelClass: string) => void
  className?: string
  label?: string
  icon?: React.ReactNode
}

const PassengerClassSelector = ({
  passengers,
  travelClass,
  onPassengersChange,
  onClassChange,
  className = '',
  label = 'Traveler & Class',
  icon
}: PassengerClassSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openUpward, setOpenUpward] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const formatPassengerText = () => {
    const parts: string[] = []
    if (passengers.adults > 0) parts.push(`${passengers.adults} Adult${passengers.adults > 1 ? 's' : ''}`)
    if (passengers.children > 0) parts.push(`${passengers.children} Child${passengers.children > 1 ? 'ren' : ''}`)
    if (passengers.infants > 0) parts.push(`${passengers.infants} Infant${passengers.infants > 1 ? 's' : ''}`)
    return parts.join(', ')
  }

  const getClassLabel = (value: string) => {
    const v = (value || '').toUpperCase()
    return travelClasses.find(c => c.value === v)?.label || 'Economy'
  }

  const handlePassengerChange = (type: keyof PassengerCounts, delta: number) => {
    const newValue = passengers[type] + delta
    const config = passengerConfig.find(c => c.key === type)
    if (!config) return

    if (newValue >= config.min && newValue <= config.max) {
      if (type === 'adults' && newValue === 0 && passengers.infants > 0) return
      if (type === 'infants' && newValue > passengers.adults) return
      onPassengersChange({ ...passengers, [type]: newValue })
    }
  }

  const checkDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const dropdownHeight = 300
      setOpenUpward(rect.bottom + dropdownHeight > viewportHeight - 20)
    }
  }

  const handleToggleDropdown = () => {
    if (!isOpen) checkDropdownPosition()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleResize = () => isOpen && checkDropdownPosition()
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  return (
    <div className={`passenger-class-selector-wrapper ${className}`} ref={dropdownRef}>
      {label && (
        <label className="passenger-class-label">
          {icon && <div className="label-icon">{icon}</div>}
          {label}
        </label>
      )}
      <div className="passenger-class-selector">
        <button className="passenger-class-trigger" onClick={handleToggleDropdown} type="button">
          <Users size={16} />
          <Text className="passenger-class-text" title={`${formatPassengerText()}, ${getClassLabel(travelClass)}`}>
            {formatPassengerText()}, {getClassLabel(travelClass)}
          </Text>
          <ChevronDown size={16} className={`chevron-icon ${isOpen ? 'open' : ''}`} />
        </button>

        {isOpen && (
          <div className={`passenger-class-dropdown ${openUpward ? 'open-upward' : ''}`}>
            {/* Passenger Section */}
            <div className="passenger-section">
              {passengerConfig.map(config => (
                <div className="passenger-item" key={config.key}>
                  <div className="passenger-info">
                    <Text variant="Maison16Medium20" color="grey_500">{config.label}</Text>
                    <Paragraph as="p" variant="Maison12Regular20" color="grey_500">{config.ageRange}</Paragraph>
                  </div>
                  <div className="passenger-controls">
                    <button
                      className={`passenger-btn ${passengers[config.key as keyof PassengerCounts] <= config.min ? 'disabled' : ''}`}
                      onClick={() => handlePassengerChange(config.key as keyof PassengerCounts, -1)}
                      disabled={passengers[config.key as keyof PassengerCounts] <= config.min}
                      type="button"
                    >
                      −
                    </button>
                    <span className="passenger-count">{passengers[config.key as keyof PassengerCounts]}</span>
                    <button
                      className={`passenger-btn ${passengers[config.key as keyof PassengerCounts] >= config.max ? 'disabled' : ''}`}
                      onClick={() => handlePassengerChange(config.key as keyof PassengerCounts, 1)}
                      disabled={passengers[config.key as keyof PassengerCounts] >= config.max}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Class Section */}
            <div className="class-section">
              <div className="class-buttons">
                {travelClasses.map(tc => (
                  <button
                    key={tc.value}
                    className={`class-btn ${(travelClass || '').toUpperCase() === tc.value ? 'selected' : ''}`}
                    onClick={() => onClassChange(tc.value)}
                    type="button"
                  >
                    {tc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PassengerClassSelector
