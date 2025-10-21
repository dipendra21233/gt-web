/* eslint-disable no-unused-vars */
'use client';
import { MaisonFont } from '@/utils/localFonts';
import { format } from 'date-fns';
import { DayPicker, Styles } from 'react-day-picker';

export const DatePicker = ({
  numberOfMonths = 1,
  styles,
  selected,
  onSelect,
  minDate,
}: {
  numberOfMonths?: number;
  styles?: Partial<Styles> | undefined;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
}) => {
  return (
    <DayPicker
      className={MaisonFont.className}
      weekStartsOn={1}
      numberOfMonths={numberOfMonths}
      mode="single"
      selected={selected}
      onSelect={onSelect}
      modifiers={{
        ...(minDate ? { beforeMinDate: (date: Date) => date < minDate } : {}),
      }}
      disabled={[
        ...(minDate ? [(date: Date) => date < minDate] : []),
      ]}
      styles={{
        day_button: { width: '-webkit-fill-available' },
        month_grid: { width: '360px', margin: 'auto' },
        day: { fontWeight: 600 },
        month_caption: { fontWeight: 600 },
        months: { margin: '0 auto', flexWrap: 'nowrap' },
        weekdays: {
          fontWeight: 500,
        },
        ...styles,
      }}
      classNames={{
        selected:
          'rounded-full bg-[#fb7f29] border-[#fb7f29] text-white',
        chevron: 'fill-[#000]',
        today: 'text-black',
        disabled: 'text-gray-300 cursor-not-allowed',

      }}
      navLayout="around"
      formatters={{
        formatWeekdayName: (day) => format(day, 'eee'),
      }}
    />
  );
};
