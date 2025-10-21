import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AirlineTransformedPayload } from 'utilsdata';

export interface PassengerFareSummaryState {
 passengerFareSummary : null | AirlineTransformedPayload
 loading : string[]
}

const initialState: PassengerFareSummaryState = {
 passengerFareSummary : null,
 loading : []
};

const passengerFareSummarySlice = createSlice({
  name: 'passengerFareSummary',
  initialState,
  reducers: {
    setPassengerFareSummaryLoading(state, action: PayloadAction<string>) {
      state.loading = [...state.loading, action.payload];
    },
    stopPassengerFareSummaryLoading(state, action: PayloadAction<string>) {
      state.loading = state.loading.filter((loading) => loading !== action.payload);
    },
    setPassengerFareSummary(state, action: PayloadAction<AirlineTransformedPayload>) {
      state.passengerFareSummary = action.payload;
    }
  },
});

export const {
  setPassengerFareSummaryLoading,
  stopPassengerFareSummaryLoading,
  setPassengerFareSummary,
} = passengerFareSummarySlice.actions;

export default passengerFareSummarySlice.reducer;
