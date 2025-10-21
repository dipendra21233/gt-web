import { Fare } from "@/types/module/flightSearch";
import { FaChair, FaUser, FaUtensils } from 'react-icons/fa';
import { Box, Text } from "theme-ui";

export function FlightFareDetails({ localFare }: { localFare: Fare }) {
  return (
    <Box as="div" className="bg-gray-900 text-white py-3">
      <Box as="div" className="flex items-center justify-center gap-4 px-4">

        <Box as="div" className="flex items-center gap-2">
          <FaChair className="w-4 h-4 text-gray-400" />
          <Text variant="Maison14Medium20" className="!text-white">
            {localFare?.seatsAvailable || '-'}
          </Text>
        </Box>

        <Box as="div" className="flex items-center gap-2">
          <FaUtensils className="w-4 h-4 text-gray-400" />
          <Text variant="Maison14Medium20" className="!text-white">
            {localFare?.meal ? localFare?.meal : '-'}
          </Text>
        </Box>

        <Box as="div" className="flex items-center gap-2">
          <FaUser className="w-4 h-4 text-gray-400" />
          <Text variant="Maison14Medium20" className="!text-white">
            ADT: {localFare?.baggage?.checkIn || '-'} / {localFare?.baggage?.cabin || '-'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
