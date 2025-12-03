'use client'

import PassengerCalendar from '@/components/admin/PassengerCalendar'
import { useState } from 'react'

// Mock data - replace with actual API call
const mockPassengerJourneys = [
  { date: new Date(2025, 10, 10), count: 5 }, // November 10, 2025
  { date: new Date(2025, 10, 15), count: 3 }, // November 15, 2025
  { date: new Date(2025, 10, 20), count: 8 }, // November 20, 2025
  { date: new Date(2025, 10, 25), count: 2 }, // November 25, 2025
]

export default function PassengerCalendarPage() {
  const [passengerJourneys, setPassengerJourneys] = useState(
    mockPassengerJourneys
  )

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date)
    // Handle date selection logic here
  }

  const handleFetchCalendar = (
    bookingType: string,
    month: number,
    year: number
  ) => {
    console.log('Fetching calendar:', { bookingType, month, year })
    // Replace with actual API call
    // Example:
    // const response = await fetch(`/api/passenger-journeys?type=${bookingType}&month=${month}&year=${year}`)
    // const data = await response.json()
    // setPassengerJourneys(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Passenger Calendar
          </h1>
          <p className="text-gray-600">
            View and manage passenger journeys by date
          </p>
        </div>

        {/* Calendar Component */}
        <PassengerCalendar
          onDateSelect={handleDateSelect}
          onFetchCalendar={handleFetchCalendar}
          passengerJourneys={passengerJourneys}
        />
      </div>
    </div>
  )
}

