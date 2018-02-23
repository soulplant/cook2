import {
  initialLoadSuccess,
  Delivery,
  INITIAL_LOAD_START,
  RECORD_DELIVERY,
  RecordDeliveryAction,
  CLEAR_DELIVERY,
  ClearDeliveryAction,
} from "./actions";
import { ApiFetchAllResponse, ApiServiceApi, ApiDelivery } from "./backend/api";
import { call, put, takeEvery } from "redux-saga/effects";
import { formatDate } from "./utils";

export function* watchInitialLoad(api: ApiServiceApi) {
  yield takeEvery(INITIAL_LOAD_START, performInitialLoad, api);
}

const apiDeliveryToDelivery = (apiDelivery: ApiDelivery): Delivery => {
  const time = {
    hour: 0,
    minute: 0,
    second: 0,
    ...apiDelivery.time,
  };
  return {
    date: apiDelivery.date!,
    time,
  };
};

function* performInitialLoad(api: ApiServiceApi) {
  try {
    const data: ApiFetchAllResponse = yield call([api, api.fetchAll]);
    yield put(
      initialLoadSuccess(
        data.delivery ? data.delivery.map(apiDeliveryToDelivery) : []
      )
    );
  } catch (e) {
    document.body.innerHTML = "failed to load, please refresh";
  }
}

export function* watchRecordDelivery(api: ApiServiceApi) {
  yield takeEvery(RECORD_DELIVERY, performRecordDelivery, api);
}

function* performRecordDelivery(
  api: ApiServiceApi,
  action: RecordDeliveryAction
) {
  const date = formatDate(action.time);
  yield call([api, api.recordDelivery], {
    delivery: {
      date,
      time: {
        hour: action.time.getHours(),
        minute: action.time.getMinutes(),
        second: action.time.getSeconds(),
      },
    },
  });
}

export function* watchClearDelivery(api: ApiServiceApi) {
  yield takeEvery(CLEAR_DELIVERY, performClearDelivery, api);
}

export function* performClearDelivery(
  api: ApiServiceApi,
  action: ClearDeliveryAction
) {
  yield call([api, api.clearDelivery], { date: formatDate(action.date) });
}
