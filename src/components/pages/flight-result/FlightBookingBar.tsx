import AirlinesLogos from "@/components/ui/logos/AirlinesLogos";
import { ThemeButton } from "@/components/web/core/Button/Button";
import { Fare } from "@/types/module/flightSearch";
import { formatDuration, formatTime } from "@/utils/functions";
import { FlightBookingBarProps } from "components";
import { Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Box, Text } from "theme-ui";
import { FlightFareDetails } from "./FlightFareDetails";
import { FareCheckboxContainer } from "./FlightFares";

const DEFAULT_THEME = {
  GRADIENT: "",
  GRADIENT_HOVER: "",
  TEXT: "text-black",
  TEXT_DARK: "text-black",
  BORDER: "border-gray-200",
  SHADOW: "",
  DOT: "bg-gray-300",
  DOT2: "bg-gray-200",
  ROUTE_GRADIENT: "bg-gray-200",
  ROUTE_GRADIENT2: "bg-gray-100",
  NONSTOP_BG: "bg-gray-100",
  NONSTOP_TEXT: "#222",
  BOOK_BTN_BG: "bg-gray-800",
  BOOK_BTN_HOVER: "",
  BOOK_BTN_TEXT: "text-black",
  PRICE_BG: "bg-gray-100",
  RADIO_ACCENT: "accent-gray-400",
  RADIO_BORDER: "border-gray-300",
  RADIO_RING: "",
  ARRIVAL_TEXT: "#222"
};

export const FlightBookingBar = ({
  varient,
  flightData,
  showDetails,
  index,
  // selectedFare ,
}: FlightBookingBarProps) => {

  const {
    segments,
    fares,
  } = flightData;
  const { from, to, departureTime, arrivalTime, duration, stops } = segments[0];
  const [selectedFare, setSelectedFare] = useState<Fare | null>(null)
  const [isBooking, setIsBooking] = useState<boolean>(false)
  const t = DEFAULT_THEME;
  const router = useRouter();
  // For scroll arrows
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  // Check if scroll is overflowing and update overflow state
  const updateOverflow = () => {
    const el = scrollRef.current;
    if (!el) {
      setIsOverflow(false);
      return;
    }
    setIsOverflow(el.scrollWidth > el.clientWidth + 1);
  };

  useEffect(() => {
    updateOverflow();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateOverflow);
    window.addEventListener("resize", updateOverflow);

    // Always select the first fare when fares change
    if (fares.length > 0) {
      setSelectedFare(fares[0])
    }

    return () => {
      el.removeEventListener("scroll", updateOverflow);
      window.removeEventListener("resize", updateOverflow);
    };
  }, [fares]);

  useEffect(() => {
    // Update overflow if priceOptions change
    updateOverflow();
    // eslint-disable-next-line
  }, [fares?.length]);

  // Separate useEffect to ensure first fare is always selected
  useEffect(() => {
    if (fares && fares.length > 0 && !selectedFare) {
      setSelectedFare(fares[0]);
    }
  }, [fares, selectedFare]);



  return (
    <>
      <Box as="div" className={`w-full mx-auto bg-white rounded-2xl shadow-xl border ${t.BORDER} overflow-hidden`}>
        {/* Status Bar */}
        <FlightFareDetails
          localFare={selectedFare as Fare}
        />

        {/* Main Flight Bar */}
        <Box as="div" className="px-8 py-6">
          <Box as="div" className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            {/* Airline Info */}
            <Box as="div" className="flex items-center gap-4 min-w-0">
              <Box as="div" className="relative">
                {
                  varient && varient === "dual" ?
                    (<Box as="div" className='ps-6 pt-6'>
                      <Text variant="Maison20Demi24" className={`${t.TEXT_DARK} font-bold `}>SkyLux Airlines</Text>
                    </Box>) : null
                }
                <AirlinesLogos names='Air India' width={140} height={65} />
              </Box>
              <Box as="div" className="flex flex-col">
                {
                  varient && varient === "single" ? (
                    <>
                      <Text variant="Maison20Demi24" className={`${t.TEXT_DARK} font-bold`}>{flightData.segments[0].airlineName}</Text>
                      <Text
                        variant="Maison12Regular16"
                        className="text-xs text-gray-400"
                      >
                        {flightData.segments[0]?.flightCode}
                      </Text>
                    </>
                  ) : null
                }
              </Box>
            </Box>

            {/* Flight Route */}
            <Box as="div" className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 px-3">
              {/* Departure */}
              <Box as="div" className="text-center min-w-[80px] flex flex-col">
                <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} text-2xl font-bold text-left`}>{formatTime(departureTime)}</Text>
                <Text variant="Maison18Medium20" className={`${t.TEXT} text-sm font-semibold text-left `}>{from}</Text>
              </Box>
              {/* Route Line */}
              <Box as="div" className="flex flex-col items-center flex-1 min-w-[120px]">
                <Text variant="Maison14Regular20" className="text-sm text-gray-400 mb-1">{formatDuration(duration)}</Text>
                <Box as="div" className="flex items-center w-full max-w-[180px] gap-2">
                  <Box as="div" className={`w-2 h-2 ${t.DOT} rounded-full`} />
                  <Box as="div" className={`flex-1 h-1 ${t.ROUTE_GRADIENT} rounded-full`} />
                  <Plane className="w-4 h-4" style={{ color: t.ARRIVAL_TEXT, transform: 'rotate(90deg)' }} />
                  <Box as="div" className={`flex-1 h-1 ${t.ROUTE_GRADIENT2} rounded-full`} />
                  <Box as="div" className={`w-2 h-2 ${t.DOT2} rounded-full`} />
                </Box>
                <Text variant="Maison14Medium20" className={`text-xs mt-2 ${t.NONSTOP_BG} px-3 py-1 rounded-full font-medium`} style={{ color: t.NONSTOP_TEXT }}>
                  {stops === 0 ? "Non-stop" : `${stops} Stop`}
                </Text>
              </Box>
              {/* Arrival */}
              <Box as="div" className="text-center min-w-[80px] flex flex-col">
                <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} text-2xl font-bold text-right`}>{formatTime(arrivalTime)}</Text>
                <Text variant="Maison18Medium20" className="text-sm font-semibold text-right" style={{ color: t.ARRIVAL_TEXT }}>{to}</Text>
              </Box>
            </Box>

            {/* Pricing & Book */}
            {
              varient && varient === "single" ? (
                <Box as="div" className="flex flex-col gap-2">
                  <ThemeButton
                    variant="darkSlate"

                    onClick={async () => {
                      if (selectedFare?.priceID && !isBooking) {
                        setIsBooking(true);
                        try {
                          await router.push(`/add-passenger?priceIds=${selectedFare.priceID}`);
                        } catch (error) {
                          console.error('Navigation error:', error);
                          setIsBooking(false);
                        }
                      }
                    }}
                    disabled={isBooking}
                  >
                    <Box as="div" className="flex items-center justify-center gap-2">
                      {isBooking && (
                        <Box as="div" className="animate-spin">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </Box>
                      )}
                      <Text variant="Maison16Demi20" className="text-white">
                        {isBooking ? 'Booking...' : 'Book Now'}
                      </Text>
                    </Box>
                  </ThemeButton>
                  <button
                    className="mt-2 text-xs font-medium transition-colors duration-200"
                    type="button"
                    onClick={() => {
                      showDetails(selectedFare as Fare);
                    }}
                  >
                    <Text variant="Maison12Regular16" className="">Show Details</Text>
                  </button>
                </Box>
              ) : null
            }

          </Box>
        </Box>

        {/* Price Options with Scroll Arrows */}
        <Box as="div" className="flex flex-col gap-2 min-w-[160px] px-8 pb-8">
          <Box className="relative w-full flex flex-row items-stretch">
            {/* Left Arrow */}
            {isOverflow && (
              <Box className="flex items-center">
                <button
                  type="button"
                  aria-label="Scroll left"
                  className="bg-white border border-gray-300 rounded-full shadow p-1 flex items-center justify-center hover:bg-gray-100 transition"
                  style={{ width: 28, height: 28, padding: 2 }}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (el) el.scrollBy({ left: -120, behavior: 'smooth' });
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </Box>
            )}

            {/* Price Options */}

            <FareCheckboxContainer
              fares={fares}
              isOverflow={isOverflow}
              varient={'single'}
              scrollRef={scrollRef}
              selectedFare={selectedFare}
              setSelectedFare={(fare) => setSelectedFare(fare)}
              index={index}
            />
            {/* <Box
              as="div"
              id="price-options-scroll"
              ref={scrollRef}
              className={`flex gap-2 ${isOverflow ? "overflow-x-auto" : ""} w-full`}
              style={{
                ...hideScrollbarStyle,
                whiteSpace: isOverflow ? "nowrap" : "normal",
                maxWidth: "100%",
              }}
              // Hide scrollbar for Webkit browsers
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {fares?.map((option) => {
                // Handle both string and number for selectedPrice and option.priceID
                // Also handle if selectedPrice is a price string (e.g. "12,450") or a priceID
                const isActive =
                selectedFare?.priceID === option.priceID ||
                selectedFare?.totalFare?.toString() === option.totalFare?.toString() ||
                selectedFare?.priceID?.toString() === option.priceID?.toString();

                return (
                  <Box
                    as="label"
                    key={option.priceID}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      isActive ? t.PRICE_BG : ""
                    }`}
                    style={{
                      flex: "0 0 auto",
                      whiteSpace: "normal",
                    }}
                  >
                    {varient === "single" ? (
                      <>
                        <Box as="div" className="flex items-center w-full" onClick={() => {
                          dispatch(setSelectedFLight({fare : option, flight: segments[0]}))
                        }}>
                          <Box className="flex items-center justify-center w-full mb-1">
                            <input
                              type="radio"
                              name="price"
                              value={option.priceID}
                              checked={isActive}
                              className={`w-4 h-4 ${t.RADIO_ACCENT} ${t.RADIO_BORDER} ${t.RADIO_RING}`}
                              style={{ minWidth: 16, minHeight: 16 }}
                            />
                          </Box>
                          <Box as="div" className="flex flex-col items-center w-full">
                            <Text
                              variant="Maison18Medium20"
                              className={`${t.TEXT_DARK} text-base font-bold text-center w-full`}
                            >
                              ₹{option.totalFare}
                            </Text>
                            <Text
                              variant="Maison12Regular16"
                              className="text-xs text-gray-400 text-center w-full"
                            >
                              {Capitalize(option.cabinClass)}
                            </Text>
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box className="flex items-center justify-center w-full mb-1">
                          <input
                            type="radio"
                            name="price"
                            value={option.priceID}
                            checked={isActive}
                            // onChange={(e) => setSelectedPrice(e.target.value)}
                            className={`w-4 h-4 ${t.RADIO_ACCENT} ${t.RADIO_BORDER} ${t.RADIO_RING}`}
                            style={{ minWidth: 16, minHeight: 16 }}
                          />
                        </Box>
                        <Box as="div" className="flex flex-col items-center w-full">
                          <Text
                            variant="Maison18Medium20"
                            className={`${t.TEXT_DARK} text-base font-bold text-center w-full`}
                          >
                            ₹{option.totalFare}
                          </Text>
                          <Text
                            variant="Maison12Regular16"
                            className="text-xs text-gray-400 text-center w-full"
                          >
                            {Capitalize(option.cabinClass)}
                          </Text>
                        </Box>
                      </>
                    )}
                  </Box>
                );
              })}
            </Box> */}

            {/* Right Arrow */}
            {isOverflow && (
              <Box className="flex items-center">
                <button
                  type="button"
                  aria-label="Scroll right"
                  className="bg-white border border-gray-300 rounded-full shadow p-1 flex items-center justify-center hover:bg-gray-100 transition"
                  style={{ width: 28, height: 28, padding: 2 }}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (el) el.scrollBy({ left: 120, behavior: 'smooth' });
                  }}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    <FiChevronRight className="w-5 h-5" />
                  </span>
                </button>
              </Box>
            )}
          </Box>
        </Box>

      </Box>
    </>
  );
};
