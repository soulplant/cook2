import { Action } from "redux";
import { LocalTime } from "./types";

export type JTAction =
  | InitAction
  | InitialLoadStartAction
  | InitialLoadSuccessAction
  | IncrementRequestsInFlightAction
  | DecrementRequestsInFlightAction
  | PreviousDateAction
  | NextDateAction
  | GoToTodayAction
  | JumpToDayAction
  | RecordDeliveryAction
  | ClearDeliveryAction;

// TODO(james): Move this to types.ts
export type Delivery = {
  date: string;
  // Time is a string-encoded int64.
  time: LocalTime;
};

export interface InitialLoadData {
  deliveries: Delivery[];
}

export const INIT = "@@INIT";
export const INITIAL_LOAD_START = "INITIAL_LOAD_START";
export const INITIAL_LOAD_SUCCESS = "INITIAL_LOAD_SUCCESS";
export const INCREMENT_REQUESTS_IN_FLIGHT = "INCREMENT_REQUESTS_IN_FLIGHT";
export const DECREMENT_REQUESTS_IN_FLIGHT = "DECREMENT_REQUESTS_IN_FLIGHT";
export const PREVIOUS_DATE = "PREVIOUS_DATE";
export const NEXT_DATE = "NEXT_DATE";
export const GO_TO_TODAY = "GO_TO_TODAY";
export const JUMP_TO_DAY = "JUMP_TO_DAY";
export const RECORD_DELIVERY = "RECORD_DELIVERY";
export const CLEAR_DELIVERY = "CLEAR_DELIVERY";

export interface InitAction extends Action {
  type: "@@INIT";
}

export interface InitialLoadStartAction extends Action {
  type: "INITIAL_LOAD_START";
}

export interface InitialLoadSuccessAction extends Action {
  type: typeof INITIAL_LOAD_SUCCESS;
  deliveries: Delivery[];
}

export interface IncrementRequestsInFlightAction extends Action {
  type: typeof INCREMENT_REQUESTS_IN_FLIGHT;
}

export interface DecrementRequestsInFlightAction extends Action {
  type: typeof DECREMENT_REQUESTS_IN_FLIGHT;
}

export interface PreviousDateAction extends Action {
  type: typeof PREVIOUS_DATE;
}

export interface NextDateAction extends Action {
  type: typeof NEXT_DATE;
}

export interface GoToTodayAction extends Action {
  type: typeof GO_TO_TODAY;
  today: Date;
}

export interface JumpToDayAction extends Action {
  type: typeof JUMP_TO_DAY;
  date: Date;
}

export interface RecordDeliveryAction extends Action {
  type: typeof RECORD_DELIVERY;
  time: Date;
}

export interface ClearDeliveryAction extends Action {
  type: typeof CLEAR_DELIVERY;
  date: Date;
}

export const init = (): InitAction => ({
  type: INIT,
});

export const initialLoadStart = (): InitialLoadStartAction => ({
  type: INITIAL_LOAD_START,
});

export const initialLoadSuccess = (
  deliveries: Delivery[]
): InitialLoadSuccessAction => ({
  type: INITIAL_LOAD_SUCCESS,
  deliveries,
});

export const incrementRequestsInFlight = (): IncrementRequestsInFlightAction => ({
  type: INCREMENT_REQUESTS_IN_FLIGHT,
});

export const decrementRequestsInFlight = (): DecrementRequestsInFlightAction => ({
  type: DECREMENT_REQUESTS_IN_FLIGHT,
});

export const previousDate = (): PreviousDateAction => ({
  type: PREVIOUS_DATE,
});

export const nextDate = (): NextDateAction => ({
  type: NEXT_DATE,
});

export const goToToday = (): GoToTodayAction => ({
  type: GO_TO_TODAY,
  today: new Date(),
});

export const jumpToDay = (date: Date): JumpToDayAction => ({
  type: JUMP_TO_DAY,
  date,
});

export const recordDelivery = (
  time: Date = new Date()
): RecordDeliveryAction => ({
  type: RECORD_DELIVERY,
  time,
});

export const clearDelivery = (date: Date): ClearDeliveryAction => ({
  type: CLEAR_DELIVERY,
  date,
});
