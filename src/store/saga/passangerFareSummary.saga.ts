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
      yield put(setPassengerFareSummary(response.data))
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
