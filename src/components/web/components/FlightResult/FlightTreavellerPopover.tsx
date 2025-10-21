import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { Box, Text } from "theme-ui"
import { ThemeButton } from "../../core/Button/Button"

interface FlightTreavellerPopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerContent: React.ReactNode
  adult: number | null
  child: number | null
  infant: number | null
  travelClass: string | null
  setClassAndTraveller: (cabinClass?: string, adult?: number, child?: number, infant?: number) => void
}

function NumberRadio({ value, selected, onClick }: { value: number, selected: boolean, onClick: () => void }) {
  return (
    <div
      className={`rounded-full border border-gray-300 w-10 h-10 flex items-center justify-center p-[12px] cursor-pointer ${selected ? "bg-black text-white" : "bg-white text-gray-700"
        }`}
      onClick={onClick}
    >
      <span className="text-xs font-semibold">{value}</span>
    </div>
  )
}

function NumberRadioGroup({ value, setValue }: { value: number, setValue: (value: number) => void }) {
  const radios = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <Box className="mb-3 flex gap-2">
      {radios.map((num) => (
        <NumberRadio key={num} value={num} onClick={() => setValue(num)} selected={value === num} />
      ))}
    </Box>
  );
}

export function FlightTreavellerPopover({ open, onOpenChange, triggerContent, adult, child, infant, travelClass, setClassAndTraveller }: FlightTreavellerPopoverProps) {
  const [selectedClass, setSelectedClass] = useState<string>("Economy")
  const [selectedAdult, setSelectedAdult] = useState<number>(0)
  const [selectedChild, setSelectedChild] = useState<number>(0)
  const [selectedInfant, setSelectedInfant] = useState<number>(0)

  useEffect(() => {
    setSelectedAdult(Number(adult) || 0)
    setSelectedChild(Number(child) || 0)
    setSelectedInfant(Number(infant) || 0)
    setSelectedClass(travelClass || "Economy")
  }, [adult, child, infant, travelClass])

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {triggerContent}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Box className="mb-3">
          <Text className="text-xs font-semibold text-gray-700 mb-1">ADULTS (12y+)</Text>
          <NumberRadioGroup value={selectedAdult} setValue={setSelectedAdult} />
        </Box>
        <Box className="mb-3">
          <Text className="text-xs font-semibold text-gray-700 mb-1">CHILDREN (2-12y)</Text>
          <NumberRadioGroup value={selectedChild} setValue={setSelectedChild} />
        </Box>
        <Box className="mb-3">
          <Text className="text-xs font-semibold text-gray-700 mb-1">INFANTS (0-2y)</Text>
          <NumberRadioGroup value={selectedInfant} setValue={setSelectedInfant} />
        </Box>
        <Box className="mb-3">
          <Text className="text-xs font-semibold text-gray-700 mb-1">CLASS</Text>
          <RadioGroup defaultValue={selectedClass} onValueChange={setSelectedClass}>
            <Box as="div" className="flex items-center gap-2">
              <RadioGroupItem value="Economy" checked={selectedClass === "Economy"} />
              <Text className="text-xs font-semi  bold text-gray-700 mb-1">Economy</Text>
            </Box>
            <Box as="div" className="flex items-center gap-2">
              <RadioGroupItem value="Business" checked={selectedClass === "Business"} />
              <Text className="text-xs font-semi  bold text-gray-700 mb-1">Business</Text>
            </Box>
            <Box as="div" className="flex items-center gap-2">
              <RadioGroupItem value="First" checked={selectedClass === "First"} />
              <Text className="text-xs font-semi  bold text-gray-700 mb-1">First</Text>
            </Box>
          </RadioGroup>
        </Box>
        <Box className="flex justify-end">
          <ThemeButton className="bg-black" onClick={() => {
            setClassAndTraveller(selectedClass, selectedAdult, selectedChild, selectedInfant)
            onOpenChange(false)
          }}>
            <Text className="text-xs font-semibold text-white mb-1">Apply</Text>

          </ThemeButton>
        </Box>
      </PopoverContent>
    </Popover>
  )
}
