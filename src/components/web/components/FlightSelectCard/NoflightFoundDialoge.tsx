/* eslint-disable react/prop-types */
'use client'
import CommonModal from '@/components/shared/PopupModals/CommonModal'
import { translation } from '@/utils/translation'
import PropTypes from 'prop-types'
import { Box, Text } from 'theme-ui'

interface NoFlightFoundDialogProps {
  onClose: () => void
  onSearchAgain?: () => void
  isOpen: boolean
  searchCriteria?: {
    from?: string
    to?: string
    departureDate?: string
    returnDate?: string
    passengers?: number
    class?: string
  }
}

export const NoFlightFoundDialog: React.FC<NoFlightFoundDialogProps> = ({
  onClose,
  onSearchAgain,
  searchCriteria,
  isOpen,
}) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      heading={translation.NO_FLIGHTS_FOUND}
      width="500px"
      classNames="!p-0"

      submitButtonConfig={{
        text: 'Search Again',
        variant: 'darkSlate',
        onClick: onSearchAgain,
        isLoading: false,
      }}
      showFooter
    >
      <Box sx={{
        textAlign: 'center',
        p: '30px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-6 h-6 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-6 left-8 w-4 h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <Box sx={{ position: 'relative', zIndex: 2, mb: '24px' }}>
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            {/* Floating elements around the icon */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </Box>

        {/* Main message */}
        <Text
          as="h3"
          variant="Maison20Demi20"
          sx={{
            mb: '12px',
            color: '#1e293b',
            fontWeight: '600',
            fontSize: '24px'
          }}
        >
          {translation.SORRY_NO_FLIGHTS_FOUND}
        </Text>

        <Text
          as="p"
          variant="Maison16Medium20"
          sx={{
            mb: '24px',
            lineHeight: '1.6',
            color: '#64748b',
            fontSize: '16px',
            maxWidth: '400px',
            mx: 'auto'
          }}
        >
          {translation.NO_FLIGHTS_DESCRIPTION}
        </Text>

        {/* Search criteria with enhanced design */}
        {searchCriteria && (
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              padding: '20px',
              borderRadius: '16px',
              mb: '20px',
              textAlign: 'left',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Text variant="Maison16Demi20" sx={{ color: '#1e293b', fontWeight: '600' }}>
                {translation.SEARCH_DETAILS}
              </Text>
            </div>

            <div className="space-y-3">
              {searchCriteria.from && searchCriteria.to && (
                <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">{translation.FROM}</span>
                  <span className="text-sm text-gray-600">{searchCriteria.from}</span>
                  <svg className="w-4 h-4 text-blue-500 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="text-sm font-medium text-blue-700">{translation.TO}</span>
                  <span className="text-sm text-gray-600">{searchCriteria.to}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {searchCriteria.departureDate && (
                  <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-700">{translation.DEPARTURE}</span>
                    <span className="text-sm text-gray-600">{searchCriteria.departureDate}</span>
                  </div>
                )}

                {searchCriteria.returnDate && (
                  <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-700">{translation.RETURN}</span>
                    <span className="text-sm text-gray-600">{searchCriteria.returnDate}</span>
                  </div>
                )}

                {searchCriteria.passengers && (
                  <div className="flex items-center justify-between py-2 px-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-700">{translation.PASSENGERS}</span>
                    <span className="text-sm text-gray-600">{searchCriteria.passengers}</span>
                  </div>
                )}

                {searchCriteria.class && (
                  <div className="flex items-center justify-between py-2 px-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-700">{translation.CLASS}</span>
                    <span className="text-sm text-gray-600">{searchCriteria.class}</span>
                  </div>
                )}
              </div>
            </div>
          </Box>
        )}


      </Box>
    </CommonModal>
  )
}

NoFlightFoundDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSearchAgain: PropTypes.func,
  searchCriteria: PropTypes.object,
}
