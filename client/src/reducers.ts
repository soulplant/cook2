import { combineReducers } from "redux";

import { CookAction, INITIAL_LOAD_DONE } from "./actions";
import { Data } from "./lib/types";

const data = (state: Data | null = null, action: CookAction): Data | null => {
  switch (action.type) {
    case INITIAL_LOAD_DONE: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export const reducer = combineReducers<{}>({
  data,
});
