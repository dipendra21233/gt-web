import { translation } from '@/utils/translation'
import moment from 'moment'
import { FC } from 'react'
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range'
import { IoCalendarOutline } from 'react-icons/io5'
import { Box, Text } from 'theme-ui'

interface DateSelectModalProps {
  ranges?: Range[]
  onChange?: (rangesByKey: RangeKeyDict) => void
  onClickRoundTrip?: () => void
  selectedTrip?: string
  isRoundTrip?: boolean
}

const DateSelectModal: FC<DateSelectModalProps> = ({
  onChange,
  ranges,
  selectedTrip,
  onClickRoundTrip,
  isRoundTrip,
}) => {
  const formattedStart = moment(ranges?.[0]?.startDate).format('DD MMM YY')
  const formattedEnd = moment(ranges?.[0]?.endDate).format('DD MMM YY')

  const getText = (): string => {
    return formattedStart === formattedEnd
      ? translation?.BOOK_WITH_ROUND_TRIP
      : `${formattedStart} - ${formattedEnd}`
  }

  return (
    <Box as="div" className="relative w-full max-w-3xl">
      <Box
        as="div"
        className="absolute z-50 mt-2 shadow-lg bg-white rounded-lg travel-class-selector-container translate-center-2"
      >
        <Box
          as="div"
          className="flex items-center border-b border-gray-200 pb-2 mb-2 gap-2"
        >
          <div className="flex items-center gap-1 p-11 ml-3">
            <IoCalendarOutline size={16} />
            <Text variant="Maison16Medium20" color="grey_medium">
              {formattedStart}
            </Text>
          </div>

          <span className="mx-2">–</span>

          <div
            className={`flex items-center gap-1 ${!isRoundTrip && 'border-b-2 border-grey1 cursor-pointer'}`}
            onClick={onClickRoundTrip}
          >
            <IoCalendarOutline size={16} />
            <Text variant="Maison16Medium20" color="grey_medium">
              {getText()}
            </Text>
          </div>
        </Box>

        <Box as="div" className="px-20 pb-20">
          <DateRangePicker
            editableDateInputs={true}
            onChange={onChange}
            moveRangeOnFirstSelection={false}
            direction="horizontal"
            rangeColors={['#00C6B7']}
            dateDisplayFormat="MM/dd/yyyy"
            ranges={ranges}
            retainEndDateOnFirstSelection={
              selectedTrip === translation.ROUND_TRIP
            }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DateSelectModal
