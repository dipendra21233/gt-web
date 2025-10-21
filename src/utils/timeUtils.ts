// Time utility functions for calculating duration and formatting time

export interface TimeCalcResult {
  hours: number
  minutes: number
  totalMinutes: number
  formattedDuration: string
}

/**
 * Calculate duration between departure and arrival times
 * @param depTime - Departure time in HH:MM format
 * @param arrTime - Arrival time in HH:MM format
 * @returns Duration calculation result
 */
export const calculateFlightDuration = (
  depTime: string,
  arrTime: string
): TimeCalcResult => {
  if (!depTime || !arrTime) {
    return {
      hours: 0,
      minutes: 0,
      totalMinutes: 0,
      formattedDuration: '00:00',
    }
  }

  // Parse departure time
  const [depHours, depMinutes] = depTime.split(':').map(Number)
  const depTotalMinutes = depHours * 60 + depMinutes

  // Parse arrival time
  const [arrHours, arrMinutes] = arrTime.split(':').map(Number)
  let arrTotalMinutes = arrHours * 60 + arrMinutes

  // Handle next day arrival (if arrival time is earlier than departure time)
  if (arrTotalMinutes < depTotalMinutes) {
    arrTotalMinutes += 24 * 60 // Add 24 hours
  }

  // Calculate duration
  const durationMinutes = arrTotalMinutes - depTotalMinutes
  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60

  return {
    hours,
    minutes,
    totalMinutes: durationMinutes,
    formattedDuration: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
  }
}

/**
 * Format time duration to readable string
 * @param hours - Number of hours
 * @param minutes - Number of minutes
 * @returns Formatted duration string
 */
export const formatDuration = (hours: number, minutes: number): string => {
  if (hours === 0 && minutes === 0) {
    return '0 minutes'
  }

  const hourText = hours === 1 ? 'hour' : 'hours'
  const minuteText = minutes === 1 ? 'minute' : 'minutes'

  if (hours === 0) {
    return `${minutes} ${minuteText}`
  }

  if (minutes === 0) {
    return `${hours} ${hourText}`
  }

  return `${hours} ${hourText} ${minutes} ${minuteText}`
}

/**
 * Convert time string to minutes
 * @param timeString - Time in HH:MM format
 * @returns Total minutes
 */
export const timeToMinutes = (timeString: string): number => {
  if (!timeString) return 0

  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Convert minutes to time string
 * @param totalMinutes - Total minutes
 * @returns Time string in HH:MM format
 */
export const minutesToTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

/**
 * Validate time format
 * @param timeString - Time string to validate
 * @returns True if valid HH:MM format
 */
export const isValidTimeFormat = (timeString: string): boolean => {
  if (!timeString) return false

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  return timeRegex.test(timeString)
}

/**
 * Get time options for dropdowns (every 15 minutes)
 * @returns Array of time options in HH:MM format
 */
export const getTimeOptions = (): string[] => {
  const options: string[] = []

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      options.push(timeString)
    }
  }

  return options
}

/**
 * Calculate if arrival is next day
 * @param depTime - Departure time
 * @param arrTime - Arrival time
 * @returns True if arrival is next day
 */
export const isNextDayArrival = (depTime: string, arrTime: string): boolean => {
  if (!depTime || !arrTime) return false

  const depMinutes = timeToMinutes(depTime)
  const arrMinutes = timeToMinutes(arrTime)

  return arrMinutes < depMinutes
}
