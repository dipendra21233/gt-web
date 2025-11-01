import CommonDrawerModal from "@/components/shared/PopupModals/CommonDrawerModal";
import AirlinesLogos from "@/components/ui/logos/AirlinesLogos";
import { ThemeButton } from "@/components/web/core/Button/Button";
import { convertToShortDateString, convertToTimeString, formatDateToDDMMYYYY, formatDuration } from "@/utils/functions";
import { translation } from '@/utils/translation';
import { FlightDetailDrawerProps } from "components";
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaSuitcase } from "react-icons/fa";
import { Box, Image, Text } from "theme-ui";
import { AirportInfo } from "./FLightAriportName";

export function FlightDetailDrawer({ open, onClose, flightData, selectedFlightFare }: FlightDetailDrawerProps) {

    console.clear()
    console.log("flightData", flightData, selectedFlightFare)
    const router = useRouter();

    if (flightData?.length == 0) {
        return <Box>
            <Text variant="Maison14Regular20" color="grey1" as="span">No flight data found</Text>
        </Box>
    }

    return (<CommonDrawerModal
    className="flight-details-drawer"
        placement="right"
        title={translation?.FLIGHT_DETAILS}
        width={"auto"}
        open={open}
        onClose={onClose}
        footer={
            <Box className="flex items-center justify-between    border border-gray-100 py-2  px-3">
            <Box className={"flex flex-col"}>
                <Text variant="Maison24Demi32" className="text-gray-900 text-2xl font-semibold">
                    ₹{selectedFlightFare?.totalFare}
                </Text>
            </Box>
            <Box as="div" className="flex justify-start items-center">
                <ThemeButton
                    className="book-btn"
                    variant="secondary3"
                    sx={{ minWidth: '100px', maxWidth: '120px', width: '100%', }}
                    text={translation?.BOOK}
                    onClick={() => {
                        router.push(`/add-passenger?priceIds=${selectedFlightFare?.priceID}`);
                    }}
                />
            </Box>
        </Box>
        }
    >
        <Box className='d-flex justify-between flex-col  h-100'>
            {
                flightData?.map(data => {
                    return <Box key={data.segments[0]?.flightCode}>
                        <Box className=" mx-auto  overflow-hidden">
                            {/* First Flight Section */}
                            <Box className="p-4 md:p-6 border-b border-gray-200 flex gap-10 flex-col">
                                <Box className="flex flex-col ">
                                    <Text variant="Primary28Medium125" className=" font-semibold text-gray-900  flex items-center gap-2">
                                        {data.segments[0].fromCity} <FaArrowRight className="text-gray-900 w-4 h-4" /> {data.segments[0].toCity}
                                    </Text>
                                    <Text variant="Maison14Regular20" color="grey1" as="span"> <strong>{formatDateToDDMMYYYY(new Date(data.segments[0]?.departureTime))}</strong> • {formatDuration(data.segments[0]?.duration)} • {selectedFlightFare?.cabinClass}</Text>
                                </Box>



                                {/* Airline Info */}
                                <Box className="flex flex-col sm:flex-row sm:items-center gap-3  ">
                                    <AirlinesLogos names='Air India' width={140} height={65} />
                                    <Box className="flex flex-wrap items-center gap-2 ">
                                        <Text variant="Primary18Medium125" className="font-semibold text-gray-900">{data.segments[0]?.airlineName}</Text>
                                        <Text variant="Maison14Regular20" color="grey1" as="span">{data.segments[0]?.flightCode}</Text>
                                        {/* <Text
                                            sx={{ fontFamily: 'poppins' }}
                                            color='green_700'
                                            className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-green-800 border-1"
                                        >
                                            <FaClock className="w-3 h-3" />
                                            70% On-time
                                        </Text> */}
                                    </Box>
                                </Box>

                                {/* Flight Details */}
                                <Box className="flex   justify-between  gap-12 ">
                                    <Box className="flex items-start flex-1 ">
                                        <Box className="text-center flex-1 flex-col flex items-start">
                                            <Text variant="Maison14Regular20" color="grey1" className="mb-1">{convertToShortDateString(data.segments[0]?.departureTime)}</Text>
                                            <Text variant="Maison60Demi125" className="text-gray-900">{convertToTimeString(data.segments[0]?.departureTime)}</Text>
                                            {/* <Text variant="Maison14Regular20" className="font-medium text-gray-900 mt-1">HDO - Ghaziabad</Text> */}
                                            <Text variant="Maison14Regular20" className="font-medium text-gray-900 mt-1">{data.segments[0]?.fromCity} - {data.segments[0]?.from}</Text>
                                            <AirportInfo code={data.segments[0]?.from} />
                                            <Text variant="Maison14Regular20" color="grey1">{data.segments[0]?.fromTerminal}</Text>
                                        </Box>

                                        <Box className="flex flex-col items-center px-4 self-center">
                                            <Text variant="Maison14Regular20" color="grey1">{formatDuration(data.segments[0]?.duration)}</Text>
                                            <Image
                                                src="/images/line.svg"
                                                alt="Flight route line"
                                                width={100}
                                                height={2}
                                                className="w-full max-w-xs"
                                            />
                                        </Box>

                                        <Box className="text-center flex-1 flex-col flex items-end">
                                            <Text variant="Maison14Regular20" color="grey1" className="mb-1">{convertToShortDateString(data.segments[0]?.arrivalTime)}</Text>
                                            <Text variant="Maison60Demi125" className="text-gray-900">{convertToTimeString(data.segments[0]?.arrivalTime)}</Text>
                                            <Text variant="Maison14Regular20" className="font-medium text-gray-900 mt-1">{data.segments[0]?.toCity} - {data.segments[0]?.to}</Text>
                                            {/* <Text variant="Maison14Regular20" color="grey1" className='text-right'>{data.segments[0]?.toAirport} Airport</Text> */}
                                            <AirportInfo code={data.segments[0]?.to} className="text-right" />
                                            <Text variant="Maison14Regular20" color="grey1">{data.segments[0]?.toTerminal}</Text>
                                        </Box>
                                    </Box>

                                    {/* Baggage Section */}
                                    <Box className="lg:ml-8  lg:border-gray-200 lg:pl-6 border-t lg:border-t-0 border-gray-200  lg:pt-0 flex flex-col items-start gap-3">
                                        <Text variant="Primary14Medium20" color="grey1"> <strong>Baggage</strong> </Text>
                                        <Box className="space-y-2">
                                            <Box className="flex items-center gap-2">
                                                <FaSuitcase className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                <Text variant="Maison14Regular20" color="grey2"><strong>Cabin</strong> : {selectedFlightFare?.baggage?.cabin}</Text>
                                            </Box>
                                            <Box className="flex items-center gap-2">
                                                <FaSuitcase className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                <Text variant="Maison14Regular20" color="grey2"><strong>Check-in</strong> : {selectedFlightFare?.baggage?.checkIn}</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                })
            }
       
        </Box>
    </CommonDrawerModal>)
}
// review-flight-details
