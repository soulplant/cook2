import { combineReducers } from "redux";

export const reducer = combineReducers<{}>({
  foo: (state = "hi", action) => state,
});
