import { Fare } from "@/types/module/flightSearch";
import { FareCheckboxContainerProps } from "components";
import { useEffect, useState } from "react";
import { Box, Text } from "theme-ui";
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
interface FareCheckBoxFullProps {
  option: Fare;
  selectedFare: Fare | null;
  setSelectedFare: (fare: Fare | null) => void;
  index: number;
}

function CustomRadio({ isSelected, onSelect }: { isSelected: boolean, onSelect: () => void }) {
  return (
    <div
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${isSelected ? 'bg-black border-black' : 'bg-white border-gray-300'
        }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="w-2 h-2 rounded-full bg-white"></div>
      )}
    </div>
  );
}


function FareCheckBoxFull({ option, selectedFare, setSelectedFare }: FareCheckBoxFullProps) {
  const t = DEFAULT_THEME
  const isMobile = useIsMobile();
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    if (selectedFare?.priceID === option?.priceID) {
      console.log("selectedFare", "sleceted")
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [selectedFare, option])
  if (!selectedFare) return null


  const handleSelect = () => {
    setSelectedFare(option);
    // setIsSelected(true)
  };

  return (
    <Box
      as="div"
      className={`flex items-center bg-gray-200 ${isMobile ? 'p-3' : 'p-6'} rounded-lg gap-2 cursor-pointer flex-shrink-0 min-w-[100px] ${isMobile ? 'min-w-[85px]' : ''}`}
      onClick={handleSelect}
      sx={{
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#e5e7eb',
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box className={`flex items-center justify-center ${isMobile ? 'mb-0.5' : 'mb-1'}`}>
        <CustomRadio isSelected={isSelected} onSelect={handleSelect} />
        {/* <input
          type="radio"
          name={`price-${index}`}
          value={option?.priceID}
          // checked={selectedFare?.priceID === option?.priceID}
          checked={isSelected}
          className={`w-4 h-4 ${t.RADIO_ACCENT} ${t.RADIO_BORDER} ${t.RADIO_RING}`}
          style={{ minWidth: 16, minHeight: 16 }}
          onChange={() => handleSelect()}
          onClick={(e) => e.stopPropagation()} // Prevent double triggering
        /> */}
      </Box>
      <Box as="div" className="flex flex-col items-start justify-start min-w-0">
        <Text variant="Maison18Medium20" className={`${t.TEXT_DARK} ${isMobile ? 'text-sm' : 'text-base'} font-bold text-left w-full truncate`}>
          ₹{option?.totalFare}
        </Text>
        <Text variant="Maison12Regular16" className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-400 text-left w-full truncate`}>
          {option?.fareIdentifier}
        </Text>
      </Box>
    </Box>
  )
}

// add the secondary checkbox on



export function FareCheckboxContainer({
  fares,
  isOverflow,
  scrollRef,
  selectedFare,
  setSelectedFare,
  index,
}: FareCheckboxContainerProps & {
  selectedFare: Fare | null;
  setSelectedFare: (fare: Fare | null) => void;
  index: number;
}) {
  const isMobile = useIsMobile();

  return (
    <Box
      as="div"
      id="price-options-scroll"
      ref={scrollRef}
      className={`flex ${isMobile ? 'gap-1.5' : 'gap-2'} ${isOverflow || isMobile ? "overflow-x-auto" : ""} w-full`}
      style={{
        whiteSpace: isOverflow || isMobile ? "nowrap" : "normal",
        maxWidth: "100%",
      }}
      // Hide scrollbar for Webkit browsers
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {fares.map((option: Fare) => (
        <FareCheckBoxFull
          key={option.priceID}
          option={option}
          selectedFare={selectedFare}
          setSelectedFare={setSelectedFare}
          index={index}
        />
      ))}
    </Box>
  );
}
