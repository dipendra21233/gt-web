import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/web/components/FlightResult/NewCheckbox';
import {
  clearAllFilters,
  setAirlineFilter,
  setFareTypeFilter,
  setStopsFilter,
  setTimeFilter
} from '@/store/slice/flight.slice';
import { MainStoreType } from '@/types/store/reducers/main.reducers';
import { refundData, stopsData } from '@/utils/constant';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdBrightness5, MdWbTwilight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text } from 'theme-ui';

// Enhanced color scheme matching the Gayatri Travels theme
const COLORS = {
  panelBg: 'linear-gradient(135deg, #ffffff 0%, #fef7ed 100%)', // white to warm orange tint
  border: '#fed7aa', // light orange border
  primary: '#ea580c', // orange-600
  primaryText: '#9a3412', // orange-800
  secondaryText: '#c2410c', // orange-700
  accent: '#fb923c', // orange-400
  cardBg: '#ffffff', // white
  cardSelected: '#fed7aa', // orange-200
  cardBorder: '#fb923c', // orange-400
  cardRadius: 12,
  cardShadow: '0 4px 12px 0 rgba(251, 146, 60, 0.08)',
  cardHoverShadow: '0 6px 20px 0 rgba(251, 146, 60, 0.12)',
};

const departureSlots = [
  {
    icon: <MdWbTwilight size={26} color={COLORS.primary} />,
    label: 'Early Morning',
    time: 'Before 6AM',
    value: 'early_morning',
  },
  {
    icon: <FaSun size={26} color={COLORS.primary} />,
    label: 'Morning',
    time: '6AM - 12PM',
    value: 'morning',
  },
  {
    icon: <MdBrightness5 size={26} color={COLORS.primary} />,
    label: 'Mid Day',
    time: '12PM - 6PM',
    value: 'mid_day',
  },
  {
    icon: <FaMoon size={26} color={COLORS.primary} />,
    label: 'Night',
    time: 'After 6PM',
    value: 'night',
  },
];

export default function FlightFiltersPanelNew() {
  const { airlines, activeFilters } = useSelector(
    (state: MainStoreType) => state.filterFlightData
  )
  const dispatch = useDispatch()

  // Helper function to toggle array items
  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };

  // Check if all airlines are selected
  const allAirlinesSelected = airlines && airlines.length > 0 &&
    airlines.every(airline => activeFilters.airlines.includes(airline));

  // Handle master toggle for all airlines
  const handleAllAirlinesToggle = (checked: boolean) => {
    console.log('Master toggle clicked:', checked, 'Available airlines:', airlines);
    if (checked) {
      // Select all airlines
      dispatch(setAirlineFilter([...airlines]));
    } else {
      // Deselect all airlines
      dispatch(setAirlineFilter([]));
    }
  };

  return (
    <Box
      className="
        flight-panel
        w-full
        hidden lg:block
        min-w-[320px] max-w-[380px]
        p-6
        rounded-2xl
        shadow-lg
        border
        border-orange-100
        sticky
        top-6
        h-fit
      "
      sx={{
        background: 'white',
        borderColor: COLORS.border,
        boxShadow: '0 8px 32px 0 rgba(251, 146, 60, 0.12)',
      }}
    >
      {/* Header */}
      <Box className="flex justify-between items-center mb-6">
        <Text
          variant="Maison18Medium20"
          sx={{
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: 0.2,
            color: COLORS.primaryText,
          }}
        >
          Filters
        </Text>
        <Text
          variant="Maison14Regular20"
          sx={{
            color: COLORS.accent,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 15,
            transition: 'all 0.2s',
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(251, 146, 60, 0.1)',
            '&:hover': {
              color: COLORS.primary,
              backgroundColor: 'rgba(251, 146, 60, 0.2)',
              transform: 'translateY(-1px)',
            },
          }}
          onClick={() => dispatch(clearAllFilters())}
        >
          Clear All
        </Text>
      </Box>

      <Box
        sx={{
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${COLORS.border} 50%, transparent 100%)`,
          marginBottom: '24px',
        }}
      />

      {/* Stops */}
      <Box as={"div"} sx={{ marginBottom: 3 }}>
        <Text
          variant="Maison16Demi125"
          sx={{
            color: COLORS.primaryText,
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 3,
          }}
        >
          Stops
        </Text>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {stopsData?.map((stop, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(251, 146, 60, 0.05)',
              border: '1px solid rgba(251, 146, 60, 0.1)',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                borderColor: 'rgba(251, 146, 60, 0.2)',
              }
            }}
          >
            <Text variant="Maison14Regular20" sx={{ color: COLORS.secondaryText, fontWeight: 500 }}>
              {stop.label}
            </Text>
            <Checkbox
              checked={activeFilters.stopsCategories.includes(stop.id)}
              onChange={() => {
                const newStops = toggleArrayItem(activeFilters.stopsCategories, stop.id);
                dispatch(setStopsFilter(newStops));
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Fare Type */}
      <Box as={"div"} sx={{ marginBottom: 3 }}>
        <Text
          variant="Maison16Demi125"
          sx={{
            color: COLORS.primaryText,
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 3,
          }}
        >
          Fare Type
        </Text>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {refundData?.map((stop) => (
          <Box
            key={stop.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(251, 146, 60, 0.05)',
              border: '1px solid rgba(251, 146, 60, 0.1)',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                borderColor: 'rgba(251, 146, 60, 0.2)',
              }
            }}
          >
            <Text variant="Maison14Regular20" sx={{ color: COLORS.secondaryText, fontWeight: 500 }}>
              {stop.label}
            </Text>
            <Checkbox
              checked={activeFilters.fareTypes.includes(stop.id)}
              onChange={() => {
                console.log('🎫 UI DEBUG - Fare type checkbox clicked');
                console.log('📋 Current fare types:', activeFilters.fareTypes);
                console.log('🎯 Clicked item:', stop.id);
                console.log('📝 Item details:', stop);

                const newFareTypes = toggleArrayItem(activeFilters.fareTypes, stop.id);
                console.log('🔄 New fare types:', newFareTypes);

                dispatch(setFareTypeFilter(newFareTypes));
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Departure */}
      <Box sx={{ marginBottom: 3 }}>
        <Text
          variant="Maison16Demi125"
          sx={{
            color: COLORS.primaryText,
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 3,
          }}
        >
          Departure
        </Text>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 3,
          mb: 4,
        }}
      >
        {departureSlots.map((slot, idx) => (
          <Box
            key={slot.value + idx}
            onClick={() => {
              const newTimeCategories = toggleArrayItem(activeFilters.timeCategories, slot.value);
              dispatch(setTimeFilter(newTimeCategories));
            }}
            sx={{
              background: activeFilters.timeCategories.includes(slot.value)
                ? `linear-gradient(135deg, ${COLORS.cardSelected} 0%, #ffffff 100%)`
                : COLORS.cardBg,
              border: `2px solid ${activeFilters.timeCategories.includes(slot.value) ? COLORS.cardBorder : COLORS.border}`,
              borderRadius: COLORS.cardRadius,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: activeFilters.timeCategories.includes(slot.value)
                ? COLORS.cardHoverShadow
                : COLORS.cardShadow,
              transition: 'all 0.3s ease',
              transform: activeFilters.timeCategories.includes(slot.value) ? 'translateY(-2px)' : 'translateY(0)',
              '&:hover': {
                borderColor: COLORS.cardBorder,
                boxShadow: COLORS.cardHoverShadow,
                transform: 'translateY(-2px)',
                background: `linear-gradient(135deg, ${COLORS.cardSelected} 0%, #ffffff 100%)`,
              },
            }}
          >
            <Box sx={{
              opacity: activeFilters.timeCategories.includes(slot.value) ? 1 : 0.7,
              transition: 'opacity 0.2s',
            }}>
              {slot.icon}
            </Box>
            <Text
              variant="Maison14Medium20"
              sx={{
                color: activeFilters.timeCategories.includes(slot.value)
                  ? COLORS.primaryText
                  : COLORS.secondaryText,
                fontWeight: 600,
                fontSize: 14,
                mt: 1,
                textAlign: 'center',
              }}
            >
              {slot.label}
            </Text>
            <Text
              variant="Maison12Regular"
              sx={{
                color: activeFilters.timeCategories.includes(slot.value)
                  ? COLORS.secondaryText
                  : '#9ca3af',
                fontSize: 12,
                mt: 0.5,
                textAlign: 'center',
              }}
            >
              {slot.time}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Popular Airlines */}
      <Box sx={{ marginBottom: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 3,
            padding: '12px 16px',
            backgroundColor: 'rgba(251, 146, 60, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(251, 146, 60, 0.1)',
          }}
        >
          <Text
            variant="Maison16Demi125"
            sx={{
              color: COLORS.primaryText,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Popular Airlines
          </Text>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Text
              variant="Maison14Regular20"
              sx={{
                color: allAirlinesSelected ? COLORS.primaryText : COLORS.secondaryText,
                fontWeight: allAirlinesSelected ? 600 : 500,
                fontSize: 14,
              }}
            >
              All ({activeFilters.airlines.length}/{airlines?.length || 0})
            </Text>
            <Switch
              checked={allAirlinesSelected}
              onCheckedChange={handleAllAirlinesToggle}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {airlines?.map((airline, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(251, 146, 60, 0.05)',
              border: '1px solid rgba(251, 146, 60, 0.1)',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                borderColor: 'rgba(251, 146, 60, 0.2)',
              }
            }}
          >
            <Text
              variant="Maison14Regular20"
              sx={{
                color: COLORS.secondaryText,
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              {airline}
            </Text>
            <Checkbox
              checked={activeFilters.airlines.includes(airline)}
              onChange={() => {
                const newAirlines = toggleArrayItem(activeFilters.airlines, airline);
                dispatch(setAirlineFilter(newAirlines));
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
