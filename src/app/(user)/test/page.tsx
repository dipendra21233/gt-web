'use client'

import AirlinesLogos from '@/components/ui/logos/AirlinesLogos';
import { Plane } from 'lucide-react';
import { useState } from 'react';
import { Box, Text } from 'theme-ui';

// function formatTime(time: string) {
//   const [hours, minutes] = time.split('T')[1].split(':');
//   return `${hours}:${minutes}`;
// }

// function formatDuration(duration: number) {
//   // duration is a string representing total minutes, e.g. "135"
//   const totalMinutes = duration;
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = totalMinutes % 60;
//   return `${hours}h ${minutes}m`;
// }

// Orange theme
const ORANGE = {
  GRADIENT: "bg-gradient-to-r from-[#FF7F32] to-[#FFB347]",
  GRADIENT_HOVER: "hover:from-[#FF6A00] hover:to-[#FFA500]",
  TEXT: "text-[#FF7F32]",
  TEXT_DARK: "text-[#FF6A00]",
  BORDER: "border-[#FFD6B0]",
  SHADOW: "shadow-orange-200",
  DOT: "bg-[#FF7F32]",
  DOT2: "bg-[#FFD6B0]",
  ROUTE_GRADIENT: "bg-gradient-to-r from-[#FF7F32] to-[#FFB347]",
  ROUTE_GRADIENT2: "bg-gradient-to-r from-[#FFB347] to-[#FFD6B0]",
  NONSTOP_BG: "bg-[#FFF0E0]",
  NONSTOP_TEXT: "#FF7F32",
  BOOK_BTN_BG: "bg-gradient-to-r from-[#FF7F32] to-[#FFB347]",
  BOOK_BTN_HOVER: "hover:from-[#FF6A00] hover:to-[#FFA500]",
  BOOK_BTN_TEXT: "text-white",
  PRICE_BG: "bg-[#FFF6F0]",
  RADIO_ACCENT: "accent-[#FF7F32]",
  RADIO_BORDER: "border-[#FFB347]",
  RADIO_RING: "focus:ring-[#FF7F32]",
  ARRIVAL_TEXT: "#FFB347"
};

// Blue theme
const BLUE = {
  GRADIENT: "bg-gradient-to-r from-[#6D91FF] to-[#5A87FF]",
  GRADIENT_HOVER: "hover:from-[#6699FF] hover:to-[#6D91FF]",
  TEXT: "text-[#6D91FF]",
  TEXT_DARK: "text-[#5A87FF]",
  BORDER: "border-[#B0C7FF]",
  SHADOW: "shadow-blue-200",
  DOT: "bg-[#6D91FF]",
  DOT2: "bg-[#B0C7FF]",
  ROUTE_GRADIENT: "bg-gradient-to-r from-[#6D91FF] to-[#5A87FF]",
  ROUTE_GRADIENT2: "bg-gradient-to-r from-[#5A87FF] to-[#B0C7FF]",
  NONSTOP_BG: "bg-[#E0E8FF]",
  NONSTOP_TEXT: "#6D91FF",
  BOOK_BTN_BG: "bg-gradient-to-r from-[#6D91FF] to-[#5A87FF]",
  BOOK_BTN_HOVER: "hover:from-[#6699FF] hover:to-[#6D91FF]",
  BOOK_BTN_TEXT: "text-white",
  PRICE_BG: "bg-[#F0F4FF]",
  RADIO_ACCENT: "accent-[#6D91FF]",
  RADIO_BORDER: "border-[#5A87FF]",
  RADIO_RING: "focus:ring-[#6D91FF]",
  ARRIVAL_TEXT: "#5A87FF"
};

// #297189 theme
const DARK_TEAL = {
  GRADIENT: "bg-gradient-to-r from-[#297189] to-[#44a1b6]",
  GRADIENT_HOVER: "hover:from-[#215a6d] hover:to-[#297189]",
  TEXT: "text-[#297189]",
  TEXT_DARK: "text-[#215a6d]",
  BORDER: "border-[#a3c9d6]",
  SHADOW: "shadow-cyan-200",
  DOT: "bg-[#297189]",
  DOT2: "bg-[#a3c9d6]",
  ROUTE_GRADIENT: "bg-gradient-to-r from-[#297189] to-[#44a1b6]",
  ROUTE_GRADIENT2: "bg-gradient-to-r from-[#44a1b6] to-[#a3c9d6]",
  NONSTOP_BG: "bg-[#e0f4fa]",
  NONSTOP_TEXT: "#297189",
  BOOK_BTN_BG: "bg-gradient-to-r from-[#297189] to-[#44a1b6]",
  BOOK_BTN_HOVER: "hover:from-[#215a6d] hover:to-[#297189]",
  BOOK_BTN_TEXT: "text-white",
  PRICE_BG: "bg-[#f0fafd]",
  RADIO_ACCENT: "accent-[#297189]",
  RADIO_BORDER: "border-[#44a1b6]",
  RADIO_RING: "focus:ring-[#297189]",
  ARRIVAL_TEXT: "#44a1b6"
};

// Black & White theme
const BLACK_WHITE = {
  GRADIENT: "bg-gradient-to-r from-black to-gray-700",
  GRADIENT_HOVER: "hover:from-gray-900 hover:to-black",
  TEXT: "text-black",
  TEXT_DARK: "text-gray-900",
  BORDER: "border-gray-300",
  SHADOW: "shadow-gray-300",
  DOT: "bg-black",
  DOT2: "bg-gray-400",
  ROUTE_GRADIENT: "bg-gradient-to-r from-black to-gray-700",
  ROUTE_GRADIENT2: "bg-gradient-to-r from-gray-700 to-gray-300",
  NONSTOP_BG: "bg-gray-100",
  NONSTOP_TEXT: "#111111",
  BOOK_BTN_BG: "bg-gradient-to-r from-black to-gray-700",
  BOOK_BTN_HOVER: "hover:from-gray-900 hover:to-black",
  BOOK_BTN_TEXT: "text-white",
  PRICE_BG: "bg-gray-100",
  RADIO_ACCENT: "accent-black",
  RADIO_BORDER: "border-gray-700",
  RADIO_RING: "focus:ring-black",
  ARRIVAL_TEXT: "#222222"
};

type ThemeVariant = 'orange' | 'blue' | 'darkteal' | 'blackwhite';

interface FlightCardProps {
  varient: 'single' | 'dual',
  theme?: ThemeVariant
}

const getTheme = (theme: ThemeVariant | undefined) => {
  if (theme === 'blue') return BLUE;
  if (theme === 'darkteal') return DARK_TEAL;
  if (theme === 'blackwhite') return BLACK_WHITE;
  return ORANGE;
};

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

const FlightBookingBar = ({ varient, theme }: FlightCardProps) => {
  const [selectedPrice, setSelectedPrice] = useState('12,450');

  const priceOptions = [
    { price: '25,000', type: 'First Class', perks: ['Lounge Access', 'Extra Baggage', 'Priority Boarding'] },
    { price: '15,290', type: 'Business', perks: ['Lounge Access', 'Extra Baggage'] },
    { price: '12,450', type: 'Premium', perks: ['Extra Baggage'] },
    { price: '8,750', type: 'Economy', perks: [] },
    { price: '6,500', type: 'Basic', perks: [] }
  ];

  // If theme is undefined or null, use DEFAULT_THEME, else use getTheme
  const t = theme ? getTheme(theme) : DEFAULT_THEME;

  return (
    <>
      <Box as="div" className={`w-full mx-auto bg-white rounded-2xl shadow-xl border  overflow-hidden`}>
        {/* Status Bar */}

        <Box as="div" className={`${t.GRADIENT} text-white text-center py-2`}>
          <Box as="div" className="flex items-center justify-center gap-2">
            <Box as="div" className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <Text variant="Maison14Medium20" className="text-sm font-medium text-white">On Time • Great Price • 3 Seats Left</Text>
          </Box>
        </Box>


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
                      <Text variant="Maison20Demi24" className={`${t.TEXT_DARK} font-bold`}>SkyLux Airlines</Text>
                      <Text
                        variant="Maison12Regular16"
                        className="text-xs text-gray-400"
                      >
                        S92661
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
                <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} text-2xl font-bold text-left`}>14:25</Text>
                <Text variant="Maison18Medium20" className={`${t.TEXT} text-sm font-semibold text-left `}>BOM</Text>
              </Box>
              {/* Route Line */}
              <Box as="div" className="flex flex-col items-center flex-1 min-w-[120px]">
                <Text variant="Maison14Regular20" className="text-sm text-gray-400 mb-1">2h 20m</Text>
                <Box as="div" className="flex items-center w-full max-w-[180px] gap-2">
                  <Box as="div" className={`w-2 h-2 ${t.DOT} rounded-full`} />
                  <Box as="div" className={`flex-1 h-1 ${t.ROUTE_GRADIENT} rounded-full`} />
                  <Plane className="w-4 h-4" style={{ color: t.ARRIVAL_TEXT, transform: 'rotate(90deg)' }} />
                  <Box as="div" className={`flex-1 h-1 ${t.ROUTE_GRADIENT2} rounded-full`} />
                  <Box as="div" className={`w-2 h-2 ${t.DOT2} rounded-full`} />
                </Box>
                <Text variant="Maison14Medium20" className={`text-xs mt-2 ${t.NONSTOP_BG} px-3 py-1 rounded-full font-medium`} style={{ color: t.NONSTOP_TEXT }}>
                  Non-stop
                </Text>
              </Box>
              {/* Arrival */}
              <Box as="div" className="text-center min-w-[80px] flex flex-col">
                <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} text-2xl font-bold text-right`}>16:45</Text>
                <Text variant="Maison18Medium20" className="text-sm font-semibold text-right" style={{ color: t.ARRIVAL_TEXT }}>DEL</Text>
              </Box>
            </Box>

            {/* Pricing & Book */}
            {
              varient && varient === "single" ? (
                <button className={`px-3 ${t.BOOK_BTN_BG} ${t.BOOK_BTN_HOVER} ${t.BOOK_BTN_TEXT} font-bold py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${t.SHADOW}`}>
                  <Text variant="Maison16Demi20" className="text-white">Book Now</Text>
                </button>
              ) : null
            }

          </Box>
        </Box>

        <Box as="div" className="flex flex-col gap-2 min-w-[160px] px-8 pb-8">
          <Box as="div" className="flex gap-2">
            {priceOptions.map((option) => (
              <Box
                as="label"
                key={option.price}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200  ${selectedPrice === option.price
                  ? t.PRICE_BG
                  : ''
                  }`}
              >
                <input
                  type="radio"
                  name="price"
                  value={option.price}
                  checked={selectedPrice === option.price}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className={`w-4 h-4 ${t.RADIO_ACCENT} ${t.RADIO_BORDER} ${t.RADIO_RING}`}
                />
                <Box as="div" className="flex flex-col">
                  <Text
                    variant="Maison18Medium20"
                    className={`${t.TEXT_DARK} text-base font-bold`}
                  >
                    ₹{option.price}
                  </Text>
                  <Text
                    variant="Maison12Regular16"
                    className={`${t.TEXT_DARK} text-xs font-bold`}
                  >
                    {option.type}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

      </Box>
    </>
  );
};

// function Capitalize(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }


// function ShowDetails({ }: {
//   globalFare: Fare;
//   globalFlight: FlightSegment;
//   localFLight: FlightSegment;
//   localFare: Fare[];
// }) {

//   return (
//     <Box as="div" className="bg-gray-900 text-white text-center py-2">
//       <Box as="div" className="flex items-center justify-center gap-3">
//         <Text variant="Maison14Medium20" className="text-sm font-medium text-white">
//           {/* <span className="font-normal">Meals: {fares?.meal}</span>
//           <span className="mx-2">|</span>
//           <span className="font-normal">ADT: {fares?.paxInfo?.ADULT}</span>
//           <span className="mx-2">|</span>
//           <span className="font-normal">Class: {flightclass}</span> */}
//         </Text>
//       </Box>
//     </Box>
//   )
// }


// const FlightBookingBarNoTheme = ({
//   varient,
//   flightData,
//   showDetails,
//   selectedFare,
//   selectedFlight
// }:
//   {
//     varient: 'single' | 'dual',
//     flightData: FlightListingDataProps,
//     showDetails: (data: FlightListingDataProps) => void,
//     selectedFare: Fare;
//     selectedFlight: FlightSegment;
//   }) => {


//   const {
//     segments,
//     fares,
//   } = flightData;
//   const { from, to, departureTime, arrivalTime, duration, stops } = segments[0];
//   const dispatch = useDispatch()
//   // Use the same logic as FlightBookingBar but always use DEFAULT_THEME
//   // const [selectedPrice, setSelectedPrice] = useState('12,450');
//   const t = DEFAULT_THEME;

//   // For scroll arrows
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isOverflow, setIsOverflow] = useState(false);

//   // Check if scroll is overflowing and update overflow state
//   const updateOverflow = () => {
//     const el = scrollRef.current;
//     if (!el) {
//       setIsOverflow(false);
//       return;
//     }
//     setIsOverflow(el.scrollWidth > el.clientWidth + 1);
//   };

//   useEffect(() => {
//     updateOverflow();
//     const el = scrollRef.current;
//     if (!el) return;
//     el.addEventListener("scroll", updateOverflow);
//     window.addEventListener("resize", updateOverflow);
//     return () => {
//       el.removeEventListener("scroll", updateOverflow);
//       window.removeEventListener("resize", updateOverflow);
//     };
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     // Update overflow if priceOptions change
//     updateOverflow();
//     // eslint-disable-next-line
//   }, [fares?.length]);

//   // Hide scrollbar utility (for all browsers)
//   const hideScrollbarStyle: React.CSSProperties = {
//     width: "100%",
//     overflowX: "auto",
//     whiteSpace: "nowrap",
//     scrollBehavior: "smooth",
//     msOverflowStyle: "none", // IE and Edge
//     scrollbarWidth: "none", // Firefox
//   };

//   return (
//     <>
//       <Box as="div" className={`w-full mx-auto bg-white rounded-2xl shadow-xl border ${t.BORDER} overflow-hidden`}>
//         {/* Status Bar */}
//         <ShowDetails
//           globalFare={selectedFare}
//           globalFlight={selectedFlight}
//           localFLight={segments[0]}
//           localFare={fares}
//         />

//         {/* Main Flight Bar */}
//         <Box as="div" className="px-8 py-6">
//           <Box as="div" className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
//             {/* Airline Info */}
//             <Box as="div" className="flex items-center gap-4 min-w-0">
//               <Box as="div" className="relative">
//                 {
//                   varient && varient === "dual" ?
//                     (<Box as="div" className='ps-6 pt-6'>
//                       <Text variant="Maison20Demi24" className={`${t.TEXT_DARK} font-bold `}>SkyLux Airlines</Text>
//                     </Box>) : null
//                 }
//                 <AirlinesLogos names='Air India' width={140} height={65} />
//               </Box>
//               <Box as="div" className="flex flex-col">
//                 {
//                   varient && varient === "single" ? (
//                     <>
//                       <Text variant="Maison20Demi24" className={`${t.TEXT_DARK} font-bold`}>{flightData.segments[0].airlineName}</Text>
//                       <Text
//                         variant="Maison12Regular16"
//                         className="text-xs text-gray-400"
//                       >
//                         {flightData.segments[0]?.flightCode}
//                       </Text>
//                     </>
//                   ) : null
//                 }
//               </Box>
//             </Box>

//             {/* Flight Route */}
//             <Box as="div" className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 px-3">
//               {/* Departure */}
//               <Box as="div" className="text-center min-w-[80px] flex flex-col">
//                 <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} text-2xl font-bold text-left`}>{formatTime(departureTime)}</Text>
//                 <Text variant="Maison18Medium20" className={`${t.TEXT} text-sm font-semibold text-left `}>{from}</Text>
//               </Box>
//               {/* Route Line */}
//               <Box as="div" className="flex flex-col items-center flex-1 min-w-[120px]">
//                 <Text variant="Maison14Regular20" className="text-sm text-gray-400 mb-1">{formatDuration(duration)}</Text>
//                 <Box as="div" className="flex items-center w-full max-w-[180px] gap-2">
//                   <Box as="div" className={`w-2 h-2 ${t.DOT} rounded-full`} />
//                   <Box as="div" className={`flex-1 h-1 ${t.ROUTE_GRADIENT} rounded-full`} />
//                   <Plane className="w-4 h-4" style={{ color: t.ARRIVAL_TEXT, transform: 'rotate(90deg)' }} />
//                   <Box as="div" className={`flex-1 h-1 ${t.ROUTE_GRADIENT2} rounded-full`} />
//                   <Box as="div" className={`w-2 h-2 ${t.DOT2} rounded-full`} />
//                 </Box>
//                 <Text variant="Maison14Medium20" className={`text-xs mt-2 ${t.NONSTOP_BG} px-3 py-1 rounded-full font-medium`} style={{ color: t.NONSTOP_TEXT }}>
//                   {stops === 0 ? "Non-stop" : `${stops} Stop`}
//                 </Text>
//               </Box>
//               {/* Arrival */}
//               <Box as="div" className="text-center min-w-[80px] flex flex-col">
//                 <Text variant="Maison24Demi32" className={`${t.TEXT_DARK} text-2xl font-bold text-right`}>{formatTime(arrivalTime)}</Text>
//                 <Text variant="Maison18Medium20" className="text-sm font-semibold text-right" style={{ color: t.ARRIVAL_TEXT }}>{to}</Text>
//               </Box>
//             </Box>

//             {/* Pricing & Book */}
//             {
//               varient && varient === "single" ? (
//                 <Box as="div" className="flex flex-col gap-2">
//                   <button className={`px-3 ${t.BOOK_BTN_BG} ${t.BOOK_BTN_HOVER} ${t.BOOK_BTN_TEXT} font-bold py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${t.SHADOW}`}>
//                     <Text variant="Maison16Demi20" className="text-white">Book Now</Text>
//                   </button>
//                   <button
//                     className="mt-2 text-xs font-medium transition-colors duration-200"
//                     type="button"
//                     onClick={() => {
//                       showDetails(flightData);
//                     }}
//                   >
//                     <Text variant="Maison12Regular16" className="">Show Details</Text>
//                   </button>
//                 </Box>
//               ) : null
//             }

//           </Box>
//         </Box>

//         {/* Price Options with Scroll Arrows */}
//         <Box as="div" className="flex flex-col gap-2 min-w-[160px] px-8 pb-8">
//           <Box className="relative w-full flex flex-row items-stretch">
//             {/* Left Arrow */}
//             {isOverflow && (
//               <Box className="flex items-center">
//                 <button
//                   type="button"
//                   aria-label="Scroll left"
//                   className="bg-white border border-gray-300 rounded-full shadow p-1 flex items-center justify-center hover:bg-gray-100 transition"
//                   style={{ width: 28, height: 28, padding: 2 }}
//                   onClick={() => {
//                     const el = scrollRef.current;
//                     if (el) el.scrollBy({ left: -120, behavior: 'smooth' });
//                   }}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//               </Box>
//             )}

//             {/* Price Options */}
//             <Box
//               as="div"
//               id="price-options-scroll"
//               ref={scrollRef}
//               className={`flex gap-2 ${isOverflow ? "overflow-x-auto" : ""} w-full`}
//               style={{
//                 ...hideScrollbarStyle,
//                 whiteSpace: isOverflow ? "nowrap" : "normal",
//                 maxWidth: "100%",
//               }}
//               // Hide scrollbar for Webkit browsers
//               sx={{
//                 '&::-webkit-scrollbar': {
//                   display: 'none',
//                 },
//               }}
//             >
//               {fares?.map((option) => {
//                 // Handle both string and number for selectedPrice and option.priceID
//                 // Also handle if selectedPrice is a price string (e.g. "12,450") or a priceID
//                 const isActive =
//                   selectedFare?.priceID === option.priceID ||
//                   selectedFare?.totalFare?.toString() === option.totalFare?.toString() ||
//                   selectedFare?.priceID?.toString() === option.priceID?.toString();

//                 return (
//                   <Box
//                     as="label"
//                     key={option.priceID}
//                     className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? t.PRICE_BG : ""
//                       }`}
//                     style={{
//                       flex: "0 0 auto",
//                       whiteSpace: "normal",
//                     }}
//                   >
//                     {varient === "single" ? (
//                       <>
//                         <Box as="div" className="flex items-center w-full" onClick={() => {
//                           dispatch(setSelectedFLight({ fare: option, flight: segments[0] }))
//                         }}>
//                           <Box className="flex items-center justify-center w-full mb-1">
//                             <input
//                               type="radio"
//                               name="price"
//                               value={option.priceID}
//                               checked={isActive}
//                               onChange={() => { }}
//                               className={`w-4 h-4 ${t.RADIO_ACCENT} ${t.RADIO_BORDER} ${t.RADIO_RING}`}
//                               style={{ minWidth: 16, minHeight: 16 }}
//                             />
//                           </Box>
//                           <Box as="div" className="flex flex-col items-center w-full">
//                             <Text
//                               variant="Maison18Medium20"
//                               className={`${t.TEXT_DARK} text-base font-bold text-center w-full`}
//                             >
//                               ₹{option.totalFare}
//                             </Text>
//                             <Text
//                               variant="Maison12Regular16"
//                               className="text-xs text-gray-400 text-center w-full"
//                             >
//                               {Capitalize(option.cabinClass)}
//                             </Text>
//                           </Box>
//                         </Box>
//                       </>
//                     ) : (
//                       <>
//                         <Box className="flex items-center justify-center w-full mb-1">
//                           <input
//                             type="radio"
//                             name="price"
//                             value={option.priceID}
//                             checked={isActive}
//                             onChange={() => { }}
//                             className={`w-4 h-4 ${t.RADIO_ACCENT} ${t.RADIO_BORDER} ${t.RADIO_RING}`}
//                             style={{ minWidth: 16, minHeight: 16 }}
//                           />
//                         </Box>
//                         <Box as="div" className="flex flex-col items-center w-full">
//                           <Text
//                             variant="Maison18Medium20"
//                             className={`${t.TEXT_DARK} text-base font-bold text-center w-full`}
//                           >
//                             ₹{option.totalFare}
//                           </Text>
//                           <Text
//                             variant="Maison12Regular16"
//                             className="text-xs text-gray-400 text-center w-full"
//                           >
//                             {Capitalize(option.cabinClass)}
//                           </Text>
//                         </Box>
//                       </>
//                     )}
//                   </Box>
//                 );
//               })}
//             </Box>

//             {/* Right Arrow */}
//             {isOverflow && (
//               <Box className="flex items-center">
//                 <button
//                   type="button"
//                   aria-label="Scroll right"
//                   className="bg-white border border-gray-300 rounded-full shadow p-1 flex items-center justify-center hover:bg-gray-100 transition"
//                   style={{ width: 28, height: 28, padding: 2 }}
//                   onClick={() => {
//                     const el = scrollRef.current;
//                     if (el) el.scrollBy({ left: 120, behavior: 'smooth' });
//                   }}
//                 >
//                   <span className="w-5 h-5 flex items-center justify-center">
//                     <FiChevronRight className="w-5 h-5" />
//                   </span>
//                 </button>
//               </Box>
//             )}
//           </Box>
//         </Box>

//       </Box>
//     </>
//   );
// };


type ThemeWidgetProps = {
  themeVariant: ThemeVariant;
  setThemeVariant: (variant: ThemeVariant) => void;
};

const themeOptions: { label: string; value: ThemeVariant; color: string }[] = [
  { label: "Orange", value: "orange", color: "#FF7F32" },
  { label: "Blue", value: "blue", color: "#6D91FF" },
  { label: "Dark Teal", value: "darkteal", color: "#297189" },
  { label: "Black & White", value: "blackwhite", color: "#222" },
];




// function FlightSortBar({ theme = "orange" }: { theme: ThemeVariant }) {
//   // Theme color mapping for text variant
//   const themeTextColorMap: Record<string, string> = {
//     orange: "orange_600",
//     blue: "blue_600",
//     green: "green_600",
//     purple: "purple_600",
//   };

//   const activeTabText = themeTextColorMap[theme] || "orange_600";

//   return (
//     <Box
//       className="w-full max-w-[600px]  flex flex-col gap-1 rounded-t-lg px-2 py-1"
//     >
//       {/* Top Row: Route and Flights Count */}
//       <Box
//         sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 1 }}
//       >
//         <Text variant="Primary18Medium125" color={theme === "orange" ? "orange_700" : "primary_text_dark"}>
//           DEL - BOM
//         </Text>
//         <Text variant="Maison14Regular20" color="grey1">
//           180 Flights Available
//         </Text>
//       </Box>
//       {/* Sort Tabs */}
//       <Box
//         className="flex items-center justify-between rounded-lg overflow-hidden  bg-gray-50"
//       >
//         <Box
//           as="button"
//           className={`flex-1 py-2  font-semibold transition-colors text-sm`}
//           sx={{
//             color: activeTabText,
//           }}
//         >
//           <Text variant="Maison14Regular20" color={activeTabText}>Price</Text>
//         </Box>
//         <Box
//           as="button"
//           className="flex-1 py-2  text-primary_text_dark transition-colors hover:bg-grey_bg text-sm"
//         >
//           <Text variant="Maison14Regular20" color="primary_text_dark">Fastest</Text>
//         </Box>
//         <Box
//           as="button"
//           className="flex-1 py-2  text-primary_text_dark transition-colors hover:bg-grey_bg text-sm"
//         >
//           <Text variant="Maison14Regular20" color="primary_text_dark">Departure</Text>
//         </Box>
//         <Box
//           as="button"
//           className={`flex-1 py-2  font-semibold flex items-center justify-center gap-1 transition-colors hover:bg-grey_bg text-sm`}
//           sx={{
//             color: themeTextColorMap[theme] || "orange_600",
//           }}
//         >
//           <Text variant="Maison14Regular20" color={themeTextColorMap[theme] || "orange_600"}>Smart</Text>
//           <FaChevronDown className="inline text-xs" />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import { useEffect, useRef } from "react";
import FlightFiltersPanelNew from '../../../components/web/components/FlightResult/NewFlightfilterPanel';

function ThemeWidget({ themeVariant, setThemeVariant }: ThemeWidgetProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const selectedOption = themeOptions.find((opt) => opt.value === themeVariant);

  return (
    <Box
      as="div"
      className="mb-4"
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div className="relative" ref={popoverRef}>
        {/* Bigger Circle button at bottom right */}
        <button
          type="button"
          aria-label="Select theme"
          onClick={() => setOpen((v) => !v)}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-150
            ${open || themeVariant ? "border-black" : "border-gray-300"}
            shadow-lg
          `}
          style={{
            background: selectedOption ? selectedOption.color : "#fff",
            boxShadow:
              open || themeVariant
                ? `0 0 0 4px ${selectedOption?.color || "#000"}44`
                : "0 2px 12px 0 #0002",
          }}
        >
        </button>
        {/* Popover */}
        {open && (
          <div
            className="absolute left-1/2 z-20 flex flex-col min-w-[140px] -translate-x-1/2 rounded-xl bg-white shadow-lg border border-gray-200 py-2"
            style={{
              bottom: "110%",
              top: "auto",
              marginBottom: 12,
            }}
          >
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setThemeVariant(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 transition-all duration-100 hover:bg-gray-100 w-full text-left ${themeVariant === opt.value ? "font-bold" : ""
                  }`}
                style={{
                  color: themeVariant === opt.value ? opt.color : "#444",
                  background:
                    themeVariant === opt.value ? opt.color + "11" : "transparent",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: opt.color,
                    border:
                      themeVariant === opt.value
                        ? "2px solid #222"
                        : "1.5px solid #ccc",
                    marginRight: 10,
                  }}
                />
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </Box>
  );
}


function FlightPage() {
  // Example: let user select theme variant
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>('orange');

  return (
    <Box as="div" className=" py-10  ">
      <div className="gap-[20px] container mx-auto grid grid-cols-1 md:grid-cols-12">
        <FlightFiltersPanelNew />
        <div className="col-span-12 md:col-span-12 lg:col-span-8 2xl:col-span-9 space-y-5">
          {/* <FlightSearchBar /> */}
          <Box as="div" className='flex gap-2 w-full justify-center'>
            {/* <FlightSortBar />
            <FlightSortBar /> */}
          </Box>
          <FlightBookingBar varient={"single"} theme={themeVariant} />
          <FlightBookingBar varient={"single"} />
          {/* <FlightBookingBarNoTheme varient={"single"} /> */}
          <div className=" w-full justify-center relative h-full">
            <Box as="div" className='flex gap-2 w-full justify-center'>
              <FlightBookingBar varient={"dual"} theme={themeVariant} />
              <FlightBookingBar varient={"dual"} />
              <FlightBookingBar varient={"single"} />
            </Box>
            <Box as={'div'} className='absolute bg-red-600 bottom-0 z-50'>
              adsjfhdklshafklj
            </Box>
          </div>
        </div>
      </div>
      <ThemeWidget themeVariant={themeVariant} setThemeVariant={setThemeVariant} />

    </Box>
  )
}

export default FlightPage;
