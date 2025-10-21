'use client'
import FlightSelect, { AirportOption } from '@/components/shared/FlightSelect'
import '@/components/shared/FlightSelect/FlightSelect.css'
import PassengerClassSelector from '@/components/shared/PassengerClassSelector/PassengerClassSelector'
import '@/components/shared/PassengerClassSelector/PassengerClassSelector.css'
import TripTypeSelector, { TripType } from '@/components/shared/TripTypeSelector/TripTypeSelector'
import '@/components/shared/TripTypeSelector/TripTypeSelector.css'
import { NoFlightFoundDialog } from '@/components/web/components/FlightSelectCard/NoflightFoundDialoge'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { useFlightSearchRequestMutation } from '@/hooks/useMutations'
import { AirportDataItemsProps, CabinClass } from '@/types/module/flightSearch'
import { MAX_SEARCH_RESULTS, POPULAR_AIRPORTS_COUNT, SEARCH_DEBOUNCE_MS } from '@/utils/constant'
import { storeFlightSearchResults } from '@/utils/flightStorageUtils'
import { formatDateToDDMMYYYY } from '@/utils/functions'
import { flightSearchSchemaRecommended } from '@/utils/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Calendar, MapPin, Search, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { SelectDateModal } from '../PopupModals/SelectDateModal'
import { TextInputField } from '../TextInputField/TextInputField'

export interface FlightSearchData {
  from: AirportOption | null
  to: AirportOption | null
  departureDate: string
  returnDate: string
  travelClass: string
  tripType: TripType
  passengers: {
    adults: number
    children: number
    infants: number
  }
}

interface FlightSearchFormProps {
  onSearch?: (searchData: FlightSearchData) => void
  className?: string
  initial?: {
    fromCode?: string
    toCode?: string
    departureDate?: string // yyyy-mm-dd
    returnDate?: string // yyyy-mm-dd
    travelClass?: string
    passengers?: FlightSearchData['passengers']
    tripType?: TripType
  }
  onSearchSuccess?: () => void
}

const DEFAULT_FORM_VALUES: FlightSearchData = {
  from: null,
  to: null,
  departureDate: '',
  returnDate: '',
  travelClass: 'economy',
  tripType: 'one-way',
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
}

const loadAirportsJson = (): AirportDataItemsProps[] => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const airportsData = require('airports-json')
    const indianAirports = airportsData?.airports?.filter((a: AirportDataItemsProps) => a.iso_country === 'IN') || []

    return indianAirports.filter(
      (a: AirportDataItemsProps) => a.iata_code && a.municipality && a.iso_country && a.type !== 'closed'
    )
  } catch (error) {
    console.error('Error loading airports data:', error)
    return []
  }
}

const convertToOptions = (airports: AirportDataItemsProps[]): AirportOption[] => {
  return airports.map((a) => ({
    value: a.iata_code,
    label: `${a.municipality}, India`,
    city: a.municipality,
    country: 'India',
    airportName: a.name,
    iataCode: a.iata_code,
  }))
}

const FlightSearchForm = ({ className = '', initial, onSearchSuccess }: FlightSearchFormProps) => {
  const router = useRouter()
  const [noFlightFound, setNoFlightFound] = useState(false)
  const { mutate: flightSearchRequestMutation, isPending } = useFlightSearchRequestMutation()
  const [allAirportsData, setAllAirportsData] = useState<AirportDataItemsProps[]>([])
  const [loadedAirports, setLoadedAirports] = useState<AirportOption[]>([])
  const [isSelectDateModalOpen, setIsSelectDateModalOpen] = useState(false)
  const [selectedDateType, setSelectedDateType] = useState<'departure' | 'return'>('departure')
  const [isLoading, setIsLoading] = useState(false)

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const methods = useForm<FlightSearchData>({
    resolver: yupResolver(flightSearchSchemaRecommended) as unknown as Resolver<FlightSearchData, unknown, FlightSearchData>,
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const { formState: { errors, isValid }, setValue, watch, handleSubmit, } = methods
  const formValues = watch()
  console.log(formValues, 'isValid96', isValid)
  
  // Filter options to exclude the selected city from the opposite field
  const getFilteredOptions = useCallback((field: 'from' | 'to') => {
    const oppositeField = field === 'from' ? 'to' : 'from'
    const oppositeValue = formValues[oppositeField]
    
    if (!oppositeValue) {
      return loadedAirports
    }
    
    // Filter out airports from the same city as the opposite field
    return loadedAirports.filter(airport => 
      airport.city !== oppositeValue.city
    )
  }, [loadedAirports, formValues.from, formValues.to])
  
  const getCityOptions = useMemo(() => loadedAirports, [loadedAirports])

  const loadAirportsData = useCallback((): AirportDataItemsProps[] => {
    if (allAirportsData.length > 0) return allAirportsData

    const airports = loadAirportsJson()
    setAllAirportsData(airports)
    return airports
  }, [allAirportsData])

  const getPopularAirports = useCallback((): AirportOption[] => {
    const airports = loadAirportsData()
    return convertToOptions(airports.slice(0, POPULAR_AIRPORTS_COUNT))
  }, [loadAirportsData])

  const searchAirports = useCallback((query: string): AirportOption[] => {
    if (!query.trim()) {
      return getPopularAirports()
    }

    const airports = loadAirportsData()
    const searchTerm = query.toLowerCase()

    const filteredAirports = airports.filter((a: AirportDataItemsProps) =>
      a.municipality.toLowerCase().includes(searchTerm) ||
      a.name.toLowerCase().includes(searchTerm) ||
      a.iata_code.toLowerCase().includes(searchTerm)
    )

    return convertToOptions(filteredAirports.slice(0, MAX_SEARCH_RESULTS))
  }, [loadAirportsData, getPopularAirports])

  const handleSearchChange = useCallback((inputValue: string) => {
    setIsLoading(true)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      const results = searchAirports(inputValue)
      setLoadedAirports(results)
      setIsLoading(false)
    }, SEARCH_DEBOUNCE_MS)
  }, [searchAirports])

  const handleSelectDate = useCallback((date: Date) => {
    const fieldName = selectedDateType === 'departure' ? 'departureDate' : 'returnDate'
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    setValue(fieldName, `${year}-${month}-${day}`)
    methods.clearErrors(fieldName)
  }, [selectedDateType, setValue, methods])

  const openDateModal = useCallback((dateType: 'departure' | 'return') => {
    setSelectedDateType(dateType)
    setIsSelectDateModalOpen(true)
  }, [])

  const onSubmit = () => {
    flightSearchRequestMutation({
      searchQuery: {
        paxInfo: {
          ADULT: formValues.passengers.adults.toString(),
          CHILD: formValues.passengers.children.toString(),
          INFANT: formValues.passengers.infants.toString(),
        },
        cabinClass: formValues.travelClass as CabinClass,
        routeInfos: [
          {
            fromCityOrAirport: { code: formValues.from?.value || '' },
            toCityOrAirport: { code: formValues.to?.value || '' },
            travelDate: formValues.departureDate,
          },
        ],
        searchModifiers: {
          isConnectingFlight: true,
          isDirectFlight: true,
        },
      },
    }, {
      onSuccess: (data) => {
        console.log(data?.data, 'check182')
        if (data?.status === 200 && data?.data?.length === 0) {
          setNoFlightFound(true)
        } else if (data?.status === 200 && data?.data?.length > 0) {
          storeFlightSearchResults(data?.data)
          const depDate = parseLocalYMD(formValues.departureDate)
          router.push(`/flights-search?from=${formValues.from?.value}&to=${formValues.to?.value}&depature=${formatDateToDDMMYYYY(depDate || null)}&adults=${formValues.passengers.adults}&child=${formValues.passengers.children}&infants=${formValues.passengers.infants}&class=${formValues.travelClass}`)
          if (onSearchSuccess) onSearchSuccess()
        }
      },
      onError: () => {
        console.log('error')
      }
    })
  }

  const handleAirportChange = useCallback((field: 'from' | 'to', selectedOption: AirportOption | null) => {
    setValue(field, selectedOption)
    methods.clearErrors(field)
    
    // If the selected city is the same as the opposite field, clear the opposite field
    if (selectedOption) {
      const oppositeField = field === 'from' ? 'to' : 'from'
      const oppositeValue = formValues[oppositeField]
      
      if (oppositeValue && oppositeValue.city === selectedOption.city) {
        setValue(oppositeField, null)
        methods.clearErrors(oppositeField)
      }
    }
  }, [setValue, methods, formValues.from, formValues.to])

  useEffect(() => {
    if (loadedAirports.length === 0) {
      const popular = getPopularAirports()
      setLoadedAirports(popular)
    }
  }, [loadedAirports.length, getPopularAirports])

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  const parseLocalYMD = (ymd?: string): Date | undefined => {
    if (!ymd) return undefined
    const [y, m, d] = ymd.split('-').map((n) => parseInt(n, 10))
    if (!y || !m || !d) return undefined
    return new Date(y, m - 1, d)
  }

  const selectedDepartureDate = parseLocalYMD(formValues.departureDate)
  const selectedReturnDate = parseLocalYMD(formValues.returnDate)

  // Prefill from initial props
  useEffect(() => {
    if (!initial) return

    const airports = loadAirportsData()
    const findOptionByCode = (code?: string | null): AirportOption | null => {
      if (!code) return null
      const a = airports.find((ap) => ap.iata_code?.toUpperCase() === code.toUpperCase())
      if (!a) return null
      return {
        value: a.iata_code,
        label: `${a.municipality}, India`,
        city: a.municipality,
        country: 'India',
        airportName: a.name,
        iataCode: a.iata_code,
      }
    }

    const initialFrom = findOptionByCode(initial.fromCode)
    const initialTo = findOptionByCode(initial.toCode)

    if (initialFrom) setValue('from', initialFrom)
    if (initialTo) setValue('to', initialTo)
    if (initial?.departureDate) setValue('departureDate', initial.departureDate)
    if (initial?.returnDate) setValue('returnDate', initial.returnDate)
    if (initial?.travelClass) setValue('travelClass', initial.travelClass)
    if (initial?.tripType) setValue('tripType', initial.tripType)
    if (initial?.passengers) setValue('passengers', initial.passengers)
  }, [initial, setValue, loadAirportsData])

  return (
    <div className={`flight-search-card ${className}`}>
      <div className="flight-search-header">
        <TripTypeSelector
          tripType={formValues.tripType}
          onTripTypeChange={(tripType) => setValue('tripType', tripType)}
          className="trip-type-header"
        />
      </div>

      <div className="flight-search-grid">
        <div className="flight-search-field">
          <FlightSelect
            label="From"
            icon={<MapPin size={16} />}
            placeholder="Enter departure city"
            options={getFilteredOptions('from')}
            value={formValues.from}
            onChange={(selectedOption) => handleAirportChange('from', selectedOption)}
            onInputChange={handleSearchChange}
            isLoading={isLoading}
            error={errors.from?.message}
          />
        </div>

        <div className="flight-search-field">
          <FlightSelect
            label="To"
            icon={<MapPin size={16} />}
            placeholder="Enter destination city"
            options={getFilteredOptions('to')}
            value={formValues.to}
            onChange={(selectedOption) => handleAirportChange('to', selectedOption)}
            onInputChange={handleSearchChange}
            isLoading={isLoading}
            error={errors.to?.message}
          />
        </div>

        <TextInputField
          firstInputBox
          customClassName="enhanced-input"
          value={formValues.departureDate}
          onChange={(e) => setValue('departureDate', e)}
          onClick={() => openDateModal('departure')}
          type="date"
          label="Departure"
          labelIcon={<Calendar size={16} />}
          labelVariant="Maison14Medium20"
          labelColor="grey_500"
          labelSx={{ fontWeight: 600 }}
          placeholder="Select departure date"
          errors={errors.departureDate?.message}
        />

        <TextInputField
          firstInputBox
          customClassName="enhanced-input"
          value={formValues.returnDate}
          onChange={(e) => setValue('returnDate', e)}
          onClick={() => openDateModal('return')}
          type="date"
          label="Return"
          labelIcon={<Calendar size={16} />}
          labelVariant="Maison14Medium20"
          labelColor="grey_500"
          labelSx={{ fontWeight: 600 }}
          placeholder="Select return date"
          errors={formValues.tripType === 'round-trip' ? errors.returnDate?.message : undefined}
        />

        <PassengerClassSelector
          passengers={formValues.passengers}
          travelClass={formValues.travelClass}
          onPassengersChange={(passengers) => setValue('passengers', passengers)}
          onClassChange={(travelClass) => setValue('travelClass', travelClass)}
          className="passenger-class-header"
          label="Traveler & Class"
          icon={<Users size={16} />}
        />

        <div className="mt-auto mb-2">
          <ThemeButton
            text="Search Flights"
            wrapperClassName="flex items-center gap-2"
            iconRight={<Search size={18} />}
            onClick={() => handleSubmit(onSubmit)()}
            isLoading={isPending}
          />
        </div>
      </div>

      <SelectDateModal
        isOpen={isSelectDateModalOpen}
        onClose={() => setIsSelectDateModalOpen(false)}
        wrapperClass="select-date-modal"
        onDateSelect={handleSelectDate}
        selectedDate={selectedDateType === 'departure' ? selectedDepartureDate : selectedReturnDate}
        dateType={selectedDateType}
      />

      <NoFlightFoundDialog
        isOpen={noFlightFound}
        onClose={() => {
          setNoFlightFound(false)
        }}

      />
    </div>
  )
}

export default FlightSearchForm
