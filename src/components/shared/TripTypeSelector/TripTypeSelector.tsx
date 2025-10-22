'use client'
import { MapPin, Plane, RotateCcw } from 'lucide-react'
import { Text } from 'theme-ui'
import './TripTypeSelector.css'

export type TripType = 'round-trip' | 'one-way' | 'multicity'

export interface TripTypeSelectorProps {
  tripType: TripType
  onTripTypeChange: (tripType: TripType) => void
  className?: string
}

const TripTypeSelector = ({
  tripType,
  onTripTypeChange,
  className = ''
}: TripTypeSelectorProps) => {
  const tripTypes = [
    {
      value: 'one-way' as TripType,
      label: 'One Way',
      icon: <Plane size={16} />
    },
    {
      value: 'round-trip' as TripType,
      label: 'Round Trip',
      icon: <RotateCcw size={16} />
    },

    {
      value: 'multicity' as TripType,
      label: 'Multicity',
      icon: <MapPin size={16} />
    }
  ]

  return (
    <div className={`trip-type-selector ${className}`}>
      <div className="trip-type-options">
        {tripTypes.map((trip) => (
          <label key={trip.value} className="trip-type-option">
            <input
              type="radio"
              name="tripType"
              value={trip.value}
              checked={tripType === trip.value}
              onChange={(e) => onTripTypeChange(e.target.value as TripType)}
              className="trip-type-radio"
            />
            <div className="trip-type-content">
              <span className="trip-type-icon">{trip.icon}</span>
              <Text 
                sx={{ 
                  fontSize: ['11px', '12px', '13px'],
                  fontWeight: 500,
                  lineHeight: 1.2
                }} 
                variant='Maison16Medium20' 
                color={tripType === trip.value ? 'white' : 'primary_text_dark'}
              >
                {trip.label}
              </Text>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TripTypeSelector
