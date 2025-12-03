'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetItineraryDataMutation } from '@/hooks/useMutations'
import { AdminCard } from '@/components/shared/Card/AdminCard'
import { Button } from '@/components/ui/button'
import { Box, Text } from 'theme-ui'

interface ItineraryViewProps {
  bookingId: string
}

interface ItineraryData {
  header: {
    agencyName: string
    agencyAddress: string
    agencyContact: string
    agencyEmail: string
    agencyWebsite: string
  }
  passengerInfo: {
    passengerNames: string[]
    contactDetails: {
      email: string
      phone: string
    }
    issueDate: string
  }
  bookingReference: {
    pnr: string
    bookingId: string
    fareType: string
  }
  flightDetails: {
    sector: string
    airline: string
    flightNumber: string
    departureDate: string
    departureTime: string
    arrivalDate: string
    arrivalTime: string
    duration: string
    departureAirport: string
    arrivalAirport: string
  }
  passengerDetails: Array<{
    passengerName: string
    ticketNumber: string
    paxType: string
    baggage: string
  }>
  fareBreakdown: {
    baseFare: number
    tax: number
    ssrAmount: number
    gstAmount: number
    totalAmount: number
  }
  gstDetails: {
    gstNumber: string
    companyName: string
    companyAddress: string
  }
  termsAndConditions: string[]
}

const ItineraryView = ({ bookingId }: ItineraryViewProps) => {
  const router = useRouter()
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null)
  const { mutate: fetchItinerary, isPending } = useGetItineraryDataMutation()

  useEffect(() => {
    if (bookingId) {
      fetchItinerary(
        { bookingId },
        {
          onSuccess: (response) => {
            if (response?.data?.success && response.data.data?.itinerary) {
              setItineraryData(response.data.data.itinerary)
            }
          },
          onError: (error) => {
            console.error('Error fetching itinerary:', error)
          }
        }
      )
    }
  }, [bookingId, fetchItinerary])

  if (isPending) {
    return (
      <AdminCard heading="Travel Itinerary">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading itinerary...</p>
          </div>
        </div>
      </AdminCard>
    )
  }

  if (!itineraryData) {
    return (
      <AdminCard heading="Travel Itinerary">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-destructive mb-4">Unable to load itinerary data</p>
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
          </div>
        </div>
      </AdminCard>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount)
  }

  return (
    <AdminCard heading="Your travel itinerary">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your travel itinerary</h1>
          </div>
          <div className="text-right">
            <div className="font-semibold text-primary">{itineraryData.header.agencyName}</div>
            <div className="text-sm text-muted-foreground">{itineraryData.header.agencyAddress}</div>
            <div className="text-sm text-muted-foreground">{itineraryData.header.agencyContact}</div>
            <div className="text-sm text-muted-foreground">{itineraryData.header.agencyEmail}</div>
            <div className="text-sm text-muted-foreground">{itineraryData.header.agencyWebsite}</div>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">Passenger Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Passenger(s)</p>
              <p className="font-medium text-foreground">
                {itineraryData.passengerInfo.passengerNames.join(', ')}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Contact</p>
              <p className="font-medium text-foreground">{itineraryData.passengerInfo.contactDetails.phone}</p>
              <p className="text-sm text-muted-foreground">{itineraryData.passengerInfo.contactDetails.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
              <p className="font-medium text-foreground">{itineraryData.passengerInfo.issueDate}</p>
            </div>
          </div>
        </div>

        {/* Booking Reference */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Booking Reference: </span>
              <span className="font-semibold">{itineraryData.bookingReference.pnr}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Booking ID: </span>
              <span className="font-semibold">{itineraryData.bookingReference.bookingId}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Fare Type: </span>
              <span className="font-semibold">{itineraryData.bookingReference.fareType}</span>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
            <h2 className="text-lg font-semibold text-foreground">Flight Details</h2>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Sector</p>
                <p className="font-medium text-foreground">{itineraryData.flightDetails.sector}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Airline</p>
                <p className="font-medium text-foreground">{itineraryData.flightDetails.airline}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Flight Number</p>
                <p className="font-medium text-foreground">{itineraryData.flightDetails.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="font-medium text-foreground">{itineraryData.flightDetails.duration}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Departure</p>
                <p className="font-semibold text-foreground">
                  {itineraryData.flightDetails.departureTime} - {itineraryData.flightDetails.departureDate}
                </p>
                <p className="text-sm text-muted-foreground">{itineraryData.flightDetails.departureAirport}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Arrival</p>
                <p className="font-semibold text-foreground">
                  {itineraryData.flightDetails.arrivalTime} - {itineraryData.flightDetails.arrivalDate}
                </p>
                <p className="text-sm text-muted-foreground">{itineraryData.flightDetails.arrivalAirport}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">Passenger Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="border p-3 text-left text-sm font-semibold">Passenger Name</th>
                  <th className="border p-3 text-left text-sm font-semibold">Ticket Number</th>
                  <th className="border p-3 text-left text-sm font-semibold">Type</th>
                  <th className="border p-3 text-left text-sm font-semibold">Baggage</th>
                </tr>
              </thead>
              <tbody>
                {itineraryData.passengerDetails.map((passenger, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="border p-3">{passenger.passengerName}</td>
                    <td className="border p-3">{passenger.ticketNumber}</td>
                    <td className="border p-3">{passenger.paxType}</td>
                    <td className="border p-3">{passenger.baggage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GST Details */}
        {itineraryData.gstDetails?.gstNumber && (
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold text-foreground mb-3">GST Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">GST Number</p>
                <p className="font-medium text-foreground">{itineraryData.gstDetails.gstNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                <p className="font-medium text-foreground">{itineraryData.gstDetails.companyName}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Company Address</p>
                <p className="font-medium text-foreground">{itineraryData.gstDetails.companyAddress}</p>
              </div>
            </div>
          </div>
        )}

        {/* Fare Breakdown */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">Fare Breakdown</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Fare:</span>
              <span className="font-medium">{formatCurrency(itineraryData.fareBreakdown.baseFare)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax:</span>
              <span className="font-medium">{formatCurrency(itineraryData.fareBreakdown.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SSR Amount:</span>
              <span className="font-medium">{formatCurrency(itineraryData.fareBreakdown.ssrAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST Amount:</span>
              <span className="font-medium">{formatCurrency(itineraryData.fareBreakdown.gstAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-semibold text-lg">
              <span>Total Amount:</span>
              <span className="text-primary">{formatCurrency(itineraryData.fareBreakdown.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        {itineraryData.termsAndConditions && itineraryData.termsAndConditions.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground mb-3">Terms and Conditions</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {itineraryData.termsAndConditions.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
          <Button onClick={() => router.back()} variant="outline">
            Back
          </Button>
          <Button onClick={() => window.print()} variant="default">
            Print
          </Button>
        </div>
      </div>
    </AdminCard>
  )
}

export default ItineraryView

