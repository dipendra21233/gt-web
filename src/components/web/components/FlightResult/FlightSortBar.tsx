import { setShorted } from "@/store/slice/flight.slice";
import { MainStoreType } from "@/types/store/reducers/main.reducers";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text } from "theme-ui";

export function FlightSortBar({ }) {

  const { sorting, toDestination, fromDestination, filterFlightData } = useSelector(
    (state: MainStoreType) => state.filterFlightData
  )
  const dispatch = useDispatch()

  return (
    <Box
      className="w-full  flex flex-col gap-1 rounded-t-lg px-2 py-1"
    >
      {/* Top Row: Route and Flights Count */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 1 }}
      >
        <Text variant="Primary18Medium125" color="orange_700">
          {fromDestination} - {toDestination}
        </Text>
        <Text variant="Maison14Regular20" color="grey1">
          {filterFlightData?.length ?? 0} Flights Available
        </Text>
      </Box>
      {/* Sort Tabs */}
      <Box
        className="flex items-center justify-between rounded-lg overflow-hidden bg-gray-50"
      >
        <Box
          as="button"
          className={`flex-1 py-2 font-semibold transition-colors text-sm ${sorting === "Price" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
            }`}
          onClick={() => {
            dispatch(setShorted('Price'))
          }}
        >
          <Text
            variant="Maison14Regular20"
            sx={{
              color: sorting === "Price" ? "#F97316" : "#1A1A1A"
            }}
          >
            Price
          </Text>
        </Box>
        <Box
          as="button"
          className={`flex-1 py-2 font-semibold transition-colors text-sm ${sorting === "Fastest" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
            }`}
          onClick={() => {
            dispatch(setShorted('Fastest'))
          }}
        >
          <Text
            variant="Maison14Regular20"
            sx={{
              color: sorting === "Fastest" ? "#F97316" : "#1A1A1A"
            }}
          >
            Fastest
          </Text>
        </Box>
        <Box
          as="button"
          className={`flex-1 py-2 font-semibold transition-colors text-sm ${sorting === "Departure" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
            }`}
          onClick={() => {
            dispatch(setShorted('Departure'))
          }}
        >
          <Text
            variant="Maison14Regular20"
            sx={{
              color: sorting === "Departure" ? "#F97316" : "#1A1A1A"
            }}
          >
            Departure
          </Text>
        </Box>
        <Box
          as="button"
          className={`flex-1 py-2 font-semibold transition-colors text-sm ${sorting === "Smart" ? "bg-orange-100 text-orange_600" : "text-primary_text_dark hover:bg-grey_bg"
            }`}
          onClick={() => {
            dispatch(setShorted('Smart'))
          }}
        >
          <Text
            variant="Maison14Regular20"
            sx={{
              color: sorting === "Smart" ? "#F97316" : "#1A1A1A"
            }}
          >
            Smart
          </Text>
        </Box>

      </Box>
    </Box>
  );
}
