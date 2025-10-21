import { createAction } from '@reduxjs/toolkit';

export const getPassengerFareSummary = createAction(
  'passengerFareSummary/getPassengerFareSummary',
  (priceId: string[], callBack?: (status: boolean) => void) => ({
    payload: { priceId },
    meta: callBack ? { callBack } : undefined
  })
);
