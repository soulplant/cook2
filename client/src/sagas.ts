import { put, takeEvery } from "redux-saga/effects";

import { INITIAL_LOAD_START } from "./actions";

export function* watchInitialLoad() {
  yield takeEvery(INITIAL_LOAD_START, performInitialLoad);
}

function* performInitialLoad() {
  try {
    // TODO(james): Implement.
    yield put({ type: "HI" });
  } catch (e) {
    document.body.innerHTML = "failed to load, please refresh";
  }
}
