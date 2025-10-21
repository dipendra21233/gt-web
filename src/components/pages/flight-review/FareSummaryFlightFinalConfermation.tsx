/* eslint-disable react/prop-types */
'use client'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { PassengerFormValues } from '@/types/module/commonModule'
import { Clock, Plane, Users } from 'lucide-react'
import Modal from 'react-responsive-modal'
import { Box, Flex, Text } from 'theme-ui'
import { AirlineTransformedPayload } from 'utilsdata'

interface FareSummaryFlightConfermationModelProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  passengerFareSummary: AirlineTransformedPayload | null
  passengerData: PassengerFormValues
  isLoading: boolean
}

export const FareSummaryFlightConfermationModel: React.FC<FareSummaryFlightConfermationModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
  passengerFareSummary,
  passengerData,
  isLoading
}) => {

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '--'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseIcon={true}
      closeOnOverlayClick={false}
      classNames={{
        modal: 'booking-confirmation-modal',
      }}
      center
    >
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 rounded-t-xl shadow-lg px-8 py-6 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-3 shadow-md">
              <Plane className="w-[20px] h-[20px] text-orange-500" />
            </div>
            <div className="flex flex-col gap-1">
              <Text
                variant="Primary24Bold"
                className="text-white font-extrabold tracking-wide drop-shadow-lg"
              >
                Review & Confirm Your Flight Booking
              </Text>
              <Text
                variant="Primary12Medium125"
                className="text-orange-100"
              >
                Please check your flight and passenger details before final confirmation.
              </Text>
            </div>
          </div>
          <div className="hidden md:block">
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="opacity-60">
              <ellipse cx="40" cy="20" rx="38" ry="18" fill="white" fillOpacity="0.12" />
            </svg>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Flight Details Section */}
          {passengerFareSummary && (
            <Box className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-white p-6 rounded-2xl  border border-orange-100 overflow-hidden">
              {/* Decorative background accent */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-100 rounded-full opacity-30 blur-2xl pointer-events-none" />
              <Text variant="Primary18Medium125" className="font-bold text-orange-700 mb-6 flex items-center gap-3 drop-shadow-sm">

                <span className="tracking-wide">Flight Details</span>
              </Text>

              <div className="bg-white/90 p-6 rounded-xl border border-orange-100  flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-200">
                {/* Airline & Flight */}
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-tr from-orange-200 to-yellow-100 rounded-full flex items-center justify-center shadow-inner border-2 border-orange-300">
                    <Plane className="w-[20px] h-[20px] text-orange-500" />
                  </div>
                  <div>
                    <Text variant="Primary16Medium125" className="font-bold text-gray-900">
                      {passengerFareSummary.flightDetails.airline.name || '--'}
                    </Text>
                    <Text variant="Primary14Medium125" className="text-orange-500 font-medium ms-1">
                      {passengerFareSummary.flightDetails.flightNumber || '--'}
                    </Text>
                  </div>
                </div>
                {/* Flight Info */}
                <div className="flex flex-col items-end gap-1 min-w-[120px]">
                  <Text variant="Primary14Medium125" className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span className="ml-1">{formatDuration(passengerFareSummary.flightDetails.durationMinutes)}</span>
                  </Text>
                  <Text variant="Primary12Medium125" className="text-gray-500 italic">
                    {passengerFareSummary.flightDetails.isNonStop ? (
                      <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold">Non-stop</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-semibold">
                        {passengerFareSummary.flightDetails.stops} stop
                      </span>
                    )}
                  </Text>
                </div>
              </div>
            </Box>
          )}

          {/* Passenger Details Section */}
          <Box className="bg-gradient-to-br from-orange-50 via-yellow-50 to-white p-6 rounded-2xl  border border-orange-100 relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-2xl pointer-events-none" />
            <Text variant="Primary18Medium125" className="font-extrabold text-orange-700 mb-6 flex items-center gap-3 drop-shadow-sm tracking-wide">
              <span className="bg-gradient-to-tr from-orange-400 to-yellow-400 p-2 rounded-full shadow-inner border-2 border-orange-300 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </span>
              Passenger Details
            </Text>

            <div className="space-y-2 mt-2">
              {/* Adults */}
              {passengerData.adults.map((adult, index) => (
                <div
                  key={`adult-${index}`}
                  className="flex items-center gap-3 bg-white/90 p-2 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="bg-orange-100 text-orange-600 font-bold px-3 py-1 rounded-full text-xs ">
                    Adult
                  </span>
                  <Text variant="Primary16Medium125" className="font-semibold text-gray-900">
                    {adult.title} {adult.firstName} {adult.lastName}
                  </Text>
                </div>
              ))}

              {/* Children */}
              {passengerData.children.map((child, index) => (
                <div
                  key={`child-${index}`}
                  className="flex items-center gap-3 bg-white/90 p-2 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs ">
                    Child
                  </span>
                  <Text variant="Primary16Medium125" className="font-semibold text-gray-900">
                    {child.firstName} {child.lastName}
                  </Text>
                </div>
              ))}

              {/* Infants */}
              {passengerData.infants.map((infant, index) => (
                <div
                  key={`infant-${index}`}
                  className="flex items-center gap-3 bg-white/90 p-4 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="bg-pink-100 text-pink-600 font-bold px-3 py-1 rounded-full text-xs shadow">
                    Infant
                  </span>
                  <Text variant="Primary16Medium125" className="font-semibold text-gray-900">
                    {infant.firstName} {infant.lastName}
                  </Text>
                </div>
              ))}
            </div>
          </Box>

          {/* Total Price */}
          <div className="w-full bg-gradient-to-br from-white via-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100 shadow flex flex-col items-center gap-2">
            <Text variant="Primary16Medium125" className="font-semibold text-gray-700 mb-1 tracking-wide">
              Total Price
            </Text>
            <Text
              variant="Primary28Bold"
              className="font-black text-4xl text-green-600 tracking-tight"
              style={{
                letterSpacing: '0.01em',
                textShadow: '0 4px 16px rgba(34,197,94,0.10)'
              }}
            >
              ₹{passengerFareSummary?.saleSummary.totalAmount?.toLocaleString() || '0'}
            </Text>
          </div>
        </div>

        {/* Action Buttons */}
        <Box className="p-6 border-t border-gray-200">
          <Flex sx={{ justifyContent: 'space-between', gap: '16px' }}>
            <ThemeButton
              variant="secondary2"
              textVariant="Maison16Medium20"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </ThemeButton>
            <ThemeButton
              variant="primary"
              textVariant="Maison16Medium20"
              onClick={onConfirm}
              className="flex-1 bg-[#ff7b00] text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Booking'}
            </ThemeButton>
          </Flex>
        </Box>
      </div>
    </Modal>
  )
}
