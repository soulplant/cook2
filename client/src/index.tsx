import "./bulma.css";
import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { initialLoadStart } from "./actions";
import { reducer } from "./reducers";
import { watchInitialLoad } from "./sagas";
import App from "./App";

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

sagaMiddleware.run(watchInitialLoad);

store.dispatch(initialLoadStart());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
