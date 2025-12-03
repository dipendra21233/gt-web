'use client'
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { translation } from "@/utils/translation";
import { AdminCard } from "@/components/shared/Card/AdminCard";
import { Box } from "theme-ui";
import { SelectInputField } from "@/components/web/core/SelectInputField/SelectInputField";
import { ThemeButton } from "@/components/web/core/Button/Button";
import { useGetPaxCalendarDataMutation } from "@/hooks/useMutations";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const BOOKING_TYPES = [
  { value: "Flight Bookings", label: "Flight Bookings" },
  { value: "Hotel Bookings", label: "Hotel Bookings" },
  { value: "Car Rentals", label: "Car Rentals" },
  { value: "Tour Packages", label: "Tour Packages" }
];

const YEARS = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - 5 + i;
  return { value: year.toString(), label: year.toString() };
});

const MONTH_OPTIONS = MONTHS.map((month, index) => ({
  value: index.toString(),
  label: month
}));

interface Booking {
  id: string;
  title: string; // MR/MS/MRS
  name: string;
  route: string; // e.g., "JAI-IXS"
  status: string; // e.g., "confirmed"
  bookingId?: string;
  transactionId?: string;
  journeyDate?: string;
  sector?: string;
  origin?: string;
  destination?: string;
  carrier?: string;
  flightNumber?: string;
  pnr?: string;
  airlinePnr?: string;
  leadPassenger?: string;
  totalPassengers?: number;
  totalAmount?: number;
  bookingStatus?: string;
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  bookings?: Booking[];
}

// Dummy booking data - kept for reference/testing if needed
// const getDummyBookings = (): Booking[] => {
//   return [
//     { id: "1", title: "MS", name: "PINKI DEVI", route: "JAI-IXS", status: "confirmed" },
//     ...
//   ];
// };

interface BookingCalendarProps {
  onCustomerClick?: (booking: Booking, date: string) => void;
}

const BookingCalendar = ({ onCustomerClick }: BookingCalendarProps = {}) => {
  const router = useRouter();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [bookingType, setBookingType] = useState<{ value: string; label: string } | string>(BOOKING_TYPES[0].value);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Record<string, Booking[]>>({});
  
  const { mutate: fetchPaxCalendarData, isPending } = useGetPaxCalendarDataMutation();

  // Transform API response to Booking format
  const transformApiDataToBookings = (apiData: any): Record<string, Booking[]> => {
    const transformedBookings: Record<string, Booking[]> = {};
    
    if (apiData?.groupedByDate) {
      Object.keys(apiData.groupedByDate).forEach((dateKey) => {
        const bookingsForDate = apiData.groupedByDate[dateKey].map((booking: any) => {
          // Get lead passenger name from the API response
          const leadPassengerName = booking.leadPassengerName || '';
          
          // Try to extract title from name if it contains title prefix
          // Otherwise default to MR
          let title = 'MR';
          let name = leadPassengerName.trim();
          
          if (leadPassengerName) {
            const titleMatch = leadPassengerName.match(/^(Mr\.|Ms\.|Mrs\.|Miss\.|MR|MS|MRS|MISS)\s*/i);
            if (titleMatch) {
              const matchedTitle = titleMatch[1].replace('.', '').toUpperCase();
              title = matchedTitle;
              name = leadPassengerName.replace(/^(Mr\.|Ms\.|Mrs\.|Miss\.|MR|MS|MRS|MISS)\s*/i, '').trim();
            }
          }
          
          // Get flight details from nested flight object
          const flight = booking.flight || {};
          const sector = flight.sector || `${flight.origin || ''}-${flight.destination || ''}`;
          const route = sector || `${flight.origin || ''} - ${flight.destination || ''}`;
          
          // Get status - API uses 'status' field
          const bookingStatus = booking.status || 'TICKETED';
          const status = bookingStatus.toLowerCase();
          
          return {
            id: booking.bookingId || booking.transactionId || booking.booking_id || '',
            title,
            name: name || 'Unknown',
            route: route || '-',
            status: status || 'confirmed',
            bookingId: booking.bookingId,
            transactionId: booking.transactionId,
            journeyDate: flight.journeyDate || flight.departureDate,
            sector: flight.sector,
            origin: flight.origin,
            destination: flight.destination,
            carrier: flight.airlineCode,
            flightNumber: flight.flightNumber,
            pnr: booking.pnr?.gdsPnr || booking.pnr?.airlinePnr,
            airlinePnr: booking.pnr?.airlinePnr,
            leadPassenger: leadPassengerName,
            totalPassengers: booking.totalPassengers || 0,
            totalAmount: booking.payment?.totalAmount || 0,
            bookingStatus: bookingStatus,
          };
        });
        
        transformedBookings[dateKey] = bookingsForDate;
      });
    }
    
    return transformedBookings;
  };

  // Get start and end date for selected month/year
  const getMonthDateRange = (year: number, month: number) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    const startDateStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    
    return { startDate: startDateStr, endDate: endDateStr };
  };

  // Fetch calendar data
  const handleFetchCalendar = () => {
    const { startDate, endDate } = getMonthDateRange(selectedYear, selectedMonth);
    
    fetchPaxCalendarData(
      { startDate, endDate },
      {
        onSuccess: (response) => {
          if (response?.data?.success) {
            const transformedBookings = transformApiDataToBookings(response.data.data);
            setBookings(transformedBookings);
          }
        },
        onError: (error) => {
          console.error('Error fetching calendar data:', error);
          setBookings({});
        }
      }
    );
  };

  // Fetch calendar data on component mount
  useEffect(() => {
    const { startDate, endDate } = getMonthDateRange(selectedYear, selectedMonth);
    
    fetchPaxCalendarData(
      { startDate, endDate },
      {
        onSuccess: (response) => {
          if (response?.data?.success) {
            const transformedBookings = transformApiDataToBookings(response.data.data);
            setBookings(transformedBookings);
          }
        },
        onError: (error) => {
          console.error('Error fetching calendar data:', error);
          setBookings({});
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount

  // Handle customer name click
  const handleCustomerClick = (booking: Booking, dateKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCustomerClick) {
      onCustomerClick(booking, dateKey);
    } else {
      // Navigate to itinerary page with bookingId
      const bookingId = booking.bookingId || booking.id;
      if (bookingId) {
        router.push(`/admin/itinerary/${bookingId}`);
      } else {
        console.error('Booking ID not found');
      }
    }
  };

  // Toggle expanded date
  const toggleExpandDate = (dateKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDate(expandedDate === dateKey ? null : dateKey);
  };

  const hasBookings = useMemo(() => {
    return Object.keys(bookings).length > 0 && 
           Object.values(bookings).some(dayBookings => dayBookings.length > 0);
  }, [bookings]);

  const message = hasBookings 
    ? `Passenger Journeys in the Month of ${MONTHS[selectedMonth]} ${selectedYear}`
    : `No Passenger Journeys in the Month of ${MONTHS[selectedMonth]} ${selectedYear}`;

  const getDateKey = (year: number, month: number, date: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
  };

  const getCalendarDays = (): CalendarDay[][] => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const prevMonthLastDay = new Date(selectedYear, selectedMonth, 0).getDate();
    
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];
    
    // Previous month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      currentWeek.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        isWeekend: currentWeek.length === 0
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = currentWeek.length;
      const isToday = day === today.getDate() && 
                      selectedMonth === today.getMonth() && 
                      selectedYear === today.getFullYear();
      
      const dateKey = getDateKey(selectedYear, selectedMonth, day);
      const dayBookings = bookings[dateKey] || [];
      
      currentWeek.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6,
        bookings: dayBookings
      });
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    // Next month days
    let nextMonthDay = 1;
    while (currentWeek.length < 7 && currentWeek.length > 0) {
      currentWeek.push({
        date: nextMonthDay++,
        isCurrentMonth: false,
        isToday: false,
        isWeekend: currentWeek.length === 0 || currentWeek.length === 5 || currentWeek.length === 6
      });
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    // Add extra row if needed
    while (weeks.length < 6) {
      const extraWeek: CalendarDay[] = [];
      for (let i = 0; i < 7; i++) {
        extraWeek.push({
          date: nextMonthDay++,
          isCurrentMonth: false,
          isToday: false,
          isWeekend: i === 0 || i === 5 || i === 6
        });
      }
      weeks.push(extraWeek);
    }
    
    return weeks;
  };

  const handlePrevMonth = () => {
    const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    
    // Auto-fetch when navigating months
    const { startDate, endDate } = getMonthDateRange(newYear, newMonth);
    fetchPaxCalendarData({ startDate, endDate }, {
      onSuccess: (response) => {
        if (response?.data?.success) {
          const transformedBookings = transformApiDataToBookings(response.data.data);
          setBookings(transformedBookings);
        }
      }
    });
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    // Auto-fetch when navigating months
    const { startDate, endDate } = getMonthDateRange(
      selectedMonth === 11 ? selectedYear + 1 : selectedYear,
      selectedMonth === 11 ? 0 : selectedMonth + 1
    );
    fetchPaxCalendarData({ startDate, endDate }, {
      onSuccess: (response) => {
        if (response?.data?.success) {
          const transformedBookings = transformApiDataToBookings(response.data.data);
          setBookings(transformedBookings);
        }
      }
    });
  };

  const weeks = getCalendarDays();

  return (
      <AdminCard heading={translation?.PAX_CALENDAR}>
              <Box
              className="grid gap-4 pb-4"
              sx={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                display: 'grid',
              }}
            >
              <SelectInputField
                placeholder="Select Booking Type"
                value={typeof bookingType === 'string' ? bookingType : bookingType.value}
                onChange={(selectedOption) => {
                  const value = typeof selectedOption?.value === 'string' ? selectedOption.value : BOOKING_TYPES[0].value;
                  setBookingType(value);
                }}
                label="Booking Type"
                firstInputBox
                options={BOOKING_TYPES}
              />

              <SelectInputField
                placeholder="Select Month"
                value={selectedMonth.toString()}
                onChange={(selectedOption) => {
                  const value = typeof selectedOption?.value === 'string' ? selectedOption.value : null;
                  if (value) {
                    setSelectedMonth(parseInt(value));
                  }
                }}
                label="Month"
                firstInputBox
                options={MONTH_OPTIONS}
              />

              <SelectInputField
                placeholder="Select Year"
                value={selectedYear.toString()}
                onChange={(selectedOption) => {
                  const value = typeof selectedOption?.value === 'string' ? selectedOption.value : null;
                  if (value) {
                    setSelectedYear(parseInt(value));
                  }
                }}
                label="Year"
                firstInputBox
                options={YEARS}
              />
              
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '100%',
                  gridColumn: 'auto',
                  gap: '20px',
                }}
              >
                <ThemeButton
                  wrapperClassName="flex item-center"
                  onClick={handleFetchCalendar}
                  sx={{ width: '200px' }}
                  text="Fetch Calendar"
                  isLoading={isPending}
                />
                <ThemeButton
                  wrapperClassName="flex item-center"
                  onClick={() => {
                    // Back button action - you can customize this
                    window.history.back();
                  }}
                  sx={{ width: '150px' }}
                  text="Back"
                  variant="secondary"
                />
              </Box>
            </Box>
      <div className="max-w-7xl mx-auto">
        {/* Filter Bar */}
        {/* <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Booking Type</span>
            <Select value={bookingType} onValueChange={setBookingType}>
              <SelectTrigger className="w-40 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BOOKING_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Month</span>
            <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((month, idx) => (
                  <SelectItem key={month} value={idx.toString()}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Year</span>
            <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
              <SelectTrigger className="w-24 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleFetchCalendar} size="sm">
            Fetch Calendar
          </Button>
          <Button variant="secondary" size="sm" className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground/90">
            Back
          </Button>
        </div> */}
        
      

        {/* Calendar Title and Navigation */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <Button 
            onClick={handlePrevMonth} 
            size="lg"
            variant="outline"
            className="
              min-w-[140px] 
              h-12 
              border-2 
              border-primary/30 
              bg-background 
              hover:bg-primary 
              hover:text-primary-foreground 
              hover:border-primary 
              transition-all 
              duration-200 
              shadow-sm 
              hover:shadow-md
              font-semibold
              group
              flex items-center justify-center gap-2
            "
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:translate-x-[-2px] transition-transform duration-200"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span>Prev Month</span>
          </Button>
          
          <div className="text-center flex-1">
            <h2 className="text-4xl font-bold text-foreground mb-1">
              {MONTHS[selectedMonth]} {selectedYear}
            </h2>
            <p className={`text-sm ${hasBookings ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
              {message}
            </p>
          </div>
          
          <Button 
            onClick={handleNextMonth} 
            size="lg"
            variant="outline"
            className="
              min-w-[140px] 
              h-12 
              border-2 
              border-primary/30 
              bg-background 
              hover:bg-primary 
              hover:text-primary-foreground 
              hover:border-primary 
              transition-all 
              duration-200 
              shadow-sm 
              hover:shadow-md
              font-semibold
              group
              flex items-center justify-center gap-2
            "
          >
            <span>Next Month</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:translate-x-[2px] transition-transform duration-200"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Button>
        </div>
        
        {/* Calendar Grid */}
        <div className="border border-border rounded-lg overflow-hidden shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-7 bg-secondary/50">
            {DAYS.map((day) => (
              <div
                key={day}
                className="p-3.5 text-center text-sm font-semibold text-foreground border-r border-b border-border last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Weeks */}
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7">
              {week.map((day, dayIdx) => {
                const hasBookingsForDay = day.bookings && day.bookings.length > 0;
                const bookingCount = day.bookings?.length || 0;
                const dateKey = getDateKey(selectedYear, selectedMonth, day.date);
                const isExpanded = expandedDate === dateKey;
                const visibleBookings = isExpanded ? day.bookings! : (day.bookings?.slice(0, 8) || []);
                const hasMoreBookings = day.bookings && day.bookings.length > 8;
                
                return (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`
                      ${isExpanded ? 'min-h-[400px]' : 'min-h-[200px]'}
                      p-2.5 border-r border-b border-border last:border-r-0
                      transition-all duration-300
                      ${hasBookingsForDay && day.isCurrentMonth 
                        ? 'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' 
                        : ''}
                      ${day.isToday && !hasBookingsForDay 
                        ? 'bg-accent ring-2 ring-primary/20' 
                        : ''}
                      ${day.isToday && hasBookingsForDay 
                        ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-primary/30' 
                        : ''}
                      ${!day.isCurrentMonth ? 'opacity-40 bg-muted/30' : ''}
                      ${!hasBookingsForDay && day.isCurrentMonth && !day.isToday 
                        ? 'bg-background hover:bg-muted/50' 
                        : ''}
                      flex flex-col relative
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`
                          text-base font-bold
                          ${day.isToday ? 'text-primary' : ''}
                          ${day.isWeekend && day.isCurrentMonth && !day.isToday 
                            ? 'text-calendar-weekend' 
                            : 'text-foreground'}
                          ${!day.isCurrentMonth ? 'text-muted-foreground' : ''}
                        `}
                      >
                        {day.date}
                      </span>
                      {hasBookingsForDay && day.isCurrentMonth && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-semibold">
                          {bookingCount}
                        </span>
                      )}
                    </div>
                    {hasBookingsForDay && day.isCurrentMonth && (
                      <div className={`flex-1 space-y-1.5 ${isExpanded ? '' : ''}`}>
                        {visibleBookings.map((booking) => {
                          return (
                            <div
                              key={booking.id}
                              className="text-xs leading-relaxed text-foreground break-words py-1.5 px-2 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-all cursor-pointer group border border-transparent hover:border-primary/30 bg-white/50 dark:bg-gray-800/30"
                              title={`Click to view details: ${booking.title} ${booking.name} (${booking.route}) - ${booking.status}`}
                            >
                              <button
                                onClick={(e) => handleCustomerClick(booking, dateKey, e)}
                                className="text-left w-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded focus:ring-offset-1"
                              >
                                <div className="flex items-start gap-1.5">
                                  <span className="font-semibold text-primary group-hover:text-primary/90 group-hover:underline transition-all text-xs">
                                    {booking.title} {booking.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-muted-foreground text-[11px]">({booking.route})</span>
                                  <span className="text-green-600 dark:text-green-400 font-medium text-[11px] flex items-center gap-1">
                                    <span>✓</span> {booking.status}
                                  </span>
                                </div>
                              </button>
                            </div>
                          );
                        })}
                        {hasMoreBookings && !isExpanded && (
                          <button
                            onClick={(e) => toggleExpandDate(dateKey, e)}
                            className="w-full text-xs text-primary font-semibold py-2 px-2 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-all border border-primary/20 hover:border-primary/40 bg-white/50 dark:bg-gray-800/30"
                          >
                            +{day.bookings!.length - 8} more (Click to expand)
                          </button>
                        )}
                        {isExpanded && hasMoreBookings && (
                          <button
                            onClick={(e) => toggleExpandDate(dateKey, e)}
                            className="w-full text-xs text-primary font-semibold py-2 px-2 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-all border border-primary/20 hover:border-primary/40 bg-white/50 dark:bg-gray-800/30 mt-2"
                          >
                            Collapse
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      </AdminCard>
  );
};

export default BookingCalendar;