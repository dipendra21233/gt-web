import { call, put, takeLatest } from "redux-saga/effects";
import { getUsersFailureAction } from "../actions/user.action";
import { AxiosError, AxiosResponse } from "axios";
import { getPassengerFareSummaryApi } from "../apis";
import { getPassengerFareSummary } from "../actions/passangerFareSummary.action";
import { setPassengerFareSummary, setPassengerFareSummaryLoading, stopPassengerFareSummaryLoading } from "../slice/passangerFareSummary.slice";

function* getPassengerFareSummaryWorker(action: ReturnType<typeof getPassengerFareSummary>) {
  console.log("getPassengerFareSummaryWorker called with action:", action);
  try {
    yield put(setPassengerFareSummaryLoading(action.type))
    console.log("Dispatching setPassengerFareSummaryLoading with type:", action.type);
    const response: AxiosResponse = yield call(getPassengerFareSummaryApi, action?.payload?.priceId)
    console.log("API response received in getPassengerFareSummaryWorker:", response);
    if (response.status === 200) {
      console.log("API call successful, status 200. Calling callback and dispatching setPassengerFareSummary.");
      action.meta?.callBack?.(response.status === 200)
      
      // Add supplier by matching priceId in localStorage flightSearchResults
      let fareSummaryData = { ...response.data };
      if (!fareSummaryData.supplier) {
        try {
          const priceIds = action?.payload?.priceId || [];
          const firstPriceId = priceIds[0];
          
          if (firstPriceId && typeof window !== 'undefined') {
            // First, try to match priceId in flightSearchResults
            const raw = localStorage.getItem('flightSearchResults');
            if (raw) {
              const results = JSON.parse(raw) as Array<{ 
                supplier?: 'NEXUS' | 'TRIPJACK'; 
                fares?: Array<{ priceID?: string; priceId?: string }> 
              }>;
              
              const found = results.find((r) => 
                Array.isArray(r?.fares) && 
                r.fares.some((f: any) => (f?.priceID || f?.priceId) === firstPriceId)
              );
              
              if (found?.supplier) {
                fareSummaryData.supplier = found.supplier;
              } else {
                // Fallback: check the 'supplier' key in localStorage
                const supplier = localStorage.getItem('supplier');
                if (supplier === 'NEXUS' || supplier === 'TRIPJACK') {
                  fareSummaryData.supplier = supplier;
                } else {
                  fareSummaryData.supplier = 'TRIPJACK'; // Default fallback
                }
              }
            } else {
              // No flightSearchResults, try localStorage supplier key
              const supplier = localStorage.getItem('supplier');
              if (supplier === 'NEXUS' || supplier === 'TRIPJACK') {
                fareSummaryData.supplier = supplier;
              } else {
                fareSummaryData.supplier = 'TRIPJACK'; // Default fallback
              }
            }
          } else {
            fareSummaryData.supplier = 'TRIPJACK'; // Default fallback
          }
        } catch (e) {
          console.error('Error determining supplier:', e);
          fareSummaryData.supplier = 'TRIPJACK'; // Default fallback
        }
      }
      
      yield put(setPassengerFareSummary(fareSummaryData))
    } 
  } catch (error) {
    console.log("Error in getPassengerFareSummaryWorker:", error);
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(getUsersFailureAction(error))
      action.meta?.callBack?.(false)
    } 
  } finally {
    console.log("Dispatching stopPassengerFareSummaryLoading with type:", action.type);
    yield put(stopPassengerFareSummaryLoading(action.type))
  }
}

export default function* passangerFareSummarySaga() {
  yield takeLatest(getPassengerFareSummary.type, getPassengerFareSummaryWorker)
}
