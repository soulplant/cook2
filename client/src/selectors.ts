import { JTState, LocalTime } from "./types";
import { formatDate } from "./utils";
import * as moment from "moment";
import { Delivery } from "./actions";

export const getIsLoading = (state: JTState): boolean => {
  return state.requestsInFlight > 0;
};

export const getDate = (state: JTState): Date => {
  return state.date;
};

export const getTime = (state: JTState): LocalTime | null => {
  const dateKey = formatDate(getDate(state));
  const date = state.deliveries[dateKey];
  if (!date) {
    return null;
  }
  return date.time;
};

export const getIsToday = (state: JTState): boolean => {
  return formatDate(getDate(state)) === formatDate(getToday(state));
};

export const getToday = (state: JTState): Date => {
  // TODO(james): Store the current date in the store and periodically update
  // it.
  return new Date();
};

export const getIsInitialLoadPending = (state: JTState): boolean => {
  return state.isInitialLoadPending;
};

export type HistoryWeek = {
  date: Date;
  deliveries: (Delivery | null)[];
};

export const getDeliveriesForWeek = (
  state: JTState,
  weeksAgo: number
): HistoryWeek => {
  const today = moment(getToday(state));
  const startOfThisWeek = today.subtract(today.get("day"), "days");
  const startOfTargetWeek = startOfThisWeek.subtract(weeksAgo, "weeks");

  const result: (Delivery | null)[] = [];
  for (let i = 0; i < 7; i++) {
    result.push(
      state.deliveries[
        formatDate(
          moment(startOfTargetWeek)
            .add(i, "days")
            .toDate()
        )
      ] || null
    );
  }
  return {
    date: moment(startOfTargetWeek).toDate(),
    deliveries: result,
  };
};

export const getDeliveryHistory = (state: JTState): HistoryWeek[] => {
  return [3, 2, 1, 0].map(weeksAgo => getDeliveriesForWeek(state, weeksAgo));
};
