import ItineraryView from '@/components/admin/components/Itinerary/ItineraryView'
import React from 'react'

interface ItineraryPageProps {
  params: Promise<{
    bookingId: string
  }>
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const { bookingId } = await params
  return <ItineraryView bookingId={bookingId} />
}

