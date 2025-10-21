import { Fare } from "@/types/module/flightSearch";
import { FareCheckboxContainerProps } from "components";
import { useEffect, useState } from "react";
import { Box, Text } from "theme-ui";


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
      className="flex items-center bg-gray-200 p-6 rounded-10 gap-2 cursor-pointer"
      onClick={handleSelect}
    >
      <Box className="flex items-center justify-center mb-1">
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
      <Box as="div" className="flex flex-col items-start justify-start">
        <Text variant="Maison18Medium20" className={`${t.TEXT_DARK} text-base font-bold text-left w-full`}>
          ₹{option?.totalFare}
        </Text>
        <Text variant="Maison12Regular16" className="text-xs text-gray-400 text-left w-full">
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

  return (
    <Box
      as="div"
      id="price-options-scroll"
      ref={scrollRef}
      className={`flex gap-2 ${isOverflow ? "overflow-x-auto" : ""} w-full`}
      style={{
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
