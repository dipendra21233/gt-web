'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  MapPin,
  Plane,
  Shield,
  Users,
  Utensils,
} from 'lucide-react';
import React from 'react';
import { Box, Text } from 'theme-ui';
import { AirlineTransformedPayload } from 'utilsdata';

interface FareSummaryFlightDetailsProps {
  passengerFareSummary: AirlineTransformedPayload;
}

// Enhanced color scheme and styling
const primaryOrange = '#ff7b00';

const FareSummaryFlightDetails: React.FC<FareSummaryFlightDetailsProps> = ({
  passengerFareSummary,
}) => {
  const { flightDetails, route, passengers, additionalInfo } =
    passengerFareSummary;

  // Format time for display
  const formatTime = (timeString?: string) => {
    if (!timeString) return '--:--';
    return timeString;
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get passenger count text
  const getPassengerText = () => {
    const { adult, child, infant } = passengers;
    let text = '';
    if (adult > 0) text += `${adult} Adult${adult > 1 ? 's' : ''}`;
    if (child > 0)
      text += `${text ? ', ' : ''}${child} Child${child > 1 ? 'ren' : ''}`;
    if (infant > 0)
      text += `${text ? ', ' : ''}${infant} Infant${infant > 1 ? 's' : ''}`;
    return text || 'No passengers';
  };

  return (
    <Box
      className="w-full rounded-2xl overflow-hidden bg-white"
      sx={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        p: 0,
        boxShadow: '0 8px 40px 0 rgba(255, 123, 0, 0.12), 0 2px 8px 0 rgba(255, 123, 0, 0.08)',
        border: '1px solid rgba(255, 123, 0, 0.15)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 48px 0 rgba(255, 123, 0, 0.15), 0 4px 12px 0 rgba(255, 123, 0, 0.10)',
        },
      }}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="flight-details" className="border-none">
          <AccordionTrigger
            className="px-7 py-6 hover:no-underline transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 100%)',
              borderBottom: '2px solid rgba(255, 123, 0, 0.15)',
            }}
          >
            <Box className="flex items-center justify-between w-full pr-2">
              {/* Collapsed View - Basic Flight Info */}
              <Box className="flex items-center gap-7">
                {/* Flight Basic Info */}
                <Box className="flex-1 min-w-[220px]">
                  <Box className="flex items-center gap-3 mb-4">
                    <Text
                      variant="Maison22Demi125"
                      sx={{
                        color: primaryOrange,
                        fontSize: 24,
                        letterSpacing: '-0.5px',
                        fontWeight: 700
                      }}
                    >
                      {flightDetails?.airline?.name || 'Unknown Airline'}
                    </Text>
                    <Box
                      sx={{
                        px: 3,
                        py: 1.5,
                        bg: 'white',
                        color: primaryOrange,
                        borderRadius: '10px',
                        border: '2px solid rgba(255, 123, 0, 0.3)',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0.3px',
                        boxShadow: '0 2px 8px rgba(255, 123, 0, 0.15)',
                      }}
                    >
                      {flightDetails?.flightNumber || '--'}
                    </Box>
                  </Box>

                  <Box className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Box className="flex items-center gap-2.5 bg-white/60 px-3 py-2 rounded-lg">
                      <Box sx={{ color: primaryOrange }}>
                        <MapPin size={18} strokeWidth={2.5} />
                      </Box>
                      <Text
                        variant="Maison14Medium20"
                        sx={{
                          color: '#1f2937',
                          fontWeight: 600,
                          letterSpacing: '0.2px',
                          fontSize: 15
                        }}
                      >
                        <span>{route?.departure?.airportCode}</span>
                        <ArrowRight size={16} className="mx-2 inline text-orange-500" strokeWidth={2.5} />
                        <span>{route?.arrival?.airportCode}</span>
                      </Text>
                    </Box>
                    <Box className="flex items-center gap-2.5 bg-white/60 px-3 py-2 rounded-lg">
                      <Box sx={{ color: primaryOrange }}>
                        <Clock size={18} strokeWidth={2.5} />
                      </Box>
                      <Text
                        variant="Maison14Medium20"
                        sx={{
                          color: '#1f2937',
                          fontWeight: 600,
                          fontSize: 15
                        }}
                      >
                        <span>{formatTime(route?.departure?.time)}</span>
                        <span className="mx-2 text-gray-400">-</span>
                        <span>{formatTime(route?.arrival?.time)}</span>
                      </Text>
                    </Box>
                    <Box className="flex items-center gap-2.5 bg-white/60 px-3 py-2 rounded-lg">
                      <Box sx={{ color: primaryOrange }}>
                        <Users size={18} strokeWidth={2.5} />
                      </Box>
                      <Text
                        variant="Maison14Medium20"
                        sx={{
                          color: '#1f2937',
                          fontWeight: 600,
                          fontSize: 15
                        }}
                      >
                        {getPassengerText()}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Duration and Date */}
              <Box className="text-right min-w-[130px] flex flex-col items-end gap-3">
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    background: 'white',
                    borderRadius: '10px',
                    border: '2px solid rgba(255, 123, 0, 0.2)',
                    boxShadow: '0 2px 8px rgba(255, 123, 0, 0.1)',
                  }}
                >
                  <Text
                    variant="Maison20Demi125"
                    sx={{
                      color: primaryOrange,
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: '-0.3px'
                    }}
                  >
                    {flightDetails?.duration || '--'}
                  </Text>
                </Box>
                <Box className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg">
                  <Calendar size={15} className="text-orange-500" strokeWidth={2.5} />
                  <Text
                    variant="Maison14Regular20"
                    sx={{
                      color: '#6b7280',
                      fontSize: 13,
                      fontWeight: 500
                    }}
                  >
                    {formatDate(route?.departure?.date)}
                  </Text>
                </Box>
              </Box>
            </Box>
          </AccordionTrigger>

          <AccordionContent className="px-6 py-6">
            {/* Expanded View - Detailed Flight Information */}
            <Box
              className="space-y-6 rounded-2xl p-6"
              sx={{
                background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 100%)',
                border: '1px solid rgba(255, 123, 0, 0.15)',
                boxShadow: '0 4px 24px 0 rgba(255, 123, 0, 0.08), 0 1px 4px 0 rgba(255, 123, 0, 0.04)',
              }}
            >
              <Box className="flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Departure */}
                <Box className="flex-1 min-w-[180px]">
                  <Box className="text-center flex flex-col items-center">
                    <Text
                      variant="Maison24MDemi125"
                      sx={{
                        color: primaryOrange,
                        fontSize: 24,
                        fontWeight: 600,
                        letterSpacing: '-0.5px'
                      }}
                    >
                      {route?.departure?.airportCode}
                    </Text>
                    <Text
                      variant="Maison16Medium20"
                      sx={{
                        color: 'primary_text_dark',
                        fontSize: 16,
                        fontWeight: 500,
                        mt: 2
                      }}
                    >
                      {route?.departure?.city}
                    </Text>
                    <Text
                      variant="Maison14Regular20"
                      sx={{
                        color: 'grey_medium',
                        fontSize: 14,
                        mt: 1
                      }}
                    >
                      {route?.departure?.airportName}
                    </Text>
                  </Box>
                  <Box className="text-center mt-6 flex flex-col items-center">
                    <Text
                      variant="Maison20SemiBold125"
                      sx={{
                        color: 'primary_text_dark',
                        fontSize: 20,
                        fontWeight: 700
                      }}
                    >
                      {formatTime(route?.departure?.time)}
                    </Text>
                    <Text
                      variant="Maison14Regular20"
                      sx={{
                        color: 'grey_medium',
                        fontSize: 14,
                        mt: 1
                      }}
                    >
                      {formatDate(route?.departure?.date)}
                    </Text>
                    {route?.departure?.terminal && (
                      <Box
                        sx={{
                          mt: 2,
                          px: 2,
                          py: 0.5,
                          bg: 'rgba(255, 123, 0, 0.1)',
                          color: primaryOrange,
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        Terminal {route.departure.terminal}
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Flight Path Visual */}
                <Box className="flex-1 px-4 flex flex-col items-center">
                  <Box className="relative w-full flex flex-col items-center">
                    {/* Flight Path Visual - Improved */}
                    <Box className="flex flex-col items-center w-full">
                      {/* Enhanced Plane Icon */}
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '3px solid white',
                          boxShadow: '0 8px 32px 0 rgba(255, 123, 0, 0.2), 0 2px 8px 0 rgba(255, 123, 0, 0.1)',
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: -2,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.1), rgba(255, 123, 0, 0.05))',
                            zIndex: -1,
                          }
                        }}
                      >
                        <Plane size={24} style={{ color: primaryOrange, transform: 'rotate(45deg)' }} />
                      </Box>
                      {/* Enhanced Flight Path */}
                      <Box className="relative w-full flex flex-col items-center mt-4 mb-4">
                        <Box
                          sx={{
                            width: '100%',
                            height: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                          }}
                        >
                          <Box
                            sx={{
                              height: 2,
                              width: '40%',
                              background: 'linear-gradient(90deg, rgba(255, 123, 0, 0.3), rgba(255, 123, 0, 0.6))',
                              borderRadius: '2px 0 0 2px'
                            }}
                          />
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              bg: primaryOrange,
                              borderRadius: '50%',
                              mx: 1,
                              boxShadow: '0 2px 8px rgba(255, 123, 0, 0.4)',
                              animation: 'pulse 2s infinite'
                            }}
                          />
                          <Box
                            sx={{
                              height: 2,
                              width: '40%',
                              background: 'linear-gradient(90deg, rgba(255, 123, 0, 0.6), rgba(255, 123, 0, 0.3))',
                              borderRadius: '0 2px 2px 0'
                            }}
                          />
                        </Box>
                      </Box>
                      {/* Duration and Stops */}
                      <Box className="flex flex-col items-center mt-2">
                        <Text
                          variant="Maison16Medium20"
                          sx={{
                            color: primaryOrange,
                            fontSize: 16,
                            fontWeight: 600,
                            letterSpacing: '0.5px'
                          }}
                        >
                          {flightDetails?.duration || '--'}
                        </Text>
                        {flightDetails?.stops !== undefined && (
                          <Box
                            sx={{
                              mt: 1,
                              px: 3,
                              py: 0.5,
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 600,
                              letterSpacing: '0.3px',
                              ...(flightDetails.stops === 0
                                ? {
                                  bg: 'rgba(34, 197, 94, 0.1)',
                                  color: '#16a34a',
                                  border: '1px solid rgba(34, 197, 94, 0.2)'
                                }
                                : {
                                  bg: 'rgba(255, 123, 0, 0.1)',
                                  color: primaryOrange,
                                  border: '1px solid rgba(255, 123, 0, 0.2)'
                                })
                            }}
                          >
                            {flightDetails.stops === 0
                              ? 'Non-stop'
                              : `${flightDetails.stops} stop${flightDetails.stops > 1 ? 's' : ''}`}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Arrival */}
                <Box className="flex-1 min-w-[180px]">
                  <Box className="text-center flex flex-col items-center">
                    <Text
                      variant="Maison24MDemi125"
                      sx={{
                        color: primaryOrange,
                        fontSize: 24,
                        fontWeight: 600,
                        letterSpacing: '-0.5px'
                      }}
                    >
                      {route?.arrival?.airportCode}
                    </Text>
                    <Text
                      variant="Maison16Medium20"
                      sx={{
                        color: 'primary_text_dark',
                        fontSize: 16,
                        fontWeight: 500,
                        mt: 2
                      }}
                    >
                      {route?.arrival?.city}
                    </Text>
                    <Text
                      variant="Maison14Regular20"
                      sx={{
                        color: 'grey_medium',
                        fontSize: 14,
                        mt: 1
                      }}
                    >
                      {route?.arrival?.airportName}
                    </Text>
                  </Box>
                  <Box className="text-center mt-6 flex flex-col items-center">
                    <Text
                      variant="Maison20SemiBold125"
                      sx={{
                        color: 'primary_text_dark',
                        fontSize: 20,
                        fontWeight: 700
                      }}
                    >
                      {formatTime(route?.arrival?.time)}
                    </Text>
                    <Text
                      variant="Maison14Regular20"
                      sx={{
                        color: 'grey_medium',
                        fontSize: 14,
                        mt: 1
                      }}
                    >
                      {formatDate(route?.arrival?.date)}
                    </Text>
                    {route?.arrival?.terminal && (
                      <Box
                        sx={{
                          mt: 2,
                          px: 2,
                          py: 0.5,
                          bg: 'rgba(255, 123, 0, 0.1)',
                          color: primaryOrange,
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        Terminal {route.arrival.terminal}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Flight Details */}
              <Box className="pt-6 border-t border-orange-200/30">

                <Box className="gap-8 flex justify-evenly">
                  {/* Left Column */}
                  <Box className="space-y-6">
                    {/* Aircraft */}
                    <Box className="flex items-center gap-4">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          bg: 'rgba(255, 123, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 123, 0, 0.2)',
                          flexShrink: 0
                        }}
                      >
                        <Plane size={20} style={{ color: primaryOrange }} />
                      </Box>
                      <Box className="flex flex-col">
                        <Text
                          variant="Maison14Regular20"
                          sx={{
                            color: 'grey_medium',
                            fontWeight: 500,
                            fontSize: 13,
                            lineHeight: 1.2
                          }}
                        >
                          Aircraft
                        </Text>
                        <Text
                          variant="Maison16Medium20"
                          sx={{
                            color: primaryOrange,
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1.2
                          }}
                        >
                          {flightDetails?.aircraft || '--'}
                        </Text>
                      </Box>
                    </Box>
                    {/* Flight Type */}
                    <Box className="flex items-center gap-4">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          bg: 'rgba(255, 123, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 123, 0, 0.2)',
                          flexShrink: 0
                        }}
                      >
                        <Clock size={20} style={{ color: primaryOrange }} />
                      </Box>
                      <Box className="flex flex-col">
                        <Text
                          variant="Maison14Regular20"
                          sx={{
                            color: 'grey_medium',
                            fontWeight: 500,
                            fontSize: 13,
                            lineHeight: 1.2
                          }}
                        >
                          Flight Type
                        </Text>
                        <Text
                          variant="Maison16Medium20"
                          sx={{
                            color: 'primary_text_dark',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1.2
                          }}
                        >
                          {flightDetails?.isNonStop ? 'Non-stop' : 'Connecting'}
                        </Text>
                      </Box>
                    </Box>
                    {/* Airline Type */}
                    <Box className="flex items-center gap-4">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          bg: 'rgba(255, 123, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 123, 0, 0.2)',
                          flexShrink: 0
                        }}
                      >
                        <Users size={20} style={{ color: primaryOrange }} />
                      </Box>
                      <Box className="flex flex-col">
                        <Text
                          variant="Maison14Regular20"
                          sx={{
                            color: 'grey_medium',
                            fontWeight: 500,
                            fontSize: 13,
                            lineHeight: 1.2
                          }}
                        >
                          Airline Type
                        </Text>
                        <Text
                          variant="Maison16Medium20"
                          sx={{
                            color: 'primary_text_dark',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1.2
                          }}
                        >
                          {flightDetails?.airline?.isLowCost
                            ? 'Low Cost'
                            : 'Full Service'}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  {/* Right Column */}
                  <Box className="space-y-6">
                    {/* Cabin Class */}
                    <Box className="flex items-center gap-4">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          bg: 'rgba(255, 123, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 123, 0, 0.2)',
                          flexShrink: 0
                        }}
                      >
                        <Utensils size={20} style={{ color: primaryOrange }} />
                      </Box>
                      <Box className="flex flex-col">
                        <Text
                          variant="Maison14Regular20"
                          sx={{
                            color: 'grey_medium',
                            fontWeight: 500,
                            fontSize: 13,
                            lineHeight: 1.2
                          }}
                        >
                          Cabin Class
                        </Text>
                        <Text
                          variant="Maison16Medium20"
                          sx={{
                            color: 'primary_text_dark',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1.2
                          }}
                        >
                          {passengerFareSummary.bookingInfo?.cabinClass || '--'}
                        </Text>
                      </Box>
                    </Box>
                    {/* Fare Type */}
                    <Box className="flex items-center gap-4">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          bg: 'rgba(255, 123, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 123, 0, 0.2)',
                          flexShrink: 0
                        }}
                      >
                        <ChevronDown size={20} style={{ color: primaryOrange }} />
                      </Box>
                      <Box className="flex flex-col">
                        <Text
                          variant="Maison14Regular20"
                          sx={{
                            color: 'grey_medium',
                            fontWeight: 500,
                            fontSize: 13,
                            lineHeight: 1.2
                          }}
                        >
                          Fare Type
                        </Text>
                        <Text
                          variant="Maison16Medium20"
                          sx={{
                            color: 'primary_text_dark',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1.2
                          }}
                        >
                          {additionalInfo?.fareType || '--'}
                        </Text>
                      </Box>
                    </Box>
                    {/* Refundable */}
                    <Box className="flex items-center gap-4">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          bg: additionalInfo?.refundable
                            ? 'rgba(34, 197, 94, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${additionalInfo?.refundable
                            ? 'rgba(34, 197, 94, 0.2)'
                            : 'rgba(239, 68, 68, 0.2)'}`,
                          flexShrink: 0
                        }}
                      >
                        {additionalInfo?.refundable ? (
                          <CheckCircle size={20} style={{ color: '#16a34a' }} />
                        ) : (
                          <Shield size={20} style={{ color: '#dc2626' }} />
                        )}
                      </Box>
                      <Box className="flex flex-col">
                        <Text
                          variant="Maison14Regular20"
                          sx={{
                            color: 'grey_medium',
                            fontWeight: 500,
                            fontSize: 13,
                            lineHeight: 1.2
                          }}
                        >
                          Refundable
                        </Text>
                        <Text
                          variant="Maison16Medium20"
                          sx={{
                            color: additionalInfo?.refundable ? '#16a34a' : '#dc2626',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1.2
                          }}
                        >
                          {additionalInfo?.refundable ? 'Yes' : 'No'}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Services & Amenities */}
              <Box className="pt-6 border-t border-orange-200/30">
                <Box className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <Box className="flex items-center gap-4">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        bg: 'rgba(255, 123, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 123, 0, 0.2)'
                      }}
                    >
                      <Utensils size={18} style={{ color: primaryOrange }} />
                    </Box>
                    <Text
                      variant="Maison14Medium20"
                      sx={{
                        color: 'primary_text_dark',
                        fontWeight: 500,
                        fontSize: 14
                      }}
                    >
                      {additionalInfo?.mealIncluded
                        ? 'Meals Included'
                        : 'No Meals'}
                    </Text>
                  </Box>

                  <Box className="flex items-center gap-3">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        bg: 'rgba(255, 123, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 123, 0, 0.2)'
                      }}
                    >
                      <Users size={18} style={{ color: primaryOrange }} />
                    </Box>
                    <Text
                      variant="Maison14Medium20"
                      sx={{
                        color: 'primary_text_dark',
                        fontWeight: 500,
                        fontSize: 14
                      }}
                    >
                      {passengers.total} Passenger
                      {passengers.total > 1 ? 's' : ''}
                    </Text>
                  </Box>

                  <Box className="flex items-center gap-3">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        bg: 'rgba(255, 123, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 123, 0, 0.2)'
                      }}
                    >
                      <Clock size={18} style={{ color: primaryOrange }} />
                    </Box>
                    <Text
                      variant="Maison14Medium20"
                      sx={{
                        color: 'primary_text_dark',
                        fontWeight: 500,
                        fontSize: 14
                      }}
                    >
                      {flightDetails?.durationMinutes
                        ? `${Math.floor(
                          flightDetails.durationMinutes / 60
                        )}h ${flightDetails.durationMinutes % 60}m`
                        : '--'}
                    </Text>
                  </Box>

                  <Box className="flex items-center gap-3">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        bg: 'rgba(255, 123, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 123, 0, 0.2)'
                      }}
                    >
                      <Plane size={18} style={{ color: primaryOrange }} />
                    </Box>
                    <Text
                      variant="Maison14Medium20"
                      sx={{
                        color: 'primary_text_dark',
                        fontWeight: 500,
                        fontSize: 14
                      }}
                    >
                      {flightDetails?.stops === 0
                        ? 'Direct'
                        : `${flightDetails?.stops || 0} Stop${(flightDetails?.stops || 0) > 1 ? 's' : ''
                        }`}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FareSummaryFlightDetails;
