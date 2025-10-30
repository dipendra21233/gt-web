"use client"
import FareSummaryUI from "@/components/pages/flight-review/FareSummary";
import FareSummaryAccordianSkeletonLoader from "@/components/pages/flight-review/FareSummaryAccordianSkeletonLoader";
import FareSummaryFlightDetails from "@/components/pages/flight-review/FareSummaryFlightDetails";
import { FareSummaryFlightConfermationModel } from "@/components/pages/flight-review/FareSummaryFlightFinalConfermation";
import FareSummarySidebarSkeletonLoader from "@/components/pages/flight-review/FareSummarySidebarSkeletonLoader";
import { Passangerform } from "@/components/pages/passenger-form/Passangerform";
import { TextInputField } from "@/components/shared/TextInputField/TextInputField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeButton } from "@/components/web/core/Button/Button";
import { useFlightBookingApiMutation, useGetReviewFlightDetailsMutation } from "@/hooks/useMutations";
import { usePassengerForm } from "@/hooks/usePassengerForm";
import { flightBookingRequest } from "@/store/actions/flightBooking.action";
import { getPassengerFareSummary } from "@/store/actions/passangerFareSummary.action";
import { RootState } from "@/store/store";
import { FlightBookingPayload } from "@/types/module/flightBooking";
import { BookingDetails, FlightDetails } from "@/types/module/flightDetails";
import { validMobileNumberRegex, gstRegex } from "@/utils/regexMatch";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  FaCoins,
  FaCreditCard,
  FaMobile,
  FaUniversity
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text } from "theme-ui";


function CustomRadio({ isSelected, onSelect }: { isSelected: boolean, onSelect: () => void }) {
  return (
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${isSelected
        ? 'bg-[#ff7b00] border-[#ff7b00] shadow-md'
        : 'bg-white border-gray-300 hover:border-[#ff7b00] hover:shadow-sm'
        }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
      )}
    </div>
  );
}


function AddPassangerForm() {
  const searchParams = useSearchParams();
  const priceIds = searchParams.get('priceIds');
  const [flightDetails,] = useState<FlightDetails | null>(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const dispatch = useDispatch();
  const { loading, passengerFareSummary } = useSelector((state: RootState) => state.passengerFareSummaryData);

  // Get passenger counts from passengerFareSummary or fallback to 0
  const adult = passengerFareSummary?.passengers?.adult || 0;
  const child = passengerFareSummary?.passengers?.child || 0;
  const infants = passengerFareSummary?.passengers?.infant || 0;

  // Get total fare from passengerFareSummary
  const totalFare = passengerFareSummary?.saleSummary?.totalAmount || 0;

  // Use the custom hook
  const { control, errors, onSubmit, watch } = usePassengerForm({
    adultCount: adult,
    childCount: child,
    infantCount: infants,
  });

  // Watch form values for displaying in confirmation
  const formValues = watch();

  // Initialize the flight booking mutation
  const flightBookingMutation = useFlightBookingApiMutation();
  const getReviewFlightDetailsMutation = useGetReviewFlightDetailsMutation();

  // Function to map form data to FlightBookingPayload
  const createFlightBookingPayload = (
    formData: any,
    opts?: { bookingId?: string; flightDetails?: FlightDetails | null }
  ): FlightBookingPayload => {
    // Prefer details from provided review API response, fallback to passengerFareSummary or local state
    const flightInfo = opts?.flightDetails || passengerFareSummary?.flightDetails || flightDetails;

    // Type guard to check if it's a proper FlightDetails object
    const isFlightDetails = (obj: any): obj is FlightDetails => {
      return obj && typeof obj === 'object' && 'tripInfos' in obj && 'bookingId' in obj;
    };

    // Extract flight information from the complex FlightDetails structure
    const firstTrip = isFlightDetails(flightInfo) ? flightInfo?.tripInfos?.[0] : null;
    const firstSegment = firstTrip?.sI?.[0];
    const airlineInfo = firstSegment?.fD?.aI;
    const departureAirport = firstSegment?.da;
    const arrivalAirport = firstSegment?.aa;

    const bookingIdFromDetails = isFlightDetails(flightInfo) ? (flightInfo?.bookingId || '') : '';

    return {
      bookingId: opts?.bookingId || bookingIdFromDetails,
      travellerInfo: [
        ...formData.adults.map((adult: any) => ({
          ti: adult.title,
          fN: adult.firstName,
          lN: adult.lastName,
          pt: 'ADULT' as const,
          dob: adult.dateOfBirth,
          pNum: adult.frequentFlierNumber || '',
          eD: '2030-12-31' // Default expiry date, can be made configurable
        })),
        ...formData.children.map((child: any) => ({
          ti: child.title,
          fN: child.firstName,
          lN: child.lastName,
          pt: 'CHILD' as const,
          dob: child.dateOfBirth,
          pNum: child.frequentFlierNumber || '',
          eD: '2030-12-31'
        })),
        ...formData.infants.map((infant: any) => ({
          ti: infant.title,
          fN: infant.firstName,
          lN: infant.lastName,
          pt: 'INFANT' as const,
          dob: infant.dateOfBirth,
          pNum: infant.frequentFlierNumber || '',
          eD: '2030-12-31'
        }))
      ],
      gstInfo: formData.gst?.number ? {
        gstNumber: formData.gst.number,
        registeredName: formData.gst.company || '',
        email: formData.gst.email || '',
        mobile: formData.gst.phone || '',
        address: formData.gst.address || ''
      } : undefined,
      deliveryInfo: {
        emails: [formData.contactDetails.email],
        contacts: [formData.contactDetails.mobile]
      },
      payment: {
        transactionAmount: totalFare
      },
      paymode: '9',
      flight: {
        origin: departureAirport?.code || '',
        destination: arrivalAirport?.code || '',
        departureDate: firstSegment?.dt || '',
        arrivalDate: firstSegment?.at || '',
        airlineCode: airlineInfo?.code || '',
        flightNumber: firstSegment?.fD?.fN || '',
        tripType: 'ONE_WAY' as const // Can be made dynamic based on search type
      }
    };
  };

  // Handle booking confirmation
  const handleBookingConfirmation = () => {
    setIsBookingLoading(true);

    const bookingDetails: BookingDetails = {
      bookingId: flightDetails?.bookingId || '',
      travellerInfo: [
        ...formValues.adults.map((adult) => ({
          ti: adult.title,
          fN: adult.firstName,
          lN: adult.lastName,
          pt: 'ADT'
        })),
        ...formValues.children.map((child) => ({
          ti: child.title,
          fN: child.firstName,
          lN: child.lastName,
          pt: 'CHD'
        })),
        ...formValues.infants.map((infant) => ({
          ti: infant.title,
          fN: infant.firstName,
          lN: infant.lastName,
          pt: 'INF'
        }))
      ],
      gstInfo: {
        gstNumber: formValues.gst.number,
        email: formValues.gst.email,
        registeredName: formValues.gst.company,
        mobile: formValues.gst.phone,
        address: formValues.gst.address
      },
      deliveryInfo: {
        emails: [formValues.contactDetails.email],
        contacts: [formValues.contactDetails.mobile]
      },
      paymentInfos: [
        {
          amount: totalFare
        }
      ]
    }

    dispatch(flightBookingRequest(bookingDetails, (status) => {
      setIsBookingLoading(false);
      if (status) {
        console.log("Booking successful")
        setIsConfirmationDialogOpen(false);
      } else {
        console.log("Booking failed")
      }
    }));
  };

  const handleFormSubmit = () => {
    onSubmit((data) => {
      console.log("Form submitted successfully:", data);
      // Always fetch fresh review details (new priceIds) before booking
      const ids = priceIds ? priceIds.split(',') : []
      getReviewFlightDetailsMutation.mutate(ids, {
        onSuccess: (res: any) => {
          const dataRes = res?.data || res;
          const bookingId = dataRes?.bookingId || dataRes?.data?.bookingId || '';
          const details: FlightDetails | null = (dataRes?.data && dataRes?.data?.tripInfos) ? dataRes?.data : (dataRes?.tripInfos ? dataRes : null);

          // Create the flight booking payload using fresh bookingId and details
          const bookingPayload = createFlightBookingPayload(data, { bookingId, flightDetails: details });
          console.log("Flight booking payload:", bookingPayload);

          flightBookingMutation.mutate(bookingPayload, {
            onSuccess: (response) => {
              console.log("Flight booking successful:", response);
              // Try to get redirectUrl from common response shapes
              const redirectUrl = response?.data?.data?.redirectUrl || response?.data?.redirectUrl || (response as any)?.redirectUrl;
              if (redirectUrl) {
                window.location.assign(redirectUrl);
                return;
              }
              setIsConfirmationDialogOpen(true);
            },
            onError: (error) => {
              console.error("Flight booking failed:", error);
            }
          });
        },
        onError: (error) => {
          console.error('Get review flight details failed', error);
        }
      })
    });
  };

  useEffect(() => {
    console.log("priceIds inside useEffect", priceIds)
    if (priceIds) {
      console.log("priceIds", priceIds)
      dispatch(getPassengerFareSummary([priceIds], (response) => {
        console.log("response", response)
      }));
    }
  }, [dispatch, priceIds]);

  return (
    <div className="min-h-screen services-section !m-auto">
      <div className="container mx-auto pt-[50px]">
        {passengerFareSummary && <FareSummaryFlightDetails passengerFareSummary={passengerFareSummary} />}

        <Box as="div" className="flex h-full gap-[28px] mt-8 mb-8">
          {
            loading.includes("passengerFareSummary/getPassengerFareSummary") ? (
              <FareSummarySidebarSkeletonLoader />
            ) : (
              <FareSummaryUI />
            )
          }

          {
            loading.includes("passengerFareSummary/getPassengerFareSummary") ? (
              <FareSummaryAccordianSkeletonLoader />
            ) : passengerFareSummary ? (
              <Box as="div" className="w-full flex flex-col">
                <Accordion
                  type="single"
                  collapsible={false}
                  className="w-full space-y-6"
                  defaultValue="item-1"
                >
                  <AccordionItem
                    value="item-1"
                    className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <AccordionTrigger className="p-0 transition-all duration-300 font-semibold text-white bg-gradient-to-r from-[#ff7b00] to-[#ff9500] [&>svg]:hidden hover:no-underline hover:from-[#ff9500] hover:to-[#ff7b00]">
                      <Box as="div" className="flex items-center gap-2 p-3 w-full min-h-0">
                        <Box
                          as="div"
                          sx={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid rgba(255, 255, 255, 0.3)"
                          }}
                        >
                          <Image
                            src="/svg/passenger-icon.svg"
                            alt="Passenger Icon"
                            width={20}
                            height={20}
                            className="filter brightness-0 invert"
                          />
                        </Box>
                        <Box as="div" sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <Text
                            variant="Primary16Medium125"
                            color="white"
                            as="span"
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              color: "#ffffff",
                              letterSpacing: "0.025em",
                              margin: 0,
                              textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                            }}
                          >
                            Passenger Information
                          </Text>
                        </Box>
                      </Box>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-gradient-to-br from-gray-50 to-white">
                      <Passangerform
                        control={control}
                        errors={errors}
                        adultCount={adult}
                        childCount={child}
                        infantCount={infants}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <AccordionTrigger className="p-0 transition-all duration-300 font-semibold text-white bg-gradient-to-r from-[#ff7b00] to-[#ff9500] [&>svg]:hidden hover:no-underline hover:from-[#ff9500] hover:to-[#ff7b00]">
                      <Box as="div" className="flex items-center gap-2 p-3 w-full min-h-0">
                        <Box
                          as="div"
                          sx={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid rgba(255, 255, 255, 0.3)"
                          }}
                        >
                          <Image
                            src="/svg/gst-icon.svg"
                            alt="GST Icon"
                            width={20}
                            height={20}
                            className="filter brightness-0 invert"
                          />
                        </Box>
                        <Box as="div" sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <Text
                            variant="Primary16Medium125"
                            color="white"
                            as="span"
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              color: "#ffffff",
                              letterSpacing: "0.025em",
                              margin: 0,
                              textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                            }}
                          >
                            GST Details
                          </Text>
                        </Box>
                      </Box>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 bg-gradient-to-br from-gray-50 to-white">
                      <Box as="div" sx={{ padding: "10px 16px" }}>
                        <Text mt={2} variant="Maison18Demi125" color="orange_accent_alpha">GST Information</Text>
                      </Box>
                      <Box as="div" sx={{ borderTop: "1px solid #c5c5c591" }} />
                      <Box as="div" sx={{ padding: "1rem" }}>
                        <Box as="div" className="space-y-6">
                          <Box as="div" className="space-y-4">
                            <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Controller
                                name="gst.number"
                                control={control}
                                render={({ field }) => (
                                  <TextInputField
                                    label="GST Number"
                                    placeholder="GST Number"
                                    value={field.value}
                                    onChange={(value) => {
                                      // Allow only A-Z and 0-9, uppercase, and max length 15
                                      let cleaned = String(value || '')
                                        .toUpperCase()
                                        .replace(/[^A-Z0-9]/g, '')
                                        .slice(0, 15)

                                      // Enforce first two chars as digits if present
                                      if (cleaned.length >= 1 && /[A-Z]/.test(cleaned[0])) cleaned = `0${cleaned.slice(1)}`
                                      if (cleaned.length >= 2 && /[A-Z]/.test(cleaned[1])) cleaned = `${cleaned[0]}0${cleaned.slice(2)}`

                                      // Optional final-format guard using GST format
                                      if (cleaned.length === 15 && !gstRegex.test(cleaned)) {
                                        // keep value but could be surfaced by schema errors
                                      }
                                      field.onChange(cleaned)
                                    }}
                                    errors={(errors as any)?.gst?.number?.message}
                                    wrapperSx={{ mb: 0 }}
                                  />
                                )}
                              />

                              <Controller
                                name="gst.email"
                                control={control}
                                render={({ field }) => (
                                  <TextInputField
                                    label="GST Email"
                                    type="email"
                                    placeholder="GST Email"
                                    value={field.value}
                                    onChange={field.onChange}
                                    errors={(errors as any)?.gst?.email?.message}
                                    wrapperSx={{ mb: 0 }}
                                  />
                                )}
                              />

                              <Controller
                                name="gst.phone"
                                control={control}
                                render={({ field }) => (
                                  <TextInputField
                                    label="GST Phone"
                                    placeholder="GST Phone"
                                    value={field.value}
                                    onChange={(value) => {
                                      let cleaned = String(value).replace(validMobileNumberRegex, '');
                                      if (cleaned.length > 0) {
                                        if (!/^[6-9]/.test(cleaned)) {
                                          cleaned = cleaned.slice(1);
                                        }
                                      }
                                      if (cleaned.length > 10) {
                                        cleaned = cleaned.slice(0, 10);
                                      }
                                      field.onChange(cleaned);
                                    }}
                                    errors={(errors as any)?.gst?.phone?.message}
                                    wrapperSx={{ mb: 0 }}
                                  />
                                )}
                              />

                              <Controller
                                name="gst.address"
                                control={control}
                                render={({ field }) => (
                                  <TextInputField
                                    label="GST Address"
                                    placeholder="GST Address"
                                    value={field.value}
                                    onChange={field.onChange}
                                    errors={(errors as any)?.gst?.address?.message}
                                    wrapperSx={{ mb: 0 }}
                                  />
                                )}
                              />

                              <Controller
                                name="gst.company"
                                control={control}
                                render={({ field }) => (
                                  <TextInputField
                                    label="GST Company"
                                    placeholder="GST Company"
                                    value={field.value}
                                    onChange={field.onChange}
                                    errors={(errors as any)?.gst?.company?.message}
                                    wrapperSx={{ mb: 0 }}
                                  />
                                )}
                              />
                            </Box>

                            {/* GST action buttons removed as per requirement */}
                          </Box>
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <AccordionTrigger className="p-0 transition-all duration-300 font-semibold text-white bg-gradient-to-r from-[#ff7b00] to-[#ff9500] [&>svg]:text-white hover:no-underline hover:from-[#ff9500] hover:to-[#ff7b00] [&>svg]:w-7 [&>svg]:h-7">
                      <Box as="div" className="flex items-center gap-2 p-3 w-full min-h-0">
                        <Box
                          as="div"
                          sx={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid rgba(255, 255, 255, 0.3)"
                          }}
                        >
                          <Image
                            src="/svg/payment-icon.svg"
                            alt="Payment Icon"
                            width={20}
                            height={20}
                            className="filter brightness-0 invert"
                          />
                        </Box>
                        <Box as="div" sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <Text
                            variant="Primary16Medium125"
                            color="white"
                            as="span"
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              color: "#ffffff",
                              letterSpacing: "0.025em",
                              margin: 0,
                              textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                            }}
                          >
                            Contact and Payment Details
                          </Text>
                        </Box>
                      </Box>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 bg-gradient-to-br from-gray-50 to-white">
                      <Box as="div" sx={{ padding: "10px 16px" }}>
                        <Text mt={2} variant="Maison18Demi125" color="orange_accent_alpha">Contact Details</Text>
                      </Box>
                      <Box as="div" sx={{ borderTop: "1px solid #c5c5c591" }} />
                      <Box as="div" sx={{ padding: "1rem" }}>
                        <Box as="div" className="space-y-8">
                          <Box as="div" className="space-y-3">
                            <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Controller
                                name="contactDetails.email"
                                control={control}
                                render={({ field }) => (
                                  <TextInputField
                                    type="email"
                                    placeholder="Enter email address"
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Email Id*"
                                    errors={errors.contactDetails?.email?.message}
                                    wrapperSx={{ mb: 0 }}
                                  />
                                )}
                              />
                              <Controller
                                name="contactDetails.mobile"
                                control={control}
                                render={({ field }) => (
                                  <TextInputField
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={field.value}
                                    // onChange={field.onChange}
                                    onChange={(value) => {
                                      let cleaned = String(value).replace(validMobileNumberRegex, '');
                                      if (cleaned.length > 0) {
                                        if (!/^[6-9]/.test(cleaned)) {
                                          cleaned = cleaned.slice(1);
                                        }
                                        if (cleaned.length > 10) {
                                          cleaned = cleaned.slice(0, 10);
                                        }
                                      }
                                      field.onChange(cleaned);
                                    }}
                                    label="Mobile No*"
                                    errors={errors.contactDetails?.mobile?.message}
                                    wrapperSx={{ mb: 0 }}
                                  />
                                )}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box as="div" sx={{ padding: "10px 16px" }}>
                        <Text mt={2} variant="Maison18Demi125" color="orange_accent_alpha">Payment Methods</Text>
                      </Box>
                      <Box as="div" sx={{ borderTop: "1px solid #c5c5c591" }} />
                      <Box as="div" sx={{ padding: "1rem" }}>
                        <Box as="div" className="space-y-4">
                          <Controller
                            name="payment.method"
                            control={control}
                            render={({ field }) => (
                              <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                  {
                                    value: 'Deposit',
                                    label: 'Deposit',
                                    icon: <FaCoins className="text-blue-600" size={24} />,
                                    bgColor: 'bg-blue-50',
                                    borderColor: 'border-blue-200'
                                  },
                                  {
                                    value: 'DebitCard',
                                    label: 'Debit Card',
                                    icon: <FaCreditCard className="text-green-600" size={24} />,
                                    bgColor: 'bg-green-50',
                                    borderColor: 'border-green-200'
                                  },
                                  {
                                    value: 'CreditCard',
                                    label: 'Credit Card',
                                    icon: <FaCreditCard className="text-purple-600" size={24} />,
                                    bgColor: 'bg-purple-50',
                                    borderColor: 'border-purple-200'
                                  },
                                  {
                                    value: 'NetBanking',
                                    label: 'Net Banking',
                                    icon: <FaUniversity className="text-indigo-600" size={24} />,
                                    bgColor: 'bg-indigo-50',
                                    borderColor: 'border-indigo-200'
                                  },
                                  {
                                    value: 'UPI',
                                    label: 'UPI',
                                    icon: <FaMobile className="text-orange-600" size={24} />,
                                    bgColor: 'bg-orange-50',
                                    borderColor: 'border-orange-200'
                                  },
                                ].map((method) => (
                                  <Box
                                    key={method.value}
                                    as="div"
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${field.value === method.value
                                      ? 'border-[#ff7b00] bg-orange-50'
                                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                      }`}
                                    onClick={() => field.onChange(method.value)}
                                  >
                                    <CustomRadio
                                      isSelected={field.value === method.value}
                                      onSelect={() => field.onChange(method.value)}
                                    />
                                    <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center border ${method.borderColor} shadow-sm`}>
                                      {method.icon}
                                    </div>
                                    <Text as="label" className="text-sm font-medium text-gray-700 cursor-pointer">
                                      {method.label}
                                    </Text>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          />
                          {errors.payment?.method && (
                            <Text className="text-red-500 text-xs mt-2">{errors.payment?.method.message}</Text>
                          )}
                        </Box>
                      </Box>

                      <Box as="div" sx={{ padding: "10px 16px" }}>
                        <Text mt={2} variant="Maison18Demi125" color="orange_accent_alpha">Terms and Conditions</Text>
                      </Box>
                      <Box as="div" sx={{ borderTop: "1px solid #c5c5c591" }} />
                      <Box as="div" sx={{ padding: "1rem" }}>
                        <Box as="div" className="space-y-3">
                          <Controller
                            name="payment.termsAccepted"
                            control={control}
                            render={({ field }) => (
                              <Box as="div" className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <input
                                  checked={field.value}
                                  onChange={field.onChange}
                                  type="checkbox"
                                  id="terms"
                                  className="w-5 h-5 mt-0.5 text-[#ff7b00] border-gray-300 rounded focus:ring-[#ff7b00] focus:ring-2"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                                  I have read and accepted the{' '}
                                  <span className="text-[#ff7b00] font-medium underline hover:no-underline">Terms and Conditions</span>
                                </label>
                              </Box>
                            )}
                          />
                          {errors.payment?.termsAccepted && (
                            <Text className="text-red-500 text-xs mt-1">{errors.payment?.termsAccepted.message}</Text>
                          )}
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </Box>
            ) : (
              <Box as="div" className="w-full flex items-center justify-center">
                <Box as="div" className="text-center rounded-xl border border-dashed border-orange-300 bg-orange-50/50 px-8 py-12 w-full">
                  <Text as="div" sx={{ fontSize: '18px', fontWeight: 600, color: '#FF7B00' }}>No fare summary available</Text>
                  <Text as="div" sx={{ color: '#6B7280', mt: '8px' }}>Please select a flight to enter passenger details and continue.</Text>
                </Box>
              </Box>
            )
          }


        </Box>
        <Box as="div" className="flex justify-end mt-8">
          <ThemeButton
            onClick={handleFormSubmit}
            variant="primary"
            disabled={flightBookingMutation.isPending}
            className="bg-gradient-to-r from-[#ff7b00] to-[#ff9500] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#ff9500] hover:to-[#ff7b00] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {flightBookingMutation.isPending ? 'Booking...' : 'Book Now'}
          </ThemeButton>
        </Box>

        <FareSummaryFlightConfermationModel
          isOpen={isConfirmationDialogOpen}
          onClose={() => setIsConfirmationDialogOpen(false)}
          onConfirm={handleBookingConfirmation}
          passengerFareSummary={passengerFareSummary}
          passengerData={formValues}
          isLoading={isBookingLoading}
        />

      </div>
    </div>
  )
}

function AddPassangerFormWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddPassangerForm />
    </Suspense>
  )
}

export default AddPassangerFormWithSuspense
