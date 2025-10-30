'use client'
import { FlightBookingBar } from "@/components/pages/flight-result/FlightBookingBar"
import FlightSearchForm from "@/components/shared/FlightSearchForm/FlightSearchForm"
import CommonModal from "@/components/shared/PopupModals/CommonModal"
import FlightCardSkeleton from "@/components/shared/Skeleton/FlightCardSkeleton"
import { FlightDetailDrawer } from "@/components/pages/flight-result/FlightDetailsDrawer"
import { FlightSearchBar } from "@/components/web/components/FlightResult/FlightSearchBar"
import FlightFiltersPanelNew from "@/components/web/components/FlightResult/NewFlightfilterPanel"
// removed API trigger on Show Details
import { clearAllFilters, setUserInfo } from "@/store/slice/flight.slice"
import { Fare, FlightListingDataProps } from "@/types/module/flightSearch"
import { MainStoreType } from "@/types/store/reducers/main.reducers"
import { FlightSearchResult, getFlightSearchResults } from "@/utils/flightStorageUtils"
import { applyMultipleFilters, convertToDateObject } from "@/utils/functions"
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Text } from "theme-ui"

// Memoized Flight Card Component for better performance
const FlightCard = React.memo(({ flight, index, returnFlight, selectedFare, onShowDetails }: {
  flight: FlightListingDataProps;
  index: number;
  returnFlight: boolean;
  selectedFare: Fare;
  onShowDetails: (data: Fare) => void;
}) => (
  <Box
    className="bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 rounded-2xl shadow-lg border border-orange-200/60 hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 p-2 group"
    sx={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,247,237,0.8) 50%, rgba(254,243,199,0.6) 100%)',
      boxShadow: '0 8px 32px 0 rgba(251, 146, 60, 0.08)',
      '&:hover': {
        boxShadow: '0 16px 48px 0 rgba(251, 146, 60, 0.15)',
        transform: 'translateY(-4px)',
      }
    }}
  >
    <FlightBookingBar
      flightData={flight}
      varient={returnFlight ? "dual" : "single"}
      showDetails={onShowDetails}
      selectedFare={selectedFare}
      index={index}
    />
  </Box>
));

FlightCard.displayName = 'FlightCard';

// Custom Flight Sort Bar Component for localStorage data
const CustomFlightSortBar = React.memo(({
  onSortChange,
  currentSort,
  sortOrder,
  flightCount,
  fromDestination,
  toDestination
}: {
  onSortChange: (sortBy: 'price' | 'duration' | 'departure' | 'arrival') => void
  currentSort: 'price' | 'duration' | 'departure' | 'arrival'
  sortOrder: 'asc' | 'desc'
  flightCount: number
  fromDestination: string | null
  toDestination: string | null
}) => (
  <Box className="w-full flex flex-col gap-1 rounded-t-lg px-2 py-1">
    {/* Top Row: Route and Flights Count */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 1 }}>
      <Text variant="Primary18Medium125" color="orange_700">
        {fromDestination} - {toDestination}
      </Text>
      <Text variant="Maison14Regular20" color="grey1">
        {flightCount} Flights Available
      </Text>
    </Box>
    {/* Sort Tabs */}
    <Box className="flex items-center justify-between rounded-lg overflow-hidden bg-gray-50">
      <Box
        as="button"
        className={`flex-1 py-2 font-semibold transition-colors text-sm ${currentSort === "price" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
          }`}
        onClick={() => onSortChange('price')}
      >
        <Text
          variant="Maison14Regular20"
          sx={{ color: currentSort === "price" ? "#F97316" : "#1A1A1A" }}
        >
          Price {currentSort === "price" && (sortOrder === 'asc' ? '↑' : '↓')}
        </Text>
      </Box>
      <Box
        as="button"
        className={`flex-1 py-2 font-semibold transition-colors text-sm ${currentSort === "duration" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
          }`}
        onClick={() => onSortChange('duration')}
      >
        <Text
          variant="Maison14Regular20"
          sx={{ color: currentSort === "duration" ? "#F97316" : "#1A1A1A" }}
        >
          Duration {currentSort === "duration" && (sortOrder === 'asc' ? '↑' : '↓')}
        </Text>
      </Box>
      <Box
        as="button"
        className={`flex-1 py-2 font-semibold transition-colors text-sm ${currentSort === "departure" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
          }`}
        onClick={() => onSortChange('departure')}
      >
        <Text
          variant="Maison14Regular20"
          sx={{ color: currentSort === "departure" ? "#F97316" : "#1A1A1A" }}
        >
          Departure {currentSort === "departure" && (sortOrder === 'asc' ? '↑' : '↓')}
        </Text>
      </Box>
      <Box
        as="button"
        className={`flex-1 py-2 font-semibold transition-colors text-sm ${currentSort === "arrival" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
          }`}
        onClick={() => onSortChange('arrival')}
      >
        <Text
          variant="Maison14Regular20"
          sx={{ color: currentSort === "arrival" ? "#F97316" : "#1A1A1A" }}
        >
          Arrival {currentSort === "arrival" && (sortOrder === 'asc' ? '↑' : '↓')}
        </Text>
      </Box>
    </Box>
  </Box>
))

CustomFlightSortBar.displayName = 'CustomFlightSortBar'

function FlightResult() {
  const { flightData, returnFlightData, fromDestination, toDestination, depature, returnFlight, flightclass, selectedFare, adult, child, infants, activeFilters } = useSelector(
    (state: MainStoreType) => state.filterFlightData
  )

  console.log(flightData, "flightData")

  // Example: How to retrieve stored flight search results from localStorage
  // const storedFlightResults = getFlightSearchResults()
  // if (storedFlightResults) {
  //   console.log('Stored flight results:', storedFlightResults)
  //   // You can use this data to populate the flight results instead of making API calls
  // }

  const dispatch = useDispatch()
  const params = useSearchParams();
  const [selectedFlightData, setSelectedFlightData] = useState<FlightListingDataProps | null>(null)
  const [selectedFlightFare, setSelectedFlightFare] = useState<Fare | null>(null)

  const [openDrawerModal, setOpenDrawerModal] = useState(false)
  const [isModifyOpen, setIsModifyOpen] = useState(false)
  const [isSearching] = useState(false)
  const [localStorageFlightData, setLocalStorageFlightData] = useState<FlightListingDataProps[]>([])
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure' | 'arrival'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Pagination and virtualization states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true)
  // Removed unused variables for virtualization (can be added later if needed)

  const handleCloseDrawer = () => {
    setOpenDrawerModal(false)
  }

  // Transform localStorage data to match FlightListingDataProps format
  const transformLocalStorageData = useCallback((storedData: FlightSearchResult[]): FlightListingDataProps[] => {
    return storedData.map((flight) => ({
      segments: flight.segments.map(segment => ({
        ...segment,
        toTerminal: segment.fromTerminal, // Assuming same terminal structure
        seatsAvailable: Math.floor(Math.random() * 9) + 1, // Random seats for demo
      })),
      fares: flight.fares.map(fare => ({
        ...fare,
        seatsAvailable: Math.floor(Math.random() * 9) + 1, // Random seats for demo
      })),
      filterKeys: {
        // Time-based filters
        timeCategory: (() => {
          const hour = new Date(flight.segments[0].departureTime).getHours()
          if (hour >= 5 && hour < 8) return 'early_morning'
          if (hour >= 8 && hour < 12) return 'morning'
          if (hour >= 12 && hour < 18) return 'mid_day'
          return 'night'
        })(),
        departureHour: new Date(flight.segments[0].departureTime).getHours(),

        // Stops-based filters
        stopsCategory: flight.segments[0].stops === 0 ? 'non_stop' :
          flight.segments[0].stops === 1 ? 'one_stop' : 'multiple_stops',
        stopsCount: flight.segments[0].stops,

        // Fare-based filters
        fareTypeCategory: flight.fares[0].fareIdentifier,
        isRefundable: flight.fares[0].refundType === 'Refundable',

        // Price-based filters
        totalFare: flight.fares[0].totalFare,
        baseFare: flight.fares[0].baseFare,
        taxes: flight.fares[0].taxes,

        // Duration-based filters
        totalDurationMinutes: flight.segments[0].duration,
        durationCategory: flight.segments[0].duration < 120 ? 'short' :
          flight.segments[0].duration < 300 ? 'medium' : 'long',

        // Airline-based filters
        airlineName: flight.segments[0].airlineName,
        airlineCode: flight.segments[0].airlineCode,

        // Route-based filters
        fromAirport: flight.segments[0].from,
        toAirport: flight.segments[0].to,
        fromCity: flight.segments[0].fromCity,
        toCity: flight.segments[0].toCity,

        // Availability filters
        seatsAvailable: Math.floor(Math.random() * 9) + 1,
        hasAvailableSeats: true,

        // Cabin class filters
        cabinClass: flight.fares[0].cabinClass,

        // Baggage filters
        hasBaggage: true,

        // Meal filters
        hasMeal: flight.fares[0].meal !== 'Paid',

        // Combined filters
        isDirectFlight: flight.segments[0].stops === 0,
        isConnectingFlight: flight.segments[0].stops > 0,
        isLowCostCarrier: flight.segments[0].airlineCode === '6E' || flight.segments[0].airlineCode === 'SG',
      }
    }))
  }, [])

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedResults = getFlightSearchResults()
    if (storedResults && storedResults.length > 0) {
      const transformedData = transformLocalStorageData(storedResults)
      setLocalStorageFlightData(transformedData)
      console.log('Loaded flight data from localStorage:', transformedData)
    }
  }, [transformLocalStorageData])

  // Sorting function for localStorage data
  const sortFlightData = useCallback((data: FlightListingDataProps[], sortBy: string, order: 'asc' | 'desc') => {
    return [...data].sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'price':
          comparison = a.fares[0].totalFare - b.fares[0].totalFare
          break
        case 'duration':
          comparison = a.segments[0].duration - b.segments[0].duration
          break
        case 'departure':
          comparison = new Date(a.segments[0].departureTime).getTime() - new Date(b.segments[0].departureTime).getTime()
          break
        case 'arrival':
          comparison = new Date(a.segments[0].arrivalTime).getTime() - new Date(b.segments[0].arrivalTime).getTime()
          break
        default:
          comparison = 0
      }

      return order === 'asc' ? comparison : -comparison
    })
  }, [])

  // Apply sorting and basic filtering when dependencies change
  const sortedFlightData = useMemo(() => {
    let filteredData = localStorageFlightData

    // Basic filtering based on search criteria
    if (fromDestination || toDestination || flightclass) {
      filteredData = localStorageFlightData.filter(flight => {
        const segment = flight.segments[0]
        const fromMatch = !fromDestination || segment.from === fromDestination
        const toMatch = !toDestination || segment.to === toDestination
        const classMatch = !flightclass || flight.fares.some(fare =>
          fare.cabinClass.toLowerCase() === flightclass.toLowerCase()
        )

        return fromMatch && toMatch && classMatch
      })
    }

    // Apply left panel filters using prepared filterKeys
    filteredData = applyMultipleFilters(filteredData, {
      timeCategories: activeFilters.timeCategories,
      stopsCategories: activeFilters.stopsCategories,
      fareTypes: activeFilters.fareTypes,
      airlines: activeFilters.airlines,
    })

    return sortFlightData(filteredData, sortBy, sortOrder)
  }, [localStorageFlightData, sortBy, sortOrder, sortFlightData, fromDestination, toDestination, flightclass, activeFilters])

  // Paginated data for current page
  const paginatedData = useMemo(() => {
    const startIndex = 0
    const endIndex = currentPage * itemsPerPage
    return sortedFlightData.slice(startIndex, endIndex)
  }, [sortedFlightData, currentPage, itemsPerPage])

  // Check if there's more data to load
  const totalItems = sortedFlightData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const hasMore = currentPage < totalPages

  // Update hasMoreData when data changes
  useEffect(() => {
    setHasMoreData(hasMore)
  }, [hasMore])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [fromDestination, toDestination, flightclass, sortBy, sortOrder])

  // Handle sort change
  const handleSortChange = useCallback((newSortBy: 'price' | 'duration' | 'departure' | 'arrival') => {
    if (sortBy === newSortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('asc')
    }
  }, [sortBy])

  // Load more data function
  const loadMoreData = useCallback(() => {
    if (isLoadingMore || !hasMoreData) return

    setIsLoadingMore(true)

    // Simulate loading delay for better UX
    setTimeout(() => {
      setCurrentPage(prev => prev + 1)
      setIsLoadingMore(false)
    }, 500)
  }, [isLoadingMore, hasMoreData])

  // Scroll handler for infinite scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

    // Load more when user scrolls to 80% of the content
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight
    if (scrollPercentage > 0.8 && hasMoreData && !isLoadingMore) {
      loadMoreData()
    }
  }, [hasMoreData, isLoadingMore, loadMoreData])

  // Container ref for scroll handling
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run if we have URL parameters
    if (!params) return;

    // searchParams is a URLSearchParams object
    const from = params?.get('from');
    const to = params?.get('to');
    const depatureTime = (() => {
      try {
        return convertToDateObject(params?.get('depature'));
      } catch {
        return null;
      }
    })();
    const adult = params?.get('adults');
    const child = params?.get('child');
    const infants = params?.get('infants');
    const flightclass = params?.get('class');

    // Only dispatch if we have meaningful parameters
    if (from || to || depatureTime || adult || child || infants || flightclass) {
      dispatch(setUserInfo({
        fromDestination: from,
        toDestination: to,
        depature: depatureTime,
        returnFlight: null,
        flightclass: flightclass,
        adult: adult ? Number(adult) : null,
        child: child ? Number(child) : null,
        infants: infants ? Number(infants) : null,
      }))
    }

    // ...etc
  }, [params, dispatch])



  // No external API call on Show Details; handled purely in UI


  return (
    <div className="min-h-screen services-section !m-auto">
      <div className="container mx-auto pt-[50px]">
        <Box as="div" className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[30px] w-full">
          {/* Sidebar Filters */}
          <Box className="lg:col-span-4 xl:col-span-3">
            <FlightFiltersPanelNew />
          </Box>

          {/* Main Content Area */}
          <Box className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Use the same search bar UI but disabled; Search acts as Modify Search */}
            <Box className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 w-full">
              <FlightSearchBar
                fromDestination={fromDestination}
                toDestination={toDestination}
                depature={depature}
                returnFlight={returnFlight}
                adult={adult}
                child={child}
                infant={infants}
                travelClass={flightclass}
                // no-ops for setters since disabled
                setToDestination={() => { }}
                setFromDestination={() => { }}
                setDepatureDate={() => { }}
                setReturnDate={() => { }}
                updateTheFilter={() => { }}
                showDetails={() => { }}
                setClassAndTraveller={() => { }}
                disabled
                onModify={() => setIsModifyOpen(true)}
              />
            </Box>
            {/* Sort Bar */}
            <Box as="div" className='flex gap-4 w-full'>
              <Box className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 w-full">
                <CustomFlightSortBar
                  onSortChange={handleSortChange}
                  currentSort={sortBy}
                  sortOrder={sortOrder}
                  flightCount={totalItems}
                  fromDestination={fromDestination}
                  toDestination={toDestination}
                />
              </Box>
              {
                returnFlight && (
                  <Box className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 w-full">
                    <CustomFlightSortBar
                      onSortChange={handleSortChange}
                      currentSort={sortBy}
                      sortOrder={sortOrder}
                      flightCount={totalItems}
                      fromDestination={fromDestination}
                      toDestination={toDestination}
                    />
                  </Box>
                )
              }
            </Box>

            {/* Flight Results */}
            <Box as="div" className='flex gap-6 w-full justify-center'>
              <Box
                ref={scrollContainerRef}
                as="div"
                className="flex flex-col gap-[20px] w-full overflow-y-scroll max-h-[75vh] bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/60 p-8"
                onScroll={handleScroll}
                sx={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,247,237,0.9) 100%)',
                  boxShadow: '0 12px 48px 0 rgba(251, 146, 60, 0.15)',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(251, 146, 60, 0.1)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(180deg, #fb923c 0%, #f97316 100%)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '&:hover': {
                      background: 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)',
                    }
                  },
                  'scrollbar-width': 'auto',
                  'scrollbar-gutter': 'stable',
                }}>
                {/* Loading Skeleton */}
                {isSearching && (
                  <Box as="div" className="flex flex-col gap-[20px] w-full">
                    {[...Array(5)].map((_, index) => (
                      <FlightCardSkeleton key={`skeleton-${index}`} />
                    ))}
                  </Box>
                )}

                {/* Flight list with enhanced styling */}
                {!isSearching && paginatedData.length > 0 && (
                  <Box as="div" className="flex flex-col gap-6 w-full">
                    {paginatedData.map((flight: FlightListingDataProps, index: number) => (
                      <FlightCard
                        key={`flight-${index}`}
                        flight={flight}
                        index={index}
                        returnFlight={!!returnFlight}
                        selectedFare={selectedFare as Fare}
                        onShowDetails={(data: Fare) => {
                          // Open the drawer with the chosen flight and fare
                          setSelectedFlightData(flight)
                          setSelectedFlightFare(data)
                          setOpenDrawerModal(true)
                        }}
                      />
                    ))}

                    {/* Loading More Indicator */}
                    {isLoadingMore && (
                      <Box as="div" className="flex flex-col gap-[20px] w-full mt-4">
                        {[...Array(2)].map((_, index) => (
                          <FlightCardSkeleton key={`loading-more-${index}`} />
                        ))}
                      </Box>
                    )}

                    {/* Load More Button (Alternative to infinite scroll) */}
                    {!isLoadingMore && hasMoreData && (
                      <Box as="div" className="flex justify-center mt-6">
                        <Box
                          as="button"
                          onClick={loadMoreData}
                          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
                        >
                          Load More Flights ({totalItems - paginatedData.length} remaining)
                        </Box>
                      </Box>
                    )}

                    {/* End of Results */}
                    {!hasMoreData && paginatedData.length > 0 && (
                      <Box as="div" className="flex justify-center mt-6">
                        <Text variant="Maison14Regular20" color="grey_500" sx={{ textAlign: 'center' }}>
                          🎉 You&apos;ve seen all {totalItems} flights!
                        </Text>
                      </Box>
                    )}
                  </Box>
                )}

                {/* No flights found UI */}
                {!isSearching && paginatedData.length === 0 && totalItems === 0 && (
                  <Box
                    as="div"
                    className="flex flex-col items-center justify-center py-16 px-8 bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-2xl shadow-lg border border-orange-200 min-h-[400px] w-full"
                    sx={{
                      boxShadow: '0 10px 40px 0 rgba(251, 146, 60, 0.15)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Box as="div" className="text-center max-w-2xl">
                      {/* Icon */}
                      <Box as="div" className="mb-6">
                        <Box
                          as="div"
                          className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center"
                          sx={{
                            boxShadow: '0 4px 20px 0 rgba(251, 146, 60, 0.3)',
                          }}
                        >
                          <Text className="text-3xl">✈️</Text>
                        </Box>
                      </Box>

                      {/* Title */}
                      <Text
                        variant="Maison18Medium20"
                        className="text-orange-800 mb-4 font-bold tracking-wide"
                        as="h3"
                        sx={{
                          letterSpacing: '0.02em',
                          fontSize: ['1.75rem', '2rem'],
                          fontWeight: 700,
                        }}
                      >
                        Oops! No Flights Found
                      </Text>

                      {/* Description */}
                      <Text
                        variant="Maison14Regular20"
                        className="text-orange-600 mb-8 leading-relaxed"
                        sx={{
                          fontSize: ['1rem', '1.125rem'],
                          lineHeight: 1.7,
                        }}
                      >
                        We couldn&apos;t find any flights matching your current filters.
                        <br />
                        <span className="text-orange-700 font-semibold">Try adjusting your search criteria</span> or&nbsp;
                        <span className="text-orange-700 font-semibold">clear some filters</span> to see more options.
                      </Text>

                      {/* Action Button */}
                      <Box as="div" className="mt-6">
                        <Box
                          as="button"
                          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
                          onClick={() => dispatch(clearAllFilters())}
                        >
                          Clear All Filters
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              {
                returnFlight && (
                  <Box
                    as="div"
                    className='flex gap-6 w-full justify-center overflow-y-scroll max-h-[75vh] bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/60 p-8'
                    sx={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,247,237,0.9) 100%)',
                      boxShadow: '0 12px 48px 0 rgba(251, 146, 60, 0.15)',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'rgba(251, 146, 60, 0.1)',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: 'linear-gradient(180deg, #fb923c 0%, #f97316 100%)',
                        borderRadius: '4px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '&:hover': {
                          background: 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)',
                        }
                      },
                      'scrollbar-width': 'auto',
                      'scrollbar-gutter': 'stable',
                    }}
                  >
                    {
                      returnFlightData.length > 0 && (
                        <Box as="div" className="flex flex-col gap-6 w-full">
                          {returnFlightData.map((flight, index) => (
                            <Box
                              key={index}
                              className="bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 rounded-2xl shadow-lg border border-orange-200/60 hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 p-2 group"
                              sx={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,247,237,0.8) 50%, rgba(254,243,199,0.6) 100%)',
                                boxShadow: '0 8px 32px 0 rgba(251, 146, 60, 0.08)',
                                '&:hover': {
                                  boxShadow: '0 16px 48px 0 rgba(251, 146, 60, 0.15)',
                                  transform: 'translateY(-4px)',
                                }
                              }}
                            >
                              {/* uncomment this for the dual varient */}
                              {/* <FlightBookingBar varient={"dual"} flightData={flight} showDetails={() => {}}/> */}
                            </Box>
                          ))}
                        </Box>
                      )
                    }
                  </Box>
                )
              }
            </Box>
          </Box>

          {/* Flight Detail Drawer */}
          {
            selectedFlightData && (
              <FlightDetailDrawer
                open={openDrawerModal}
                onClose={handleCloseDrawer}
                flightData={[selectedFlightData]}
                selectedFlightFare={selectedFlightFare}
              />
            )
          }
        </Box>
      </div>
      {/* Modify Search Modal with reusable form */}
      <CommonModal
        isOpen={isModifyOpen}
        onClose={() => setIsModifyOpen(false)}
        wrapperClass="!p-0"
        heading="Modify Search"
        showHeader
        showFooter={false}
        isScrollable
        width="100%"
        classNames="!p-6"
      >
        <FlightSearchForm
          initial={{
            fromCode: fromDestination || undefined,
            toCode: toDestination || undefined,
            departureDate: depature ? `${new Date(depature).getFullYear()}-${String(new Date(depature).getMonth() + 1).padStart(2, '0')}-${String(new Date(depature).getDate()).padStart(2, '0')}` : undefined,
            returnDate: returnFlight ? `${new Date(returnFlight).getFullYear()}-${String(new Date(returnFlight).getMonth() + 1).padStart(2, '0')}-${String(new Date(returnFlight).getDate()).padStart(2, '0')}` : undefined,
            travelClass: flightclass || undefined,
            // passengers from query; if not present leave defaults (1 adult)
            passengers: {
              adults: adult ?? 1,
              children: child ?? 0,
              infants: infants ?? 0,
            },
          }}
          onSearchSuccess={() => setIsModifyOpen(false)}
        />
      </CommonModal>
    </div>
  )
}

function FlightResultWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightResult />
    </Suspense>
  )
}

export default FlightResultWithSuspense
