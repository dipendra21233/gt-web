import { Fare } from "@/types/module/flightSearch";
import { FaChair, FaUser, FaUtensils } from 'react-icons/fa';
import { Box, Text } from "theme-ui";
import { useIsMobile } from "@/hooks/use-mobile";

export function FlightFareDetails({ localFare }: { localFare: Fare }) {
  const isMobile = useIsMobile();
  
  return (
    <Box as="div" className={`bg-gray-900 text-white ${isMobile ? 'py-1.5' : 'py-2 md:py-3'}`}>
      <Box as="div" className={`flex items-center ${isMobile ? 'justify-start gap-1.5' : 'justify-center gap-2 md:gap-4'} ${isMobile ? 'px-2 overflow-x-auto' : 'px-3 md:px-4'} flex-wrap`} sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>

        <Box as="div" className={`flex items-center ${isMobile ? 'gap-1' : 'gap-1.5 md:gap-2'} ${isMobile ? 'flex-shrink-0' : ''}`}>
          <FaChair className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 md:w-4 md:h-4'} text-gray-400 flex-shrink-0`} />
          <Text variant="Maison14Medium20" className={`!text-white ${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'} whitespace-nowrap`}>
            {localFare?.seatsAvailable || '-'}
          </Text>
        </Box>

        <Box as="div" className={`flex items-center ${isMobile ? 'gap-1' : 'gap-1.5 md:gap-2'} ${isMobile ? 'flex-shrink-0' : ''}`}>
          <FaUtensils className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 md:w-4 md:h-4'} text-gray-400 flex-shrink-0`} />
          <Text variant="Maison14Medium20" className={`!text-white ${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'} whitespace-nowrap`}>
            {localFare?.meal ? localFare?.meal : '-'}
          </Text>
        </Box>

        <Box as="div" className={`flex items-center ${isMobile ? 'gap-1' : 'gap-1.5 md:gap-2'} ${isMobile ? 'flex-shrink-0' : ''}`}>
          <FaUser className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 md:w-4 md:h-4'} text-gray-400 flex-shrink-0`} />
          <Text variant="Maison14Medium20" className={`!text-white ${isMobile ? 'text-[10px]' : 'text-[10px] md:text-sm'} whitespace-nowrap`}>
            ADT: {localFare?.baggage?.checkIn || '-'} / {localFare?.baggage?.cabin || '-'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
