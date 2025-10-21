'use client'
import FlightBookingUI from "@/components/pages/flight-review/Detailscrad";
import FareSummaryUI from "@/components/pages/flight-review/FareSummary";
import { startReviewFlightDetails } from "@/store/actions/flightBooking.action";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "theme-ui";

function ReviewFlightDetails() {
  const searchParams = useSearchParams();
  const priceIds = searchParams.get('priceIds');
  const dispatch = useDispatch();
  console.log("priceIds", priceIds)
  useEffect(() => {
    if (priceIds) {
      dispatch(startReviewFlightDetails({ priceIds: priceIds?.split(',') }, (status) => {
        if (status) {
        }
      }));
    }
  }, [dispatch, priceIds]);
  return (
    <>
      <Box as="div" className="container mx-auto flex flex-col lg:flex-row items-start gap-4 lg:gap-6 px-4 py-[12px]">
        <FareSummaryUI />
        <Box className="w-full  ">
          <FlightBookingUI showWarning={true} />
          <FlightBookingUI />
        </Box>
      </Box>
    </>
  )
}

function ReviewFlightDetailsWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewFlightDetails />
    </Suspense>
  )
}

export default ReviewFlightDetailsWithSuspense
