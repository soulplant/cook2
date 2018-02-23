import "./index.css";
import "./bulma.css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { applyMiddleware, compose, createStore } from "redux";
import {
  watchInitialLoad,
  watchRecordDelivery,
  watchClearDelivery,
} from "./sagas";

import { ApiServiceApi } from "./backend/api";
import App from "./containers/App";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import {
  initialLoadStart,
  incrementRequestsInFlight,
  decrementRequestsInFlight,
} from "./actions";
import { reducer } from "./reducers";

declare var window: Window & {
  __REDUX_DEVTOOLS_EXTENSION__?: Function;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
};
const composeEnhancers: typeof compose =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Performs a fetch with cookies and basic auth headers that are stored in the
// client.
const fetchWithCreds = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  store.dispatch(incrementRequestsInFlight());
  try {
    return await fetch(input, {
      ...init,
      credentials: "same-origin",
    });
  } finally {
    store.dispatch(decrementRequestsInFlight());
  }
};

const api = new ApiServiceApi(undefined, "/api", fetchWithCreds);

sagaMiddleware.run(watchInitialLoad, api);
sagaMiddleware.run(watchRecordDelivery, api);
sagaMiddleware.run(watchClearDelivery, api);

store.dispatch(initialLoadStart());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
