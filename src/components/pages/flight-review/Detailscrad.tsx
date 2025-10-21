import AirlinesLogos from '@/components/ui/logos/AirlinesLogos';
import Image from 'next/image';
import { FaArrowRight, FaBolt, FaClock, FaCoffee, FaPlane, FaSuitcase, FaTv, FaWifi } from 'react-icons/fa';
import { MdGridView } from "react-icons/md";
import { Box, Text } from 'theme-ui';

interface FlightBookingUiProps {
  showWarning?: boolean
}

const FlightBookingUI = ({ showWarning = false }: FlightBookingUiProps) => {
  return (
    <Box className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
      {/* First Flight Section */}
      <Box className="p-4 md:p-6 border-b border-gray-200 flex gap-10 flex-col">
        <Box className="flex flex-col ">
          <Text variant="Primary28Medium125" className=" font-semibold text-gray-900  flex items-center gap-2">
            Ghaziabad <FaArrowRight className="text-gray-900 w-4 h-4" /> Mumbai
          </Text>
          <Text variant="Maison14Regular20" color="grey1" as="span"> <strong>Wed, 16 Jul</strong> • Non-stop • 2h 10m • Economy</Text>
        </Box>

        {/* Warning Banner */}
        {
          showWarning && (
            <Box className="bg-yellow-50 border border-yellow-200 rounded-lg p-2  flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <FaPlane className="text-yellow-600 w-4 h-4 flex-shrink-0 hidden md:block" />
              <Text variant="Maison14Regular20" color="yellow_600" as="span">
                You searched for a flight from <Text as="span" sx={{ fontWeight: 500 }}>DEL (Delhi Indira Gandhi International Airport)</Text> , but you have selected <Text as="span" sx={{ fontWeight: 500 }}>HDO (Hindon Airport)</Text> as the departure airport.
              </Text>
            </Box>

          )
        }

        {/* Airline Info */}
        <Box className="flex flex-col sm:flex-row sm:items-center gap-3  ">
          <AirlinesLogos names='Air India' width={140} height={65} />
          <Box className="flex flex-wrap items-center gap-2 ">
            <Text variant="Primary18Medium125" className="font-semibold text-gray-900">Air India Express</Text>
            <Text variant="Maison14Regular20" color="grey1" as="span">IX 1178</Text>
            <Text
              sx={{ fontFamily: 'poppins' }}
              color='green_700'
              className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-green-800 border-1"
            >
              <FaClock className="w-3 h-3" />
              70% On-time
            </Text>
          </Box>
        </Box>

        {/* Flight Details */}
        <Box className="flex flex-col lg:flex-row lg:items-start justify-between  gap-6 ">
          <Box className="flex items-start flex-1 ">
            <Box className="text-center flex-1 flex-col flex items-start">
              <Text variant="Maison14Regular20" color="grey1" className="mb-1">Wed, 16 Jul</Text>
              <Text variant="Maison60Demi125" className="text-gray-900">11:35</Text>
              <Text variant="Maison14Regular20" className="font-medium text-gray-900 mt-1">HDO - Ghaziabad</Text>
              <Text variant="Maison14Regular20" color="grey1">Hindon Airport</Text>
            </Box>

            <Box className="flex flex-col items-center px-4 self-center">
              <Text variant="Maison14Regular20" color="grey1">2h 10m</Text>
              <Image
                src="/images/line.svg"
                alt="Flight route line"
                width={100}
                height={2}
                className="w-full max-w-xs"
              />
            </Box>

            <Box className="text-center flex-1 flex-col flex items-end">
              <Text variant="Maison14Regular20" color="grey1" className="mb-1">Wed, 16 Jul</Text>
              <Text variant="Maison60Demi125" className="text-gray-900">13:45</Text>
              <Text variant="Maison14Regular20" className="font-medium text-gray-900 mt-1">BOM - Mumbai</Text>
              <Text variant="Maison14Regular20" color="grey1">Chatrapati Shivaji</Text>
              <Text variant="Maison14Regular20" color="grey1">International Airport</Text>
              <Text variant="Maison14Regular20" color="grey1">Terminal 2</Text>
            </Box>
          </Box>

          {/* Baggage Section */}
          <Box className="lg:ml-8  lg:border-gray-200 lg:pl-6 border-t lg:border-t-0 border-gray-200  lg:pt-0 flex flex-col items-start gap-3">
            <Text variant="Primary14Medium20" color="grey1"> <strong>Baggage</strong> </Text>
            <Box className="space-y-2">
              <Box className="flex items-center gap-2">
                <FaSuitcase className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <Text variant="Maison14Regular20" color="grey2"><strong>Cabin</strong> : 7 kg per adult</Text>
              </Box>
              <Box className="flex items-center gap-2">
                <FaSuitcase className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <Text variant="Maison14Regular20" color="grey2"><strong>Check-in</strong> : 15 kg per piece, 1 piece per adult</Text>
              </Box>
            </Box>
          </Box>
        </Box>



        {/* Flight Features */}
        <Box className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-600 text-sm mt-4">
          <Box className="flex items-center gap-1">
            <FaPlane className="w-4 h-4" />
            <Text variant="Maison14Regular20" color="grey1">B737MAX8</Text>
          </Box>
          <Box className="flex items-center gap-1">
            <Image
              src='images/chair.svg'
              alt='chair'
              width={16}
              height={16}
            />
            <Text variant="Maison14Regular20" color="grey1">Narrow</Text>
          </Box>
          <Box className="flex items-center gap-1">
            <MdGridView className="w-4 h-4" />
            <Text variant="Maison14Regular20" color="grey1" className="hidden sm:inline">Narrow (Limited seat tilt)</Text>
          </Box>
          <FaWifi className="w-4 h-4" />
          <FaCoffee className="w-4 h-4" />
          <FaTv className="w-4 h-4" />
          <FaBolt className="w-4 h-4" />
        </Box>
      </Box>
    </Box>
  );
};

export default FlightBookingUI;
