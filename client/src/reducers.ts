import {
  JTAction,
  INCREMENT_REQUESTS_IN_FLIGHT,
  DECREMENT_REQUESTS_IN_FLIGHT,
  NEXT_DATE,
  PREVIOUS_DATE,
  Delivery,
  INITIAL_LOAD_SUCCESS,
  RECORD_DELIVERY,
  GO_TO_TODAY,
  INITIAL_LOAD_START,
  CLEAR_DELIVERY,
  JUMP_TO_DAY,
} from "./actions";

import { combineReducers } from "redux";
import { JTState } from "./types";
import { formatDate } from "./utils";

// // Split the entities with an id field into a map of the same type.
// function splitById<T extends { id: string }>(ts: T[]): { [id: string]: T } {
//   const result: { [id: string]: T } = {};
//   ts.forEach(t => {
//     result[t.id] = t;
//   });
//   return result;
// }

// // Retrieves the list of ids from a group of entities.
// function getIds<T extends { id: string }>(ts: T[]): string[] {
//   return ts.map(t => t.id);
// }

const isInitialLoadPendingReducer = (
  state: boolean = false,
  action: JTAction
): boolean => {
  switch (action.type) {
    case INITIAL_LOAD_START:
      return true;
    case INITIAL_LOAD_SUCCESS:
      return false;
    default:
      return state;
  }
};

const requestsInFlightReducer = (
  state: number = 0,
  action: JTAction
): number => {
  switch (action.type) {
    case INCREMENT_REQUESTS_IN_FLIGHT: {
      return state + 1;
    }
    case DECREMENT_REQUESTS_IN_FLIGHT: {
      return state - 1;
    }
    default:
      return state;
  }
};

const deliveriesReducer = (
  state: { [date: string]: Delivery } = {},
  action: JTAction
): { [date: string]: Delivery } => {
  switch (action.type) {
    case INITIAL_LOAD_SUCCESS: {
      const result: { [date: string]: Delivery } = {};
      action.deliveries.map(d => (result[d.date] = d));
      return result;
    }
    case RECORD_DELIVERY: {
      // TODO(james): Keep this in an optimistic store.
      const date = formatDate(action.time);
      const newState = {
        ...state,
        [date]: {
          date,
          time: {
            hour: action.time.getHours(),
            minute: action.time.getMinutes(),
            second: action.time.getSeconds(),
          },
        },
      };
      return newState;
    }
    case CLEAR_DELIVERY: {
      // TODO(james): Keep this in an optimistic store.
      const date = formatDate(action.date);
      const { [date]: deleted, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

const changeDate = (date: Date, deltaDays: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + deltaDays);
  return result;
};

const dateReducer = (state: Date = new Date(), action: JTAction): Date => {
  switch (action.type) {
    case PREVIOUS_DATE:
      return changeDate(state, -1);
    case NEXT_DATE:
      return changeDate(state, 1);
    case GO_TO_TODAY:
      return action.today;
    case JUMP_TO_DAY:
      return action.date;
    default:
      return state;
  }
};

export const reducer = combineReducers<JTState>({
  isInitialLoadPending: isInitialLoadPendingReducer,
  deliveries: deliveriesReducer,
  date: dateReducer,
  requestsInFlight: requestsInFlightReducer,
});
