export type Supplier = 'NEXUS' | 'TRIPJACK'

export interface LocalStorageFlightSegment {
  flightCode: string
  airlineName: string
  airlineCode: string
  from: string
  fromCity: string
  fromTerminal: string | null | ''
  to: string
  toCity: string
  toTerminal: string | null | ''
  departureTime: string
  arrivalTime: string
  duration: number
  stops: number
}

export interface LocalStorageFare {
  fareIdentifier: string
  totalFare: number
  baseFare: number
  taxes: number
  baggage: { checkIn: string; cabin: string }
  cabinClass: string
  fareBasis: string
  meal: string
  benefit: any
  consentMsg: any
  refundType: string
  bookingCode: string | null | ''
  priceID: string
}

export interface LocalStorageFlightSearchItem {
  supplier: Supplier
  segments: LocalStorageFlightSegment[]
  fares: LocalStorageFare[]
}

const normalizeIsoMinute = (iso: string | null | undefined) => {
  if (!iso || typeof iso !== 'string') return ''
  const [datePart, timePart] = iso.split('T')
  if (!timePart) return iso
  const [hh = '', mm = ''] = timePart.split(':')
  return `${datePart}T${hh}:${mm}`
}

const fromSegmentsShape = (items: any[], supplier: Supplier): LocalStorageFlightSearchItem[] => {
  return items.map((item: any) => {
    const seg = Array.isArray(item?.segments) && item.segments.length > 0 ? item.segments[0] : {}
    const fares = Array.isArray(item?.fares) ? item.fares : []

    const mappedSegment: LocalStorageFlightSegment = {
      flightCode: seg?.flightCode || seg?.flightNumber || '',
      airlineName: seg?.airlineName || seg?.carrierName || '',
      airlineCode: seg?.airlineCode || (seg?.flightCode ? String(seg.flightCode).slice(0, 2) : ''),
      from: seg?.from || seg?.src || '',
      fromCity: seg?.fromCity || seg?.srcCity || seg?.from || '',
      fromTerminal: (seg?.fromTerminal ?? '') as any,
      to: seg?.to || seg?.dst || '',
      toCity: seg?.toCity || seg?.dstCity || seg?.to || '',
      toTerminal: (seg?.toTerminal ?? '') as any,
      departureTime: normalizeIsoMinute(seg?.departureTime || seg?.depTime || ''),
      arrivalTime: normalizeIsoMinute(seg?.arrivalTime || seg?.arrTime || ''),
      duration: typeof seg?.duration === 'number'
        ? seg.duration
        : (typeof seg?.duration === 'string' ? parseInt(String(seg.duration).replace(/[^\d]/g, '')) || 0 : 0),
      stops: typeof seg?.stops === 'number' ? seg.stops : 0,
    }

    const mappedFares: LocalStorageFare[] = fares.map((f: any) => ({
      fareIdentifier: f?.fareIdentifier || f?.brand || f?.brandName || '',
      totalFare: typeof f?.totalFare === 'number' ? f.totalFare : Number(f?.totalFare) || 0,
      baseFare: typeof f?.baseFare === 'number' ? f.baseFare : Number(f?.baseFare) || 0,
      taxes: typeof f?.taxes === 'number' ? f.taxes : Number(f?.taxes) || 0,
      baggage: {
        checkIn: f?.baggage?.checkIn || f?.checkInBaggage || '15 KG',
        cabin: f?.baggage?.cabin || f?.cabinBaggage || '7 KG',
      },
      cabinClass: (f?.cabinClass || f?.cabin || 'ECONOMY').toString().toUpperCase(),
      fareBasis: f?.fareBasis || f?.fareClass || '',
      meal: f?.meal || 'Paid',
      benefit: f?.benefit ?? null,
      consentMsg: f?.consentMsg ?? null,
      refundType: f?.refundType || 'Non-Refundable',
      bookingCode: f?.bookingCode || '',
      priceID: f?.priceID || f?.priceId || '',
    }))

    return {
      supplier,
      segments: [mappedSegment],
      fares: mappedFares,
    }
  })
}

export const transformNexusResponseToLocalFormat = (nexusData: any): LocalStorageFlightSearchItem[] => {
  try {
    if (Array.isArray(nexusData?.data)) {
      return fromSegmentsShape(nexusData.data, 'NEXUS')
    }
    if (Array.isArray(nexusData?.data?.results)) {
      return fromSegmentsShape(nexusData.data.results, 'NEXUS')
    }
    if (Array.isArray(nexusData?.data?.searchResult?.tripInfos)) {
      return nexusData.data.searchResult.tripInfos.map((trip: any) => ({
        supplier: 'NEXUS',
        segments: [{
          flightCode: trip?.flightCode || '',
          airlineName: trip?.airlineName || '',
          airlineCode: trip?.airlineCode || (trip?.flightCode ? String(trip.flightCode).slice(0, 2) : ''),
          from: trip?.from || '',
          fromCity: trip?.fromCity || trip?.from || '',
          fromTerminal: (trip?.fromTerminal ?? '') as any,
          to: trip?.to || '',
          toCity: trip?.toCity || trip?.to || '',
          toTerminal: (trip?.toTerminal ?? '') as any,
          departureTime: normalizeIsoMinute(trip?.departureTime || ''),
          arrivalTime: normalizeIsoMinute(trip?.arrivalTime || ''),
          duration: typeof trip?.duration === 'number'
            ? trip.duration
            : (typeof trip?.duration === 'string' ? parseInt(String(trip.duration).replace(/[^\d]/g, '')) || 0 : 0),
          stops: typeof trip?.stops === 'number' ? trip.stops : 0,
        }],
        fares: [{
          fareIdentifier: `${trip?.flightCode || ''}_${trip?.from || ''}_${trip?.to || ''}`,
          totalFare: Number(trip?.price) || 0,
          baseFare: Math.round((Number(trip?.price) || 0) * 0.8),
          taxes: Math.round((Number(trip?.price) || 0) * 0.2),
          baggage: { checkIn: '15 KG', cabin: '7 KG' },
          cabinClass: 'ECONOMY',
          fareBasis: 'Y',
          meal: 'Paid',
          benefit: null,
          consentMsg: null,
          refundType: 'Non-Refundable',
          bookingCode: 'Y',
          priceID: `${trip?.flightCode || 'NEX'}_${Date.now()}`,
        }],
      }))
    }
  } catch (e) {
    console.error('Failed to transform Nexus response', e)
  }
  return []
}

export const attachSupplierToLocalResults = (
  items: any[] | undefined,
  supplier: Supplier
): LocalStorageFlightSearchItem[] => {
  if (!Array.isArray(items)) return []
  return items.map((it: any) => {
    if (it && typeof it === 'object' && 'segments' in it && 'fares' in it) {
      return { supplier, segments: it.segments, fares: it.fares } as LocalStorageFlightSearchItem
    }
    return { supplier, segments: [], fares: [] } as LocalStorageFlightSearchItem
  })
}

/**
 * Transform Nexus fare summary response to AirlineTransformedPayload format
 * Enriches null fields with data from localStorage flight search results
 */
export const transformNexusFareSummaryResponse = (
  nexusResponse: any,
  priceIds: string[]
): any => {
  try {
    const data = nexusResponse?.data || nexusResponse || {}
    
    // Get flight data from localStorage
    let flightSearchData: LocalStorageFlightSearchItem | null = null
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('flightSearchResults')
        if (raw) {
          const results = JSON.parse(raw) as LocalStorageFlightSearchItem[]
          const firstPriceId = priceIds?.[0] || ''
          flightSearchData = results.find(
            (r) => r?.supplier === 'NEXUS' && 
            r?.fares?.some((f) => f?.priceID === firstPriceId)
          ) || null
          
          // Fallback: find any NEXUS flight if exact match not found
          if (!flightSearchData) {
            flightSearchData = results.find((r) => r?.supplier === 'NEXUS') || null
          }
        }
      }
    } catch (e) {
      console.error('Error reading localStorage:', e)
    }

    const segment = flightSearchData?.segments?.[0]
    const fare = flightSearchData?.fares?.find(
      (f) => priceIds?.some((pid) => f?.priceID === pid)
    ) || flightSearchData?.fares?.[0]

    // Parse dates from nexusBookingData.query.legs
    const leg = data?.nexusBookingData?.query?.legs?.[0]
    let departureDate: string | null = null
    let departureDateTime: string | null = null
    let arrivalDateTime: string | null = null

    if (leg?.dep) {
      // Parse DD/MM/YYYY format
      const [day, month, year] = leg.dep.split('/')
      if (day && month && year) {
        departureDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        
        // Use segment departure time if available
        if (segment?.departureTime) {
          const [datePart] = segment.departureTime.split('T')
          const [timePart] = segment.departureTime.split('T')[1]?.split(':') || []
          if (datePart && timePart) {
            departureDateTime = `${datePart}T${timePart}:00.000Z`
          }
        }
        
        // Calculate arrival time from duration
        if (segment?.arrivalTime) {
          const [datePart] = segment.arrivalTime.split('T')
          const [timePart] = segment.arrivalTime.split('T')[1]?.split(':') || []
          if (datePart && timePart) {
            arrivalDateTime = `${datePart}T${timePart}:00.000Z`
          }
        }
      }
    }

    // Format time for display (HH:MM AM/PM)
    const formatTime = (isoString: string | null | undefined): string => {
      if (!isoString) return ''
      try {
        const date = new Date(isoString)
        if (isNaN(date.getTime())) return ''
        const hours = date.getUTCHours()
        const minutes = date.getUTCMinutes()
        if (isNaN(hours) || isNaN(minutes)) return ''
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const displayHours = hours % 12 || 12
        return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00 ${ampm}`
      } catch {
        return ''
      }
    }

    // Format date for display (MM/DD/YYYY to match API response format)
    const formatDate = (isoString: string | null | undefined): string => {
      if (!isoString) return ''
      try {
        const date = new Date(isoString)
        if (isNaN(date.getTime())) return ''
        const day = date.getUTCDate()
        const month = date.getUTCMonth() + 1
        const year = date.getUTCFullYear()
        if (isNaN(day) || isNaN(month) || isNaN(year)) return ''
        return `${month}/${day}/${year}`
      } catch {
        return ''
      }
    }

    // Calculate duration from segment
    const durationMinutes = segment?.duration || data?.flightDetails?.durationMinutes || 0
    const hours = Math.floor(durationMinutes / 60)
    const minutes = durationMinutes % 60
    const durationStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

    // Get passenger counts from nexusBookingData or response
    const nAdt = data?.nexusBookingData?.query?.nAdt || data?.passengers?.adult || 1
    const nChd = data?.nexusBookingData?.query?.nChd || data?.passengers?.child || 0
    const nInf = data?.nexusBookingData?.query?.nInf || data?.passengers?.infant || 0

    // Calculate fare breakdown from fare or nexusBookingData
    const totalPrice = fare?.totalFare || data?.nexusBookingData?.total_price || data?.totalPrice?.totalFare || 0
    const baseFare = fare?.baseFare || Math.round(totalPrice * 0.85)
    const taxes = fare?.taxes || Math.round(totalPrice * 0.15)

    const legsCount = data?.nexusBookingData?.query?.legs?.length || 0
    const searchType = legsCount > 1 
      ? 'ROUNDTRIP' 
      : (legsCount === 1 
          ? 'ONEWAY' 
          : (data?.bookingInfo?.searchType || 'ONEWAY'))

    // Build transformed response
    const transformed: any = {
      bookingInfo: {
        bookingId: data?.bookingInfo?.bookingId || data?.nexusBookingData?.priceId || '',
        status: data?.bookingInfo?.status || 'SUCCESS',
        isDomestic: data?.bookingInfo?.isDomestic ?? true,
        searchType: searchType,
        cabinClass: fare?.cabinClass || data?.bookingInfo?.cabinClass || 'Economy',
      },
      flightDetails: {
        airline: {
          code: segment?.airlineCode || data?.flightDetails?.airline?.code || '',
          name: segment?.airlineName || data?.flightDetails?.airline?.name || '',
          isLowCost: data?.flightDetails?.airline?.isLowCost ?? false,
        },
        flightNumber: segment?.flightCode || data?.flightDetails?.flightNumber || '',
        aircraft: data?.flightDetails?.aircraft || null,
        duration: durationStr,
        durationMinutes: durationMinutes,
        stops: segment?.stops ?? data?.flightDetails?.stops ?? 0,
        isNonStop: (segment?.stops ?? 0) === 0,
      },
      route: {
        departure: {
          airportCode: data?.route?.departure?.airportCode || segment?.from || leg?.src || '',
          airportName: data?.route?.departure?.airportName || null,
          city: data?.route?.departure?.city || segment?.fromCity || null,
          country: data?.route?.departure?.country || null,
          dateTime: data?.route?.departure?.dateTime || departureDateTime || segment?.departureTime || null,
          date: data?.route?.departure?.date || formatDate(data?.route?.departure?.dateTime || departureDateTime || segment?.departureTime || departureDate) || '',
          time: data?.route?.departure?.time || formatTime(data?.route?.departure?.dateTime || departureDateTime || segment?.departureTime) || '',
        },
        arrival: {
          airportCode: data?.route?.arrival?.airportCode || segment?.to || leg?.dst || '',
          airportName: data?.route?.arrival?.airportName || null,
          city: data?.route?.arrival?.city || segment?.toCity || null,
          country: data?.route?.arrival?.country || null,
          terminal: data?.route?.arrival?.terminal || null,
          dateTime: data?.route?.arrival?.dateTime || arrivalDateTime || segment?.arrivalTime || null,
          date: data?.route?.arrival?.date || formatDate(data?.route?.arrival?.dateTime || arrivalDateTime || segment?.arrivalTime) || '',
          time: data?.route?.arrival?.time || formatTime(data?.route?.arrival?.dateTime || arrivalDateTime || segment?.arrivalTime) || '',
        },
      },
      passengers: {
        adult: nAdt,
        child: nChd,
        infant: nInf,
        total: nAdt + nChd + nInf,
      },
      fareBreakdown: {
        adult: nAdt > 0 ? {
          publishedFare: totalPrice,
          baseFare: baseFare,
          otTax: 0,
          k3AirlineGST: 0,
          fuelCharges: taxes,
          airportTax: 0,
          facilityCharge: 0,
          medicalFacilityTax: 0,
          serviceCharge: 0,
          totalTaxes: taxes,
          totalFare: totalPrice,
          netFare: totalPrice,
          convenienceFee: 0,
          convenienceGST: 0,
          markupFee: 0,
          markupGST: 0,
          airlineConvenienceFee: 0,
          baggage: fare?.baggage || {
            checkedBaggage: '15 KG',
            cabinBaggage: '7 KG',
          },
          fareClass: fare?.fareBasis || null,
          perPassengerSummary: {
            adult: Math.round(totalPrice / nAdt),
            otTax: 0,
            k3AirlineGST: 0,
            fuelCharges: Math.round(taxes / nAdt),
            total: Math.round(totalPrice / nAdt),
          },
        } : null,
        child: nChd > 0 ? {
          publishedFare: Math.round(totalPrice / (nAdt + nChd) * nChd),
          baseFare: Math.round(baseFare / (nAdt + nChd) * nChd),
          otTax: 0,
          k3AirlineGST: 0,
          fuelCharges: Math.round(taxes / (nAdt + nChd) * nChd),
          totalTaxes: Math.round(taxes / (nAdt + nChd) * nChd),
          totalFare: Math.round(totalPrice / (nAdt + nChd) * nChd),
          netFare: Math.round(totalPrice / (nAdt + nChd) * nChd),
          perPassengerSummary: {
            child: Math.round(totalPrice / (nAdt + nChd)),
            total: Math.round(totalPrice / (nAdt + nChd)),
          },
        } : null,
        infant: nInf > 0 ? {
          publishedFare: Math.round(totalPrice / (nAdt + nInf) * nInf),
          baseFare: Math.round(baseFare / (nAdt + nInf) * nInf),
          totalTaxes: 0,
          totalFare: Math.round(totalPrice / (nAdt + nInf) * nInf),
          netFare: Math.round(totalPrice / (nAdt + nInf) * nInf),
          perPassengerSummary: {
            infant: Math.round(totalPrice / (nAdt + nInf)),
            total: Math.round(totalPrice / (nAdt + nInf)),
          },
        } : null,
      },
      totalPrice: {
        baseFare: baseFare,
        totalTaxes: taxes,
        totalFare: totalPrice,
        netPayable: totalPrice,
        convenienceFee: 0,
        gst: 0,
      },
      taxBreakdown: data?.taxBreakdown || {
        airportTax: 0,
        fuelTax: taxes,
        serviceCharge: 0,
        otherTaxes: 0,
        facilityCharge: 0,
        medicalFacilityTax: 0,
      },
      addOnServices: data?.addOnServices || {
        baggage: [],
        meals: [],
      },
      fareRules: data?.fareRules || {},
      additionalInfo: {
        fareType: fare?.fareBasis || data?.additionalInfo?.fareType || null,
        mealIncluded: data?.additionalInfo?.mealIncluded ?? false,
        refundable: data?.additionalInfo?.refundable ?? false,
        bookingClass: fare?.bookingCode || data?.additionalInfo?.bookingClass || null,
        fareBase: fare?.fareBasis || data?.additionalInfo?.fareBase || null,
      },
      saleSummary: {
        adult: nAdt > 0 ? {
          baseFare: Math.round(baseFare / nAdt),
          otTax: 0,
          k3AirlineGST: 0,
          fuelCharges: Math.round(taxes / nAdt),
          total: Math.round(totalPrice / nAdt),
        } : null,
        child: nChd > 0 ? {
          baseFare: Math.round(baseFare / (nAdt + nChd)),
          otTax: 0,
          k3AirlineGST: 0,
          fuelCharges: Math.round(taxes / (nAdt + nChd)),
          total: Math.round(totalPrice / (nAdt + nChd)),
        } : null,
        infant: nInf > 0 ? {
          baseFare: Math.round(baseFare / (nAdt + nInf)),
          otTax: 0,
          k3AirlineGST: 0,
          fuelCharges: 0,
          total: Math.round(totalPrice / (nAdt + nInf)),
        } : null,
        totalFare: [
          ...(nAdt > 0 ? [{ label: `Adult*${nAdt}`, value: totalPrice }] : []),
          ...(nChd > 0 ? [{ label: `Child*${nChd}`, value: 0 }] : []),
          ...(nInf > 0 ? [{ label: `Infant*${nInf}`, value: 0 }] : []),
          { label: 'Handling Charges', value: 0 },
          { label: 'Markup', value: 0 },
          { label: 'Total Payable', value: totalPrice },
        ],
        totalAmount: totalPrice,
      },
      supplier: 'NEXUS',
    }

    return transformed
  } catch (error) {
    console.error('Error transforming Nexus fare summary:', error)
    return nexusResponse?.data || nexusResponse || {}
  }
}


