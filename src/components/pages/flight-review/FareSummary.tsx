'use client'
import { RootState } from '@/store/store';
import { Calculator, FileText, Fuel, Receipt, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Box, Text } from 'theme-ui';

const primaryOrange = '#ff7b00';

const FareSummaryUI = () => {
  const { passengerFareSummary } = useSelector((state: RootState) => state.passengerFareSummaryData);

  // Show beautiful UI when passengerFareSummary is null
  if (!passengerFareSummary) {
    return (
      <Box
        as="div"
        className="w-full lg:w-1/3 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[#fff7ed] to-[#ffe0b2] rounded-2xl shadow-2xl border-4 border-dashed border-orange-300 min-h-[420px] relative overflow-hidden"
        style={{
          boxShadow: "0 8px 32px 0 rgba(255, 123, 0, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.04)",
        }}
      >
        {/* Decorative floating icons */}
        <Box as="div" className="absolute top-4 left-4 opacity-20">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#ff7b00" strokeWidth="2" />
          </svg>
        </Box>
        <Box as="div" className="absolute bottom-4 right-4 opacity-20">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="4" stroke="#ff7b00" strokeWidth="2" />
          </svg>
        </Box>
        <Box as="div" className="text-center z-10">
          {/* Animated Icon */}
          <Box as="div" className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-orange-400 animate-bounce drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </Box>
          {/* Title */}
          <Text
            variant="Maison24Medium125"
            className="text-orange-600 mb-2 font-bold tracking-wide drop-shadow"
            as="h2"
          >
            Fare Summary Unavailable
          </Text>
          {/* Description */}
          <Text
            variant="Maison16Regular20"
            className="text-gray-700 mb-6 max-w-sm mx-auto"
            style={{ lineHeight: 1.6 }}
          >
            Please complete your <span className="text-orange-500 font-semibold">flight selection</span> to view a beautiful, detailed fare breakdown.
          </Text>
          {/* Call to Action Button */}
          <button
            className="mt-2 px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full shadow hover:from-orange-500 hover:to-orange-600 transition font-semibold text-base"
            style={{ letterSpacing: "0.02em" }}
            disabled
          >
            Select a Flight
          </button>
          {/* Decorative animated dots */}
          <Box as="div" className="flex space-x-2 justify-center mt-8">
            <Box as="div" className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></Box>
            <Box as="div" className="w-3 h-3 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></Box>
            <Box as="div" className="w-3 h-3 bg-orange-200 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></Box>
          </Box>
        </Box>
      </Box>
    );
  }

  const FareItem = ({ label, value, icon: Icon }: { label: string; value: number | string; icon?: any }) => (
    <Box className="flex justify-between items-center py-2.5 px-3 hover:bg-orange-50/50 rounded-lg transition-all duration-200">
      <Box className="flex items-center gap-2">
        {Icon && (
          <Box
            sx={{
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={16} style={{ color: '#9ca3af' }} />
          </Box>
        )}
        <Text
          variant="Maison14Regular20"
          sx={{
            color: '#6b7280',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}
        >
          {label}
        </Text>
      </Box>
      <Text
        variant="Maison14Medium20"
        sx={{
          color: '#1f2937',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.01em'
        }}
      >
        ₹{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </Text>
    </Box>
  );

  const PassengerSection = ({ title, data, icon }: { title: string; data: any; icon: any }) => {
    if (!data?.baseFare) return null;

    return (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fffbf7 100%)',
          borderRadius: '12px',
          padding: 3,
          border: '1px solid rgba(255, 123, 0, 0.1)',
          boxShadow: '0 2px 8px 0 rgba(255, 123, 0, 0.06)',
        }}
      >
        <Box className="flex items-center gap-2 mb-3 pb-2 border-b border-orange-100">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              bg: 'rgba(255, 123, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 123, 0, 0.2)'
            }}
          >
            {icon}
          </Box>
          <Text
            variant="Maison16Medium20"
            sx={{
              color: primaryOrange,
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '0.01em'
            }}
          >
            {title}
          </Text>
        </Box>
        <Box className="space-y-1">
          <FareItem label="Base Fare" value={data.baseFare} icon={Receipt} />
          <FareItem label="OT Tax" value={data.otTax} icon={FileText} />
          <FareItem label="K3/Airline GST" value={data.k3AirlineGST} icon={Calculator} />
          <FareItem label="Fuel Charges" value={data.fuelCharges} icon={Fuel} />
        </Box>
      </Box>
    );
  };

  return (
    <Box
      as='div'
      className="w-full lg:w-1/3 flex flex-col bg-white rounded-2xl overflow-hidden"
      sx={{
        boxShadow: '0 8px 40px 0 rgba(255, 123, 0, 0.12), 0 2px 8px 0 rgba(255, 123, 0, 0.08)',
        border: '1px solid rgba(255, 123, 0, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 48px 0 rgba(255, 123, 0, 0.15), 0 4px 12px 0 rgba(255, 123, 0, 0.10)',
        },
      }}
    >
      {/* Header */}
      <Box
        as="div"
        sx={{
          background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
          padding: '10px 20px',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(40%, -40%)',
          },
        }}
      >
        <Box className="flex items-start justify-start gap-3 relative z-10">
          <Text variant="Maison28Demi20" color="white">
            Sale Summary
          </Text>
        </Box>
      </Box>

      {/* Content */}
      <Box as="div" className="p-5 space-y-5">
        {/* Fare/Pax Type Section */}
        <Box as="div">
          <Box
            as="div"
            sx={{
              background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 100%)',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: 3,
              border: '1px solid rgba(255, 123, 0, 0.15)',
            }}
          >
            <Text
              variant="Maison16Medium20"
              className="text-center font-semibold"
              sx={{
                color: primaryOrange,
                fontSize: 16,
                letterSpacing: '0.02em',
              }}
            >
              Passenger Fare Breakdown
            </Text>
          </Box>

          <Box className="space-y-3">
            <PassengerSection
              title="Adult"
              data={passengerFareSummary?.saleSummary.adult}
              icon={<Users size={18} style={{ color: primaryOrange }} />}
            />
            {passengerFareSummary?.saleSummary.child?.baseFare && (
              <PassengerSection
                title="Child"
                data={passengerFareSummary?.saleSummary.child}
                icon={<Users size={16} style={{ color: primaryOrange }} />}
              />
            )}
            {passengerFareSummary?.saleSummary.infant?.baseFare && (
              <PassengerSection
                title="Infant"
                data={passengerFareSummary?.saleSummary.infant}
                icon={<Users size={14} style={{ color: primaryOrange }} />}
              />
            )}
          </Box>
        </Box>

        {/* Total Fare Section */}
        <Box as="div">
          <Box
            as="div"
            sx={{
              background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 100%)',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: 3,
              border: '1px solid rgba(255, 123, 0, 0.15)',
            }}
          >
            <Text
              variant="Maison16Medium20"
              className="text-center font-semibold"
              sx={{
                color: primaryOrange,
                fontSize: 16,
                letterSpacing: '0.02em',
              }}
            >
              Total Charges
            </Text>
          </Box>

          <Box
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fffbf7 100%)',
              borderRadius: '12px',
              padding: 3,
              border: '1px solid rgba(255, 123, 0, 0.1)',
              boxShadow: '0 2px 8px 0 rgba(255, 123, 0, 0.06)',
            }}
          >
            <Box className="space-y-1">
              {passengerFareSummary?.saleSummary.totalFare && (
                passengerFareSummary?.saleSummary.totalFare.map((item, index) => (
                  <FareItem
                    key={`total-fare-${index}-${item.label}`}
                    label={item.label}
                    value={item.value}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Total Amount */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #ff7b00 0%, #ff9500 100%)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginTop: 2,
          }}
        >
          <Box className="flex justify-between items-center">
            <Text
              variant="Maison18Medium125"
              sx={{
                color: 'white',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.01em',
              }}
            >
              Total Amount
            </Text>
            <Text
              variant="Maison20Medium125"
              sx={{
                color: 'white',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.01em',
              }}
            >
              ₹{passengerFareSummary?.saleSummary.totalAmount?.toLocaleString('en-IN')}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );

};

export default FareSummaryUI;
