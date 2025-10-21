import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FlightListingDataProps } from "@/types/module/flightSearch";
import { MainStoreType } from "@/types/store/reducers/main.reducers";
import { formatDateToDD_MM_YYYY, getTravellerSummary } from "@/utils/functions";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaExchangeAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import CommonFlightSelectNew from "../FlightSelectCard/CommonFlightSelect";
import { FlightTreavellerPopover } from "./FlightTreavellerPopover";


function capitilizedFirst(text: string): string {
  if (!text) return ''
  return text.split("").map((data, index) => index === 0 ? data.toLocaleUpperCase() : data).join("")
}

interface SearchInputProps {
  code: string | null;
  setInputValue: (str: string) => void;
  label: string;
  disabled?: boolean;
}






function SearchInput({ code, setInputValue, label, disabled = false }: SearchInputProps) {
  const { airports } = useSelector(
    (state: MainStoreType) => state.filterFlightData
  );

  const [editing, setEditing] = useState(false);

  // Show all airport options for searching when editing, otherwise only show the selected one
  const allOptions =
    airports
      ? airports.map((airport) => ({
        value: airport.iata_code || "",
        label: `${airport.municipality || airport.name || "-"} (${airport.iata_code || "-"})`,
        airport,
      }))
      : [];


  // Only show the selected option when not editing
  const selectedOption =
    code && code.trim() !== ""
      ? allOptions.find((opt) => opt.value.toUpperCase() === (code ?? "").toUpperCase()) || null
      : null;

  // Handle selection change
  const handleChange = (val: string) => {
    setInputValue(val);
    setEditing(false);
  };

  // When clicking outside, close the select
  const selectRef = useRef<any>(null);
  useEffect(() => {
    if (!editing) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editing]);

  return (
    <div className="flex flex-col relative w-100">
      <span className="text-[10px] text-gray-400">{capitilizedFirst(label) ?? "-"}</span>
      {!editing ? (
        <span
          className={`font-semibold text-sm text-gray-700 ${disabled ? '' : 'cursor-pointer'}`}
          onClick={() => { if (!disabled) setEditing(true) }}
          title="Click to select"
        >
          {selectedOption ? selectedOption.label : (code ?? "-")}
        </span>
      ) : (
        <div ref={selectRef}>
          <CommonFlightSelectNew
            options={allOptions}
            onChange={handleChange}
            placeholder="Search airport"
            label={label}
          />
        </div>
      )}
    </div>
  );
}



interface FlightBookingBarProps {
  fromDestination: string | null;
  toDestination: string | null;
  setFromDestination: (str: string) => void;
  setToDestination: (str: string) => void;
  depature: Date | null;
  returnFlight: Date | null;
  setDepatureDate: (date: Date) => void;
  setReturnDate: (date: Date | null) => void;
  updateTheFilter: () => void;
  showDetails: (data: FlightListingDataProps) => void;
  adult: number | null;
  child: number | null;
  infant: number | null;
  setClassAndTraveller: (cabinClass?: string, adult?: number, child?: number, infant?: number) => void;
  travelClass: string | null;
  disabled?: boolean;
  onModify?: () => void;
}

export function FlightSearchBar({
  fromDestination,
  toDestination,
  setFromDestination,
  setToDestination,
  depature,
  returnFlight,
  setDepatureDate,
  setReturnDate,
  updateTheFilter,
  adult,
  child,
  infant,
  setClassAndTraveller,
  travelClass,
  disabled = false,
  onModify,
}: FlightBookingBarProps) {
  // Use a default button color (orange) since theme is removed
  const buttonColor = "bg-orange-500 hover:bg-orange-600";
  const [open, setOpen] = useState(false);
  const [openTravellar, setOpenTravellar] = useState(false);


  return (
    <div className={`rounded-2xl flex flex-col gap-1 w-full max-w-6xl mx-auto `}>
      {/* Main Search Row */}
      <div className="flex items-center gap-2">
        {/* From */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded grow min-w-[320px] gap-4">
          <SearchInput label={'from'} code={fromDestination} setInputValue={setFromDestination} disabled={disabled} />
          <div className="flex items-center justify-center mx-2">
            <FaExchangeAlt className="text-gray-400 text-lg" />
          </div>
          <SearchInput label={'to'} code={toDestination} setInputValue={setToDestination} disabled={disabled} />
        </div>
        {/* Departure */}

        <Popover open={disabled ? false : open} onOpenChange={disabled ? () => { } : setOpen}>
          <PopoverTrigger asChild>
            <div className={`flex flex-col px-4 py-2 bg-gray-50  min-w-[120px] ${disabled ? 'pointer-events-none' : ''}`}>
              <span className="text-[10px] text-gray-400">Departure</span>
              {
                depature ? <span className="font-semibold text-sm text-gray-700">{(formatDateToDD_MM_YYYY(depature) as string).replace(/-/g, '/')}</span> :
                  <span className="font-semibold text-sm text-gray-400">Depature</span>
              }
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={depature || undefined}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (date) {
                  setDepatureDate(date)
                }
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>

        <Popover open={false} onOpenChange={() => { }}>
          <PopoverTrigger asChild>
            <div className={`flex flex-col px-4 py-2 bg-gray-50  min-w-[120px] ${disabled ? 'pointer-events-none' : ''}`}>
              <span className="text-[10px] text-gray-400">Return</span>
              {
                returnFlight ? (
                  <span className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                    {(formatDateToDD_MM_YYYY(returnFlight) as string).replace(/-/g, '/')}
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-red-500 focus:outline-none"
                      onClick={() => setReturnDate(null)}
                      aria-label="Clear return date"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ) :
                  <span className="font-semibold text-sm text-gray-400">Return</span>
              }
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={returnFlight || undefined}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (date) {
                  setReturnDate(date)
                }
              }}
            />
          </PopoverContent>
        </Popover>


        {/* Travellers & Class */}

        <FlightTreavellerPopover
          open={openTravellar}
          onOpenChange={setOpenTravellar}
          triggerContent={<div className={`flex flex-col px-4 py-2 bg-gray-50  min-w-[170px] ${disabled ? 'pointer-events-none' : ''}`}>
            <span className="text-[10px] text-gray-400">Travellers & Class</span>
            <span className="font-semibold text-sm text-gray-700">{getTravellerSummary(adult ?? 0, child ?? 0, infant ?? 0, travelClass ?? "Economy")}</span>
          </div>}
          adult={adult ?? 0}
          child={child ?? 0}
          infant={infant ?? 0}
          travelClass={travelClass ?? "Economy"}
          setClassAndTraveller={setClassAndTraveller}
        />
        {/* Search Button */}
        <button
          className={`ml-2 px-6 py-2 ${buttonColor} text-white font-semibold rounded-lg shadow transition flex items-center gap-2 text-sm`}
          onClick={() => {
            if (disabled) {
              onModify?.()
            } else {
              updateTheFilter()
            }
          }}
        >
          {disabled ? 'Modify Search' : 'Search'} <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
