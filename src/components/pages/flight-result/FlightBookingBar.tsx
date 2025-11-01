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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
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
      <Box as="div" className={`w-full mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl border ${t.BORDER} overflow-hidden`}>
        {/* Status Bar */}
        <FlightFareDetails
          localFare={selectedFare as Fare}
        />

        {/* Main Flight Bar */}
        <Box as="div" className={`${isMobile ? 'px-3 py-2.5' : 'px-3 md:px-8 py-3 md:py-6'}`}>
          <Box as="div" className={`flex flex-col ${isMobile ? 'gap-2.5' : 'md:flex-row md:items-center md:justify-between gap-6 md:gap-10'}`}>
            {/* Airline Info */}
            <Box as="div" className={`flex ${isMobile ? 'flex-row items-center gap-2' : 'items-center'} gap-3 md:gap-4 min-w-0`}>
              <Box as="div" className="relative flex-shrink-0">
                {
                  varient && varient === "dual" ?
                    (<Box as="div" className='ps-6 pt-6'>
                      <Text variant="Maison20Demi24" className={`${t.TEXT_DARK} font-bold `}>SkyLux Airlines</Text>
                    </Box>) : null
                }
                <AirlinesLogos names='Air India' width={isMobile ? 70 : 140} height={isMobile ? 32 : 65} />
              </Box>
              <Box as="div" className="flex flex-col min-w-0 flex-1">
                {
                  varient && varient === "single" ? (
                    <>
                      <Text variant="Maison20Demi24" className={`${t.TEXT_DARK} ${isMobile ? 'text-sm' : 'text-lg md:text-xl'} font-bold truncate`}>{flightData.segments[0].airlineName}</Text>
                      <Text
                        variant="Maison12Regular16"
                        className={`${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'} text-gray-400 truncate`}
                      >
                        {flightData.segments[0]?.flightCode}
                      </Text>
                    </>
                  ) : null
                }
              </Box>
            </Box>

            {/* Flight Route */}
            <Box as="div" className={`flex-1 flex ${isMobile ? 'flex-row items-center justify-between' : 'flex-col md:flex-row items-center justify-center'} ${isMobile ? 'gap-1.5 py-1.5' : 'gap-3 md:gap-6 px-1 md:px-3'}`}>
              {/* Departure */}
              <Box as="div" className={`${isMobile ? 'text-left flex-shrink-0 min-w-[65px]' : 'text-center min-w-[80px]'} flex flex-col`}>
                <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold ${isMobile ? 'text-left' : ''}`}>{formatTime(departureTime)}</Text>
                <Text variant="Maison18Medium20" className={`${t.TEXT} ${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'} font-semibold text-left truncate`}>{from}</Text>
              </Box>
              {/* Route Line */}
              <Box as="div" className={`flex ${isMobile ? 'flex-col items-center flex-1' : 'flex-col items-center'} ${isMobile ? 'px-1' : 'flex-1'} ${isMobile ? '' : 'min-w-[120px]'}`}>
                {isMobile ? (
                  <>
                    <Box as="div" className="flex items-center w-full gap-1 mb-0.5">
                      <Box as="div" className={`w-1 h-1 ${t.DOT} rounded-full`} />
                      <Box as="div" className={`flex-1 h-0.5 ${t.ROUTE_GRADIENT} rounded-full`} />
                      <Box as="div" className="flex flex-col items-center gap-0 px-0.5">
                        <Text variant="Maison12Regular16" className={`text-[9px] text-gray-400 whitespace-nowrap`}>{formatDuration(duration)}</Text>
                        <Plane className="w-2 h-2 flex-shrink-0" style={{ color: t.ARRIVAL_TEXT, transform: 'rotate(90deg)' }} />
                      </Box>
                      <Box as="div" className={`flex-1 h-0.5 ${t.ROUTE_GRADIENT2} rounded-full`} />
                      <Box as="div" className={`w-1 h-1 ${t.DOT2} rounded-full`} />
                    </Box>
                    <Text variant="Maison12Medium20" className={`text-[9px] px-1.5 py-0.5 ${t.NONSTOP_BG} rounded-full font-medium whitespace-nowrap`} style={{ color: t.NONSTOP_TEXT }}>
                      {stops === 0 ? "Non-stop" : `${stops} Stop`}
                    </Text>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Box>
              {/* Arrival */}
              <Box as="div" className={`${isMobile ? 'text-right flex-shrink-0 min-w-[65px]' : 'text-center min-w-[80px]'} flex flex-col`}>
                <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold ${isMobile ? 'text-right' : ''}`}>{formatTime(arrivalTime)}</Text>
                <Text variant="Maison18Medium20" className={`${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'} font-semibold text-right truncate`} style={{ color: t.ARRIVAL_TEXT }}>{to}</Text>
              </Box>
            </Box>

            {/* Pricing & Book */}
            {
              varient && varient === "single" ? (
                <Box as="div" className={`flex flex-col ${isMobile ? 'w-full mt-1.5 pt-1.5 border-t border-gray-100 gap-1.5' : 'gap-2'}`}>
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
                    sx={{
                      width: isMobile ? '100%' : 'auto',
                      minWidth: isMobile ? '100%' : '100px',
                      padding: isMobile ? '11px 14px' : undefined,
                      fontSize: isMobile ? '13px' : undefined,
                    }}
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
                      <Text variant="Maison16Demi20" className={`text-white ${isMobile ? 'text-xs font-semibold' : ''}`}>
                        {isBooking ? 'Booking...' : 'Book Now'}
                      </Text>
                    </Box>
                  </ThemeButton>
                  <button
                    className={`${isMobile ? 'w-full text-center py-1' : ''} text-[10px] font-medium transition-colors duration-200 hover:text-orange-600`}
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
        <Box as="div" className={`flex flex-col ${isMobile ? 'gap-1.5 min-w-0 px-3 pb-2.5' : 'gap-2 min-w-[160px] px-3 md:px-8 pb-3 md:pb-8'}`}>
          <Box className="relative w-full flex flex-row items-stretch">
            {/* Left Arrow */}
            {(isOverflow || isMobile) && (
              <Box className={`flex items-center ${isMobile ? 'mr-1' : ''}`}>
                <button
                  type="button"
                  aria-label="Scroll left"
                  className={`bg-white border border-gray-300 rounded-full shadow ${isMobile ? 'p-0.5' : 'p-1'} flex items-center justify-center hover:bg-gray-100 transition`}
                  style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, padding: isMobile ? 2 : 2 }}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (el) el.scrollBy({ left: isMobile ? -100 : -120, behavior: 'smooth' });
                  }}
                >
                  <svg className={isMobile ? "w-4 h-4" : "w-5 h-5"} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
            {(isOverflow || isMobile) && (
              <Box className={`flex items-center ${isMobile ? 'ml-1' : ''}`}>
                <button
                  type="button"
                  aria-label="Scroll right"
                  className={`bg-white border border-gray-300 rounded-full shadow ${isMobile ? 'p-0.5' : 'p-1'} flex items-center justify-center hover:bg-gray-100 transition`}
                  style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, padding: isMobile ? 2 : 2 }}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (el) el.scrollBy({ left: isMobile ? 100 : 120, behavior: 'smooth' });
                  }}
                >
                  <span className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} flex items-center justify-center`}>
                    <FiChevronRight className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
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
